# -*- coding: utf-8 -*-
from __future__ import unicode_literals


from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.template import loader
from django.urls import reverse

from django.http import Http404

from django.views import generic

from crawler_provider.ws_problems_data import craw_problems
from crawler_provider.ws_users_data import craw_users

#import pdb;

#def index(request):
#	return HttpResponse("Hello, world. You're at the polls index.")

#class IndexView(generic.ListView):
#	template_name = 'crawler_provider/index.html'
#	context_object_name = 'PROBLEMS'
#
#	def get_queryset(self):
#		return craw_problems()

def index(request):
	address = 'uri_crawler/index.html'
	return render(request, address, {})

def search_user(request):
	username = request.POST.get("username")
	print(username)
	num_pages = 10
	POSSIBLE_USERS = craw_users(username, num_pages)
	context = {'possible_users' : POSSIBLE_USERS, 'num_pages' : num_pages, 'search_key' : username}
	address = 'uri_crawler/users.html'
	return render(request, address, context)

def search_user_advanced(request):
	username = request.POST.get("username")
	number = request.POST.get("number")
	print(number)
	num_pages = int(number) * 10
	POSSIBLE_USERS = craw_users(username, num_pages)
	context = {'possible_users' : POSSIBLE_USERS, 'num_pages' : num_pages, 'search_key' : username}
	address = 'uri_crawler/users.html'
	return render(request, address, context)

def user_detail(request):
	context = {}
	address = 'uri_crawler/user_detail.html'
	return render(request, address, context)