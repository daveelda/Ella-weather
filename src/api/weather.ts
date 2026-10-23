import type { WeatherResponse } from '../types/weather';

const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeather(latitude: number, longitude: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
    forecast_days: '4',
    timezone: 'auto',
  });

  const response = await fetch(`${WEATHER_URL}?${params}`);
  if (!response.ok) {
    throw new Error(`Weather data unavailable (HTTP ${response.status}). Please try again.`);
  }
  const data: WeatherResponse = await response.json();
  return data;
}
