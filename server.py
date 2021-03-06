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
from scipy.stats import entropy
import math
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

@app.route('/get_traffic')
def get_traffic():
    # filename = 'posters/traffic.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/traffic_tmdb.png'
    return send_file(filename, mimetype='png')

@app.route('/get_21jumpstreet')
def get_21jumpstreet():
    # filename = 'posters/21jumpstreet.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/21jumpstreet_tmdb.png'
    return send_file(filename, mimetype='png')

@app.route('/get_gravity')
def get_gravity():
    # filename = 'posters/gravity.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/gravity_tmdb.png'
    return send_file(filename, mimetype='png')
    

@app.route('/get_paymentondemand')
def get_paymentondemand():
    # filename = 'posters/paymentondemand.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/paymentondemand_tmdb.png'
    return send_file(filename, mimetype='png')

@app.route('/get_exmachina')
def get_exmachina():
    # filename = 'posters/exmachina.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/exmachina_tmdb.png'
    return send_file(filename, mimetype='png')

@app.route('/get_realitybites')
def get_realitybites():
    # filename = 'posters/realitybites.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/realitybites_tmdb.png'
    return send_file(filename, mimetype='png')

@app.route('/get_revenant')
def get_revenant():
    # filename = 'posters/revenant.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/revenant_tmdb.png'
    return send_file(filename, mimetype='png')

@app.route('/get_prometheus')
def get_prometheus():
    # filename = 'posters/prometheus.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/prometheus_tmdb.png'
    return send_file(filename, mimetype='png')

@app.route('/get_prestige')
def get_prestige():
    # filename = 'posters/prestige.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/prestige_tmdb.png'
    return send_file(filename, mimetype='png')

@app.route('/get_nemesis')
def get_nemesis():
    # filename = 'posters/nemesis.jpg'
    # return send_file(filename, mimetype='jpg')
    filename = 'posters/nemesis_tmdb.png'
    return send_file(filename, mimetype='png')

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
    current_indices=[i for i in range(0,len(processed_dict['adult']))]
    global selected_features
    selected_features=['title', 'original_title', 'overview']

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


@app.route('/render_dataset/', methods=["GET", "POST"])
def render_dataset():
    """Condition1 - render the whole dataset to the crowd worker."""
    data_str=df.to_json(orient = "records")
    data_list=json.loads(data_str)
    dat={
        'dataset': data_list
    }
    return jsonify(**dat)


@app.route('/fetch_condition1/', methods=["GET", "POST"])
def fetch_question():
    """Condition1 - provide simulated end user answer."""
    question=request.json['question']
    response = simulated_answers[question]
    if response[0] == '':
        response = ['The end user does not know', 10]

    return_result={
        'answer': response,
    }
    return jsonify(**return_result)


def compute_rules():
    """Condition3 - ranked feature list by computing entropy."""
    split={}
    entropies={}
    for item in processed_dict:
        entropies[item],split[item] = get_entropy(item)

    ranked_indices=sorted(entropies.items(),key=lambda kv:kv[1],reverse=False)

    # not show the previously selected features as options
    filtered_entropy=[item for item in ranked_indices if item[0] not in selected_features]

    min_entropy=filtered_entropy[len(filtered_entropy)-1][1]
    max_entropy=filtered_entropy[0][1]

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
    rank=1
    equal=1
    prev=0
    for index,ele in enumerate(filtered_entropy):
        # calculated rank
        if (index>=1):
            if (prev==ele[1]):
                equal+=1
            else:
                rank+=equal
                equal=1
        # calculate scaled entropy
        scaled=10*(ele[1]-min_entropy)/(max_entropy-min_entropy)
        print(scaled)
        rules+=[{
            'id': index+1,
            'feature': ele[0],
            'entropy': scaled,
            'rank': rank
        }]
        prev=ele[1]


    dat = {
        'rules': rules,
    }

    # store precomputed ranking
    if (recompute_ranking == True):
        with open('rank0.json', 'w') as f:
            json.dump(dat, f)
        print("regenrate ranking")
    return jsonify(**dat)


