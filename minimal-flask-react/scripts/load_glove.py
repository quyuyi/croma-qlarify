import numpy as np
from gensim.scripts.glove2word2vec import glove2word2vec
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import string
import re
from gensim.models.keyedvectors import KeyedVectors
import gensim
from gensim import corpora

# glovefile {'glove.6B.50d.txt','glove.6B.100d.txt','glove.6B.200d.txt'，'glove.6B.300d.txt'}
def loadGloveModel(gloveFile):
    print("Loading Glove Model")
    f = open(gloveFile,'r',encoding='utf-8')
    model = {}
    for line in f:
        splitLine = line.split()
        word = splitLine[0]
        embedding = np.array([float(val) for val in splitLine[1:]])
        model[word] = embedding
    print("Done.",len(model)," words loaded!")
    return model

def load_glove_to_word2vec(gloveFile):
    glove_input_file=gloveFile
    word2vec_output_file=gloveFile+'.word2vec'
    glove2word2vec(glove_input_file,word2vec_output_file)

# text preprocessing
def preprocess_text(texts):
    stop_words=set(stopwords.words('english'))
    cleaned_texts=[]
    lemmatizer=WordNetLemmatizer()
    for text in texts:
        # tokens=word_tokenize(text)
        tokens=re.split('[\-\s\\\+]',text)
        tokens=[w.lower() for w in tokens]
        # remove punctuation from each word
        table = str.maketrans('', '', string.punctuation)
        stripped = [w.translate(table) for w in tokens]
        # remove remaining tokens that are not alphabetic
        words = [word for word in stripped if word.isalpha()]
        # remove stop words
        # lemmatization? -> lemmatizer.lemmatize(w)
        filtered=[w for w in words if not w in stop_words]
        cleaned_texts+=[filtered]
    return cleaned_texts

# word embedding at one word level
def glove_word_embedding(word,model):
    try:
        word_embedding=model[word]
    except KeyError:
        print('%s not in vocabulary' % word)
        word_embedding=0
    return word_embedding

# word embedding at one sentence level
# take averag
def sent_vectorizer(sent,model):
    sent_vec=[]
    numw=0
    for w in sent:
        try:
            word_embedding=model[w]
        except KeyError:
            # print('%s not in vocabulary' % w)
            word_embedding=0
        try:
            if numw==0:
                sent_vec=word_embedding
            else:
                sent_vec=np.add(sent_vec,word_embedding)
            numw+=1
        except:
            pass
    return sent_vec/numw


def glove_vectorizer(texts,model):
    cleaned_texts=preprocess_text(texts)
    X=[]
    for t in cleaned_texts:
        X.append(sent_vectorizer(t,model))
    return np.array(X)
