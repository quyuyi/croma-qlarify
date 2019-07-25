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
    fetch_num=10
    corpus=retrieve_data(fetch_num)

    # Convert data to word embedding 

    # Select top keywords (1. frequency 2. LDA)
    method='topic modeling'
    # method='semantic modeling' # choose from {'semantic modeling','topic modeling'}
    keywords,docs=select_top_keywords(corpus,method)

    # Match documents by keywords
    for keyword,doc in zip(keywords,docs):
        item={
            'words':keyword,
            'documents':doc
        }
        data.append(item)

    print(data)
    # return jsonify(**data)



# Retrieve data from database
def retrieve_data(fetch_num='default'): # fetch a small part of the dataset for test
    client = MongoClient('mongodb://user1:user111@ds351987.mlab.com:51987/heroku_vbl2phnb')
    db = client.heroku_vbl2phnb  # use a database called heroku_vbl2phnb
    collection = db.news   # and inside that DB, a collection called news

    if (fetch_num=='default'):
        fetch_num=collection.count()

    news=[]
    for i in range(0,fetch_num):
        cursor=collection.find()[i]
        content=cursor['content']
        news.append(content)
    return news


# TODO not used
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



# Select top keywords (1. frequency 2. LDA)
# input: documents
# output: keywords
def select_top_keywords(corpus,method):
    if (method=='semantic modeling'):
        model=glove_model() #slow and unchanged should load only once
        vectorizer=TfidfVectorizer(stop_words='english',max_features=20000)
        X=vectorizer.fit_transform(corpus) # need to preprocess corpus?
        keywords=keywords_by_frequency(corpus,model,vectorizer,X)
        docs=[]
        for terms in keywords:
            doc=keywords_to_docs_by_frequency(terms,corpus,vectorizer,X,threshold=0)
            docs+=[doc]
        return keywords,docs

    # using LDA to create the keyword sets
    # where each set just corresponds to each topic extracted by LDA
    elif (method=='topic modeling'):
        processed_corpus=preprocess(corpus)
        dictionary=create_dictionary(processed_corpus)
        corpus_tfidf=create_tfidf_model(dictionary,processed_corpus)
        keywords=keywords_by_lda(corpus_tfidf,dictionary)
        docs=[]
        for terms in keywords:
            doc=keywords_to_docs_by_lda(terms,corpus,dictionary,corpus_tfidf,threshold=0)
            docs+=[doc]
        return keywords,docs

    else:
        print("Choose method from {'semantic modeling','topic modeling'}")

        



# TODO
# Match documents by keywords
# score = match(keywords, document) x tf-idf, or x tf-idf^2
# set a threshold, e.g. 0
# input: keywords(a set of similar keywords), X is feature matrix
# output: documents
def keywords_to_docs(terms,corpus,vectorizer_or_dict,matrix,threshold=0):
    if (method=='semantic modeling'):
        return keywords_to_docs_by_frequency(terms,corpus,vectorizer_or_dict,matrix,threshold)
    elif (method=='topic modeling'):
        return keywords_to_docs_by_lda(terms,corpus,vectorizer_or_dict,matrix,threshold)
    else:
        print("Choose method from {'semantic modeling','topic modeling'}")





if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)



