from ariadne import QueryType, MutationType
from mongo import db
from uuid import uuid4
import enum
from bson.objectid import ObjectId

query = QueryType()

# Sample query
@query.field("hello")
def resolve_hello(_, info):
    return "Hi there"

# Sample Class
orders = []

class Acquistion:
    def __init__(self, leads, accounts, conversion, salesCycle, cac):
        self.leads = leads
        self.accounts = accounts
        self.conversion = conversion
        self.salesCycle = salesCycle
        self.cac = cac

class Engagement:
    def __init__(self, users, penetration, nps):
        self.users = users
        self.penetration = penetration
        self.nps = nps

class Revenue:
    def __init__(self, rr, growth, arpa, acv, churnRate, accountDist):
        self.rr = rr
        self.growth = growth
        self.arpa = arpa
        self.acv = acv
        self.churnRate = churnRate
        self.accountDist = accountDist

class UnitEcon:
    def __init__(self, ltv, payback, ltvRatio):
        self.ltv = ltv
        self.payback = payback
        self.ltvRatio = ltvRatio

class Quater:
    def __init__(self, q1, q2, q3, q4):
        self.q1 = q1
        self.q2 = q2
        self.q3 = q3
        self.q4 = q4

class Date:
    def __init__(self, quarter, year):
        self.quarter = quarter
        self.year = year

class Company:
    def __init__(self, name, id, cik, sic, Date, acquisition, engagement, revenue, unitEcon ):
        self.name = name
        self.id = id
        self.cik = cik
        self.sic = sic
        self.filingStart = Date
        self.acquisition = acquisition
        self.engagement = engagement
        self.revenue = revenue
        self.unitEcon = unitEcon

@query.field("company")
def resolve_company(_, info):
    company_id = "62325f87fa667835d4ecfafb"
    company = db.companies.find_one({"_id": ObjectId("62325f87fa667835d4ecfafb")})
    filling_date = db.dates.find_one({"_id": ObjectId(company["filingStart"])})
    filling_date_obj = Date(quarter=filling_date["quarter"], year=filling_date["year"])
    acquisition = db.acquisitions.find_one({"company_id": (company_id)})
    acquisition_obj = Acquistion(leads=acquisition["leads"], accounts=acquisition["accounts"], conversion=acquisition["conversion"], salesCycle=acquisition["salesCycle"], cac=acquisition["cac"])
    engagement = db.engagements.find_one({"company_id": company_id})
    engagement_obj = Engagement(users=engagement["users"], penetration=engagement["penetration"], nps=engagement["nps"])
    revenue = db.revenues.find_one({"company_id": company_id})
    revenue_obj = Revenue(rr=revenue["rr"], growth=revenue["growth"], arpa=revenue["arpa"], acv=revenue["acv"], churnRate=revenue["churnRate"], accountDist=revenue["accountDist"])
    unitEcon = db.unit_econs.find_one({"company_id": company_id})
    unitEcon_obj = UnitEcon(ltv=unitEcon["ltv"], payback=unitEcon["payback"], ltvRatio=unitEcon["ltvRatio"])
    company_obj = Company(name=company["name"], id=str(company["_id"]), cik=company["cik"], sic=company["sic"], Date=filling_date_obj, acquisition=acquisition_obj, engagement=engagement_obj, revenue=revenue_obj, unitEcon=unitEcon_obj)
    
    return company_obj

# @mutation.field("orderCoffee")
# def resolve_hello(_, info, size, name, type):
#     newOrder = Coffee(size, name, type)
#     db.coffee.insert_one(newOrder)
#     orders.append(newOrder)
#     return newOrder
