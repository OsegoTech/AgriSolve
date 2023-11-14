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
        "Api-Key": "dhnqaFrEfd0XqZvXdcVbO9GFDQAgnNvPcxvi8AVZAbncp6paSu",
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
