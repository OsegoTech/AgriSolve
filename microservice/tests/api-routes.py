import base64
import requests 
from dotenv import load_dotenv
import os

load_dotenv()
def image_to_base64():
    url = input("Enter image url: ")
    response = requests.get(url)
    image_bytes = response.content
    base64_bytes = base64.b64encode(image_bytes)
    base64_string = base64_bytes.decode('utf-8') 


def detect_crop_disease():
    url = "http://127.0.0.1:5000/api/v1/crop-disease-detection"
    r = requests.post(url,json = {"image":f"{base64_string}"})
    print(r.text.strip())

def detect_pest_disease():
    url = "http://127.0.0.1:5000/api/v1/pest-classification"
    r = requests.post(url, json = {"image":f"{base64_string}"})
    print(r.text)

def detect_crop():
    response = requests.post(
    "https://api.plant.id/v2/health_assessment",
    json={
        "images": f"{base64_string}",
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
def detect_crop_detailed():
    url = "http://127.0.0.1:5000/api/v1/crop-disease-detection/detailed"
    resp = requests.post(url,json={'image':base64_string}).json()
    return resp

def weather_current():
    url = "http://127.0.0.1:5000/api/v1/current_weather"
    resp = requests.post(url,json={'latitude':53.7,'longitude':28.3}).json()
    return resp

def weather_forecast():
    url = "http://127.0.0.1:5000/api/v1/forecast"
    resp = requests.post(url,json={'latitude':53.7,'longitude':28.3}).text
    return resp 
def send_message():
    url = "http://127.0.0.1:5000/api/v1/messaging"
    resp = requests.post(url,json={'phone':'+254702716555','message':'hello'}).content
    print(resp)
send_message()
