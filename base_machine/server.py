# !/usr/bin/env python

import os
from flask import Flask, render_template, jsonify, request, send_file
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import pandas as pd
import json
import string
import csv

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

# condition3 - fetch
# render features based on the whole dataset 
# since fetch data is called firstly and once
@app.route('/render_features/', methods=["GET", "POST"])
def suggest_rules():
    global current_indices
    current_indices=[i for i in range(0,len(processed_dict['adult']))]
    global selected_features
    selected_features=[]

    print('original dataset size: ')
    print(len(current_indices))
    return compute_rules()


# condition3 - filter
# filter the dataset based on 
# 1. the feature selected by the crowd worker
# 2. the feature value answered by the end user
@app.route('/fetch_condition3_rank/', methods=["GET", "POST"])
def filter_rules():
    # get feature to be asked from the crowd worker
    selected_feature=request.json['feature']
    print(selected_feature)

    # TODO
    # need value of the feature asked from the end user
    # selected_feature_value=request.json['feature_value']
    # forged answer for test
    if (selected_feature=='genres'):
        selected_feature_value='Action'
    elif (selected_feature=='production_countries'):
        selected_feature_value='United States of America'
    else:
        selected_feature_value="don't know"

    # if end user answered useful information
    # do filtering
    if (selected_feature_value != "don't know"):
        # record all features selected the crowd 
        # and 
        # succussfully answered by the end user
        global selected_features
        selected_features+=[selected_feature]

        feature_list=processed_dict[selected_feature]
        global current_indices
        cur_points=current_indices
        print('**********current_size*************')
        print(len(cur_points))

        filtered=filter_dataset(selected_feature_value,feature_list,cur_points)
        
        print('------------filtered_size--------------')
        print(len(filtered))
        current_indices=filtered

    # if end user "don't know"
    # no need to filter
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
    print(question)
    print(simulated_answers)
    response = simulated_answers[question]
    if response == '':
        response = 'The end user does not know' 
    # TODO
    # create a json file of the simulated answers
    # parse question
    # search answer

    return_result={
        'answer': response,
    }
    return jsonify(**return_result)






# condition3 - ranked feature list by computing entropy
# case1&2 - rank with/wihtout entropy
def compute_rules():
    dataset_indices=current_indices

    split={}
    entropies={}
    for item in processed_dict:
        entropies[item],split[item] = get_entropy(processed_dict[item],dataset_indices)

    ranked_indices=sorted(entropies.items(),key=lambda kv:kv[1],reverse=True)

    # not show the previously selected features as options
    # filtered_ranked=[item[0] for item in ranked_indices if item[0] not in selected_features ]
    filtered_entropy=[item for item in ranked_indices if item[0] not in selected_features]

    rules=[]
    for index,ele in enumerate(filtered_entropy):
        for item in split[ele[0]]:
            rules+=[{
                'id': index+1,
                'feature': ele[0],
                'entropy': ele[1],
                'value': item['value'],
                'counts': item['counts'],
            }]

    # for index,ele in enumerate(filtered_entropy):
    #     rules+=[{
    #         'id': index+1,
    #         'feature': ele[0],
    #         'entropy': ele[1],
    #     }]


    dat = {
        'rules': rules,
    }
    return jsonify(**dat)


from scipy.stats import entropy
# TODO need change?
# condition3 - compute entropy for each feature
def get_entropy(feature,dataset_indices='None'):
    if dataset_indices=='None':
        dataset_indices=[i for i in range(0,len(feature))]

    # calculate entropy only based on the filtered dataset
    filtered_dataset=[feature[i] for i in dataset_indices]

    labels=[]
    if isinstance(feature[0],list):
        for i in filtered_dataset:
            l=[j for j in i]
            labels+=l
        value,counts=np.unique(labels,return_counts=True)
    else:
        value,counts=np.unique(filtered_dataset,return_counts=True)

    split=get_split(value,counts)

    return entropy(counts,base=2),split


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
    # for index,ele in enumerate(value):
    #     split+=[{
    #         'value': ele,
    #         'counts': int(counts[index])
    #     }]
    return split




# TODO
# for empty field, should we keep it or filter it out?
# return a list of absolute indices
# filtered_on_genres is the current 'live' datapoints
def filter_dataset(feature_value,feature_list,cur_points='None'):
    if (cur_points=='None'):
        cur_points=[i for i in range(0,len(feature_list))]

    cur_dataset=[feature_list[i] for i in cur_points]
    filtered=[]
    if isinstance(cur_dataset[0],list):
        for index,ele in enumerate(cur_dataset):
            if feature_value in ele:
                filtered+=[index]
    else:
        for index,ele in enumerate(cur_dataset):
            if feature_value==ele:
                filtered+=[index]
    # for now filtered is a relative indices list
    # convert to an absolute indices list
    abs_filtered=[cur_points[i] for i in filtered]
    return abs_filtered





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


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
    