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


# return a glove word2vec model
# using pretrained 50d as default glovefile
def glove_model(glovefile='glove.6B.50d.txt'):
    import os.path
    from os import path
    if (not path.exists(glovefile+'.word2vec')):
        load_glove_to_word2vec(glovefile)
    model=KeyedVectors.load_word2vec_format(glovefile+'.word2vec',binary=False)
    return model



'''
# alternative way to load glove pretrained model
import gensim.downloader as api
def load_model():
    word_vectors = api.load("glove-wiki-gigaword-100")  # load pre-trained word-vectors from gensim-data
'''    

















'''
preprocess using nltk
'''
from nltk.corpus import wordnet
def get_wordnet_pos(treebank_tag):
    if treebank_tag.startswith('J'):
        return wordnet.ADJ
    elif treebank_tag.startswith('V'):
        return wordnet.VERB
    elif treebank_tag.startswith('N'):
        return wordnet.NOUN
    elif treebank_tag.startswith('R'):
        return wordnet.ADV
    else:
        return wordnet.NOUN


def split_document_to_tokens(text):
    splitter=nltk.data.load('tokenizers/punkt/english.pickle')
    sentences=splitter.tokenize(text)
    tokenizer=nltk.tokenize.TreebankWordTokenizer()
    tokens=[tokenizer.tokenize(sent) for sent in sentences]
    return tokens

nltk.download('averaged_perceptron_tagger')
def lemmatization_with_pos(tokens):
    lemmatizer=WordNetLemmatizer()
    pos_tokens=[nltk.pos_tag(token) for token in tokens]
    result=[]
    for sent_token in pos_tokens:
        for pos in sent_token:
            result+=[lemmatizer.lemmatize(pos[0],get_wordnet_pos(pos[1]))]
    return result


import string
# corpus -> document -> sentence -> token -> POS -> lemma
def preprocess_using_nltk(corpus):
    punctuations=string.punctuation
    stopwords=gensim.parsing.preprocessing.STOPWORDS
    result=[]
    for text in corpus:
        tokens=split_document_to_tokens(text)
        lemma=lemmatization_with_pos(tokens)
        temp=[]
        for token in lemma:
            if token not in stopwords and token not in punctuations:
                temp+=[token.lower()]
        result+=[temp]
    return result


'''
preprocess using spacy
'''
import spacy
# need download en model
# python -m spacy download en
from nltk.corpus import stopwords
def preprocess_using_spacy(corpus):
    nlp = spacy.load('en_core_web_sm')
    punctuations = string.punctuation
    stopword = stopwords.words('english')
    texts = []
    for doc in corpus:
        doc = nlp(doc, disable=['parser', 'ner'])
        tokens = [tok.lemma_.lower().strip() for tok in doc if tok.lemma_ != '-PRON-']
        tokens = [tok for tok in tokens if tok not in stopword and tok not in punctuations and tok.isalpha()]
        # tokens = ' '.join(tokens)
        texts.append(tokens)
    return texts


def preprocess_using_spacy_for_sklearn(corpus):
    nlp = spacy.load('en_core_web_sm')
    punctuations = string.punctuation
    stopword = stopwords.words('english')
    texts = []
    for doc in corpus:
        doc = nlp(doc, disable=['parser', 'ner'])
        tokens = [tok.lemma_.lower().strip() for tok in doc if tok.lemma_ != '-PRON-']
        tokens = [tok for tok in tokens if tok not in stopword and tok not in punctuations and tok.isalpha()]
        tokens = ' '.join(tokens)
        texts.append(tokens)
    return texts













'''
model using gensim
'''
def create_dictionary(processed_corpus):
    dictionary=gensim.corpora.Dictionary(processed_corpus)

    # filter out tokens that appear in less than k documents
    # or more than 0.5 documents
    # after the above 2 steps, keep only the first n frequent tokens
    lower_bound=100 # absolute number
    upper_bound=0.4 # fraction
    dictionary.filter_extremes(no_below=lower_bound,no_above=upper_bound,keep_n=100000)
    return dictionary


def create_bow_corpus(dictionary,processed_corpus):
    bow_corpus=[dictionary.doc2bow(doc) for doc in processed_corpus]
    return bow_corpus


from gensim import corpora, models

def create_tfidf_model(dictionary,processed_corpus):
    bow_corpus=[dictionary.doc2bow(doc) for doc in processed_corpus]
    tfidf=models.TfidfModel(bow_corpus)
    corpus_tfidf=tfidf[bow_corpus]
    return corpus_tfidf

def keywords_by_lda(corpus_tfidf,dictionary,num_topics=10,num_terms=20):
    lda_model_tfidf=gensim.models.LdaMulticore(corpus_tfidf,num_topics=num_topics,id2word=dictionary,passes=2, iterations=100,workers=2)
    
    top_keywords=[]
    for i in range(0,num_topics):
        similar=[pair[0] for pair in lda_model_tfidf.show_topic(i,topn=num_terms)]
        top_keywords+=[similar]
    return top_keywords


