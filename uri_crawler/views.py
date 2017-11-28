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
	#PROBLEMS = craw_problems()
	#context = {'PROBLEMS' : PROBLEMS}
	address = 'uri_crawler/index.html'
	return render(request, address, {})

def search_user(request):
	username = request.POST.get("username")
	print(username)
	POSSIBLE_USERS = craw_users(username, 10)
	context = {'possible_users' : POSSIBLE_USERS, 'msg' : "MERDA"}
	#context = {'msg' : "MERDA", 'num_pages': POSSIBLE_USERS} 
	address = 'uri_crawler/users.html'
	return render(request, address, context)