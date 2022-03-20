<h1 align="center">HP_DA_T8 </h1>
<p align="center"><b>A Web Portal to analyse the company's data for various features. </b></p>

## Overview

After using the 10-Q and 10-K files submitted by various companies to the SEC, this app will get all the data  using `extract_data` model and further parsing will de done by `parsing and cleaning of data` </br>

Using the two models, the app is getting the useful data. 

where we clean and preprocess the data. Preprocessing involves first cleaning out all the improper regex patterns which is not required in the text file by using the regex compiler and then we sent each txt file to the get_sentiment function f where we first tokenize each sentence in the file and  use the FINBert model which works on a that  extracts a financial text and returns the sentiment score of the file. Based on the sentiment score, we give the sentiment as `good`,`neutral` or `bad`. The generated sentiments in a generater object which  is furthur sent to the create_df function which makes a csv dataframe of the generated sentiments

## Model
> This model takes around 100 hours to run on a 16-core machine. Run at your own risk.

A Python application used to download and parse complete submission filings from the sec.gov/edgar website.

Features
--------
* Filter by Ticker
* Filter by Form Type
* Extract contents of Complete Submission Filing

Setup Environment:
~~~~~~~~~~~~~~~~~~~~~~~~~~

   conda create -n model python=3.8 pandas numpy lxml -y
   source activate model
   sudo mkdir /sec_gov
   sudo chown -R $USER:$USER /sec_gov
   pip install -r requirements.txt

Configure Settings (Optional)
-------------------------------

    # model/extract_data/settings.py
    
Set USER_AGENT email
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # update USER_AGENT, SEC EDGAR will return an error if not set correctly.          

    USER_AGENT = "Sample Company Name AdminContact@<sample company domain>.com"

Extracting Contents from Complete Submission Filing:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    # extract all contents from txt file
    # Set this to True and everything will be extracted from Complete Submission Filing
    # Note:  There is a lot of content in these filings, so be prepared

    extract_filing_contents = False
    
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Frontend

Setup guidelines for Frontend:

```bash
   $ git clone https://github.com/hp-digialpha-8/HP_DA_T8.git
   $ cd digialpha-inter-IIT/client
   $ yarn && yarn start
```
## Backend
Setup guidelines for Backend:
> Change the mongouri in the file server/mongo.py

```bash
    $ cd digialpha-inter-IIT/server
    $ python3 -m venv myenv
    $ source myenv/bin/activate
    $ pip3 install -r requirements.txt
    $ python3 server.py
```

The website is hosted on [digialpha.ayanc.codes](digialpha.ayanc.codes). You can find the hosted solution and the explanation for the architecture on the site itself.