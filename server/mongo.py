from pymongo import MongoClient

# Create a new connection object and initialize with the required database
client = MongoClient('mongodb://admin:PASSWORD@20.102.85.148:27017/')
db = client.da_new
