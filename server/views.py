from ariadne import QueryType
from bson.objectid import ObjectId
from models import Date, Company
from mongo import db
from utils import *

query = QueryType()

"""Returns company details for a given company and date range

Args:
    name (str): name of company to fetch data for
    cik (str): cik of company to fetch data for
    sic (str): sic of company to fetch data for
    symbol (str): symbol of company to fetch data for
    startDate (str): the starting date to fetch data points from
    endDate (str): the ending date to fetch data points till

Returns:
    Company: a company object containing metadata and set of required datapoints
"""
@query.field("company")
def resolve_company(_, info, name=None, cik=None, sic=None, symbol=None, startDate=None, endDate=None):
    # Fetch company and return its unique id
    if name:
        company = db.companies.find_one({"name": (name)})
    elif cik:
        company = db.companies.find_one({"cik": (cik)})
    elif sic:
        company = db.companies.find_one({"sic": (sic)})
    elif symbol:
        company = db.companies.find_one({"symbol": (symbol)})
    else:
        company = db.companies.find_one({})
    company_id = str(company["_id"])

    # Get the first instance of filing available and then get the filing details for all quarters after this
    filing_date = db.dates.find_one({"_id": ObjectId(company["filingStart"])})
    filing_date_obj = Date(quarter=filing_date["quarter"], year=filing_date["year"])
    start_date_obj = filing_date_obj

    if startDate:
        date_split = startDate.split('-')
        start_date_obj = Date(quarter=date_split[0], year=int(date_split[1]))

    if endDate:
        date_split = endDate.split('-')
        end_date_obj = Date(quarter=date_split[0], year=int(date_split[1]))
        filings_dates = get_filing_dates(start_date_obj, end_date_obj)
    else:
        filings_dates = get_filing_dates(start_date_obj)

    acqusitions, engagements, revenues, unitEcons, saasGoals = [], [], [], [], []
    # fetch required data points for all required dates
    for date in filings_dates:
        acquisition_obj, engagement_obj, revenue_obj, unitEcon_obj, saasGoals_obj = get_company_details(company_id, str(date["_id"]))
        acqusitions.append(acquisition_obj)
        engagements.append(engagement_obj)
        revenues.append(revenue_obj)
        unitEcons.append(unitEcon_obj)
        saasGoals.append(saasGoals_obj)

    # return the required company object
    company_obj = Company(
        name=company["name"],
        id=str(company["_id"]),
        cik=company["cik"],
        sic=company["sic"],
        symbol=company["symbol"],
        date=filing_date_obj,
        acquisition=acqusitions,
        engagement=engagements,
        revenue=revenues,
        unitEcon=unitEcons,
        saasGoals=saasGoals
    )
    return company_obj
