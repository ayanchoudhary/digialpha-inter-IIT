from flask import Flask, request, jsonify, send_from_directory, make_response
from ariadne import graphql_sync, make_executable_schema, gql, load_schema_from_path
from ariadne.constants import PLAYGROUND_HTML
from flask_cors import CORS
from views import query
from utils import *
import csv
import os
import io

# Load graphql schema and make executable for graphql query
type_defs = gql(load_schema_from_path("./schema.graphql"))
schema = make_executable_schema(type_defs, query)

static_dir = os.path.join('client', 'build')

app = Flask(__name__,
    root_path=os.path.abspath(".."),
    static_folder=static_dir,
    static_url_path='')

cors = CORS(app, resources={r"/graphql": {"origins": "*"}})

# Route to handle / on the server
@app.route('/')
def root():
    """Return welcome message"""
    return "Welcome to server", 200


# Route to provide GRAPHQL Playground
@app.route("/graphql", methods=["GET"])
def graphql_playgroud():
    """Serve GraphiQL playground"""
    return PLAYGROUND_HTML, 200


# Route to make graphql queries
@app.route("/graphql", methods=["POST"])
def graphql_server():
    """Parse query and return graphql result"""
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug)

    status_code = 200 if success else 400
    return jsonify(result), status_code


# Route to create a downloadable csv
@app.route("/download/company-parameters", methods=["GET"])
def download_company_paramas():
    """Download company params"""
    args = request.args
    company_id = args.get('company_id', None)
    si = io.StringIO()
    cw = csv.writer(si)
    csv_header = [
        'Company Name',
        'Year', 
        'Quarter', 
        'CIK', 
        'SIC', 
        'Symbol', 
        'Qualified Leads', 
        'New Accounts', 
        'Percentage Conversion', 
        'Sales Cycle Length', 
        'CAC', 
        'Active Users', 
        'Percentage penetration', 
        'NPS', 
        'RR', 
        'RR Growth Rate', 
        'ARPA', 
        'ACV', 
        'Churn Rate', 
        'Account Distribution', 
        'LTV', 
        'CAC Payback', 
        'LTV/CAC Ratio'
    ]
    company_data = get_company_csv_data(company_id)
    # Write data rows to csv
    cw.writerow(csv_header)
    for row in company_data:
        cw.writerow(row)

    # Set output response and headers to provide csv download
    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=company_data.csv"
    output.headers["Content-type"] = "text/csv"
    return output
    
if __name__ == '__main__':
    app.run()