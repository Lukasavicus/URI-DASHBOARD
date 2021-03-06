from django.conf.urls import url

from . import views

app_name = 'uri_crawler'

#urlpatterns = [
    # ex: /polls/
    #url(r'^$', views.index, name='index'),
#	url(r'^$', views.IndexView.as_view(), name='index'),

    # ex: /polls/5/
#    url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /polls/5/results/
#    url(r'^(?P<question_id>[0-9]+)/results/$', views.results, name='results'),
    # ex: /polls/5/vote/
 #   url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),

    # added the word 'specifics'
#	url(r'^specifics/(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
#]

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^search_user/$', views.search_user, name='search_user'),
    url(r'^search_user_adv/$', views.search_user_advanced, name='search_user_advanced'),
    url(r'^search_user/[0-9]+/$', views.user_detail, name='user_detail'),

    #url(r'^(?P<pk>[0-9]+)/results/$', views.ResultsView.as_view(), name='results'),
    #url(r'^$', views.IndexView.as_view(), name='index'),
    #url(r'^(?P<pk>[0-9]+)/$', views.DetailView.as_view(), name='detail'),
    #url(r'^(?P<pk>[0-9]+)/results/$', views.ResultsView.as_view(), name='results'),
    #url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
]