import numpy as np
from gensim.scripts.glove2word2vec import glove2word2vec


# glovefile {'glove.6B.50d.txt','glove.6B.100d.txt','glove.6B.200d.txt'，'glove.6B.300d.txt'}
# path='D:\\vscode\\adaptive_anno\\glove.6B\\'
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
    path='D:\\vscode\\adaptive_anno\\glove.6B\\'
    glove_input_file=path+gloveFile
    word2vec_output_file=gloveFile+'.word2vec'
    glove2word2vec(glove_input_file,word2vec_output_file)

# text preprocessing
