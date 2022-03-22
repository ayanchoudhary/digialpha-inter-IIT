from bson.objectid import ObjectId
from models import *
from mongo import db


"""Generates a sorted array of all quarter date points available on the dataset

Args:
    start_date (str): starting quarter to fetch data points from
    end_date (str): ending quarter till which we need to fetch data points
        (default is None)

Returns:
    list: a list of object representing Date objects
"""
def get_filing_dates(start_date, end_date=None):
    # Sort all filing dates in order
    all_filings = list(db.dates.find())
    all_filings.sort(key = lambda x: (x['year'], x['quarter']))

    # Get index of date from which filings need to be fetched
    start_date_obj = db.dates.find_one({"quarter": start_date.quarter, "year": start_date.year})
    if not start_date_obj:
        return all_filings
    start_index = [str(i["_id"]) for i in all_filings].index(str(start_date_obj["_id"]))

    if not end_date:
        return all_filings[start_index:]

    # Get index of date till which filings need to be fetched
    end_date_obj = db.dates.find_one({"quarter": end_date.quarter, "year": end_date.year})
    end_index = [str(i["_id"]) for i in all_filings].index(str(end_date_obj["_id"]))

    return all_filings[start_index:end_index]


"""Returns various key Saas metric points for the given company and date point

Args:
    company_id (str): id of company to fetch data for
    filing_date (Date): the respective quarter for which we retrive the data point

Returns:
    list: a list of object representing Acquisition objects
    list: a list of object representing Engagement objects
    list: a list of object representing Revenue objects
    list: a list of object representing UnitEcon objects
    list: a list of object representing SaasGoals objects
"""
def get_company_details(company_id, filing_date):
    # fetch filing quarter details and convert to Date object
    filing_date_db_obj = db.dates.find_one({"_id": ObjectId(filing_date)})
    current_filing_date_obj = Date(quarter=filing_date_db_obj["quarter"], year=(filing_date_db_obj["year"]))

    # initialize zero states to return in case database entry does not exist
    acquisition_obj = Acquistion.zeroAcquisition(date=current_filing_date_obj)
    engagement_obj = Engagement.zeroEngagement(date=current_filing_date_obj)
    revenue_obj = Revenue.zeroRevenue(date=current_filing_date_obj)
    unitEcon_obj = UnitEcon.zeroUnitEcon(date=current_filing_date_obj)
    saasGoals_obj = SaaSGoals.negativeSaasGoals(date=current_filing_date_obj)

    # fetch acquistion data points for given quarter
    acquisition = db.acquisitions.find_one({"company_id": (company_id), "filingDate": (filing_date)})
    if acquisition:
        acquisition_obj = Acquistion(
            leads=acquisition["leads"],
            accounts=acquisition["accounts"],
            conversion=acquisition["conversion"],
            salesCycle=acquisition["salesCycle"],
            cac=acquisition["cac"],
            date=current_filing_date_obj
        )

    # fetch engagement data points for given quarter
    engagement = db.engagements.find_one({"company_id": company_id, "filingDate": (filing_date)})
    if engagement:
        engagement_obj = Engagement(
            users=engagement["users"],
            penetration=engagement["penetration"],
            nps=engagement["nps"],
            date=current_filing_date_obj
        )

    # fetch revenue data points for given quarter
    revenue = db.revenues.find_one({"company_id": company_id, "filingDate": (filing_date)})
    if revenue:
        revenue_obj = Revenue(
            rr=revenue["rr"],
            growth=revenue["growth"],
            arpa=revenue["arpa"],
            acv=revenue["acv"],
            churnRate=revenue["churnRate"],
            date=current_filing_date_obj
        )

    # fetch unit_econ data points for given quarter
    unitEcon = db.unit_econs.find_one({"company_id": company_id, "filingDate": (filing_date)})
    if unitEcon:
        unitEcon_obj = UnitEcon(
            ltv=unitEcon["ltv"],
            payback=unitEcon["payback"],
            ltvRatio=unitEcon["ltvRatio"],
            date=current_filing_date_obj
        )

    # fetch saasgoal data points for given quarter
    # saasGoals_obj = computeSaasGoals()
    return acquisition_obj, engagement_obj, revenue_obj, unitEcon_obj, saasGoals_obj


"""Fetches company details for returning as a csv

Args:
    company_id (str): id of company to fetch data for

Returns:
    list: a list of company details for that quarter
"""
def get_company_csv_data(company_id):
    company = db.companies.find_one({"_id": ObjectId(company_id)})
    # Get the first instance of filing available and then get the filing details for all quarters after this
    filing_date = db.dates.find_one({"_id": ObjectId(company["filingStart"])})
    filing_date_obj = Date(quarter=filing_date["quarter"], year=filing_date["year"])

    filings_dates = get_filing_dates(filing_date_obj)
    company_data = []
    for date in filings_dates:
        acquisition_obj, engagement_obj, revenue_obj, unitEcon_obj, _ = get_company_details(company_id, str(date["_id"]))

        company_data.append([
            company["name"],
            date["year"],
            date["quarter"], 
            company['cik'], 
            company['symbol'], 
            acquisition_obj.leads, 
            acquisition_obj.accounts, 
            acquisition_obj.conversion, 
            acquisition_obj.salesCycle, 
            acquisition_obj.cac, 
            engagement_obj.users, 
            engagement_obj.penetration, 
            engagement_obj.nps,  
            revenue_obj.rr, 
            revenue_obj.growth, 
            revenue_obj.arpa, 
            revenue_obj.acv, 
            revenue_obj.churnRate,  
            unitEcon_obj.ltv, 
            unitEcon_obj.payback, 
            unitEcon_obj.ltvRatio
        ])

    return company_data