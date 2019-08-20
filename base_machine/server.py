# !/usr/bin/env python

import os
from flask import Flask, render_template, jsonify, request, session
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import pandas as pd
import string
import csv

from preprocess import *


app = Flask(__name__)
app.secret_key='some random string'

@app.route("/")
def index():
    return render_template('index.html')

# baseline1
# return rules(i.e., feature) with descending entropy
# input is the current dataset
# input is the whole dataset when first call
@app.route('/rules/', methods=["GET", "POST"])
def suggest_rules(dataset_indices='None'):
    if (dataset_indices=='None'):
        dataset_indices=[i for i in range(0,len(processed_dict['adult']))]
    return compute_rules(dataset_indices=dataset_indices)


# filter the dataset based on 
# 1. the feature selected by the crowd worker
# 2. the feature value answered by the end user
@app.route('/filter/', methods=["GET", "POST"])
def filter_rules():
    # get feature to be asked from the crowd worker
    selected_feature=request.json['feature']
    print(selected_feature_value)
    # need value of the feature asked from the end user
    # selected_feature_value=request.json['feature_value']
    feature_list=processed_dict[selected_feature_value]
    cur_points=session.get('current_indices')
    print('**********************')
    print(cur_points)
    print('**********************')

    filtered=filter_dataset(selected_feature_value,feature_list,cur_points)
    
    return compute_rules(dataset_indices=filtered)



import json
# baseline2
# render the whole dataset to the crowd worker
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


@app.route('/fetch_condition1/', methods=["GET", "POST"])
def fetch_question():
    # get question to be asked from the crowd worker
    question=request.json['question']
    print(question)

    # need value of the feature asked from the end user

    # filter

    # return 
    return_result={
        'answer': 'I cannot answer for now.',
    }
    return jsonify(**return_result)



def compute_rules(dataset_indices='None'):
    session['current_indices']=dataset_indices
    # processed_dict=preprocess_dataset()
    entropies={}
    for item in processed_dict:
        entropies[item] = get_entropy(processed_dict[item],dataset_indices)

    ranked_indices=sorted(entropies.items(),key=lambda kv:kv[1],reverse=True)
    ranked_list=[item[0] for item in ranked_indices]

    dat = {
        'rules': ranked_list
    }
    return jsonify(**dat)


from scipy.stats import entropy
import numpy as np
# need change?
# entropy for baseline1
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
        return entropy(counts,base=2)
    else:
        value,counts=np.unique(filtered_dataset,return_counts=True)
        return entropy(counts,base=2)




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






import ast
def baseline1_test():
    processed_dict=preprocess_dataset()

    # round1
    # calculate the entropy for each feature
    entropies={}
    for item in processed_dict:
        entropies[item] = get_entropy(processed_dict[item],dataset_indices='None')

    ranked_indices=sorted(entropies.items(),key=lambda kv:kv[1],reverse=True)

    print(ranked_indices)

    # ask the end user about the feature according to the ranking

    # end user may fail to answer many top feature

    # round2

    # finally able to filter on 'genres'
    filtered_on_genres=filter_dataset('Action',processed_dict['genres'],cur_points='None')
    print(filtered_on_genres)
    # output
    # [5, 7, 8, 9, 14, 19, 22, 41, 43, 50, 53, 65, 69, 70, 85, 93, 96]

    # recalculate the entropy for the split dataset
    r2_entropies={}
    for item in processed_dict:
        r2_entropies[item] = get_entropy(processed_dict[item],dataset_indices=filtered_on_genres)

    r2_ranked_indices=sorted(r2_entropies.items(),key=lambda kv:kv[1],reverse=True)
    print(r2_ranked_indices)
    # TODO
    # may need move away the features that are already asked previously

    # finally able to filter on 'spoken_languages'
    filtered_on_language=filter_dataset('English',processed_dict['spoken_languages'],cur_points=filtered_on_genres)
    # print(filtered_on_language)
    # output
    # [5, 7, 8, 9, 14, 19, 22, 41, 43, 53, 65, 69, 70, 85, 93, 96]
    r3_entropies={}
    for item in processed_dict:
        r3_entropies[item] = get_entropy(processed_dict[item],dataset_indices=filtered_on_language)
    r3_ranked_indices=sorted(r3_entropies.items(),key=lambda kv:kv[1],reverse=True)
    # print(r3_ranked_indices)

    filtered_on_prod_countries=filter_dataset('United States of America',processed_dict['production_countries'],cur_points=filtered_on_language)
    print(filtered_on_prod_countries)
    # [5, 7, 8, 9, 14, 19, 22, 41, 43, 53, 65, 69, 70, 85, 93]



import statistics
import math
# approach 2
def binary_feature_entropy(feature,feature_name,dataset_indices='None'):
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

    entropies={}
    # optimize by range
    num_features=['budget','popularity','revenue','runtime']
    if (feature_name in num_features):
        median=statistics.median(filtered_dataset)
        binary_count=0
        for item in filtered_dataset:
            if (item>=median):
                binary_count+=1
        binary_counts=[binary_count,sum(counts)-binary_count]
        entropies[feature_name+'>='+str(median)]=entropy(binary_counts,base=2)

        # split by 1/4
        first_quarter=np.quantile(filtered_dataset,0.25)
        third_quarter=np.quantile(filtered_dataset,0.75)
        first_count=0
        third_count=0
        for item in filtered_dataset:
            if (item>=first_quarter):
                first_count+=1
            if (item>=third_quarter):
                third_count+=1
        first_counts=[first_count,sum(counts)-first_count]
        third_counts=[third_count,sum(counts)-third_count]
        entropies[feature_name+'>='+str(first_quarter)]=entropy(first_counts,base=2)
        entropies[feature_name+'>='+str(third_quarter)]=entropy(third_counts,base=2)

    else:
        for index,v in enumerate(value):
            binary_counts=[counts[index],sum(counts)-counts[index]]
            entropies[feature_name+'_'+str(v)]=entropy(binary_counts,base=2)
    return entropies


def approach2_test():
    processed_dict=preprocess_dataset()

    entropies={}
    all_dict={}
    for item in processed_dict:
        entropies[item] = binary_feature_entropy(processed_dict[item],item,dataset_indices='None')
        all_dict.update(entropies[item])
    
    ranked_indices=sorted(all_dict.items(),key=lambda kv:kv[1],reverse=True)

    print(ranked_indices[:10])






processed_dict,df=preprocess_dataset()
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
    