# Import the required libraries

import os
import re
import pandas as pd

import nltk
nltk.download('punkt')
from nltk.tokenize import sent_tokenize
from collections import Counter
from tqdm.auto import tqdm

from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline

def get_file_paths():
    """
    Gets the list of paths of all the filings required
    """

    file_paths = []
    # set the base path for the data
    base_path = os.path.join('data', 'sec-edgar-filings')

    for company in os.listdir(base_path):
        comp_dir = os.path.join(base_path, company)
        for filing in os.listdir(comp_dir):
            filing_dir = os.path.join(comp_dir, filing)
            for text in os.listdir(filing_dir):
                file_path = os.path.join(filing_dir, text, 'full-submission.txt')
                file_paths.append(file_path)

    return file_paths

def clean_filing(input_filename, filing_type, output_filename):
    """
    Cleans a 8-K, 10-K or 10-Q filing. All arguments take strings as input
    input_filename: name of the file to be cleaned
    filing_type: either 8-K or 10-K or 10-Q
    output_filename: name of output file
    """
    
    # open file and get rid of all lines 
    with open (input_filename, 'r') as f:
        data = f.read().replace('\n', ' ')
    
    # get text in between the appropriate 10-K tags
    search_tag = re.search("(?s)(?m)<TYPE>{}.*?(</TEXT>)".format(filing_type), data)
    try:
        data_processed = search_tag.group(0)
    
        # delete formatting text used to identify the section as its not relevant
        data_processed = re.sub(pattern="((?i)<TYPE>).*?(?=<)", repl='', string=data_processed)

        # Five more formatting tags are deleted
        data_processed = re.sub(pattern="((?i)<SEQUENCE>).*?(?=<)", repl='', string=data_processed)
        data_processed = re.sub(pattern="((?i)<FILENAME>).*?(?=<)", repl='', string=data_processed)
        data_processed = re.sub(pattern="((?i)<DESCRIPTION>).*?(?=<)", repl='', string=data_processed)
        data_processed = re.sub(pattern="(?s)(?i)<head>.*?</head>", repl='', string=data_processed)
        data_processed = re.sub(pattern="(?s)(?i)<(table).*?(</table>)", repl='', string=data_processed)

        # Tags each section of the financial statement with prefix '°Item' for future analysis
        data_processed = re.sub(pattern="(?s)(?i)(?m)> +Item|>Item|^Item", repl=">Â°Item", string=data_processed, count=0)

        # Removes all HTML tags
        data_processed = re.sub(pattern="(?s)<.*?>", repl=" ", string=data_processed, count=0)

        # Replaces all Unicode strings
        data_processed = re.sub(pattern="&(.{2,6});", repl=" ", string=data_processed, count=0)

        # Replaces multiple spaces with a single space
        data_processed = re.sub(pattern="\s+", repl=" ", string=data_processed, count=0)

        # Remove multiple continuous underscores
        data_processed = re.compile(r'_{1,}\s*').sub('', data_processed)

        with open(output_filename, 'w+') as output:
            output.write(data_processed)
            
    except BaseException as e:
        print('{} could not be cleaned. Exception: {}'.format(input_filename, e))
        pass

def clean_all_files():
    """
    Cleans all 8-K or 10-K or 10-Q filings for the selected companies
    """

    cleaned_paths = []
    file_paths = get_file_paths()

    for input_file in file_paths:
        file_path = os.path.normpath(input_file)
        parts = file_path.split(os.sep)
        # get the filing type
        if parts[3] == '10-K': 
            filing_type = '10-K'
        elif parts[3] == '10-Q': 
            filing_type = '10-Q'
        else:
            filing_type = '8-K'
        # change the file name to denote the cleaned one
        output_file = input_file[:-19] + "cleaned_submission.txt"
        if os.path.exists(output_file):
            os.remove(output_file)
        clean_filing(input_file, filing_type, output_file)
        cleaned_paths.append(output_file)
    return cleaned_paths

def get_sentiment(txt_path, generator):
    """
    Gets the sentiment for the given filing using the FinBERT model. 
    All arguments take strings as input
    txt_path: path of the file whose sentiment is to be determined
    generator: the generator object used for the model pipeline
    """

    with open(txt_path, "r") as f:
        # tokenize individual sentences so as to fit the pretrained model params
        sentences = sent_tokenize(f.read())
        sentences = [sentence for sentence in sentences if len(sentence) < 512]
        outputs = generator(sentences)
    sa_dict = dict(Counter(out['label'] for out in outputs))
    if sa_dict['negative'] > sa_dict['positive']:
        return "negative"
    elif sa_dict['positive'] > sa_dict['negative']:
        return "positive"
    else:
        return "neutral"

def get_all_sentiments(paths, generator):
    """
    Gets the sentiment for all the files. All arguments take strings as input
    paths: paths of the files whose sentiment are to be determined
    generator: the generator object used for the model pipeline
    """

    sentiments = []
    for path in tqdm(paths):
        sentiment = get_sentiment(path, generator)
        sentiments.append(sentiment)
    return sentiments

def create_df(generator):
    """
    Creates a dataframe consisting of the filings and their sentiments. 
    All arguments take strings as input
    generator: the generator object used for the model pipeline
    """

    cleaned_paths = clean_all_files()
    sentiments = get_all_sentiments(cleaned_paths, generator)
    companies = []
    filing_types = []
    filings = []
    for doc_file in cleaned_paths:
        file_path = os.path.normpath(doc_file)
        parts = file_path.split(os.sep)
        companies.append(parts[2])
        filing_types.append(parts[3])
        filings.append(parts[4])
    main_data = {'Company': companies,
                 'Filing Type': filing_types,
                 'Filing': filings,
                 'Sentiment': sentiments}
    main_df = pd.DataFrame(main_data)
    main_df.to_csv('sentiments.csv', index=False)

if __name__ == "__main__":

    # Load the pretrained tokenizer and model into a pipeline
    tokenizer = AutoTokenizer.from_pretrained("ProsusAI/finbert")
    model = AutoModelForSequenceClassification.from_pretrained("ProsusAI/finbert")
    generator = pipeline(task="sentiment-analysis", model=model, tokenizer=tokenizer)

    create_df(generator)

