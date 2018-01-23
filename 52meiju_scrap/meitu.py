import logging
import aiohttp
import asyncio
import async_timeout

import argparse
import hashlib
import time
import errno
import os
import urllib.request
import redis
import random
from bs4 import BeautifulSoup
from sql import api


rs = redis.StrictRedis(host='localhost')
sem = asyncio.Semaphore(5)

scraped_meiju_former_ids_keys = 'scraped_meiju_former_ids'
scraped_tp_former_ids_keys = 'scraped_tp_{tp}_ids'
authors_hash_key = 'authors_hash'    # former_id:  name
tags_hash_key = 'tags_hash'  # former_id:  name
source_hash_key = 'source_hash'  # former_id:  name

meiju_taglist_key = 'meiju_{mid}_taglist'
tag_meijulist_key = 'tag_{tid}_meijulist'

error_mid_set_key = 'error_mid_set'

tp_id_dict = {
    'author': 1,
    'source': 2,
    'tag': 3
}

uas = ['Mozilla/5.0 (Windows; U; Windows NT %s.1; de; rv:1.%s.1.%s) Gecko/200%s1102 Firefox/3.%s.5',
       'Mozilla/5.0 (Windows; U; Windows NT %s.1; en-US) AppleWebKit/53%s.5 (KHTML, like Gecko) Chrome/4.0.2%s9.0 Safari/53%s.%s',
       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.%s; rv:2%s.0) Gecko/20100%s0%s Firefox/2%s.0',
       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.%s; rv:2%s.0) Gecko/20100%s0%s Firefox/35.%s',
       'Mozilla/5.0 (Macintosh; Intel Mac OS X 12.%s; rv:2%s.0) Gecko/20100%s0%s Firefox/40.%s',
       'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_%s_%s) AppleWebKit/537.%s6 (KHTML, like Gecko) Chrome/52.0.27%s3.116 Safari/537.%s6']

class Base:

    def __init__(self, loop):
        self._loop = loop

    def _get_user_agent(self):
        i = random.choice()

    def _get_header(self):
        ua = random.choice(uas)
        rint0 = random.randint(0, 9)
        rint1 = random.randint(0, 9)
        rint2 = random.randint(0, 9)
        rint3 = random.randint(0, 9)
        rint4 = random.randint(0, 9)
        user_agent = ua%(rint0, rint1, rint2, rint3, rint4)
        return {'User-agent': user_agent}

    async def get(self, *args, **kw):
        async with aiohttp.ClientSession(loop=self._loop) as session:
            async with self.sem, session.get(*args, **kw) as response:
                url = response.url.path
                response = await response.read()
                return response, url

    async def get_response(self, url, **kw):
        headers = self._get_header()
        kw.update({'compress': True, 'headers': headers})
        res, url = await self.get(url, **kw)
        return res, url


class Meiju(Base):

    def __init__(self, loop):
        super().__init__(loop)
        self.url = 'http://juzi.laiyo.com/view_{mid}.aspx'
        self.total_count = 100000
        self.ranges = range(0, self.total_count)

    def _check_if_scraped_already(self, former_id):
        key = 'scraped_meiju_former_ids'
        if rs.sismember(key, former_id):
            return 1
        meiju = api.get_meiju(former_id)
        if meiju:
            return 1
        return 0

    async def start_scrap(self):
        for idx in self.ranges:     # self.total_page+1):
            url = self.url.format(mid=idx)
            url = 'http://juzi.laiyo.com/view_1.aspx'
            try:
                res, url = await self.get_response(url)
            except Exception as e:
                logging.error(e)
                try:
                    rs.sadd(error_mid_set_key, idx)
                except:
                    pass
                continue

            self._store(res, url, idx)

    def _store(self, html, url, idx):
        print(url)
        logging.info(url)
        try:
            fid = int(url.split('/')[-1].split('_')[1].split('.')[0])
        except Exception as e:
            logging.error('_store: %s, %s'%(url, e))
            return


        # if not fid==idx:
        #     return

        if self._check_if_scraped_already(fid):
            return

        soup = BeautifulSoup(html, 'html.parser')
        main3 = soup.find('div', 'main3')
        if not main3:
            return

        sonimg = main3.find('div', 'sonimg')
        if not sonimg:
            return

        img, author_id, source_id, sentence = '', 0, 0, ''
        try:
            img = soup.find('iframe')['onload'].split('(')[1].split(')')[0].strip('\'')
        except:
            pass

        cont = sonimg.find('div', 'cont')
        if cont:
            sentence = cont.get_text()

        source = sonimg.find('div', 'source')
        sources = []
        if source:
            sources = source.find_all('a')
        for i in sources:
            _id = i['id']
            if _id.startswith('author'):
                author = i.get_text()
                tag = api.get_tag(tp_id_dict['author'], author)
                if not tag:
                    tag = api.add_model(1, dict(name=author, tp=tp_id_dict['author']))
                if tag:
                    author_id = tag['id']
            else:
                sc = i.get_text()
                tag = api.get_tag(tp_id_dict['source'], sc)
                if not tag:
                    tag = api.add_model(1, dict(name=sc, tp=tp_id_dict['source']))
                if tag:
                    source_id = tag['id']

        meiju = api.add_model(0, dict(img=img, sentence=sentence, thumbs=0, author_id=author_id, source_id=source_id, former_id=fid))
        if not meiju:
            return

        tags = []
        tag = sonimg.find('div', 'tag')
        if tag:
            tags = tag.find_all('a')

        for i in tags:
            name = i.get_text()
            tag = api.get_tag(tp_id_dict['tag'], name)
            if not tag:
                tag = api.add_model(1, dict(name=name, tp=tp_id_dict['tag']))
            if tag:
                tag_id = tag['id']
                tag_meiju = api.get_meiju_tag(tag_id, meiju['id'])
                if not tag_meiju:
                    api.add_model(2, dict(tag_id=tag_id, meiju_id=meiju['id']))


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    meiju = Meiju(loop=loop)
    loop.run_until_complete(meiju.start_scrap())

