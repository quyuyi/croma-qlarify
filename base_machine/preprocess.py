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
                if (col_name=='production_countries'):
                    list_feature+=[j['iso_3166_1']]
                elif (col_name=='spoken_languages'):
                    list_feature+=[j['iso_639_1']]
                else:
                    list_feature+=[j['name']]
        processed+=[list_feature]
    return processed



def preprocess_dataset():
    csvfile='movies_metadata.csv'
    df=read_csv(csvfile)

    # process data into a dictionary of many lists
    processed_dict={}
    for col in df:
        processed_dict[col]=list(df[col])

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
    processed_dict['belongs_to_collection']=processed_collection

    # update df
    for col in df:
        new_column=pd.Series(processed_dict[col],name=col)
        df.update(new_column)

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

# result
# genres
'''
array(['Action', 'Adventure', 'Animation', 'Aniplex', 'BROSTA TV',
       'Carousel Productions', 'Comedy', 'Crime', 'Documentary', 'Drama',
       'Family', 'Fantasy', 'Foreign', 'GoHands', 'History', 'Horror',
       'Mardock Scramble Production Committee', 'Music', 'Mystery',
       'Odyssey Media', 'Pulser Productions', 'Rogue State', 'Romance',
       'Science Fiction', 'Sentai Filmworks', 'TV Movie',
       'Telescene Film Group Productions', 'The Cartel', 'Thriller',
       'Vision View Entertainment', 'War', 'Western', 'null'],
      dtype='<U37')

array([ 6596,  3496,  1935,     1,     1,     1, 13182,  4307,  3932,
       20265,  2770,  2313,  1622,     1,  1398,  4673,     1,  1598,
        2467,     1,     1,     1,  6735,  3049,     1,   767,     1,
           1,  7624,     1,  1323,  1042,  2442], dtype=int64)
'''

# production_countries
'''
array(['Afghanistan', 'Albania', 'Algeria', 'Angola', 'Antarctica',
       'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria',
       'Azerbaijan', 'Bahamas', 'Bangladesh', 'Barbados', 'Belarus',
       'Belgium', 'Bermuda', 'Bhutan', 'Bolivia',
       'Bosnia and Herzegovina', 'Botswana', 'Brazil',
       'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Cambodia',
       'Cameroon', 'Canada', 'Cayman Islands', 'Chad', 'Chile', 'China',
       'Colombia', 'Congo', 'Costa Rica', "Cote D'Ivoire", 'Croatia',
       'Cuba', 'Cyprus', 'Czech Republic', 'Czechoslovakia', 'Denmark',
       'Dominican Republic', 'East Germany', 'Ecuador', 'Egypt',
       'El Salvador', 'Estonia', 'Ethiopia', 'Finland', 'France',
       'French Polynesia', 'French Southern Territories', 'Georgia',
       'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Guatemala', 'Guinea',
       'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India',
       'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
       'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait',
       'Kyrgyz Republic', "Lao People's Democratic Republic", 'Latvia',
       'Lebanon', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein',
       'Lithuania', 'Luxembourg', 'Macao', 'Macedonia', 'Madagascar',
       'Malaysia', 'Mali', 'Malta', 'Martinique', 'Mauritania', 'Mexico',
       'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
       'Myanmar', 'Namibia', 'Nepal', 'Netherlands',
       'Netherlands Antilles', 'New Zealand', 'Nicaragua', 'Nigeria',
       'North Korea', 'Norway', 'Pakistan', 'Palestinian Territory',
       'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
       'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russia',
       'Rwanda', 'Samoa', 'Saudi Arabia', 'Senegal', 'Serbia',
       'Serbia and Montenegro', 'Singapore', 'Slovakia', 'Slovenia',
       'Somalia', 'South Africa', 'South Korea', 'Soviet Union', 'Spain',
       'Sri Lanka', 'Sweden', 'Switzerland', 'Syrian Arab Republic',
       'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand',
       'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Uganda', 'Ukraine',
       'United Arab Emirates', 'United Kingdom',
       'United States Minor Outlying Islands', 'United States of America',
       'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Yugoslavia',
       'Zimbabwe', 'null'], dtype='<U36')

array([    8,     5,    13,     3,     1,   254,     8,     6,   570,
         209,     2,     5,     2,     1,     9,   447,     1,     4,
          10,    35,     3,   291,     1,    56,    10,     9,     5,
        1765,     1,     4,    68,   372,    34,     5,     6,     2,
          78,    25,     7,   209,     4,   386,     8,     6,    10,
          25,     3,    59,     5,   383,  3940,     1,     1,    30,
        2254,     4,     1,   169,     6,     1,     1,   596,   175,
          68,   828,    33,   106,     8,   225,   147,  2169,     4,
        1648,     9,    23,     3,     1,     6,     3,    29,    15,
           3,     3,     8,    36,    90,     2,    15,     1,    13,
           2,     9,     1,     5,   329,     1,     4,     3,     7,
          33,     1,     3,     6,   375,     1,   123,     3,     6,
           3,   203,    18,    11,     7,     2,     3,    30,    83,
         319,   128,    13,    14,   142,   912,     4,     1,     2,
          14,   106,     3,    41,    30,    32,     1,   125,   495,
          20,   964,     3,   588,   254,     5,   129,     3,     2,
         116,     2,    18,   165,     2,    55,    27,  4094,     1,
       21153,    18,     6,    19,    10,     4,     3,  6285],
      dtype=int64)
'''

# production_companies has size = 23538, too large to filter by selection?

# status
'''
array(['Canceled', 'In Production', 'Planned', 'Post Production',
       'Released', 'Rumored', 'nan'], dtype='<U15')

array([    2,    20,    15,    98, 45014,   230,    87], dtype=int64)
'''
