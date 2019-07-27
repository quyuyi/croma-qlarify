#!/usr/bin/env python

import os
from flask import Flask, render_template, jsonify
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

from helper import *
app = Flask(__name__)
# model=glove_model() #slow and unchanged should load only once

@app.route("/")
def index():
    return render_template('index.html')



@app.route('/api/', methods=["GET"])
def suggest_rules():
    data = []

    
    # Retrieve data from database
    corpus=retrieve_data(
        # fetch_num=100
    )

    # process data
    processed_corpus=preprocess_using_spacy(corpus)
    
    dictionary=create_dictionary(processed_corpus)
    corpus_tfidf=create_tfidf_model(dictionary,processed_corpus)

    # Convert data to word embedding 

    # Select top keywords (1. frequency 2. LDA)
    methods = ['semantic modeling','topic modeling']
    method=methods[0]
    if (method==methods[0]):
        model=glove_model()
    else:
        model=None
    keywords=select_top_keywords(dictionary,corpus_tfidf,method,model=model,num_topics=5,num_terms=20)

    # Match documents by keywords
    for terms in keywords:
        doc_list=keywords_to_doc_list(terms,dictionary,corpus_tfidf,sub_indices='default',threshold=0)
        doc=keywords_to_docs(corpus,doc_list)[:5]
        item={
            'words':terms,
            'documents':doc,
            'indices':indices
        }
        data.append(item)        

    write_to_txt(data,filename='result.txt')

    return data
    # return jsonify(**data)


# TODO
# is it necessary to store processed corpus into database
# what makes this slow? loading from database or preprocessing?
# Retrieve data from database
# TODO
# input: a list of document ids to retrieve
def retrieve_data(fetch_num='default'): # fetch a small part of the dataset for test
    client = MongoClient('mongodb://user1:user111@ds351987.mlab.com:51987/heroku_vbl2phnb')
    db = client.heroku_vbl2phnb  # use a database called heroku_vbl2phnb
    collection = db.news   # and inside that DB, a collection called news

    if (fetch_num=='default'):
        fetch_num=7600 # collection.count()=7600

    cursor=collection.find()
    news=[]
    for item in cursor:
        content=item['content']
        news.append(content)
    return news


# TODO 
# not used?
# Convert text to word embedding 
# input: data in text
# output: data in vectors
def keyword_to_embedding(keyword,model):
    try:
        word_embedding=model[word]
    except KeyError:
        print('%s not in vocabulary' % word)
        word_embedding=0
    return word_embedding



# TODO
# load glove model is slow but we only need to load once
# when and where to load?

# Select top keywords (1. frequency 2. LDA)
# input: documents
# output: keywords
def select_top_keywords(dictionary,corpus_tfidf,method,model=None,num_topics=5,num_terms=20):
    if (method=='topic modeling'):
        keywords=keywords_by_lda(corpus_tfidf,dictionary,num_topics,num_terms)
    elif (method=='semantic modeling'):
        # model=glove_model()
        keywords=keywords_by_frequency(model,dictionary,num_topics,num_terms)
    else:
        print("Choose method from {'semantic modeling','topic modeling'}")
    return keywords

        

# sub_indices is the list of indices of the sub part of the corpus to work with
# relative_indices is the result list of indices of the top docs (relative indices based on the sub corpus)
def keywords_to_doc_list(terms,dictionary,corpus_tfidf,sub_indices='default',threshold=0):
    if (sub_indices=='default'):
        sub_indices=[i for i in range(0,7600)]
    scores=[]
    for i in range(0,len(corpus_tfidf)):
        document=corpus_tfidf[i]
        matched=0
        summation=0
        for term in terms:
            tfidf=0
            for idx,tfidf_score in document:
                if (dictionary[idx]==term):
                    matched+=1
                    tfidf=tfidf_score
                    break
            summation+=tfidf
        score=matched*summation
        scores+=[score]
    indices = (-np.array(scores)).argsort()
    relative_indices=[idx for idx in indices if scores[idx]>threshold]

    result=[sub_indices[idx] for idx in relative_indices]
    return result




# Match documents by keywords
# score = match(keywords, document) x tf-idf, or x tf-idf^2
# set a threshold, e.g. 0
# input: keywords(a set of similar keywords), X is feature matrix
# output: documents
def keywords_to_docs(corpus,doc_list):
    top_docs=[]
    for idx in doc_list:
        top_docs+=[corpus[idx]]
    return top_docs



'''
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
'''



def round(corpus,processed_corpus,document_list,method,model=None):
    data = []
    
    sub_processed_corpus=[processed_corpus[idx] for idx in document_list]

    dictionary=create_dictionary(sub_processed_corpus)
    corpus_tfidf=create_tfidf_model(dictionary,sub_processed_corpus)
    
    keywords=select_top_keywords(dictionary,corpus_tfidf,method,model)

    all_indices=[]
    # Match documents by keywords
    for terms in keywords:
        indices=keywords_to_doc_list(terms,dictionary,corpus_tfidf,document_list,threshold=0)
        top_doc=keywords_to_docs(corpus,indices)[:5]

        item={
            'words':terms,
            'documents':top_doc,
            'indices':indices
        }
        data.append(item)
        all_indices.append(indices)        

    write_to_txt(data,filename='iterative_frequency.txt')

    return all_indices


def iterative_decompose():
    method='semantic modeling'
    if (method=='semantic modeling'):
        model=glove_model()
    else:
        model=None

    corpus=retrieve_data()
    processed_corpus=preprocess_using_spacy(corpus)

    # round1
    round1_document_list=[i for i in range(0,7600)]
    round1_matched_list=round(corpus,processed_corpus,round1_document_list,method,model=model)
        
    # round2
    round2_matched_list_on_topic0=round(corpus,processed_corpus,round1_matched_list[0],method,model=model)
    round2_matched_list_on_topic1=round(corpus,processed_corpus,round1_matched_list[1],method,model=model)
    round2_matched_list_on_topic2=round(corpus,processed_corpus,round1_matched_list[2],method,model=model)
    round2_matched_list_on_topic3=round(corpus,processed_corpus,round1_matched_list[3],method,model=model)
    round2_matched_list_on_topic4=round(corpus,processed_corpus,round1_matched_list[4],method,model=model)

    # round3
    round3_matched_list_on_topic0=round(corpus,processed_corpus,round2_matched_list_on_topic0[0],method,model=model)