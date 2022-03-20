import os
import pandas as pd
import random

if __name__ == "__main__":
    
    
    quarter_data=[]
    quarter=[]
    initial_data=[]
    difference_data=[]
    year_data=[]
    base_path = os.path.join(os.getcwd(), "sec-edgar-filings")
    companies = []
    filing_types = []
    filings = []
    paths = []
    company_year=[]
    for company in os.listdir(base_path):
        comp_dir = os.path.join(base_path, company)
        initial_data.append(random.randint(150,300))
        difference_data.append(random.randint(-30,30))
        for i in range(1997,2022):
            year_data.append(i)
            k=0
            for j in range(4):
                initial_data[k]=initial_data[k]+random.choice(difference_data)
                quarter_data.append(initial_data)
        k=k+1
