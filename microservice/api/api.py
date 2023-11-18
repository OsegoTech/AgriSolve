#MICRO SERVICE API FOR AGRISOLVE


#ENDPOINTS:

#TASKS
# Crop and disease detection
# Weather
# Pest detection -| try control measure using wikipedia

#imports
from flask import Flask,request,jsonify
from flask_cors import cross_origin, CORS
import requests
from dotenv import load_dotenv
import base64
import os 
import time
import json
from twilio.rest import Client as tw_client
from requests.auth import HTTPBasicAuth
from datetime import datetime
from supabase import create_client,Client

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
#crop diseases
@app.get('/api/v1/crop-diseases')
@cross_origin()
def crop_diseases():
    disease_list=[
    {
        "NAME": "Rust",
        "IMAGE": "https://imgs.search.brave.com/z3vFAP4lHFzmnB_RSNb1kjV6WtWXZSZ09AMI0qCPxA8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cGxhbmV0bmF0dXJh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTIvMTIvY29t/bW9uLXJ1c3QtZGlz/ZWFzZS5qcGc",
        "DESCRIPTON": "A fungal disease that appears as reddish-brown or orange powdery pustules on leaves, stems, and grains of crops like wheat, barley, and corn.\n",
        "SOLUTIONS": "Plant resistant varieties, practice crop rotation, apply fungicides when necessary, and maintain good plant hygiene by removing infected plant debris."
    },
    {
        "NAME": "Blight",
        "IMAGE": "https://imgs.search.brave.com/3xs0wD4IEoarYQdPXLhNH95Ulatq7ko0peuBvBylejI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90b21h/dG8tZGlzZWFzZS10/cmVhdG1lbnQtZHlp/bmctcGxhbnQtcmVk/LXRvbWF0b2VzLWlu/ZmVjdGVkLWxhdGUt/YmxpZ2h0LTIxNTg1/NzI2MC5qcGc",
        "DESCRIPTON": "A general term for diseases caused by bacteria, fungi, or oomycetes, leading to wilting, browning, and death of plant tissues. Examples include potato blight and fire blight in fruit trees.",
        "SOLUTIONS": "Use disease-resistant varieties, practice crop rotation, ensure proper plant spacing for air circulation, and apply fungicides if needed."
    },
    {
        "NAME": "Mildew",
        "IMAGE": "https://imgs.search.brave.com/nFhhsg9a6UziYq5ePV2ecS20UiI8bjJ8NUVyYfD_j5U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cGxhbmV0bmF0dXJh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTIvMTIvcGxh/bnQtZGlzZWFzZS1t/aWxkZXcuanBn",
        "DESCRIPTON": "A fungal disease characterized by white or gray powdery coating on leaves, stems, and fruits of plants like grapes, cucumbers, and peas.",
        "SOLUTIONS": "Improve air circulation, avoid overhead irrigation, provide adequate plant spacing, apply fungicides, and remove infected plant parts."
    },
    {
        "NAME": "Fusarium wilt",
        "IMAGE": "https://imgs.search.brave.com/zBiqD9jh-0chdknnyJjnKgV84fsxPEMmtdgHYTXKPDo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cGxhbmV0bmF0dXJh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTIvMTIvZnVz/YXJpdW0td2lsdC10/b21hdG8uanBn",
        "DESCRIPTON": "A soil-borne fungal disease causing wilting, yellowing, and death of plants such as tomatoes, bananas, and cotton.",
        "SOLUTIONS": "Plant resistant varieties, practice crop rotation, ensure proper drainage, and use soil solarization or fumigation if necessary."
    },
    {
        "NAME": "Verticillium wilt",
        "IMAGE": "https://imgs.search.brave.com/trs1zBbZTLBYEPDrFu1LBBJEP52FCBE9ObWOvk2pKCk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmNlcy5uY3N1/LmVkdS9tZWRpYS9p/bWFnZXMvMl9pbXMx/TGhFLmpwZWc",
        "DESCRIPTON": "A fungal disease that causes wilting, yellowing, and stunted growth in crops like tomatoes, potatoes, and strawberries.",
        "SOLUTIONS": "Use resistant varieties, practice crop rotation, maintain proper soil fertility and moisture, and manage weed hosts."
    },
    {
        "NAME": "Downy mildew",
        "IMAGE": "https://imgs.search.brave.com/E1qYR9_eV1hhvhGaNs-2T5lE67hcRLeo4rJ4mGDjD0M/rs:fit:500:0:0/g:ce/aHR0cHM6Ly8xNDk1/MjkwNDIudjIucHJl/c3NhYmxlY2RuLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/MC8wMS9jYWRtc3Bs/YXNoMS0yMDB4MjAw/LmpwZw",
        "DESCRIPTON": "A disease characterized by yellowish-green patches on the upper leaf surface and fuzzy, purplish-gray growth on the lower surface. It affects crops such as grapes, lettuce, and cucumbers.",
        "SOLUTIONS": "Improve air circulation, avoid overhead irrigation, apply fungicides preventatively, and remove infected plant material."
    },
    {
        "NAME": "Phytophthora blight",
        "IMAGE": "https://imgs.search.brave.com/_3IDJgGl7CWtAv2ohQlFqJ1uOXHRTehjvDjSjgwCht4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cGxhbmV0bmF0dXJh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTIvMTIvbGF0/ZS1ibGlnaHQtdG9t/YXRvLmpwZw",
        "DESCRIPTON": "A disease caused by the oomycete Phytophthora capsici, leading to damping-off of seedlings, root and crown rot, and fruit rot in vegetables like peppers, cucumbers, and squash.",
        "SOLUTIONS": "Practice crop rotation, avoid over-irrigation, improve soil drainage, use resistant varieties, and apply fungicides."
    },
    {
        "NAME": "Powdery mildew",
        "IMAGE": "https://imgs.search.brave.com/EXHgHycYd2CsN3n9Wn77ytWTZJExlGGHTDW-baxqd-w/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9nYXJk/ZW5lcnNwYXRoLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8wMy9Ib3ctdG8t/Q29tYmF0LVBvd2Rl/cnktTWlsZGV3LUZl/YXR1cmUuanBn",
        "DESCRIPTON": "A fungal disease appearing as a white, powdery coating on leaves, stems, and flowers of plants like grapes, cucurbits, and roses.",
        "SOLUTIONS": "Practice crop rotation, remove infected plant parts, use copper-based sprays or bactericides, and avoid overhead irrigation."
    },
    {
        "NAME": "Bacterial spot",
        "IMAGE": "https://imgs.search.brave.com/Y_K67PF6449vTD-U7lvGIxZzspUI872tguuexUINgqE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy83/LzczL0hpYmlzY3Vz/X0JhY3RlcmlhbF9s/ZWFmX3Nwb3RfY2F1/c2VkX2J5X1BzZXVk/b21vbmFzX2NpY2hv/cmlpXyg1Njg0NTc1/ODE4KS5qcGc",
        "DESCRIPTON": "A disease causing dark, water-soaked lesions on leaves, stems, and fruits of crops including tomatoes, peppers, and peaches.",
        "SOLUTIONS": "Practice crop rotation, remove infected plant parts, use copper-based sprays or bactericides, and avoid overhead irrigation."
    },
    {
        "NAME": "Late blight",
        "IMAGE": "https://imgs.search.brave.com/U2spX8aff350RIuuUfrYn3zIuGqPds5kLvQV2b3LVXE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jb250/ZW50LmNlcy5uY3N1/LmVkdS9tZWRpYS9p/bWFnZXMvU2hvZW1h/a2VyXzcwNjguSlBH",
        "DESCRIPTON": "A devastating disease caused by the oomycete Phytophthora infestans, leading to dark, water-soaked lesions on leaves, stems, and fruits of potatoes and tomatoes.",
        "SOLUTIONS": "Plant resistant varieties, practice good sanitation, apply fungicides preventatively, and remove infected plant material."
    },
    {
        "NAME": "Stem rust",
        "IMAGE": "https://imgs.search.brave.com/1dJ1xGjONtzJkIORXeHhuX6PgsSjJ8hM7C_CinawRwg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWdyaWMud2EuZ292/LmF1L3NpdGVzL2dh/dGV3YXkvZmlsZXMv/c3R5bGVzL3BhZ2Vf/ZmVhdHVyZWRfaW1h/Z2UvcHVibGljL1N0/ZW0lMjBydXN0LkpQ/Rz9pdG9rPW0tdVJ5/bm9J",
        "DESCRIPTON": "A fungal disease affecting cereal crops like wheat, barley, and rye, characterized by reddish-brown pustules on stems, leaves, and grains.",
        "SOLUTIONS": "Plant resistant varieties, practice crop rotation, and apply fungicides if necessary."
    },
    {
        "NAME": "Stripe rust",
        "IMAGE": "https://imgs.search.brave.com/wxdoRydj8e0wTSnDP0ExXVtvvxSxqhPSuTDPAV8Mv_o/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/Z292Lm1iLmNhL2Fn/cmljdWx0dXJlL2Ny/b3BzL3BsYW50LWRp/c2Vhc2VzL2ltYWdl/cy9mYWM2NXMwMGEu/anBn",
        "DESCRIPTON": "A fungal disease causing yellow or orange stripes on leaves of cereals such as wheat and barley.",
        "SOLUTIONS": "Use resistant varieties, monitor fields closely, and apply fungicides if needed.\n"
    },
    {
        "NAME": "Fusarium head blight",
        "IMAGE": "https://imgs.search.brave.com/7goFwsruJHuzV61eFRjoq3HimNxpFitsIl8gOJT5uEM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMxLmZhcm1zLmNv/bS9mYXJtcy1wcm9k/dWN0aW9uLWltYWdl/cy9Qb3J0YWxzLzAv/ZnVzYXJpdW0taGVh/ZC1ibGlnaHQtMzAw/LTJfMS5wbmc",
        "DESCRIPTON": "A fungal disease affecting small-grain cereals, characterized by shriveled grains and mycotoxin contamination.",
        "SOLUTIONS": "Plant resistant varieties, practice crop rotation, apply fungicides during flowering, and maintain good plant hygiene."
    },
    {
        "NAME": "Citrus canker",
        "IMAGE": "https://imgs.search.brave.com/sG7YN8pOx7gIVJjGetT9IOt2FfJGZYN7bzFViAYGh0Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2RmYS5jYS5nb3Yv/Y2l0cnVzL2ltYWdl/cy9jY2RfdXNkYS5q/cGc",
        "DESCRIPTON": "A bacterial disease causing raised corky lesions on leaves, fruits, and stems of citrus trees, leading to defoliation and reduced fruit quality.",
        "SOLUTIONS": "Prune infected plant parts, apply copper-based sprays, practice good sanitation, and use disease-free planting material."
    },
    {
        "NAME": "Anthracnose",
        "IMAGE": "https://imgs.search.brave.com/j3FMso7oYmNAVDQeBW0M9WL5y3YeZtGw5ZsPe2oScZM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9leHRl/bnNpb24ub2tzdGF0/ZS5lZHUvZmFjdC1z/aGVldHMvaW1hZ2Vz/L2FudGhyYWNub3Nl/LWFuZC1vdGhlci1j/b21tb24tbGVhZi1k/aXNlYXNlcy1vZi1k/ZWNpZHVvdXMtc2hh/ZGUtdHJlZXMvZmln/dXJlLTItMS5qcGc",
        "DESCRIPTON": "A fungal disease causing dark, sunken lesions on leaves, stems, and fruits of various crops, leading to defoliation and fruit rot.",
        "SOLUTIONS": "Practice good plant hygiene, apply fungicides preventatively, and remove infected plant material.\n"
    },
    {
        "NAME": "Soybean rust",
        "IMAGE": "https://imgs.search.brave.com/mxD6LbPNWhsqJyNV9tYwJm66u57Zqhi9mTGRFWMvPjk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9m/L2Y4L1NveWJlYW5f/cnVzdC5qcGc",
        "DESCRIPTON": "\u00a0A fungal disease affecting soybean crops, causing yellow-orange pustules on leaves, stems, and pods, leading to defoliation and yield reduction.",
        "SOLUTIONS": "\u00a0Monitor fields for early signs, plant resistant varieties, apply fungicides preventatively, and practice good plant hygiene."
    },
    {
        "NAME": "Sclerotinia rot",
        "IMAGE": "https://imgs.search.brave.com/BWqP6PrGlV9JcZKrF7lAHauoxd2DsGFpvg1M-GK3xoY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2Fub2xhY291bmNp/bC5vcmcvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDgvQS1z/Y2xlcm90aW5pYS1z/dGVtLXJvdC1sZXNp/b24tc3RhcnRzLW9u/LWEtY2Fub2xhLXN0/ZW0tNzY4eDEwMjQu/anBn",
        "DESCRIPTON": "A fungal disease causing soft rot, wilting, and white cottony growth on infected plants like soybeans, sunflowers, and lettuce",
        "SOLUTIONS": "Practice crop rotation, improve air circulation, remove infected plant material, and apply fungicides if necessary."
    },
    {
        "NAME": "Bacterial wilt",
        "IMAGE": "https://imgs.search.brave.com/zBiqD9jh-0chdknnyJjnKgV84fsxPEMmtdgHYTXKPDo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/cGxhbmV0bmF0dXJh/bC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMTIvMTIvZnVz/YXJpdW0td2lsdC10/b21hdG8uanBn",
        "DESCRIPTON": "A disease caused by bacteria like Ralstonia solanacearum, leading to wilting, yellowing, and death of crops such as tomatoes, peppers, and cucumbers.",
        "SOLUTIONS": "Use disease-resistant varieties, practice crop rotation, and manage insect vectors. There are no effective chemical treatments for bacterial wilt.\n"
    },
    {
        "NAME": "Rice blast",
        "IMAGE": "https://imgs.search.brave.com/v7j-cOu_L8Is-7xQWrKCCsVD5_m4JgOSf26uA55pDeI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9i/L2IwL1JpY2VfYmxh/c3Rfc3ltcHRvbXMu/anBn",
        "DESCRIPTON": "A fungal disease affecting rice crops, characterized by grayish or whitish lesions with dark borders on leaves, stems, and grains.",
        "SOLUTIONS": "Plant resistant varieties, apply fungicides during critical stages, practice good water management, and remove infected plant material."
    },
    {
        "NAME": "Blackleg",
        "IMAGE": "https://imgs.search.brave.com/WhTSLEFZQUmgDVkVOlEcKsvLll-_ZZul--dMQ96iBMU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2Fub2xhY291bmNp/bC5vcmcvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjAvMDcvQ2Fu/b2xhLXN0ZW1zLXdp/dGgtdmVydGljaWxs/aXVtLXN0cmlwZS1s/ZWZ0LWJsYWNrbGVn/LW1pZGRsZS1hbmQt/aGVhbHRoeS0xMDI0/eDc2OC5qcGc",
        "DESCRIPTON": "A bacterial disease causing dark, sunken lesions on the stems of Brassica crops like cabbage, broccoli, and canola, leading to wilting and plant death.",
        "SOLUTIONS": "Use disease-free planting material, practice crop rotation, and remove infected plant debris."
    }
]
    diseases = {'diseases':disease_list}

    return jsonify(diseases)


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
@app.post('/api/v1/messaging')
@cross_origin()
def notify():
    """
    {
      'phone':+(code)XXXXXXXXX,
      'message':'test message',
    }
    """
    data = request.get_json()
    try:
        phone = data['phone']
    except KeyError:
        return {"error":"phone number is required in the format +(code)xxxxxxxxx"}
    try:
        message = data['message']
    except KeyError:
        message = """
Hello! 👋
Thank you for signing up for AGRISOLVE notifications. We're excited to have you as part of the AGRISOLVE community!
AGRISOLVE uses advanced technology to provide farmers with data-driven insights to improve crop yields and efficiency. By signing up for SMS alerts, you'll receive helpful notifications right on your phone to keep you up-to-date.
Notifications may include:
- Weather alerts 🌧️
- Pest and disease warnings 🐛
- Crop pricing and market information 💰
Our goal is to make agriculture more profitable and sustainable using the power of technology. We hope these notifications provide value and make your life a little easier.
Thank you for choosing AGRISOLVE as your smart farming partner! Let us know if you have any other questions.
Happy growing! 🌾
- The AGRISOLVE Team 👩‍🌾👨‍🌾
        """
    account_sid = os.getenv('account_sid')
    auth_token = os.getenv('auth_token')
    client = tw_client(account_sid, auth_token)

    message = client.messages.create(
        messaging_service_sid=os.getenv('messaging_service_sid'),
        body=message,
        to=phone
)

    return {"message":message.sid}

