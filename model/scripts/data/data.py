from pymongo import MongoClient
import pandas as pd
import csv

# def generate_date_points(db):
#     for i in range(1990, 2023):
#         if i == 2013 or i == 2014 or i == 2015:
#             continue
#         db.dates.insert_one({ "quarter": "Q1", "year": i })
#         db.dates.insert_one({ "quarter": "Q2", "year": i })
#         db.dates.insert_one({ "quarter": "Q3", "year": i })
#         db.dates.insert_one({ "quarter": "Q4", "year": i })

def add_data_points(db):
    csv_file = pd.read_csv("data.csv", sep = ",", header = 0, index_col = False)
    json_out_list = csv_file.apply(lambda x: {
        "name": x['Company'], 
        "cik": x['cik_number'],
        "sic": x['sic'],
        "AU": x['AU'],
        "Number_of_new_accounts": x['Number_of_new_accounts'],
        "Sales Cycle": x['Sales Cycle'],
        "qualified-leads": x['qualified-leads'],
        "Percentage Conversion": x['Percentage Conversion'],
        "CAC": x['CAC'],
        "Penetration rate": x['Penetration rate'],
        "Net Promoter Score": x['Net Promoter Score'],
        "Revenue rate": x['Revenue rate'],
        "churn rate": x['churn rate'],
        "Growth revenue rate": x['Growth revenue rate'],
        "arpa": x['arpa'],
        "acv": x['acv'],
        "ltv": x['ltv'],
        "CAC Payback": x['CAC Payback'],
        "LTV/CAC": x['LTV/CAC'],
        "sentiment": x['sentiment']
    }, axis=1).to_list()
    json_result = {"companies": json_out_list}

    container = {}
    for each in json_out_list:
        if each["name"] not in container:
            container[each["name"]] = []
        container[each["name"]].append(each)
            
    all_filings = list(db.dates.find())
    all_filings.sort(key = lambda x: (x['year'], x['quarter']))

    for each in container:
        if len(container[each]) < len(all_filings):
            filing_array = all_filings[-len(container[each]):]
        else:
            filing_array = all_filings
        filing_date = filing_array[0]
        if db.companies.find_one({ "name": each }):
                db.companies.update_one({'name': each}, {'$set': {'filingStart': str(filing_date["_id"])}})

        if len(container[each]) > len(filing_array):
            continue
        for index, entry in enumerate(container[each]):
            print(each)
            company = db.companies.find_one({ "name": each });
            if company:
                if not db.acquisitions.find_one({ "filingDate": str(filing_array[index]["_id"]) }):
                    db.acquisitions.insert_one({
                        "leads": entry["qualified-leads"],
                        "accounts": entry["Number_of_new_accounts"], 
                        "conversion": entry["Percentage Conversion"],
                        "salesCycle": entry["Sales Cycle"],
                        "cac": entry["CAC"],
                        "company_id": str(company["_id"]),
                        "filingDate": str(filing_array[index]["_id"]) 
                    })

                    db.engagements.insert_one({
                        "users": entry["AU"],
                        "penetration": entry["Penetration rate"], 
                        "nps": entry["Net Promoter Score"],
                        "company_id": str(company["_id"]),
                        "filingDate": str(filing_array[index]["_id"]) 
                    })

                    db.revenues.insert_one({
                        "rr": entry["Revenue rate"],
                        "growth": entry["Growth revenue rate"], 
                        "arpa": entry["arpa"],
                        "acv": entry["acv"],
                        "churnRate": entry["churn rate"],
                        "company_id": str(company["_id"]),
                        "filingDate": str(filing_array[index]["_id"]) 
                    })

                    db.unit_econs.insert_one({
                        "ltv": entry["ltv"],
                        "payback": entry["CAC Payback"], 
                        "ltvRatio": entry["LTV/CAC"],
                        "company_id": str(company["_id"]),
                        "filingDate": str(filing_array[index]["_id"]) 
                    })
        



if __name__ == "__main__":
    # Create a new connection object and initialize with the required database
    client = MongoClient('mongodb://admin:th3_b3es7_p4ss_1_h4d@20.102.85.148:27017/')
    db = client.da_new

    # db.acquisitions.drop()
    # db.engagements.drop()
    # db.revenues.drop()
    # db.unit_econs.drop()

    add_data_points(db)