def get_entropy(feature_name):
    """Condition3 - compute entropy for each feature."""
    global current_indices
    feature_list = []
    if feature_name in fuzzy_entropy:
        for i in current_indices:
            str_i = processed_dict[feature_name][i]
            list_i = ast.literal_eval(str_i)
            feature_list.append(list_i)
    else:
        feature_list=[processed_dict[feature_name][i] for i in current_indices]
    total=len(feature_list)
    if isinstance(feature_list[0], list):
        total=0
        for feature in feature_list:
            total+=len(feature)
    labels=[]
    entropyy=0

    # test multi-label
    # if (feature_name == 'genres'):
    #     # print(feature_list)
    #     print('-----------sample for genres------------------')
    #     a = processed_dict[feature_name][0]
    #     b = ast.literal_eval(a)
    #     print(a)
    #     print(type(a))
    #     print(b)
    #     print(type(b))

    # entropy for multi-label features
    if feature_name in fuzzy_entropy:
        for i in feature_list:
            labels+=i
        value,counts=np.unique(labels,return_counts=True)
        for idx,y in enumerate(value):
            entropyy+=-counts[idx]/total*math.log(1/counts[idx],2)        

    # entropy for range features
    elif feature_name in range_entropy:
        value,counts=np.unique(feature_list,return_counts=True)
        # entropyy=entropy(counts,base=2)
        ranges=range_dict[feature_name]
        range_counts=[0]*len(ranges)

        if (feature_name=='budget' or feature_name=='revenue' or feature_name=='runtime' 
        or feature_name=='popularity' or feature_name=='vote_average' or feature_name=='vote_count'):
            float_value = []
            for i in value:
                if i != "null":
                    float_value += [float(i)]
            # value = [float(i) for i in value]
            value = float_value

        for idx,v in enumerate(value):
            for index,point in enumerate(ranges):
                if (v>point or v==point):
                    range_counts[index]+=counts[idx]
                    break

        for idx in range(0,len(ranges)):
            if range_counts[idx]!=0:
                entropyy+=-range_counts[idx]/total*math.log(1/range_counts[idx],2) 

    # basic conditional entropy for single-label case
    # H(X|Y)=sum(P[Y=y_i])H(X|Y=y_i), where
    # H(X|Y=y)=-sum(P[X=x_i|Y=y]log(P)), since each movie is unique
    # H(X|Y=y)=-log(P)=-log(1/(# of movies where Y=y))=-log(1/counts[y])
    # so H(X|Y)=sum(counts[y_i]/total * -log(1/counts[y_i]))
    else:
        value,counts=np.unique(feature_list,return_counts=True)
        print('-------------------single-label case-------------------')
        print(feature_name)
        for idx,y in enumerate(value):
            entropyy+=-counts[idx]/total*math.log(1/counts[idx],2)

    split=get_split(value,counts)

    return entropyy,split

def get_split(value,counts):
    """Only show the distribution of the top 5 frequent values."""
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


"""Global variables"""
# preprocess only once
recompute_ranking = False
if (recompute_ranking == False):
    processed_dict,df= use_sampled()
else: 
    processed_dict, df = use_processed()

# current_indices is the indices of the 'alive' data points data points that have not been filtered out
current_indices=[]


# selected_features is for condition3
# record the features asked previouly by the crowd and answered successfully by the end user
# to avoid the features being selected again
selected_features=[]

simulated_answers = json.load(open("answers.json"))

budgetRange=[250000000,200000000,150000000,100000000,50000000,0]
release_dateRange=['2010-12-31','2000-12-31','1990-12-31','1980-12-31']
revenueRange=[1000000000,800000000,600000000,400000000,200000000,0]
runtimeRange=[150,130,110,90,0]
popularityRange=[50,40,30,20,10,0]
vote_averageRange=[8,6,4,2,0]
vote_countRange=[8000,6000,4000,2000,0]
range_entropy=['budget','release_date','revenue','runtime','popularity','vote_average','vote_count']
fuzzy_entropy=['genres','production_companies','production_countries','spoken_languages','characters','cast','keywords']
range_dict={}
range_dict['budget']=budgetRange
range_dict['release_date']=release_dateRange
range_dict['revenue']=revenueRange
range_dict['runtime']=runtimeRange
range_dict['popularity']=popularityRange
range_dict['vote_average']=vote_averageRange
range_dict['vote_count']=vote_countRange

def rank_simple(vector):
    return sorted(range(len(vector)), key=vector.__getitem__)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3000), debug=True)
    