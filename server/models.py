from typing import Optional
from ariadne import QueryType, MutationType
from mongo import db
from uuid import uuid4
from bson.objectid import ObjectId

query = QueryType()

class Acquistion:
    def __init__(self, leads, accounts, conversion, salesCycle, cac, date=None):
        self.leads = leads
        self.accounts = accounts
        self.conversion = conversion
        self.salesCycle = salesCycle
        self.cac = cac
        self.filingDate = date

    def zeroAcquisition():
        return Acquistion(0,0,0,0,0)

class Engagement:
    def __init__(self, users, penetration, nps, date=None):
        self.users = users
        self.penetration = penetration
        self.nps = nps
        self.filingDate = date

    def zeroEngagement():
        return Engagement(0,0,0)

class Revenue:
    def __init__(self, rr, growth, arpa, acv, churnRate, accountDist, date=None):
        self.rr = rr
        self.growth = growth
        self.arpa = arpa
        self.acv = acv
        self.churnRate = churnRate
        self.accountDist = accountDist
        self.filingDate = date

    def zeroRevenue():
        return Revenue(0,0,0,0,0,0)

class UnitEcon:
    def __init__(self, ltv, payback, ltvRatio, date=None):
        self.ltv = ltv
        self.payback = payback
        self.ltvRatio = ltvRatio
        self.filingDate = date
    
    def zeroUnitEcon():
        return UnitEcon(0,0,0)

class SaaSGoals:
    def __init__(self, growth, profitability, maturity, retention, date=None):
        self.growth = growth
        self.profitability = profitability
        self.maturity = maturity
        self.retention = retention
        self.filingDate = date

    def negativeSaasGoals():
        return SaaSGoals(False, False, False, False)

class Quarter:
    def __init__(self, q1, q2, q3, q4):
        self.q1 = q1
        self.q2 = q2
        self.q3 = q3
        self.q4 = q4

class Date:
    def __init__(self, quarter, year):
        self.quarter = quarter
        self.year = int(year)

class Company:
    def __init__(self, name, id, cik, sic, symbol, date, acquisition, engagement, revenue, unitEcon, saasGoals):
        self.name = name
        self.id = id
        self.cik = cik
        self.sic = sic
        self.symbol = symbol
        self.filingStart = date
        self.acquisition = acquisition
        self.engagement = engagement
        self.revenue = revenue
        self.unitEcon = unitEcon
        self.saasGoals = saasGoals


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


def get_company_details(company_id, filing_date):
    # initialize zero states to return in case database entry does not exist
    acquisition_obj = Acquistion.zeroAcquisition()
    engagement_obj = Engagement.zeroEngagement()
    revenue_obj = Revenue.zeroRevenue()
    unitEcon_obj = UnitEcon.zeroUnitEcon()
    saasGoals_obj = SaaSGoals.negativeSaasGoals()

    acquisition = db.acquisitions.find_one({"company_id": (company_id), "filingDate": (filing_date)})
    filing_date_db_obj = db.dates.find_one({"_id": ObjectId(filing_date)})
    current_filing_date_obj = Date(quarter=filing_date_db_obj["quarter"], year=(filing_date_db_obj["year"]))
    
    if acquisition:
        acquisition_obj = Acquistion(
            leads=acquisition["leads"],
            accounts=acquisition["accounts"],
            conversion=acquisition["conversion"],
            salesCycle=acquisition["salesCycle"],
            cac=acquisition["cac"],
            date=current_filing_date_obj
        )

    engagement = db.engagements.find_one({"company_id": company_id, "filingDate": (filing_date)})
    if engagement:
        engagement_obj = Engagement(
            users=engagement["users"],
            penetration=engagement["penetration"],
            nps=engagement["nps"],
            date=current_filing_date_obj
        )

    revenue = db.revenues.find_one({"company_id": company_id, "filingDate": (filing_date)})
    if revenue:
        revenue_obj = Revenue(
            rr=revenue["rr"],
            growth=revenue["growth"],
            arpa=revenue["arpa"],
            acv=revenue["acv"],
            churnRate=revenue["churnRate"],
            accountDist=revenue["accountDist"],
            date=current_filing_date_obj
        )

    unitEcon = db.unit_econs.find_one({"company_id": company_id, "filingDate": (filing_date)})
    if unitEcon:
        unitEcon_obj = UnitEcon(
            ltv=unitEcon["ltv"],
            payback=unitEcon["payback"],
            ltvRatio=unitEcon["ltvRatio"],
            date=current_filing_date_obj
        )

    # saasGoals_obj = computeSaasGoals()
    return acquisition_obj, engagement_obj, revenue_obj, unitEcon_obj, saasGoals_obj
    

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
    for date in filings_dates:
        acquisition_obj, engagement_obj, revenue_obj, unitEcon_obj, saasGoals_obj = get_company_details(company_id, str(date["_id"]))
        acqusitions.append(acquisition_obj)
        engagements.append(engagement_obj)
        revenues.append(revenue_obj)
        unitEcons.append(unitEcon_obj)
        saasGoals.append(saasGoals_obj)

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
