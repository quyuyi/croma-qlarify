#!/usr/bin/env python

import os
from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

'''
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
'''

import pandas as pd
import string
import csv

# read specific rows from the csv file
def read_csv(csvfile):
    # read only the first #nrows rows
    df = pd.read_csv(csvfile,nrows=100)
    return df


def process_nan(raw_list):
    res=[]
    for item in raw_list:
        if (item==item):
            res.append(item)
        else:
            res.append("{'name':'null'}")
    return res



from scipy.stats import entropy
import numpy as np
# need change?
def get_entropy(feature,dataset_indices='None'):
    if dataset_indices=='None':
        dataset_indices=[i for i in range(0,feature)]

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
# language name are strange, should we use id?
# e.g.,  ['English', 'Français', '한국어/조선말', 'Español']
# process the string read from csv file
# to list object in python
def get_feature_list(col_name):
    processed=[]
    for i in processed_dict[col_name]:
        list_i=ast.literal_eval(i)
        list_feature=[]
        for j in list_i:
            list_feature+=[j['name']]
        processed+=[list_feature]
    return processed


# TODO
# for empty field, should we keep it or filter it out?
# return a list abosute indices
# filtered_on_genres is the current 'live' datapoints
def filter_dataset(feature_value,feature_list,filtered_on_genres='None'):
    if (filtered_on_genres=='None'):
        filtered_on_genres=[i for i in range(0,len(feature_list))]

    cur_dataset=[feature_list[i] for i in filtered_on_genres]
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
    abs_filtered=[filtered_on_genres[i] for i in filtered]
    return abs_filtered





import ast
def test():
    # read from csv file
    csvfile='movies_metadata.csv'
    df=read_csv(csvfile)

    # process data into a dictionary of many lists
    processed_dict={}
    for col in df:
        processed_dict[col]=list(df[col])

    # extract only the name filed and throw away ids, etc.
    processed_dict['genres']=get_feature_list('genres')
    processed_dict['production_companies']=get_feature_list('production_companies')
    processed_dict['production_countries']=get_feature_list('production_countries')
    processed_dict['spoken_languages']=get_feature_list('spoken_languages')

    processed_collection=[]
    # ast.literal_eval requires input as dictionary in str type like '{}'
    for i in process_nan(processed_dict['belongs_to_collection']):
        dict_i=ast.literal_eval(i)
        processed_collection+=[dict_i['name']]
    processed_dict['belongs_to_collection']=processed_collection

    # round1
    # calculate the entropy for each feature
    entropies={}
    for item in processed_dict:
        entropies[item] = get_entropy(processed_dict[item],dataset_indices='None')

    ranked_indices=sorted(entropies.items(),key=lambda kv:kv[1],reverse=True)

    # ask the end user about the feature according to the ranking

    # end user may fail to answer many top feature

    # round2

    # finally able to filter on 'genres'
    filtered_on_genres=filter_dataset('Action',processed_dict['genres'],filtered_on_genres='None')
    # output
    # [5, 7, 8, 9, 14, 19, 22, 41, 43, 50, 53, 65, 69, 70, 85, 93, 96]

    # recalculate the entropy for the split dataset
    r2_entropies={}
    for item in processed_dict:
        r2_entropies[item] = get_entropy(processed_dict[item],dataset_indices=filtered_on_genres)

    r2_ranked_indices=sorted(r2_entropies.items(),key=lambda kv:kv[1],reverse=True)

    # TODO
    # may need move away the features that are already asked previously

    # finally able to filter on 'spoken_languages'
    filtered_on_language=filter_dataset('English',processed_dict['spoken_languages'],filtered_on_genres=filtered_on_genres)
    # output
    # [5, 7, 8, 9, 14, 19, 22, 41, 43, 53, 65, 69, 70, 85, 93, 96]