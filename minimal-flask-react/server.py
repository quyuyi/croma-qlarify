#!/usr/bin/env python

import os
from flask import Flask, render_template, jsonify
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

@app.route('/api/', methods=["GET"])
def suggest_rules():
    data = {
        "keywords": "aaa"
    }

    # Retrieve data from database
    # Convert data to word embedding 
    # Select top keywords (1. frequency 2. LDA)
    # Match documents by keywords


    return jsonify(**data)


# TODO
# Retrieve data from database
def retrieve_data():
    raise NotImplementedError

# TODO
# Convert text to word embedding 
# input: data in text
# output: data in vectors
def keyword_to_embedding():
    raise NotImplementedError

# TODO
# Select top keywords (1. frequency 2. LDA)
# input: documents
# output: keywords
def select_top_keywords():
    # Select top k frequent keywords
    # For each keyword
    # Find top k similar keywords
    raise NotImplementedError

# TODO
# Match documents by keywords
# score = match(keywords, document) x tf-idf, or x tf-idf^2
# set a threshold, e.g. 0
# input: keywords
# output: documents
def keywords_to_docs():
    raise NotImplementedError




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
