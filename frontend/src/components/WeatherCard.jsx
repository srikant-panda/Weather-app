import { getWeatherIcon } from "../utils/weatherUtils";
import "./WeatherCard.css";

function StatItem({ label, value }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default function WeatherCard({ data }) {
  const icon = getWeatherIcon(data.condition);

  return (
    <div className="weather-card">
      <div className="weather-icon">{icon}</div>
      <h2 className="city-name">{data.city}</h2>
      <p className="condition">{data.condition}</p>

      <div className="temp-display">
        {data.temprature}
        <span className="unit">°F</span>
      </div>

      <div className="stats-grid">
        <StatItem label="💧 Humidity"  value={`${data.humidity}%`} />
        <StatItem label="🌬️ Wind"      value={`${data.wind_speed} mph`} />
        <StatItem label="🌐 Timezone"  value={data.timezone} />
      </div>
    </div>
  );
}
