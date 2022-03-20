from pymongo import MongoClient

def generate_date_points(db):
    for i in range(1990, 2023):
        if i == 2013 or i == 2014 or i == 2015:
            continue
        db.dates.insert_one({ "quarter": "Q1", "year": i })
        db.dates.insert_one({ "quarter": "Q2", "year": i })
        db.dates.insert_one({ "quarter": "Q3", "year": i })
        db.dates.insert_one({ "quarter": "Q4", "year": i })

if __name__ == "__main__":
    # Create a new connection object and initialize with the required database
    client = MongoClient('mongodb://admin:PASSWORD@20.102.85.148:27017/')
    db = client.da_new

    generate_date_points(db)
