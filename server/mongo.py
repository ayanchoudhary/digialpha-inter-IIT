from pymongo import MongoClient

client = MongoClient('mongodb://admin:PASSWORD@20.102.85.148:27017/')
db = client.da_new
