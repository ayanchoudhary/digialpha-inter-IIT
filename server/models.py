class Acquistion:
    def __init__(self, leads, accounts, conversion, salesCycle, cac, date=None):
        self.leads = leads
        self.accounts = accounts
        self.conversion = conversion
        self.salesCycle = salesCycle
        self.cac = cac
        self.filingDate = date

    def zeroAcquisition(date=None):
        return Acquistion(0,0,0,0,0,date)

class Engagement:
    def __init__(self, users, penetration, nps, date=None):
        self.users = users
        self.penetration = penetration
        self.nps = nps
        self.filingDate = date

    def zeroEngagement(date=None):
        return Engagement(0,0,0,date)

class Revenue:
    def __init__(self, rr, growth, arpa, acv, churnRate, accountDist, date=None):
        self.rr = rr
        self.growth = growth
        self.arpa = arpa
        self.acv = acv
        self.churnRate = churnRate
        self.accountDist = accountDist
        self.filingDate = date

    def zeroRevenue(date=None):
        return Revenue(0,0,0,0,0,0,date)

class UnitEcon:
    def __init__(self, ltv, payback, ltvRatio, date=None):
        self.ltv = ltv
        self.payback = payback
        self.ltvRatio = ltvRatio
        self.filingDate = date
    
    def zeroUnitEcon(date=None):
        return UnitEcon(0,0,0,date)

class SaaSGoals:
    def __init__(self, growth, profitability, maturity, retention, date=None):
        self.growth = growth
        self.profitability = profitability
        self.maturity = maturity
        self.retention = retention
        self.filingDate = date

    def negativeSaasGoals(date=None):
        return SaaSGoals(False, False, False, False,date)

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
