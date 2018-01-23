from django.conf.urls import url

from .views import MeijuView, MeijusView, TagsView

urlpatterns = [
    url(r'/meijus/(?P<meiju_id>[0-9]+)', MeijuView.as_view()),
    url(r'/meijus', MeijusView.as_view()),
    url(r'/tags', TagsView.as_view()),
]