#MPESA LOGIC
key = os.getenv('MPESA_KEY')
secret = os.getenv('MPESA_SECRET')

def send_stk_push(phone: str, amount: int,token:str)->str:
  """
  {
  'number': '254712345678',
  'amount': '100',
  
  }
  """
  api_URL = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest'

  timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
  password = '174379' + key + timestamp
  headers = {
      'Authorization': 'Bearer '+token,
      'Content-Type': 'application/json'
  }
  password = '174379' + 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' + timestamp
  password = password.encode('ascii')
  password = base64.b64encode(password).decode('utf8')

  request = {
      'BusinessShortCode': '174379',
      'Password': f"{password}",
      'Timestamp': timestamp,
      'TransactionType': 'CustomerPayBillOnline',
      'Amount': amount,
      'PartyA': f"{phone}",
      'PartyB': 174379,
      'PhoneNumber': f"{phone}",
      'CallBackURL': 'https://agri-solve-microservice.vercel.app/mpesa-callback',#update with the url to your own callback
      'AccountReference': 'Agrisolve',
      'TransactionDesc': 'AGRI-PAY'
  }

  response = requests.post(api_URL, json=request, headers=headers)
  try:
    return response.json()['CheckoutRequestID']
  except KeyError:
    print(response.content)
    return "Error"

