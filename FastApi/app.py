import uvicorn
from fastapi import FastAPI, File, UploadFile
from Model import Colornet
import shutil
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import base64
import os


app = FastAPI()
model = Colornet()

origins = [
    'http://localhost:3000',
    'https://localhost:3000/',
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post('/predict')
async def predict_color(file: UploadFile = File(...)):
    with open(f"/home/ksrk/Desktop/ML/REST FAST ML/FastApi/upload/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    result = model.predict_color(file.filename)
    os.remove(f"/home/ksrk/Desktop/ML/REST FAST ML/FastApi/upload/{file.filename}")

    with open("/home/ksrk/Desktop/ML/REST FAST ML/FastApi/results/img_result.png", "rb") as image_file:
       encoded_image_string = base64.b64encode(image_file.read())
    # encoded_image_string = base64.b64encode(result)

    return {"image": encoded_image_string}
    

if __name__ == "__main__":
    uvicorn.run(app, host='127.0.0.1', port=8000)
    