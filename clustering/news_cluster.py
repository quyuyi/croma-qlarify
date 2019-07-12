from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import adjusted_rand_score
from sklearn.cluster import KMeans
from spherecluster import SphericalKMeans
import numpy as np
import json
from functools import partial
import random
from gensim.models.keyedvectors import KeyedVectors

# read all from json file and return a list called data[]
# data[i] corresponds to the ith row in the json file
def read_from_json(filename):
    data=[]
    with open(filename,'r',errors='ignore') as loadfile:
        try:
            while True:
                line=loadfile.readline()
                if line:
                    load_dic=json.loads(line)
                    data+=[load_dic]
                else:
                    break
        except:
            print("Unable to open the json file.")
            loadfile.close()
    return data


def extract_text(data):
    texts=[]
    labels=[]
    for instance in data:
        texts+=[instance['content']]
        labels+=[instance['annotation']['label'][0]]
    return texts,labels    


# feature_space {'tfidf','glove'}
# similarity_measure {'euclidean'.'cosine'}
def clustering(document,k,similarity_measure,feature_space):
    # Vectorizer results are normalized, 
    # which makes k-means bahave as spherical k-means
    if (feature_space=='tfidf'):
        vectorizer=TfidfVectorizer(stop_words='english',max_features=20000)
        X=vectorizer.fit_transform(document)
    else:# (feature_space=='glove'):
        # NOT FINISHED...
        glove_model=KeyedVectors.load_word2vec_format('glove.6B.50d.txt.word2vec',binary=False)
    if (similarity_measure=='cosine'):
        skm=SphericalKMeans(n_clusters=k)
        skm.fit(X)
    else:# (similarity_measure=='euclidean'):
        skm = KMeans(n_clusters=k, random_state=0).fit(X)
    return skm,vectorizer


# print the top 10 words with largest tfidf in each cluster
def centroids_to_words(skm,vectorizer,k):
    print("Top terms per cluster:")
    order_centroids = skm.cluster_centers_.argsort()[:, ::-1]
    terms = vectorizer.get_feature_names()
    for i in range(k):
        print("Cluster %d:" % i, end='')
        for ind in order_centroids[i, :10]: #top 10 terms
            print(' %s' % terms[ind], end='')
        print()

def index_of_one_cluster(seq,item):
    seq=seq.tolist()
    start_at = -1
    locs = []
    while True:
        try:
            loc = seq.index(item,start_at+1)
        except ValueError:
            break
        else:
            locs.append(loc)
            start_at = loc
    return locs

# cluster_label {0,...,k-1}
def sample_from_one_cluster(texts,labels,clusters,cluster_label,num_samples):
    # print('Samples from Cluster', cluster_label)
    samples=[]
    sample_labels=[]
    locs=clusters(cluster_label)
    for i in range(0,num_samples):
        loc=random.choice(locs)
        samples+=[texts[loc]]
        sample_labels+=[labels[loc]]
        # print (texts[loc])
    return samples,sample_labels


def main():
    # number of clusters
    k=8
    # number of samples to present in each cluster
    num_samples=5
    # output filename
    filename=str(k)+'_kmeans.txt'
    outfile=open(filename,'a')

    data=read_from_json('News Classification Dataset.json')
    texts,labels=extract_text(data)
    
    skm,vectorizer=clustering(texts,k,'cosine','tfidf')
    centroids_to_words(skm,vectorizer,k)
    # cluster: (#cluster, [indices of instances in that cluster] )
    clusters=partial(index_of_one_cluster,skm.labels_)
    
    for i in range(0,k):
        outfile.write('Samples from Cluster %d:\n' % i)
        samples,sample_labels=sample_from_one_cluster(texts,labels,clusters,i,num_samples)
        for s,l in zip(samples,sample_labels):
            outfile.write("%s\n->%s\n" % (str(s),str(l)))
        outfile.write('\n\n')

    outfile.close()

if __name__=='__main__':
    main()