@app.route('/api/v1/mpesa/stk_push', methods=['POST'])
@cross_origin()
def mpesa_stkpush():
  data = request.get_json()
  
  #get access token
  key = os.getenv('MPESA_KEY')
  secret = os.getenv('MPESA_SECRET')
  url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  print(requests.get(url,auth=HTTPBasicAuth(key, secret)))
  access_token = requests.get(url,auth=HTTPBasicAuth(key, secret)).json()['access_token']
  
  
  #send stk push
  try:
    rqst_id = send_stk_push(data['phone'], data['amount'],access_token)
    return jsonify({'message': 'success', 'rqst_id': rqst_id})
  except requests.JSONDecodeError:
    return jsonify({"error": "Invalid Request"})

@app.route('/mpesa-callback', methods=['POST', 'OPTIONS'])
@cross_origin()
def receive_mpesa():
  data = json.loads(request.get_data().decode('utf8'))
  #creds to supabase
  url = os.getenv('SUPABASE_URL')
  key = os.getenv('SUPABASE_KEY')
  supabase: Client = create_client(url, key)
  body = data['Body']['stkCallback']
  supabase.table('transactions').insert({"MerchantRequestID":body['MerchantRequestID'],"CheckoutRequestID":body['CheckoutRequestID'],"ResultCode":body['ResultCode'],"ResultDesc":body['ResultDesc']}).execute()
  return jsonify(data)

@app.post('/api/v1/mpesa/confirm_transaction')
@cross_origin()
def confirm_transaction():
  """
  {
  'message': 'success',
  'rqst_id': rqst_id
  }
  
  """
  #confirm transaction
  try:
    #creds to supabase
    msg = "Confirmation not yet received"
    url = os.getenv('SUPABASE_URL')
    key = os.getenv('SUPABASE_KEY')
    
    rqst_id = request.get_json()['rqst_id']
  
    print("request id: ",rqst_id)
    supabase: Client = create_client(url, key)
    response = supabase.table('transactions').select('*').eq(
          'CheckoutRequestID', rqst_id).execute().data
    while True:
        if response:
            msg = response[0]['ResultDesc']
            break
        time.sleep(1)
    return jsonify({"message":msg})
  except requests.JSONDecodeError:
    return jsonify({"error": "Invalid Request"})

if __name__ == "__main__":
    app.run(debug = True, port=5000)
