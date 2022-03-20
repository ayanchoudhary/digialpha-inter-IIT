from ariadne import QueryType
from bson.objectid import ObjectId
from models import Date, Company
from mongo import db
from utils import *
import re
query = QueryType()

"""Returns company details for a given company and date range

Args:
    name (str): name of company to fetch data for
    cik (str): cik of company to fetch data for
    symbol (str): symbol of company to fetch data for
    startDate (str): the starting date to fetch data points from
    endDate (str): the ending date to fetch data points till

Returns:
    Company: a company object containing metadata and set of required datapoints
"""
@query.field("company")
def resolve_company(_, info, name=None, cik=None, symbol=None, startDate=None, endDate=None):
    # Fetch company and return its unique id
    company = db.companies.find_one({"name": re.compile('^' + name + '$', re.IGNORECASE)})
    if not company:
        company = db.companies.find_one({"cik": re.compile('^' + name + '$', re.IGNORECASE)})
    if not company:
        company = db.companies.find_one({"symbol": re.compile('^' + name + '$', re.IGNORECASE)})
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
        symbol=company["symbol"],
        sentiment=company["sentiment"],
        date=filing_date_obj,
        acquisition=acqusitions,
        engagement=engagements,
        revenue=revenues,
        unitEcon=unitEcons,
        saasGoals=saasGoals
    )
    return company_obj

@query.field("searchCompany")
def resolve_search_company(_, info, search=None):
    # Fetch company and return its unique id
    print(search)
    companies_by_name = list(db.companies.find({"name": re.compile('^.*' + search + '.*', re.IGNORECASE)}).limit(20))
    companies_by_cik = list(db.companies.find({"cik": re.compile('^.*' + search + '.*', re.IGNORECASE)}).limit(20))
    companies_by_symbol = list(db.companies.find({"symbol": re.compile('^.*' + search + '.*', re.IGNORECASE)}).limit(20))
    companies = []
    for company in companies_by_name:
        companies.append(company)
    for company in companies_by_cik:
        if company not in companies:
            companies.append(company)
    for company in companies_by_symbol:
        if company not in companies:
            companies.append(company)
    companies_objs = []
    for company in companies:
        filling_date = db.dates.find_one({"_id": ObjectId(company["filingStart"])})
        filing_date_obj = Date(quarter=filling_date["quarter"], year=filling_date["year"])

        companies_objs.append(Company(
            name=company["name"] if "name" in company else None,
            id=str(company["_id"]),
            cik=company["cik"] if "cik" in company else None,
            symbol=company["symbol"] if "symbol" in company else None,
            sentiment=company["sentiment"],
            date=filing_date_obj,
            acquisition=[],
            engagement=[],
            revenue=[],
            unitEcon=[],
            saasGoals=[]
        ))
    return companies_objs