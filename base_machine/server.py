# !/usr/bin/env python

import os
from flask import Flask, render_template, jsonify, request, send_file
import numpy as np
import pandas as pd
import json
import string
import csv
from pymongo import MongoClient
import datetime

from preprocess import *


app = Flask(__name__)
app.secret_key='some random string'


@app.route("/")
def index():
    return render_template('index.html')

@app.route('/get_movie1')
def get_movie1():
    filename = 'uploads/movie1.mp4'
    return send_file(filename, mimetype='video/mp4')

@app.route('/get_movie2')
def get_movie2():
    filename = 'uploads/movie2.mp4'
    return send_file(filename, mimetype='video/mp4')

@app.route('/get_movie3')
def get_movie3():
    filename = 'uploads/movie3.mp4'
    return send_file(filename, mimetype='video/mp4')

@app.route('/get_movie4')
def get_movie4():
    filename = 'uploads/movie4.mp4'
    return send_file(filename, mimetype='video/mp4')

@app.route('/get_movie5')
def get_movie5():
    filename = 'uploads/movie5.mp4'
    return send_file(filename, mimetype='video/mp4')

@app.route('/get_movie6')
def get_movie6():
    filename = 'uploads/movie6.mp4'
    return send_file(filename, mimetype='video/mp4')

@app.route('/get_movie7')
def get_movie7():
    filename = 'uploads/movie7.mp4'
    return send_file(filename, mimetype='video/mp4')

@app.route('/get_movie8')
def get_movie8():
    filename = 'uploads/movie8.mp4'
    return send_file(filename, mimetype='video/mp4')


@app.route('/write_database/', methods=["GET","POST"])
def  write_database():
    condition=request.json['condition']
    print(condition)
    
    client = MongoClient('mongodb://worker1:worker111@ds147344.mlab.com:47344/heroku_7lq7rsch?retryWrites=false')
    db = client.heroku_7lq7rsch  # use a database called heroku_vbl2phnb
    collection = db[condition]   # and inside that DB, a collection called news

    result=request.json['result']
    mydict={
        "result": result,
        "time": datetime.datetime.utcnow(),
    }
    x = collection.insert_one(mydict)
    print(x.inserted_id)
    print(datetime.datetime.utcnow())
    print(mydict)

    dat={
        'response': "OK",
    }
    return jsonify(**dat)




# condition3 - fetch
# render features based on the whole dataset 
# since fetch data is called firstly and once
@app.route('/render_features/', methods=["GET", "POST"])
def suggest_rules():
    global current_indices
    # don't do this globally
    current_indices=[i for i in range(0,len(processed_dict['adult']))]
    global selected_features
    selected_features=[]

    print('original dataset size: ')
    print(len(current_indices))
    return compute_rules()


@app.route('/update_indices/', methods=["GET", "POST"])
def update_indices():
    global current_indices
    current_indices=request.json['currentIndices']

    print('current dataset size: ')
    print(len(current_indices))

    return update_features()

# @app.route('/update_features/', methods=["GET", "POST"])
def update_features():
    print('current dataset size: ')
    print(len(current_indices))
    return compute_rules()




# condition1 - render the whole dataset to the crowd worker
@app.route('/render_dataset/', methods=["GET", "POST"])
def render_dataset():
    # test only several columns
    # df1=df[['adult','budget','overview','genres']]
    data_str=df.to_json(orient = "records")
    data_list=json.loads(data_str)
    dat={
        'dataset': data_list
    }
    return jsonify(**dat)


# condition1 - provide simulated end user answer
@app.route('/fetch_condition1/', methods=["GET", "POST"])
def fetch_question():
    # get question to be asked from the crowd worker
    question=request.json['question']
    # responseTime = request.json['responseTime']
    # print("Here is the crowd worker's response time in milliseconds")
    # print(responseTime)
    # with open(logCrowd, 'a') as f:
    #     f.write("%s: %s\n" % (question,responseTime))

    response = simulated_answers[question]
    if response[0] == '':
        response = ['The end user does not know', 10]

    return_result={
        'answer': response,
    }
    return jsonify(**return_result)


# condition3 - ranked feature list by computing entropy
# case1&2 - rank with/wihtout entropy
def compute_rules():
    split={}
    entropies={}
    for item in processed_dict:
        entropies[item],split[item] = get_entropy(item)

    ranked_indices=sorted(entropies.items(),key=lambda kv:kv[1],reverse=True)

    # not show the previously selected features as options
    # filtered_ranked=[item[0] for item in ranked_indices if item[0] not in selected_features ]
    filtered_entropy=[item for item in ranked_indices if item[0] not in selected_features]

    rules=[]
    # check if condition in index.jsx
    # split.jsx
    # for index,ele in enumerate(filtered_entropy):
    #     for item in split[ele[0]]:
    #         value=item['value']
    #         if (type(value) is np.int32):
    #             value=int(value)
    #         rules+=[{
    #             'id': index+1,
    #             'feature': ele[0],
    #             'entropy': ele[1],
    #             'value': value,
    #             'counts': item['counts'],
    #         }]

    # rules.jsx or entropy.jsx
    for index,ele in enumerate(filtered_entropy):
        rules+=[{
            'id': index+1,
            'feature': ele[0],
            'entropy': ele[1],
        }]


    dat = {
        'rules': rules,
    }
    return jsonify(**dat)


from scipy.stats import entropy
import math
# TODO need change?
# condition3 - compute entropy for each feature
def get_entropy(feature_name):
    # calculate entropy only based on the filtered dataset
    global current_indices
    feature_list=[processed_dict[feature_name][i] for i in current_indices]

    # if (feature_name=='id'):
    #     print(feature_list)

    labels=[]
    # fuzzy entropy for multi-label case, e.g., genres
    entropyy=0
    if isinstance(feature_list[0],list):
        for i in feature_list:
            l=[j for j in i]
            labels+=l
        value,counts=np.unique(labels,return_counts=True)
        # calculate fuzzy entropy
        # H(A)=-sum(membership_A(x_i))P(x_i)logP(x_i)
        sum=0
        for idx,feature in enumerate(value):
            total=0
            for item in feature_list:
                if feature in item:
                    total+=len(item)
            membership=counts[idx]/total
            p=counts[idx]/len(feature_list)
            sum+=-membership*p*math.log(p,2)
        entropyy=sum
    else:
        value,counts=np.unique(feature_list,return_counts=True)
        entropyy=entropy(counts,base=2)

    split=get_split(value,counts)
    

    return entropyy,split


def get_split(value,counts):
    # only show the distribution of the top 5 frequent values
    l=len(value)
    if (l>10):
        l=10
    
    sort_index=np.argsort(-np.array(counts))[:l]

    split=[]
    for index in sort_index:
        split+=[{
            'value': value[index],
            'counts': int(counts[index])
        }]
    return split


'''
global variables
'''
# preprocess only once
processed_dict,df=preprocess_dataset()

# current_indices is the indices of the 'alive' data points
# data points that have not been filtered out
current_indices=[]


# selected_features is for condition3
# record the features asked previouly by the crowd and answered successfully by the end user
# to avoid the features being selected again
selected_features=[]

simulated_answers = json.load(open("answers.json"))

# from time import gmtime, strftime
# logCrowd='logCrowd_'+strftime("%m%d_%H%M", gmtime())


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
    