from flask import Flask, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
from ariadne import graphql_sync, make_executable_schema, gql, load_schema_from_path
from ariadne.constants import PLAYGROUND_HTML
from models import *
import os
from mongo import db
from bson.objectid import ObjectId
import io
import csv

type_defs = gql(load_schema_from_path("./schema.graphql"))
schema = make_executable_schema(type_defs, query)

static_dir = os.path.join('client', 'build')

app = Flask(__name__,
    root_path=os.path.abspath(".."),
    static_folder=static_dir,
    static_url_path='')

cors = CORS(app, resources={r"/graphql": {"origins": "*"}})

def get_company_csv_data(company_id):
    company = db.companies.find_one({"_id": ObjectId(company_id)})
    # Get the first instance of filing available and then get the filing details for all quarters after this
    filing_date = db.dates.find_one({"_id": ObjectId(company["filingStart"])})
    filing_date_obj = Date(quarter=filing_date["quarter"], year=filing_date["year"])

    filings_dates = get_filing_dates(filing_date_obj)

    acqusitions, engagements, revenues, unitEcons, saasGoals = [], [], [], [], []
    company_data = []
    for date in filings_dates:
        acquisition_obj, engagement_obj, revenue_obj, unitEcon_obj, saasGoals_obj = get_company_details(company_id, str(date["_id"]))

        company_data.append([company["name"], date["year"], date["quarter"], company['cik'], company['sic'], company['symbol'], acquisition_obj.leads, acquisition_obj.accounts, acquisition_obj.conversion, acquisition_obj.salesCycle, acquisition_obj.cac, engagement_obj.users, engagement_obj.penetration, engagement_obj.nps,  revenue_obj.rr, revenue_obj.growth, revenue_obj.arpa, revenue_obj.acv, revenue_obj.churnRate, revenue_obj.accountDist, unitEcon_obj.ltv, unitEcon_obj.payback, unitEcon_obj.ltvRatio, saasGoals_obj.growth, saasGoals_obj.profitability, saasGoals_obj.maturity, saasGoals_obj.retention])

    return company_data

@app.route('/')
def root():
    return send_from_directory(static_dir, "index.html")


@app.route("/graphql", methods=["GET"])
def graphql_playgroud():
    """Serve GraphiQL playground"""
    return PLAYGROUND_HTML, 200


@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()

    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug)

    status_code = 200 if success else 400
    return jsonify(result), status_code

@app.route("/download/company-parameters", methods=["GET"])
def download_company_paramas():
    """Download company params"""
    args = request.args
    company_id = args.get('company_id', None)
    si = io.StringIO()
    cw = csv.writer(si)
    csv_header = ['company_name','year', 'quarter', 'cik', 'sic', 'symbol', 'leads', 'accounts', 'conversion', 'salesCycle', 'cac', 'users', 'penetration', 'nps', 'rr', 'growth', 'arpa', 'acv', 'churnRate', 'accountDist', 'ltv', 'payback', 'ltvRatio', 'growth', 'profitability', 'maturity', 'retention']
    company_data = get_company_csv_data(company_id)
    cw.writerow(csv_header)
    for row in company_data:
        cw.writerow(row)

    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=company_data.csv"
    output.headers["Content-type"] = "text/csv"
    return output
    
if __name__ == '__main__':
    app.run(debug=True)