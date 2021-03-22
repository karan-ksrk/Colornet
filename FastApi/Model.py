import pandas as pd
from skimage.io.sift import load_sift 
from sklearn.ensemble import RandomForestClassifier
from pydantic import BaseModel
import joblib
from skimage.color import rgb2lab, lab2rgb, rgb2gray, xyz2lab
from keras.models import model_from_json
from skimage.io import imsave
import numpy as np
from keras.preprocessing.image import img_to_array, load_img
from PIL import Image  
import imageio
from fastapi.responses import FileResponse



def resize(height, width, imgPath):
    # Opens a image in RGB mode  
    im = Image.open(imgPath)  
 
    newsize = (height, width) 
    im = im.resize(newsize) 

    return im



class Colornet:
    def __init__(self):
        self.json_file = open('./beta_model/model.json', 'r')
        self.loaded_model_json = self.json_file.read()
        self.json_file.close()
        self.loaded_model = model_from_json(self.loaded_model_json)
        # load weights into new model
        self.loaded_model.load_weights("./beta_model/model.h5")
        print("Loaded model from disk")
   




    def predict_color(self, filename):

        self.image = resize(256, 256, f'/home/ksrk/Desktop/ML/REST FAST ML/FastApi/upload/{filename}') #Beta
        self.image = img_to_array(self.image)
        self.image = np.array(self.image, dtype=float)

        self.X = rgb2lab(1.0/255*self.image)[:,:,0]
        self.X = self.X.reshape(1, 256, 256, 1)
        self.loaded_model.compile(optimizer='rmsprop',loss='mse')
        self.output = self.loaded_model.predict(self.X)
        self.output *= 128
        # Output colorizations
        self.cur = np.zeros((256, 256, 3))
        self.cur[:,:,0] = self.X[0][:,:,0]
        self.cur[:,:,1:] = self.output[0]
#         # suppose that img's dtype is 'float64'
#         img_uint8 =lab2rgb(self.cur).astype(np.uint8)
# # and then
#         imageio.imwrite('/home/ksrk/Desktop/ML/REST FAST ML/FastApi/results/img_result.png', img_uint8)
        imsave("/home/ksrk/Desktop/ML/REST FAST ML/FastApi/results/img_result.png", lab2rgb(self.cur))
        # imsave("/home/ksrk/Desktop/ML/REST FAST ML/FastApi/results/img_gray_version.png", rgb2gray(lab2rgb(self.cur)))
        print("Doneeeeeeeeeeeeeeeeeeeee")
        return lab2rgb(self.cur)