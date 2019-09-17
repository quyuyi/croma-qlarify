import pandas as pd
import string
import csv
import ast
import numpy as np
from random import sample

# read specific rows from the csv file
def read_csv(csvfile):
    # read only the first #nrows rows: nrows=100
    df = pd.read_csv(csvfile)
    return df

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
                    list_feature+=[j['iso_639_1']]
                else:
                    list_feature+=[j['name']]
        else:
            list_feature+=['null']
        processed+=[list_feature]
    return processed


def sample99(processed_dict,df):
    all = [i for i in range(0,len(processed_dict['adult']))]
    # print("df length is")
    # print(len(processed_dict['adult']))
    sampled=sample(all,99)
    print("******************sampled indices*************")
    print(sampled)
    # add the target movie with id=14160
    print(len(processed_dict["id"]))
    for idx,item in enumerate(processed_dict["imdb_id"]): 
        if item=='tt1049413': # id==14160
            if idx not in sampled:
                print(idx)
                sampled+=[idx]

    sampled_dict={}
    sampled_df = pd.DataFrame() 
    for col in df:
        new_col = [processed_dict[col][i] for i in sampled]
        # print(new_col)
        sampled_dict[col]=new_col
        sampled_df[col]=pd.Series(new_col,name=col)

    # print(sampled_df)
    # print(sampled_dict["imdb_id"][99])
    return sampled_dict,sampled_df


def sampleSpecifics(processed_dict,df):
    imdb_ids=['tt3659388', 'tt1454468', 'tt1631867', 'tt0470752', 'tt2562232', 'tt0482571', 'tt2872718', 'tt0209144', 'tt1663202', 'tt2379713', 'tt0816711', 
    'tt0831387', 'tt1483013', 'tt2103281', 'tt0093870', 'tt2109248', 'tt1731141', 'tt1136608', 'tt1535109', 'tt1843866', 'tt1981115', 'tt2395427', 'tt1877832', 
    'tt3896198', 'tt0478970', 'tt3498820', 'tt0800369', 'tt1872181', 'tt1228705', 'tt0376994', 'tt3385516', 'tt1430132', 'tt3501632', 'tt1211837', 'tt0451279',
    'tt3315342', 'tt2975590', 'tt1300854', 'tt3748528', 'tt0382932', 'tt0266543', 'tt0910970', 'tt0198781', 'tt0114709', 'tt0120363', 'tt0435761', 'tt0317705',
    'tt0126029', 'tt0298148', 'tt0413267', 'tt0892791', 'tt0317219', 'tt0268380', 'tt1453405', 'tt0120623', 'tt0351283', 'tt0438097', 'tt0441773', 'tt1302011', 
    'tt1535108']

    sampled=[]
    for idx,item in enumerate(processed_dict["imdb_id"]): 
        if item in imdb_ids: # id==14160
            if idx not in sampled:
                print(idx)
                sampled+=[idx]

    sampled_dict={}
    sampled_df = pd.DataFrame() 
    for col in df:
        new_col = [processed_dict[col][i] for i in sampled]
        # print(new_col)
        sampled_dict[col]=new_col
        sampled_df[col]=pd.Series(new_col,name=col)

    # print(sampled_df)
    # print(sampled_dict["imdb_id"][99])
    return sampled_dict,sampled_df



def preprocess_dataset():
    csvfile='movies_metadata.csv'
    df=read_csv(csvfile)

    # process data into a dictionary of many lists
    all_col=[]
    processed_dict={}
    for col in df:
        all_col+=[col]
        processed_dict[col]=list(df[col])

    multi_col=['genres','production_companies','production_countries','spoken_languages','belongs_to_collection']
    single_col=[col for col in all_col if col not in multi_col]

    # assgin all empty(nan) cells a value 'null'
    for col in single_col:
        processed_dict[col]=process_nan(processed_dict[col])

    processed_dict['adult']=process_boolean(processed_dict['adult'])
    processed_dict['video']=process_boolean(processed_dict['video'])

    # extract only the name filed and throw away ids, etc.
    processed_dict['genres']=get_feature_list('genres', processed_dict)
    processed_dict['production_companies']=get_feature_list('production_companies', processed_dict)
    processed_dict['production_countries']=get_feature_list('production_countries', processed_dict)
    processed_dict['spoken_languages']=get_feature_list('spoken_languages', processed_dict)

    processed_collection=[]
    # ast.literal_eval requires input as dictionary in str type like '{}'
    # for i in process_nan(processed_dict['belongs_to_collection']):
    for i in processed_dict['belongs_to_collection']:
        if (i!=i):
            i="{'name':'null'}"
        dict_i=ast.literal_eval(i)
        if (isinstance(dict_i,dict)):
            processed_collection+=[dict_i['name']]
        else:
            processed_collection+=['null']
    processed_dict['belongs_to_collection']=processed_collection

    # update df
    for col in df:
        new_column=pd.Series(processed_dict[col],name=col)
        df.update(new_column)
    
    # df.astype({'id': 'int32'})

    # return processed_dict,df
    return sampleSpecifics(processed_dict,df)


def analysis(feature='genres'):
    _,df=preprocess_dataset()

    col=df[feature]
    if (isinstance(col[0],list)):
        labels=[]
        for item in col:
            labels+=item
    else:
        labels=list(col)
    value,counts=np.unique(labels,return_counts=True)

    # print format for select filter options
    for v in value:
        print("'%s': '%s'," % (v,v))

