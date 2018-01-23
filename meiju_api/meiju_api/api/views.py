import logging

from django.shortcuts import render
from django.views import View
from django.http.response import JsonResponse

from .models import Meiju, MeijuTag, TagMeiju
from .models import model


class MeijuView(View):

    def get(self, request, meiju_id):
        meiju = model.get_meiju(meiju_id)
        return JsonResponse(dict(meiju=meiju))


class MeijusView(View):

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            page_size = int(request.GET.get('page_size', 15))
            author_id = int(request.GET.get('author_id', 0))
            source_id = int(request.GET.get('source_id', 0))
            tag_id = int(request.GET.get('tag_id', 0))
        except Exception as e:
            logging.error(e)

        kw = dict(page_size=page_size, author_id=author_id, source_id=source_id, tag_id=tag_id)
        meijus = model.get_meijus(page, **kw)
        count = model.get_meiju_count(author_id, source_id, tag_id)
        total_page = (count + page_size - 1) // page_size
        return JsonResponse(dict(meijus=meijus, page=page, count=count, total_page=total_page))


class TagsView(View):

    def get(self, request):
        try:
            page = int(request.GET.get('page', 1))
            page_size = int(request.GET.get('page_size', 50))
            tp_str = request.GET.get('tp_str', 'author')

            assert tp_str in ('author', 'source', 'tag')
        except Exception as e:
            logging.error(e)

        tags = model.get_meiju_tp_tags(tp_str, page, page_size)
        count = model.get_meiju_tp_tags_count(tp_str)
        total_page = (count + page_size - 1) // page_size
        return JsonResponse(dict(tags=tags, page=page, count=count, total_page=total_page))

