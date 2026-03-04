# 🌦️ Weather App

A full-stack weather application that fetches real-time weather data for any city. Built with a **FastAPI** backend and a **React + Vite** frontend, with **Redis** caching to reduce redundant API calls.

---

## Features

- Search weather by city name
- Displays temperature, humidity, wind speed, condition, timezone, and local time
- Redis caching — repeated queries are served from cache (1-hour TTL)
- Clear source indicator: live API vs cached response
- Error handling for invalid cities, auth failures, and network issues

---

## Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Frontend | React 18, Vite, Axios                   |
| Backend  | FastAPI, Python, Uvicorn                |
| Cache    | Redis                                   |
| Weather  | [Visual Crossing Weather API](https://www.visualcrossing.com/) |

---

## Project Structure

```
Weather-api/
├── backend/
│   ├── main.py           # FastAPI app & weather endpoint
│   ├── redis_config.py   # Redis configuration
│   ├── requirement.txt   # Python dependencies
│   └── .env              # Environment variables (not committed)
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js    # Dev proxy: /weather → http://localhost:8000
    └── src/
        ├── App.jsx
        ├── api/
        │   └── weather.js        # Axios API calls
        ├── components/
        │   ├── SearchForm.jsx    # City search input
        │   └── WeatherCard.jsx   # Weather data display
        ├── hooks/
        │   └── useWeather.js     # State management hook
        └── utils/
            └── weatherUtils.js   # Weather icon helpers
```

---

## Prerequisites

- Python 3.10+
- Node.js 18+
- Redis server running on `localhost:6379`
- A [Visual Crossing](https://www.visualcrossing.com/) API key (free tier available)

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Weather-api
```

### 2. Backend

```bash
cd backend

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirement.txt

# Create the .env file
cp .env.example .env             # or create it manually
```

Add the following to `backend/.env`:

```env
WEATHER_API_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
WEATHER_API_KEY=your_api_key_here
```

### 3. Frontend

```bash
cd frontend
npm install
```

---

## Running the App

### Start Redis

```bash
redis-server
```

### Start the Backend

```bash
cd backend
source .venv/bin/activate
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

### Start the Frontend

```bash
cd frontend
npm run dev
```

The app will be available at `http://localhost:5173`.

> The Vite dev server proxies `/weather/*` requests to the FastAPI backend, so no CORS issues during development.

---

## API Reference

### `GET /weather/{location}`

Returns current weather conditions for the specified location.

**Example:**
```
GET /weather/London
```

**Response (from API):**
```json
{
  "statusCode": 200,
  "output": {
    "city": "London, England, United Kingdom",
    "timezone": "Europe/London",
    "datetime": "13:45:00",
    "temprature": 15.2,
    "humidity": 72.0,
    "wind_speed": 14.4,
    "condition": "Partially cloudy"
  },
  "message": "ok"
}
```

**Response (from cache):**
```json
{
  "source": "cache",
  "output": { ... }
}
```

---

## Environment Variables

| Variable          | Description                          |
| ----------------- | ------------------------------------ |
| `WEATHER_API_URL` | Base URL for the Visual Crossing API |
| `WEATHER_API_KEY` | Your Visual Crossing API key         |

---

## License

MIT
