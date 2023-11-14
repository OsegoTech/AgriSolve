import base64
import requests 
from dotenv import load_dotenv
import os

load_dotenv()

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
        for suggestion in response["health_assessment"]["diseases"]:
            return {"name": suggestion["name"],  # water deficiency
                    "suggestions":suggestion["disease_details"]["description"]}    # Water deficiency is...

print(detect_pest_disease())
