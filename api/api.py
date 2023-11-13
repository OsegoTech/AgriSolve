#microservice api for agrisolve

#ENDPOINTS:

#Deals with:
#Crop Disease detection
#Weather stuff
#Pest stuff

#imports 
from flask import Flask,request
from flask_cors import cross_origin,CORS
import requests
from dotenv import load_dotenv
#load env variables
load_dotenv()

app = Flask(__name__)
CORS(app)

@app.get('/')
def index():
    return {"message":"hello"}

if __name__ == "__main__":
    app.run(debug=True)
