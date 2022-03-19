import os
import scandir
from bs4 import BeautifulSoup
import re

# Iterating over the folder of 70gb files containing the data of the articles
# extracted from project "FileExtraction" located

folder = "../SEC_Filings/"
file_list = []
file_name = []
for paths, dirs, files in scandir.walk(folder):
    for file in files:
        if file.endswith(".txt"):
            file_name.append(file_name)
            file_list.append(os.path.join(paths, file))


def read_txt(file_name):
    global txt_file, str_txt
    txt_file = open(file_name, "r", encoding="UTF-8")
    str_txt = txt_file.read()
    return str_txt


# path where you want to store your files
path = r"../Parsed_SEC_Filings/"

# parsing the html files to text files so that all the random regex expressions can be removed
for id, file in enumerate(file_list):
    soup = BeautifulSoup(read_txt(file), "html.parser")
    parsed_file = soup.get_text()
    nw_path = path + str(id) + "_op.txt"
    print(nw_path)
    ff = open(nw_path, "x", encoding="UTF-8", errors="surrogateescape")
    ff.write(parsed_file)
    ff.close()
