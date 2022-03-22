import random

class Acquistion:
    """
    A class to provide acquisition object

    ...

    Attributes
    ----------
    leads : int
        number of qualified leads
    accounts : int
        number of new accounts per month
    conversion : float
        Conversion at each stage %
    salesCycle : int
        length of sales cycle
    cac : int
        cutomer acqusition cost

    Methods
    -------
    zeroAcqusition(date=None)
        returns a zero data point indicating no data found
    """

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
    """
    A class to provide engagement object

    ...

    Attributes
    ----------
    users : int
        number of active users
    penetration : float
        Penetration %
    nps : float
        net promoter score

    Methods
    -------
    zeroEngagement(date=None)
        returns a zero data point indicating no data found
    """

    def __init__(self, users, penetration, nps, date=None):
        self.users = users
        self.penetration = penetration
        self.nps = nps
        self.filingDate = date

    def zeroEngagement(date=None):
        return Engagement(0,0,0,date)

class Revenue:
    """
    A class to provide revenue object

    ...

    Attributes
    ----------
    rr : int
        MRR or ARR
    growth : float
        MRR or ARR growth %
    arpa : float
        Average Revenue per Account
    churnRate: float
        Churn Rate %
    accountDist : int
        Distribution of Accounts

    Methods
    -------
    zeroRevenue(date=None)
        returns a zero data point indicating no data found
    """

    def __init__(self, rr, growth, arpa, acv, churnRate, date=None):
        self.rr = rr
        self.growth = growth
        self.arpa = arpa
        self.acv = acv
        self.churnRate = churnRate
        self.filingDate = date

    def zeroRevenue(date=None):
        return Revenue(0,0,0,0,0,date)

class UnitEcon:
    """
    A class to provide unit_econ object

    ...

    Attributes
    ----------
    ltv : int
        Lifetime Value
    payback : int
        CAC payback
    ltvRatio : float
        LTV/CAC ratio

    Methods
    -------
    zeroUnitEcon(date=None)
        returns a zero data point indicating no data found
    """

    def __init__(self, ltv, payback, ltvRatio, date=None):
        self.ltv = ltv
        self.payback = payback
        self.ltvRatio = ltvRatio
        self.filingDate = date
    
    def zeroUnitEcon(date=None):
        return UnitEcon(0,0,0,date)

class SaaSGoals:
    """
    A class to provide saas_goals object

    ...

    Attributes
    ----------
    growth : bool
        Indicates growth
    profitability : bool
        Indicates profitability
    maturity : bool
        Indicates maturity
    retention : bool
        Indicates retention

    Methods
    -------
    negativeSaasGoals(date=None)
        returns a zero data point indicating no data found
    """

    def __init__(self, growth, profitability, maturity, retention, date=None):
        self.growth = growth
        self.profitability = profitability
        self.maturity = maturity
        self.retention = retention
        self.filingDate = date

    def negativeSaasGoals(date=None):
        return SaaSGoals(bool(random.choice([0, 1])), bool(random.choice([0, 1])), bool(random.choice([0, 1])), bool(random.choice([0, 1])), date)

class Quarter:
    """
    A class to provide quarter enum

    """

    def __init__(self, q1, q2, q3, q4):
        self.q1 = q1
        self.q2 = q2
        self.q3 = q3
        self.q4 = q4

class Date:
    """
    A class to provide date object

    """

    def __init__(self, quarter, year):
        self.quarter = quarter
        self.year = int(year)

class Company:
    """
    A class to provide a company object using the data points

    """
    
    def __init__(self, name, id, cik, symbol, sentiment, date, acquisition, engagement, revenue, unitEcon, saasGoals):
        self.name = name
        self.id = id
        self.cik = cik
        self.symbol = symbol
        self.sentiment = sentiment
        self.filingStart = date
        self.acquisition = acquisition
        self.engagement = engagement
        self.revenue = revenue
        self.unitEcon = unitEcon
        self.saasGoals = saasGoals
