'''
write data to database 

'''

import json
from pymongo import MongoClient

def readJsonIntoMongodb():
    client = MongoClient('mongodb://user1:user111@ds351987.mlab.com:51987/heroku_vbl2phnb')
    db = client.heroku_vbl2phnb  # use a database called heroku_vbl2phnb
    collection = db.news   # and inside that DB, a collection called news

    news=[]
    with open('news.json','r') as f:
        for line in f:
            news.append(json.loads(line))

    for item in news:
        collection.insert_one(item)
    client.close()


def main():
    readJsonIntoMongodb()



if __name__ == '__main__':
    main()
