from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
from dotenv import load_dotenv
import os,json
import requests
from upstash_redis import Redis
# import redis


load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WEATHER_API_URL = os.getenv("WEATHER_API_URL")
WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

# print(type(WEATHER_API_URL))
parameters = {
    'key' : WEATHER_API_KEY,
}
redis_url = str(os.getenv("REDIS_URL"))
redis_token = str(os.getenv("REDIS_TOKEN"))

redis_client = Redis(url=redis_url, token= redis_token)


@app.get('/weather/{location}')
def get_weather(location : str):

    try:
        cache_key = location
        cache_value = redis_client.get(cache_key)
        if cache_value:
            result = json.loads(cache_value) # type: ignore
            return {
                "source" : "cache",
                "output" :  result
            }
        data = requests.get(str(WEATHER_API_URL)+location,params=parameters)

        if data.status_code in range(200,300):
            result = data.json()
            output = {
                "city" : result['address'],
                "timezone" : result['timezone'],
                "datetime" : result['currentConditions']['datetime'],
                "temprature" : result["currentConditions"]['temp'],
                "humidity" : result['currentConditions']['humidity'],
                "wind_speed" : result['currentConditions']['windspeed'],
                "condition" : result['currentConditions']['conditions']
            }
            message = "ok"
        elif data.status_code in range(300,400):
            output = "Requested site is moved."
            message = "moved"
        elif data.status_code in range(400,500):
            match data.status_code:
                case 404:
                    output = "Details not found. Make sure yiu give the correct information."
                    message = "Not found"
                case 401:
                    output = "Access blocked | Authontication needed | Check you API key."
                    message = "Access denied"
                case 403:
                    output = "Unauthized request"
                    message = "Access denied"
                case _:
                    output = "not found"
                    message = "Try again"

        elif data.status_code in range(500,600):
            output = "Internal server error"
            message = "Try after some time."
        redis_client.setex(cache_key,3600,json.dumps(output))
        return {
            "statusCode" : data.status_code,
            "output" : output,
            "message" : message
        }
    except requests.exceptions.ConnectionError:
        return {"error": "Cannot connect to weather service"}

    except requests.exceptions.Timeout:
        return {"error": "Weather service timeout"}

    # except json.JSONDecodeError:
    #     return {"error": "Invalid response from weather API"}
    # except Redis.ResponseError:
    #     return {"error" : "Unidentified format of output"}
    # except Redis:
        # return {"error" : "redish is not conntected"}
    # except Redis.TimeoutError:
    #     return {"error" : "request timed out."}