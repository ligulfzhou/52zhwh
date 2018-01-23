# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models
from django.forms.models import model_to_dict
from django.core import serializers

from .rs import rs

tp_id_dict = {
    'author': 1,
    'source': 2,
    'tag': 3
}

class Meiju(models.Model):
    img = models.CharField(max_length=128)
    sentence = models.TextField(blank=True, null=True)
    thumbs = models.IntegerField()
    author_id = models.IntegerField()
    source_id = models.IntegerField()
    former_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'meiju'


class MeijuTag(models.Model):
    tp = models.IntegerField()
    name = models.CharField(max_length=32)

    class Meta:
        managed = False
        db_table = 'meiju_tag'


class TagMeiju(models.Model):
    tag_id = models.IntegerField()
    meiju_id = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'tag_meiju'


class MeijuModel:

    def get_meiju(self, pk):
        try:
            meiju = Meiju.objects.filter(pk=pk).values()[0]
        except:
            return {}
        return meiju

    def _check_meiju_has_no_tag(self, meiju_id):
        key = 'meiju_has_no_tag_set'
        return rs.sismember(key, meiju_id)

    def _get_meiju_tag_list(self, meiju_id):
        tag_meijus = TagMeiju.objects.filter(meiju_id=meiju_id).all()
        tag_meijus = [model_to_dict(i) for i in tag_meijus]
        return [i['tag_id'] for i in tag_meijus]

    def get_meiju_tag_list(self, meiju_id):
        key = 'meiju_%s_tag_list'%(meiju_id)
        v = rs.lrange(key, 0, -1)
        if v:
            return list(map(int, v))
        if self._check_meiju_has_no_tag(meiju_id):
            return []

        tag_ids = self._get_meiju_tag_list(meiju_id)
        if not tag_ids:
            rs.sadd('meiju_has_no_tag_set', meiju_id)
            return []
        rs.rpush(key, *tag_ids)
        return tag_ids

    def _merge_meijus(self, meijus):
        if not meijus:
            return []

        _ids = []
        tag_ids = [self.get_meiju_tag_list(i['id']) for i in meijus]
        [_ids.extend(i) for i in tag_ids]
        [_ids.extend([i['author_id'], i['source_id']]) for i in meijus]
        _ids = list(filter(bool, list(set(_ids))))
        id_tag_dict = self.get_tags(_ids)
        for meiju in meijus:
            author_name = id_tag_dict.get(meiju['author_id'], {}).get('name', '') if meiju['author_id'] else ''
            meiju.update({'author_name': author_name})
            source_name = id_tag_dict.get(meiju['source_id'], {}).get('name', '') if meiju['source_id'] else ''
            meiju.update({'source_name': source_name})

            tag_list = []
            tids = self.get_meiju_tag_list(meiju['id'])
            for _id in tids:
                tag = id_tag_dict.get(_id)
                if not tag:
                    continue
                tag_list.append(tag)
            meiju.update({'tag_list': tag_list})
        return meijus

    def _get_meijus(self, author_id=0, source_id=1, tag_id=1):
        if author_id:
            meijus = Meiju.objects.filter(author_id=author_id).all()
        elif source_id:
            meijus = Meiju.objects.filter(source_id=source_id).all()
        elif tag_id:
            tag_meijus = TagMeiju.objects.filter(tag_id=tag_id).all()
            tag_meijus = [model_to_dict(i) for i in tag_meijus]
            meiju_ids = [i['meiju_id'] for i in tag_meijus]
            if not meiju_ids:
                return []
            meijus = Meiju.objects.filter(pk__in=meiju_ids).all()
        else:
            meijus = Meiju.objects.all()

        meijus = [model_to_dict(i) for i in meijus]
        return meijus

    def get_meijus(self, page, page_size, author_id, source_id, tag_id):
        f, t = (page-1)*page_size, page*page_size-1
        key = 'meiju_of_%s_%s_%s' % (author_id, source_id, tag_id)
        v = rs.lrange(key, f, t)
        if v:
            return [eval(i) for i in v]

        meijus = self._get_meijus(author_id, source_id, tag_id)
        meijus = self._merge_meijus(meijus)
        if meijus:
            rs.rpush(key, *meijus)
            rs.expire(key, 24*60*60)
        return meijus[f:t]

    def get_meiju_count(self, author_id=0, source_id=0, tag_id=0):
        key = 'meiju_of_%s_%s_%s' % (author_id, source_id, tag_id)
        if not rs.exists(key):
            self.get_meijus(1, 15, author_id, source_id, tag_id)
        return rs.llen(key)

    def _get_tags(self, tag_ids):
        tags = MeijuTag.objects.filter(pk__in=tag_ids)
        tags = [model_to_dict(tag) for tag in tags]
        return tags

    def _get_tag_key(self, tag_id):
        return 'meiju_tag_%s'%tag_id

    def get_tags(self, tag_ids):
        '''
        返回{tag_id: tag, ...}的字典
        '''
        tag_ids = list(filter(bool, tag_ids))

        keys = [self._get_tag_key(tag_id) for tag_id in tag_ids]
        tags = rs.mget(keys)
        tags = [eval(i.decode()) for i in tags if i]
        key_tag_dict = dict(zip(keys, tags))
        _id_tag_dict = {_id: key_tag_dict[self._get_tag_key(_id)] for _id in tag_ids}
        miss_ids = [_id for _id in tag_ids if not _id_tag_dict[_id]]
        if miss_ids:
            miss_tags = self._get_tags(miss_ids)
            miss_id_tag_dict = {i['id']: i for i in miss_tags}
            data = {self._get_tag_key(i): j for i, j in miss_id_tag_dict.items()}
            rs.mset(data)
            _id_tag_dict.update(miss_id_tag_dict)
        return _id_tag_dict

    def _get_meiju_tp_tags(self, tp):
        tags = MeijuTag.objects.filter(tp=tp).all()
        tags = [model_to_dict(i) for i in tags]
        return tags

    def get_meiju_tp_tags(self, tp_str='author', page=1, page_size=50):
        tp = tp_id_dict[tp_str]
        key = 'meiju_tag_of_tp_%s'%tp
        f, t = (page-1)*page_size, page*page_size
        v = rs.lrange(key, f, t)
        if v:
            return [eval(i) for i in v]
        tags = self._get_meiju_tp_tags(tp)

        if not tags:
            return []

        rs.rpush(key, *tags)
        rs.expire(key, 24*60*60)
        return tags[f:t]

    def get_meiju_tp_tags_count(self, tp_str):
        tp = tp_id_dict[tp_str]
        key = 'meiju_tag_of_tp_%s'%tp
        if rs.exists(key):
            return rs.llen(key)
        tags = self._get_meiju_tp_tags(tp)
        if not tags:
            return 0
        rs.rpush(key, *tags)
        rs.expire(key, 24*60*60)
        return len(tags)


model = MeijuModel()

