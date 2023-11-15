# Agriculture Microservice API

This is a microservice API built with Flask to provide agriculture-related capabilities to Agrisolve.

## Endpoints

The API has the following endpoints:

- `POST /api/v1/crop-disease-detection` - Detect crop disease from image
- `POST /api/v1/crop-disease-detection/detailed` - Detailed crop disease detection
- `POST /api/v1/pest-classification` - Identify pests from images  
- `POST /api/v1/current_weather` - Get current weather data
- `POST /api/v1/forecast` - Get 7-day weather forecast

## Usage

The API expects JSON data in the request body for images and location coordinates. 

To detect crop disease from image:

```
POST /api/v1/crop-disease-detection
{

    "image": "base64_encoded_image"  
}
```

To get detailed crop disease data:

```
POST /api/v1/crop-disease-detection/detailed

{
    "image": "base64_encoded_image" 
}
```

To identify pests:

```
POST /api/v1/pest-classification

{
    "image": "base64_encoded_image"
}
```

To get current weather data: 

```
POST /api/v1/current_weather

{
    "latitude": 53.7,
    "longitude": 28.3
}
```

To get a 7-day weather forecast:

```
POST /api/v1/forecast

{
    "latitude": 53.7,
    "longitude": 28.3 
}
```

Messages on Alerts and notifications:

This API allows sending SMS messages to notify users of alerts.

## API Endpoint

```python
@app.post('/api/v1/messaging')
``` 

## Usage

Make a POST request to the `/api/v1/messaging` endpoint with a JSON body containing the phone number and message:

```json
{
  "phone":"+11231231234",
  "message":"Hello, this is a test alert message!" 
}
```

The phone number should be in the format `+(countrycode)xxxxxxxxxx`. 

The message text will be sent as the SMS body. If no custom message is provided, a default message will be sent.

## Example Response

The API will return a JSON object with a message ID on success:

```json
{
  "message":"SMxxxxxxxxxxxxxxx" 
}
```

On error, it will return a JSON object with an error message, such as:

```json
{
  "error":"Phone number is required in format +(countrycode)xxxxxxxxxx"
}
```

## Running Locally

- Clone the repo
- Install requirements (`pip install -r requirements.txt`)
- Set `.env` variables for the different API keys
- Run `python app.py`
- The API will be live on `https://agri-solve-microservice.vercel.app` 

## Built With

- [Flask](https://flask.palletsprojects.com/) - API framework 
- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/) - CORS handling
- [requests](https://docs.python-requests.org/en/latest/) - API requests
- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/) - Web scraping
- Twilio Python SDK

## External Services

The API uses the following external services:

- [Plant.id](https://plant.id/) - Crop disease detection
- [Insect.ml](https://insect.ml) - Pest identification
- [WeatherAPI](https://www.weatherapi.com/) - Weather data
