import logging
import os
from datetime import datetime
from urllib.parse import urljoin

import lxml.html
import pandas as pd
import requests
from bs4 import BeautifulSoup

from py_sec_edgar.settings import CONFIG
from py_sec_edgar.utilities import read_xml_feedparser, flattenDict


#######################
# MONTHLY FILINGS FEEDS (XBRL)
# http://www.sec.gov/Archives/edgar/monthly/
# "./xbrlrss-{YEAR}-{MONTH}.xml"


def generate_monthly_index_url_and_filepaths(day):
    basename = "xbrlrss-" + str(day.year) + "-" + str(day.month).zfill(2)
    monthly_local_filepath = os.path.join(CONFIG.SEC_MONTHLY_DIR, basename + ".xml")
    monthly_url = urljoin(CONFIG.edgar_monthly_index, basename + ".xml")
    return monthly_url, monthly_local_filepath


def download_and_flatten_monthly_xbrl_filings_list():
    http_headers = {"User-Agent": CONFIG.USER_AGENT}
    r = requests.get(CONFIG.edgar_monthly_index, headers=http_headers)

    html = lxml.html.fromstring(r.text)
    html.make_links_absolute(CONFIG.edgar_monthly_index)
    html = lxml.html.tostring(html)
    soup = BeautifulSoup(html, "lxml")
    urls = []
    [urls.append(link["href"]) for link in soup.find_all("a", href=True)]
    urls = [i for i in urls if "xml" in i]
    urls.sort(reverse=True)

    logging.info(
        "\n\n\n\nDownloading Edgar Monthly XML Files to:\t" + CONFIG.SEC_MONTHLY_DIR
    )

    df = pd.DataFrame(urls, columns=["URLS"])

    df.to_excel(
        os.path.join(CONFIG.DATA_DIR, "sec_gov_archives_edgar_monthly_xbrl_urls.xlsx")
    )

    for url in urls:
        filename = url.split("/")[-1:][0]

        fullfilepath = os.path.join(CONFIG.SEC_MONTHLY_DIR, filename)

        OUTPUT_FILENAME = os.path.join(
            os.path.dirname(fullfilepath),
            os.path.basename(fullfilepath.replace(".xml", ".xlsx")),
        )

        try:

            if (
                not os.path.isfile(os.path.join(CONFIG.SEC_MONTHLY_DIR, filename))
                or url == urls[0]
            ):
                logging.info("\n\n\n\nDownloading " + fullfilepath)

                r = requests.get(url, headers=http_headers)

                with open(fullfilepath, "wb") as f:
                    for chunk in r.iter_content(chunk_size=1024):
                        if chunk:  # filter out keep-alive new chunks
                            f.write(chunk)

                # g.get(url, fullfilepath)
            else:
                logging.info("\n\n\n\nFound XML File " + fullfilepath)

            if not os.path.isfile(OUTPUT_FILENAME):
                logging.info("\n\n\n\nParsing XML File and Exporting to XLSX")

                feeds = read_xml_feedparser(fullfilepath)

                list_ = []

                # item = feeds.entries[0]
                for item in feeds.entries:

                    feed_dict = flattenDict(item)
                    df_ = pd.DataFrame.from_dict(feed_dict, orient="index")
                    df_.columns = ["VALUES"]
                    df_.index = [
                        ind.replace(".", "_").replace(":", "_").upper()
                        for ind in df_.index.tolist()
                    ]
                    df_ = df_.T

                    match = (
                        df_["EDGAR_XBRLFILE_FILE"]
                        .str.replace("-.+", "")
                        .str.upper()
                        .tolist()[0]
                    )

                    if "." in match or len(match) > 13:
                        df_["TICKER"] = "--"
                    else:
                        df_["TICKER"] = match

                    list_.append(df_)

                df = pd.concat(list_)
                new_columns_names = [
                    column_name.replace(".", "_").replace(":", "_").lower()
                    for column_name in df.columns.tolist()
                ]
                df.columns = new_columns_names
                df["SOURCE_FILENAME"] = os.path.basename(fullfilepath)
                df["SOURCE_IMPORT_TIMESTAMP"] = datetime.now()
                df.index = [icount for icount in range(0, len(df.index.tolist()))]
                df.index.name = "_id"
                logging.info("\n\n\n\nexporting to excel {}".format(OUTPUT_FILENAME))
                df.to_excel(OUTPUT_FILENAME)
                logging.info("\n\n\n\n")
                logging.info("\n\n\n\n")
        except:
            logging.info("Something Wrong")
