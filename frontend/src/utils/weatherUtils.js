const ICONS = {
  sunny:  "☀️",
  clear:  "🌤️",
  rain:   "🌧️",
  snow:   "❄️",
  cloud:  "☁️",
  storm:  "⛈️",
  fog:    "🌫️",
  wind:   "💨",
  default:"🌡️",
};

/**
 * Returns an emoji icon that matches the condition string.
 * @param {string} condition
 * @returns {string}
 */
export function getWeatherIcon(condition = "") {
  const c = condition.toLowerCase();
  if (c.includes("sun") || c.includes("sunny"))       return ICONS.sunny;
  if (c.includes("clear"))                            return ICONS.clear;
  if (c.includes("rain") || c.includes("drizzle"))   return ICONS.rain;
  if (c.includes("snow"))                             return ICONS.snow;
  if (c.includes("storm") || c.includes("thunder"))  return ICONS.storm;
  if (c.includes("fog")   || c.includes("mist"))     return ICONS.fog;
  if (c.includes("cloud") || c.includes("overcast")) return ICONS.cloud;
  if (c.includes("wind"))                             return ICONS.wind;
  return ICONS.default;
}
