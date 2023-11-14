#MICRO SERVICE API FOR AGRISOLVE


#ENDPOINTS:

#TASKS
# Crop and disease detection
# Weather
# Pest detection -| try control measure using wikipedia

#imports
from flask import Flask,request
from flask_cors import cross_origin, CORS
import requests
from dotenv import load_dotenv
import os 

#SCRAPPING LOGIC
import asyncio
import httpx
from bs4 import BeautifulSoup
from lxml import html

#load env variables
load_dotenv()

app = Flask(__name__)
#CORS
CORS(app)

@app.get('/')
@cross_origin()
def index():
    return {"message":"Hello welcome to AGRISOLVE microservice"}

#crop detection route
@app.post('/api/v1/crop-disease-detection')
@cross_origin()
def crop_disease_detector():
    url = "https://susya.onrender.com"
    try:
        imgdata = request.get_json()['image']
    except KeyError:
        return {"message":"Error `image` required"}
    r = requests.post(url,json = {"image":imgdata})
    if r.status_code == 200:
        msg = {"message":r.text.strip()}
    else:
        msg = {"message":f"Error <{r.status_code}> in processing the image"}

    return msg
#crop detection route 2 (detailed)
@app.post('/api/v1/crop-disease-detection/detailed')
@cross_origin()
def detect_crop():
    image = request.get_json()['image']
    response = requests.post(
    "https://api.plant.id/v2/health_assessment",
    json={
        "images": f"{image}",
        "modifiers": ["similar_images"],
        "disease_details": ["description", "treatment"],
    },
    headers={
        "Content-Type": "application/json",
        "Api-Key": f"{os.getenv('PLANT_API')}",
    }).json()

    if not response["health_assessment"]["is_healthy"]:
        diseases = []
        for suggestion in response["health_assessment"]["diseases"]:
            
            treatment_categories= suggestion['disease_details']['treatment']
            
            treatment = {}
            for category in treatment_categories:
                treatment_detail = "".join(treatment_categories[f'{category}'])
                treatment |= {category:treatment_detail}

            disease = {"name": suggestion["name"],
                       "probability":suggestion['probability'],
                    "suggestions":suggestion["disease_details"]["description"],
                    "treatment":treatment}
            
            diseases.append(disease)
        return {"diseases":diseases}

#pest detection route
async def scrape(url):
  async with httpx.AsyncClient() as client:
    resp = await client.get(url)
    soup = BeautifulSoup(resp.text, 'html.parser')

    tree = html.fromstring(str(soup))

    # Find p tag by xpath 
    p = tree.xpath('/html/body/div[2]/div/div[3]/main/div[3]/div[3]/div[1]/p[3]')[0]

    return p.text_content()

@app.post('/api/v1/pest-classification')
@cross_origin()
def pest_identification():
    try:
        image = request.get_json()['image']
    except KeyError:
        return {'message':'Error Image is required to perfom detection'}
    
    response = requests.post(
    "https://insect.mlapi.ai/api/v1/identification?details=common_names,url",
        json={
        "images": image,
        "similar_images": True,
    },
        headers={
        "Content-Type": "application/json",
        "Api-Key": f"{os.getenv('PEST_API')}",
    }).json()
    #if response.status_code != 200:
     #   return {"message":f"Error <{response.status_code}> while perfoming the specified operation"}
    for suggestion in response["result"]["classification"]["suggestions"]:
        pest_name = suggestion["name"]                     # Lucanus cervus
        pest_common_name = suggestion["details"]["common_names"]  # European Stag Beetle
        pest_description_url =suggestion["details"]["url"] # https://en.wikipedia.org/wiki/Lucanus_cervus
        return {
                "name":pest_name,
                "common_name":pest_common_name,
                "description":f"{asyncio.run(scrape(pest_description_url))}",
                "description_url":pest_description_url
                }
if __name__ == "__main__":
    app.run(debug = True, port=5000)
