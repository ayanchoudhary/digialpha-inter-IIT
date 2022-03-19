#!/usr/bin/env python
# coding: utf-8

# In[1]:


import os
import scandir
from bs4 import BeautifulSoup
import re


# In[2]:


folder = r"C:\Users\divyansh\Downloads\SEC\sec-edgar-filings"
file_list = []
file_name = []
for paths, dirs, files in scandir.walk(folder):
    for file in files:
        if file.endswith(".txt"):
            file_name.append(file_name)
            file_list.append(os.path.join(paths, file))


# In[3]:


def read_txt(file_name):
    global txt_file,str_txt
    txt_file = open(file_name, "r",encoding='UTF-8')
    str_txt = txt_file.read()
    return str_txt


# In[5]:


# doc_start_pattern = re.compile(r'<DOCUMENT>')
# doc_end_pattern = re.compile(r'</DOCUMENT>')
# # Regex to find <TYPE> tag prceeding any characters, terminating at new line
# doc_type = re.compile(r'<TYPE>[^\n]+')


# In[4]:


path = r"C:\Users\divyansh\OneDrive\Documents\SEC FILINGS\sec_ed"


# In[10]:


for id, file in enumerate(file_list):
        soup = BeautifulSoup(read_txt(file), "html.parser")
        parsed_file = soup.get_text()
        nw_path = path +  str(id) + "_op.txt"
        print(nw_path)
        ff = open(nw_path, "x",encoding='UTF-8', errors="surrogateescape")
        ff.write(parsed_file)
        ff.close()


# In[ ]:




