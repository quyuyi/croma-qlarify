import pandas as pd
import string
import csv
import ast
import numpy as np

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

    return processed_dict,df


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

