# -*- coding: utf-8 -*-
"""
Created on Fri Nov  3 13:40:06 2017

@author: lucas
"""
from config import *
from utils import *

from urllib2 import urlopen
from bs4 import BeautifulSoup
import re

def get_num_pages(problems_module_address=PROBLEMS_MODULE_ADDRESS):
    html = urlopen(problems_module_address)
    bsObj = BeautifulSoup(html)#, 'lxml'

    num_pages_text = bsObj.find("div", {"id" : "table-info"}).text

    try:
        num_pages = int(re.search('[0-9]+$', num_pages_text).group(0))
    except AttributeError:
        num_pages = 1

    return num_pages

def craw_problems():
    PROBLEMS = []
    print("craw_problems()")
    num_pages = get_num_pages();
    for i in range(1,num_pages+1):
        print("Checking page: " + str(i) + ".. of " + str(num_pages))
        page_idx_address = PROBLEMS_MODULE_ADDRESS + "?page=" + str(i)
        html = urlopen(page_idx_address)
        bsObj = BeautifulSoup(html)#, 'lxml'
        prob_table_data = bsObj.find("table").tbody.findAll("tr")
        
        for prob in prob_table_data:
            identifier = prob.findAll("td")[0].a.text.strip()
            name = prob.findAll("td")[2].a.text
            category_text = prob.findAll("td")[3].a.text
            solved_by_x_users = re.sub('\.', '', prob.findAll("td")[4].text.strip())
            level = prob.findAll("td")[5].text.strip()
            
            categories = ["Iniciante", "Ad-Hoc", "Strings", "Estruturas e Bibliotecas", "Matemática", "Paradigmas", "Grafos", "Geometria Computacional", "SQL"]

            try:
                category = categories.index(category_text) + 1
            except ValueError:
                category = 10

            #print(identifier + "\t" + name + "\t" + category_text + "\t" + solved_by_x_users + "\t" + level +  "\n")
            category = str(category)

            PROBLEMS.append({
                "id":identifier,
                "name": name,
                "category":category,
                "solved":solved_by_x_users,
                "level":level
                })

    return PROBLEMS