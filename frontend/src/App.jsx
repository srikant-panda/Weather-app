import { useWeather } from "./hooks/useWeather";
import SearchForm from "./components/SearchForm";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const { weather, loading, error, search } = useWeather();

  return (
    <div className="app">
      <div className="container">
        <header>
          <h1 className="title">🌦️ Weather App</h1>
          <p className="subtitle">Get real-time weather for any city</p>
        </header>

        <SearchForm onSearch={search} loading={loading} />

        {error && <div className="error-box">⚠️ {error}</div>}
        {weather && <WeatherCard data={weather} />}
      </div>
    </div>
  );
}
