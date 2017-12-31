# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.

#https://stackoverflow.com/questions/6521409/validating-a-list-of-values-in-django
def category_validation(value):
    """
    Validating if the category is one listed below
    """
    if value not in ["Beginner", "Ad-Hoc", "Strings", "Structures", "Mathematics", "Paradigms", "Graphs", "Geometry", "SQL"]:
        raise ValidationError("Invalid 'to' value.")

class Problem(models.Model):
    public_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200, validators=[category_validation])
    solved_times = models.IntegerField()
    level = models.IntegerField()

class User(models.Model):
	public_id = models.IntegerField(unique=True)
	name = models.CharField(max_length=200)
	rank_position = models.IntegerField()
	#university = models.CharField(max_length=100)
	solved = models.IntegerField()
	tried = models.IntegerField()
	submissions = models.IntegerField()

#class University(models.Model):
#    question = models.ForeignKey(Question, on_delete=models.CASCADE)
#    choice_text = models.CharField(max_length=200)
#    votes = models.IntegerField(default=0)