# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-03 01:26
from __future__ import unicode_literals

from django.db import migrations, models
import uri_crawler.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public_id', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=200)),
                ('category', models.CharField(max_length=200, validators=[uri_crawler.models.category_validation])),
                ('solved_times', models.IntegerField()),
                ('level', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('public_id', models.IntegerField(unique=True)),
                ('name', models.CharField(max_length=200)),
                ('rank_position', models.IntegerField()),
                ('solved', models.IntegerField()),
                ('tried', models.IntegerField()),
                ('submissions', models.IntegerField()),
            ],
        ),
    ]