import axios from "axios";

/**
 * Fetches weather data for a given location from the FastAPI backend.
 * @param {string} location
 * @returns {Promise<{ data: object, source: string }>}
 */
export async function fetchWeather(location) {
  const res = await axios.get(`https://weather-app-21ec.onrender.com/weather/${encodeURIComponent(location.trim())}`);
  const data = res.data;

  if (data.error) throw new Error(data.error);

  if (data.source === "cache") {
    return { data: data.output, source: "cache" };
  }

  if (data.output && typeof data.output === "object") {
    return { data: data.output, source: "api" };
  }

  throw new Error(data.output || data.message || "Unknown error occurred.");
}
