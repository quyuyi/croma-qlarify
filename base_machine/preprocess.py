import pandas as pd
import string
import csv
import ast
import numpy as np
from random import sample

def process_nan(feature_list):
    result=[]
    for item in feature_list:
        if item==item:
            result+=[item]
        else:
            result+=['null']
    return result

def process_boolean(feature_list):
    result=[]
    for item in feature_list:
        result+=[str(item)]
    return result

# TODO
# language name are strange, should we use id?
# e.g.,  ['English', 'Français', '한국어/조선말', 'Español']
# process the string read from csv file
# to list object in python
def get_feature_list(col_name, processed_dict):
    processed=[]
    for i in processed_dict[col_name]:
        list_feature=[]
        if (i!=i or i=='[]'):
            i="[{'name':'null','iso_3166_1':'null','iso_639_1':'null'}]"
        list_i=ast.literal_eval(i)
        if (isinstance(list_i,list)):
            for j in list_i:
                # if (col_name=='production_countries'):
                #     list_feature+=[j['iso_3166_1']]
                if (col_name=='spoken_languages'):
                    if (len(list_feature)==0):
                        list_feature+=[j['iso_639_1']]
                    else:
                       list_feature+=[', '+ j['iso_639_1']]
                else:
                    if (len(list_feature)==0):
                        list_feature+=[j['name']]
                    else:
                       list_feature+=[', '+ j['name']]
        else:
            list_feature+=['null']
        processed+=[list_feature]
    return processed


def get_collection_name(processed_dict):
    processed_collection=[]
    for i in processed_dict['belongs_to_collection']:
        if (i!=i):
            i="{'name':'null'}"
        dict_i=ast.literal_eval(i)
        if (isinstance(dict_i,dict)):
            processed_collection+=[dict_i['name']]
        else:
            processed_collection+=['null']

    return processed_collection  


def sample99(processed_dict):
    # all = [i for i in range(0,len(processed_dict['adult']))]
    # # print("df length is")
    # # print(len(processed_dict['adult']))
    # sampled=sample(all,99)
    # # add the target movie with id=14160
    # print(len(processed_dict["id"]))
    # for idx,item in enumerate(processed_dict["imdb_id"]): 
    #     if item=='tt1049413': # id==14160
    #         if idx not in sampled:
    #             print(idx)
    #             sampled+=[idx]
    # print("******************sampled indices*************")
    # print(sampled)

    sampled=[15225, 3298, 6636, 7391, 27577, 13451, 4895, 19609, 43174, 19272, 11559, 9361, 842, 19911, 38623, 30496, 20915, 38047, 34756, 28685, 5933, 40187, 13813, 38990, 16767, 7170, 18262, 14850, 13702, 30305, 10271, 30056, 14128, 9869, 42227, 39446, 23093, 6202, 21084, 45273, 8601, 41854, 17756, 29529, 10063, 4189, 9994, 35021, 9423, 31150, 36674, 20402, 34061, 10671, 2870, 31254, 19588, 13537, 15403, 17195, 16445, 36889, 18085, 23656, 3901, 37623, 40384, 40359, 17484, 24901, 21170, 6502, 31394, 22322, 34011, 36985, 45331, 30723, 43699, 27148, 1117, 14817, 5348, 10559, 14759, 12434, 5100, 18917, 35013, 27493, 22599, 7058, 32339, 12616, 28310, 16663, 45043, 41817, 22257, 13724]

    sampled_dict={}
    # sampled_df = pd.DataFrame() 
    for col in processed_dict:
        new_col = [processed_dict[col][i] for i in sampled]
        # print(new_col)
        sampled_dict[col]=new_col
        # sampled_df[col]=pd.Series(new_col,name=col)

    # print(sampled_df)
    # print(sampled_dict["imdb_id"][99])
    # return sampled_dict,sampled_df
    return sampled_dict

def process_cast(processed_dict):
    character_col=[]
    cast_col=[]
    for i in processed_dict['cast']:
        characters=[]
        casts=[]
        if (i!=i or i=='[]'):
            i="[{'character':'null', 'name':'null'}]"
        list_i=ast.literal_eval(i)

        for j in list_i:
            if (j['character']=='Himself' or j['character']=='Herself'):
                if (len(characters)==0):
                    characters+=[j['name']]
                else:
                    characters+=[', '+j['name']]
            else:
                if (len(characters)==0):
                    characters+=[j['character']]
                else:
                    characters+=[', '+j['character']]
            if (len(casts)==0):
                casts+=[j['name']]
            else:
                casts+=[', '+j['name']]
        character_col+=[characters]
        cast_col+=[casts]
    return character_col, cast_col

def process_crew(processed_dict):
    director_col=[]
    for i in processed_dict['crew']:
        if (i!=i or i=='[]'):
            i="[{'job':'Director', 'name':'null'}]"
        list_i=ast.literal_eval(i)
        director='null'
        for j in list_i:
            if (j['job']=='Director'):
                director=j['name']
                break
        director_col+=[director]
    return director_col



def preprocess_dataset():
    df1=pd.read_csv('movies_metadata.csv')
    df2=pd.read_csv('credits.csv')
    df=pd.merge(df1,df2,on='id',sort=False)

    # process data into a dictionary of many lists
    all_col=[]
    raw_dict={}
    for col in df:
        all_col+=[col]
        raw_dict[col]=list(df[col])

    sampled_dict=sample99(raw_dict)

    multi_col=['genres','production_companies','production_countries','spoken_languages','belongs_to_collection','cast','crew']
    single_col=[col for col in all_col if col not in multi_col]

    processed_dict={}
    # assgin all empty(nan) cells a value 'null'
    for col in single_col:
        processed_dict[col]=process_nan(sampled_dict[col])

    processed_dict['adult']=process_boolean(sampled_dict['adult'])
    processed_dict['video']=process_boolean(sampled_dict['video'])

    # extract only the name filed and throw away ids, etc.
    processed_dict['genres']=get_feature_list('genres', sampled_dict)
    processed_dict['production_companies']=get_feature_list('production_companies', sampled_dict)
    processed_dict['production_countries']=get_feature_list('production_countries', sampled_dict)
    processed_dict['spoken_languages']=get_feature_list('spoken_languages', sampled_dict)
    processed_dict['belongs_to_collection']=get_collection_name(sampled_dict)

    # columns: characters, cast, crew
    processed_dict['characters'], processed_dict['cast']=process_cast(sampled_dict)
    processed_dict['director']=process_crew(sampled_dict)

    # update df
    processed_df=pd.DataFrame()
    for col in processed_dict:
        new_column=pd.Series(processed_dict[col],name=col)
        # df.update(new_column)
        processed_df[col]=new_column
    
    return processed_dict, processed_df
    # return processed_dict,df
    # return sample99(processed_dict,df)



a=sampled_dict['cast'][0]
aa=ast.literal_eval(a)    
with open('result.txt','a') as f:
    for item in aa:
        f.write(str(item))
        f.write('\n')

b=sampled_dict['crew'][1]
bb=ast.literal_eval(b)
with open('result.txt','a', encoding='utf-8') as f:
    for item in bb:
        f.write(str(item))
        f.write('\n')
