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

def keywords_by_lda(corpus_tfidf,dictionary,num_topics=10,num_terms=20):
    lda_model_tfidf=gensim.models.LdaMulticore(corpus_tfidf,num_topics=num_topics,id2word=dictionary,passes=2,workers=2)
    
    top_keywords=[]
    for i in range(0,num_topics):
        similar=[pair[0] for pair in lda_model_tfidf.show_topic(i,topn=num_terms)]
        top_keywords+=[similar]
    return top_keywords




# TODO
# top_seeds are id array not word array???
def keywords_by_frequency(model,dictionary,num_topics=10,num_terms=20):
    import operator
    dfs=dictionary.dfs
    sorted_dict = sorted(dfs.items(), key=operator.itemgetter(1),reverse=True)
    top_seeds=[dictionary[item[0]] for item in sorted_dict[0:num_topics]]

    # for each seed
    # find #num_terms similar words to it using glove and cosine similarity
    top_keywords=[]
    for word in top_seeds:
        similar=[word]
        similar+=[item[0] for item in model.similar_by_word(word)[:num_terms]]
        top_keywords+=[similar]
    return top_keywords















'''
# Select top k frequent keywords 
# using tfidf
def keywords_by_frequency_using_sklearn(model,vectorizer):
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




def select_top_keywords_using_sklearn(corpus,method):
    if (method=='semantic modeling'):
        model=glove_model() #slow and unchanged should load only once
        vectorizer=TfidfVectorizer(stop_words='english',max_features=20000)
        X=vectorizer.fit_transform(corpus) # need to preprocess corpus?
        keywords=keywords_by_frequency_using_sklearn(model,vectorizer)
        docs=[]
        for terms in keywords:
            doc=keywords_to_docs_by_frequency(terms,corpus,vectorizer,X,threshold=0)
            docs+=[doc]
        return keywords,docs

    # using LDA to create the keyword sets
    # where each set just corresponds to each topic extracted by LDA
    elif (method=='topic modeling'):
        processed_corpus=preprocess_using_spacy(corpus)
        dictionary=create_dictionary(processed_corpus)
        corpus_tfidf=create_tfidf_model(dictionary,processed_corpus)
        keywords=keywords_by_lda(corpus_tfidf,dictionary)
        docs=[]
        for terms in keywords:
            doc=keywords_to_docs_by_lda(terms,corpus,dictionary,corpus_tfidf,threshold=0)
            docs+=[doc]
        return keywords,docs

    else:
        print("Choose method from {'semantic modeling','topic modeling'}")



def keywords_to_docs_using_sklearn(terms,corpus,vectorizer,X,threshold=0):
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
        '''
        outfile.write('Documents indices:\n')
        for idx in item['indices']:
            outfile.write(str(idx))
            outfile.write(' ')
        '''
        outfile.write('\n\n')
    
    outfile.close()