def keywords_by_frequency(model,dictionary,num_topics=10,num_terms=20):
    import operator
    dfs=dictionary.dfs
    sorted_dict = sorted(dfs.items(), key=operator.itemgetter(1),reverse=True)
    top_seeds=[dictionary[item[0]] for item in sorted_dict]# [0:num_topics]]

    # for each seed
    # find #num_terms similar words to it using glove and cosine similarity
    # remove the word from top_seeds if it's added to the previous seed's similar list
    top_keywords=[]
    i=0
    j=0
    while i < num_topics and j < len(top_seeds):
        word=top_seeds[j]
        if not exists(word,top_keywords):
            similar=[word]
            similar+=[item[0] for item in model.similar_by_word(word,topn=num_terms)]
            top_keywords+=[similar]
            i+=1
        j+=1

    return top_keywords

def exists(word,top_keywords):
    for similar_set in top_keywords:
        if word in similar_set:
            return True
    return False








'''
model using sklearn
'''
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.decomposition import NMF,LatentDirichletAllocation
def select_top_keywords_using_sklearn(processed_corpus,method):
    if(method=='frequency'):
        return keywords_by_frequency_using_sklearn(processed_corpus)
    else:
        return keywords_by_lda_using_sklearn(processed_corpus,method=method)
    

def keywords_by_lda_using_sklearn(processed_corpus,method='LDA',no_features=10000,no_topics=10,no_words=20):
    if (method=='NMF'):
        tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=no_features, stop_words='english')
        tfidf = tfidf_vectorizer.fit_transform(processed_corpus)
        tfidf_feature_names = tfidf_vectorizer.get_feature_names()

        nmf = NMF(n_components=no_topics, random_state=1, alpha=.1, l1_ratio=.5, init='nndsvd').fit(tfidf)

        return display_keywords(nmf, tfidf_feature_names, no_words)

    elif (method=='LDA'):
        tf_vectorizer = CountVectorizer(max_df=0.95, min_df=2, max_features=no_features, stop_words='english')
        tf = tf_vectorizer.fit_transform(processed_corpus)
        tf_feature_names = tf_vectorizer.get_feature_names()

        lda = LatentDirichletAllocation(n_components=no_topics, max_iter=50, learning_method='online', learning_offset=50.,random_state=0).fit(tf)

        return display_keywords(lda, tf_feature_names, no_words)

    else:
        print("Wrong method. Choose from {'NMF','LDA'}.")


def display_keywords(model,feature_names,no_words):
    top_keywrods=[]
    for topic_idx, topic in enumerate(model.components_):
        similar=[feature_names[i] for i in topic.argsort()[:-no_words - 1:-1]]
        top_keywrods+=[similar]
    return top_keywrods



# Select top k frequent keywords 
# using tfidf
def keywords_by_frequency_using_sklearn(processed_corpus,no_features=10000,no_topics=10,no_words=20):
    tfidf_vectorizer=TfidfVectorizer(max_df=0.95, min_df=2,stop_words='english',max_features=no_features)
    tfidf=vectorizer.fit_transform(processed_corpus) # need to preprocess corpus?
    indices=np.argsort(tfidf_vectorizer.idf_)[::-1]
    feature_names=tfidf_vectorizer.get_feature_names()
    top_seeds=[feature_names[i] for i in indices[:no_topics]]

    # For each keyword
    # Find top j similar keywords using glove embedding
    top_keywords=[]
    for word in top_seeds:
        similar=[word]
        similar+=[item[0] for item in model.similar_by_word(word)[:no_words]]
        top_keywords+=[similar]
    return top_keywords



def keywords_to_doc_list_using_sklearn(terms,sub_processed_corpus,sub_indices,threshold=0):
    vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=10000, stop_words='english')
    X = vectorizer.fit_transform(sub_processed_corpus)

    scores=[]
    for i in range(0,len(sub_processed_corpus)):
        document=sub_processed_corpus[i]
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

    indices = (-np.array(scores)).argsort()
    relative_indices=[idx for idx in indices if scores[idx]>threshold]

    result=[sub_indices[idx] for idx in relative_indices]
    return result

def keywords_to_docs_using_sklearn(corpus,doc_list):
    top_docs=[]
    for idx in doc_list:
        top_docs+=[corpus[idx]]
    return top_docs

import math
def get_entropy(top_docs,total_docs):
    p_matched=len(top_docs)/total_docs
    p_unmatched=1-p_matched
    return -(p_matched*math.log(p_matched,2)+p_unmatched*math.log(p_unmatched,2))


'''
COLUMBUS - Ohio State head coach Jim Tressel admitted it was a stretch to point to a videotape review of an apparent fumble by Wisconsin early in the third quarter of yesterday #39;s 24-13 loss to the
Badgers, but a live microphone created some talk in the
'''


def write_to_txt(data,filename='test_result.text'):
    outfile=open(filename,'a')

    for item in data:
        outfile.write('Keywords:\n')
        for word in item['words']:
            outfile.write(word)
            outfile.write(' ')
        outfile.write('\n')
        outfile.write('Matched documents:\n')
        for doc in item['documents']:
            outfile.write(doc)
            outfile.write('\n')
        outfile.write('\n\n')
    
    outfile.close()
