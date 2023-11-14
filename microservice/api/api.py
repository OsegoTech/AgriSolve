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
import requests
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
#scrape pest details
def scrape(url):
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, 'html.parser')

    tree = html.fromstring(str(soup))

    # Find p tag by xpath 
    p = tree.xpath('//*[@id="mw-content-text"]/div[1]/p[2]')[0]

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
    print(response)
    #if response.status_code != 200:
     #   return {"message":f"Error <{response.status_code}> while perfoming the specified operation"}
    for suggestion in response["result"]["classification"]["suggestions"]:
        pest_name = suggestion["name"]                     # Lucanus cervus
        pest_common_name = suggestion["details"]["common_names"]  # European Stag Beetle
        pest_description_url =suggestion["details"]["url"] # https://en.wikipedia.org/wiki/Lucanus_cervus
        return {
                "name":pest_name,
                "common_name":pest_common_name,
                "description":f"{scrape(pest_description_url)}",
                "description_url":pest_description_url
                }

#weather-detection route
#current_weather
@app.post("/api/v1/current_weather")
@cross_origin()
def get_weather_data():
    data:dict = request.get_json()
    lat_long = f"{data['latitude']},{data['longitude']}"
    weather_url = "http://api.weatherapi.com/v1/current.json?key={}&q={}".format(os.getenv('WEATHER_API'),lat_long)
    if(lat_long):
        data = requests.get(weather_url).json()
        to_return = {
        "weather":{
        "is_day":data['current']['is_day'],
        "text":data['current']['condition']['text'],
        "icon":f"https://news-feed-ke.vercel.app/proxy-image?url=https:{data['current']['condition']['icon']}",
        "temp":data['current']['feelslike_c']
            }
            }
        return to_return
    else:
        return {'ERROR':'{latitiude,longitude} is required'}

#forecast
@app.post('/api/v1/forecast')
@cross_origin()
def get_forecast_data():
    data:dict = request.get_json()
    lat_long = f"{data['latitude']},{data['longitude']}"
    weather_url = "https://api.weatherapi.com/v1/forecast.json?key={}&q={}&days=7&aqi=yes&alerts=yes".format(os.getenv('WEATHER_API'),lat_long)
    if(lat_long):
        data = requests.get(weather_url).json()
        forecasts = []
        for day in data['forecast']['forecastday']:
            date = day['date']
            max_temp = day['day']['maxtemp_c']
            min_temp = day['day']['mintemp_c']
            conditions = day['day']['condition']['text']
            icon = day['day']['condition']['icon']
            rain_chance = day['day']['daily_chance_of_rain']
    
            daily_forecast = {"date":date,"temperature":{"High": f"{max_temp}C", "Low": f"{min_temp}C"}, "condition":conditions, "icon":f"https://news-feed-ke.vercel.app/proxy-image?url=https:{icon}", "rain_chance": f"{rain_chance}%"}
            forecasts.append(daily_forecast)
        to_return = {
                "forecast":forecasts
                }
        return to_return
    else:
        return {'ERROR':'{latitude ,longitude} is required'}

#messages on alerts

if __name__ == "__main__":
    app.run(debug = True, port=5000)
