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

from gensim.utils import simple_preprocess
from gensim.parsing.preprocessing import STOPWORDS
from nltk.stem import SnowballStemmer
from nltk.stem.porter import *
np.random.seed(2018)

import nltk
nltk.download('wordnet')

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

# return a glove word2vec model
# using pretrained 50d as default glovefile
def glove_model(glovefile='glove.6B.50d.txt'):
    import os.path
    from os import path
    if (not path.exists(glovefile+'.word2vec')):
        load_glove_to_word2vec(glovefile)
    model=KeyedVectors.load_word2vec_format(glovefile+'.word2vec',binary=False)
    return model

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



def lemmatize_stemming(sentence):
    stemmer=SnowballStemmer('english')
    return stemmer.stem(WordNetLemmatizer().lemmatize(sentence,pos='v'))

def preprocess_sentence(sentence):
    result=[]
    for token in gensim.utils.simple_preprocess(sentence):
        if token not in gensim.parsing.preprocessing.STOPWORDS and len(token)>3:
            result.append(lemmatize_stemming(token))
    return result

def preprocess(corpus):
    result=[]
    for sentence in corpus:
        result.append(preprocess_sentence(sentence))
    return result


def create_dictionary(processed_corpus):
    dictionary=gensim.corpora.Dictionary(processed_corpus)

    # filter out tokens that appear in less than k documents
    # or more than 0.5 documents
    # after the above 2 steps, keep only the first n frequent tokens
    lower_bound=1 # absolute number
    upper_bound=0.5 # fraction
    dictionary.filter_extremes(no_below=lower_bound,no_above=upper_bound,keep_n=100000)
    return dictionary


def create_bow_corpus(dictionary,processed_corpus):
    bow_corpus=[dictionary.doc2bow(doc) for doc in processed_corpus]
    return bow_corpus
# sample output 
# cor_corpus[i]
# [(76, 1), (112, 1), (483, 1), (3998, 1)]
# word 76 appears 1 time


from gensim import corpora, models

def create_tfidf_model(dictionary,processed_corpus):
    bow_corpus=[dictionary.doc2bow(doc) for doc in processed_corpus]
    tfidf=models.TfidfModel(bow_corpus)
    corpus_tfidf=tfidf[bow_corpus]
    return corpus_tfidf

def keywords_by_lda(corpus_tfidf,dictionary):
    num_topics=5
    lda_model_tfidf=gensim.models.LdaMulticore(corpus_tfidf,num_topics=num_topics,id2word=dictionary,passes=2,workers=2)
    
    top_keywords=[]
    topn=10 # Number of the most significant words that are associated with the topic
    for i in range(0,num_topics):
        similar=[pair[0] for pair in lda_model_tfidf.show_topic(i,topn=topn)]
        top_keywords+=[similar]
    return top_keywords



# Select top k frequent keywords 
# using tfidf
def keywords_by_frequency(corpus,model,vectorizer,X):
    indices=np.argsort(vectorizer.idf_)[::-1]
    feature_names=vectorizer.get_feature_names()
    top_k=10
    top_seeds=[feature_names[i] for i in indices[:top_k]]

    # For each keyword
    # Find top j similar keywords 
    # using glove embedding
    top_j=10
    top_keywords=[]
    for word in top_seeds:
        similar=[word]
        similar+=[item[0] for item in model.similar_by_word(word)[:top_j]]
        top_keywords+=[similar]
    return top_keywords

def keywords_to_docs_by_lda(terms,corpus,dictionary,corpus_tfidf,threshold=0):
    scores=[]
    for i in range(0,len(corpus_tfidf)):
        document=corpus_tfidf[i]
        matched=0
        summation=0
        for term in terms:
            tfidf=0
            for idx,tfidf_score in document:
                if (dictionary[idx]==term):
                    matched+=1
                    tfidf=tfidf_score
                    break
            summation+=tfidf
        score=matched*summation
        scores+=[score]
    top_docs=[]
    for i in range(0,len(corpus_tfidf)):
        if (scores[i]>threshold):
            top_docs+=[corpus[i]]
    return top_docs

def keywords_to_docs_by_frequency(terms,corpus,vectorizer,X,threshold=0):
    scores=[]
    for i in range(0,len(corpus)):
        document=corpus[i]
        matched=0
        summation=0
        for term in terms:
            try:
                index=vectorizer.vocabulary_[term]
                tfidf=X[i,index]
            except:
                tfidf=0
            if (tfidf!=0):
                matched+=1
            summation+=tfidf
        score=matched*summation
        scores+=[score]
    top_docs=[]
    for i in range(0,len(corpus)):
        if (scores[i]>threshold):
            top_docs+=[corpus[i]]
    return top_docs