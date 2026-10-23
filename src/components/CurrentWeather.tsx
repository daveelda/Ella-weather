import { Droplets, Wind, Thermometer, Sunrise, Sunset } from 'lucide-react';
import type { WeatherData } from '../types/weather';
import { getWeatherCondition } from '../utils/weatherCodes';
import { formatLocalDateTime, formatTime } from '../utils/dateUtils';
import './CurrentWeather.css';

interface CurrentWeatherProps {
  data: WeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const { location, weather } = data;
  const current = weather.current;
  const daily = weather.daily;
  const { label, Icon } = getWeatherCondition(current.weather_code);
  const dateTimeStr = formatLocalDateTime(weather.timezone);
  const sunrise = daily.sunrise?.[0] ? formatTime(daily.sunrise[0], weather.timezone) : null;
  const sunset = daily.sunset?.[0] ? formatTime(daily.sunset[0], weather.timezone) : null;

  return (
    <div className="current-weather">
      <div className="cw-top">
        <div className="cw-location">
          <h2 className="cw-city">
            {location.name}
            {location.admin1 && location.admin1 !== location.name && (
              <span className="cw-region">, {location.admin1}</span>
            )}
          </h2>
          <p className="cw-country">{location.country}</p>
          <p className="cw-datetime">{dateTimeStr}</p>
        </div>
        <div className="cw-condition">
          <div className="cw-condition-icon" aria-label={label}>
            <Icon size={56} strokeWidth={1.4} />
          </div>
          <p className="cw-condition-label">{label}</p>
        </div>
      </div>

      <div className="cw-temp-block">
        <span className="cw-temp" aria-label={`${Math.round(current.temperature_2m)} degrees Celsius`}>
          {Math.round(current.temperature_2m)}
        </span>
        <span className="cw-unit">°C</span>
      </div>

      <div className="cw-stats">
        <div className="cw-stat">
          <Thermometer size={18} aria-hidden="true" />
          <div>
            <span className="cw-stat-label">Feels like</span>
            <span className="cw-stat-value">{Math.round(current.apparent_temperature)}°C</span>
          </div>
        </div>
        <div className="cw-stat">
          <Droplets size={18} aria-hidden="true" />
          <div>
            <span className="cw-stat-label">Humidity</span>
            <span className="cw-stat-value">{current.relative_humidity_2m}%</span>
          </div>
        </div>
        <div className="cw-stat">
          <Wind size={18} aria-hidden="true" />
          <div>
            <span className="cw-stat-label">Wind</span>
            <span className="cw-stat-value">{Math.round(current.wind_speed_10m)} km/h</span>
          </div>
        </div>

        {sunrise && (
          <div className="cw-stat">
            <Sunrise size={18} aria-hidden="true" />
            <div>
              <span className="cw-stat-label">Sunrise</span>
              <span className="cw-stat-value">{sunrise}</span>
            </div>
          </div>
        )}

        {sunset && (
          <div className="cw-stat">
            <Sunset size={18} aria-hidden="true" />
            <div>
              <span className="cw-stat-label">Sunset</span>
              <span className="cw-stat-value">{sunset}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
