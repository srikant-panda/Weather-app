import { useState } from "react";
import { fetchWeather } from "../api/weather";

/**
 * Custom hook that manages weather fetch state.
 * Returns { weather, source, loading, error, search }
 */
export function useWeather() {
  const [weather, setWeather]   = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error,   setError]     = useState("");

  const search = async (location) => {
    if (!location.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const result = await fetchWeather(location);
      setWeather(result.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.output ||
        err.message ||
        "Failed to connect to the weather service."
      );
    } finally {
      setLoading(false);
    }
  };

  return { weather, loading, error, search };
}
