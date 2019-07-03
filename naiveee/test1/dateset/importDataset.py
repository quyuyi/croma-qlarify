from pymongo import MongoClient
# http://api.mongodb.com/python/current/tutorial.html
import pprint # data pretty printer
import datetime

# read keywords from mongodb
def readFromMongodb():
    client = MongoClient('mongodb://127.0.0.1:3001/meteor')
    db = client.meteor  # use a database called "meteor"
    collection = db.heuristics   # and inside that DB, a collection called "heuristics"

    keywords=[]
    labels=[]

    for h in collection.find():
        keywords.append(h['heuristic'])
        labels.append(h['label'])
        # pprint.pprint(h) # print all fields of the document
    return keywords, labels



# if the text contains the keyword, then return label
def keywordAsWeakClassifier(text, keyword, label, vote):
    if (keyword in text and label !=''):
        vote[label]+=1

def majorityVote(text, keywords, labels):
    vote={
    'pos':0,
    'neg':0
    }

    # apply each weak classifier
    for keyword,label in zip(keywords,labels):
        keywordAsWeakClassifier(text,keyword,label,vote)

    # mojority vote
    # ??? how to detemine when vote['pos']==vote['neg'] 
    if (vote['pos']>=vote['neg']):
        return 'pos'
    else:
        return 'neg'


# apply the current set of heuristics to each text to predict its label
# and write the prediction to mongodb
def predictToMongodb(keywords,labels):
    client = MongoClient('mongodb://127.0.0.1:3001/meteor')
    db = client.meteor  # use a database called "meteor"
    collection = db.instances   # and inside that DB, a collection called "heuristics"

    # for each instance
    for instance in collection.find():
        text=instance['text']
        prediction=majorityVote(text,keywords,labels)
        collection.update({'_id':instance['_id']},{"$set": {"predicion":prediction}},upsert=False)




def main():
    keywords,labels=readFromMongodb()
    # testText='''I'm a male, not given to women's movies, but this is really a well done special story. I have no personal love for Jane Fonda as a person but she does one Hell of a fine job, while DeNiro is his usual superb self. Everything is so well done: acting, directing, visuals, settings, photography, casting. If you can enjoy a story of real people and real love - this is a winner.'''
    predictToMongodb(keywords,labels)

    # keywordAsWeakClassifier(testText,"enjoy","pos")



if __name__ == "__main__":
    main() 

def readDatasetIntoMongodb(){
    client = MongoClient('mongodb://127.0.0.1:3001/meteor')
    db = client.meteor  # use a database called "meteor"
    collection = db.acllmdb   # and inside that DB, a collection called "heuristics"

    # insert test into the collection
    test={
        'text': 'Good film.',
        'trueLabel':'pos',
        'label': '',
        'heuristics':'',
        'prediction':'',
        'createdAt':datetime.datetime.utcnow()
    }

    collection.insert_one(test)

}


def readFromTextFile(file):
    f=open(file,'r')
    text=f.read()
    return text
'''
file='D:\\aclImdb\\train\\pos\\11_9.txt'
readFromTextFile(file)
'''

def readAllFromFolder():
    


'''
f = open('test_file_name.txt')  # open a file
text = f.read()    # read the entire contents, should be UTF-8 text

# build a document to be inserted
text_file_doc = {"file_name": "test_file_name.txt", "contents" : text }
# insert the contents into the "file" collection
collection.insert(text_file_doc)
'''
