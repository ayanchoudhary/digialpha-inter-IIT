from pymongo import MongoClient
import json

def generate_sentiment_points(db):
    with open('sentiments.json') as f:
        sentiments = json.load(f)

        for key, value in sentiments.items():
            if db.companies.find_one({ "name": key }):
                print(key, value)
                db.companies.update_one({'name': key}, {'$set': {'sentiment': value}})

if __name__ == "__main__":
    # Create a new connection object and initialize with the required database
    client = MongoClient('mongodb://admin:PASSWORD@20.102.85.148:27017/')
    db = client.da_new

    generate_sentiment_points(db)