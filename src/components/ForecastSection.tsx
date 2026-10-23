import type { DailyWeather } from '../types/weather';
import ForecastCard from './ForecastCard';
import './ForecastSection.css';

interface ForecastSectionProps {
  daily: DailyWeather;
  timezone: string;
}

export default function ForecastSection({ daily }: ForecastSectionProps) {
  // Index 0 is today; show indices 1, 2, 3 (next 3 days)
  const forecastDays = daily.time.slice(1, 4);
  const forecastCodes = daily.weather_code.slice(1, 4);
  const forecastMax = daily.temperature_2m_max.slice(1, 4);
  const forecastMin = daily.temperature_2m_min.slice(1, 4);

  if (forecastDays.length === 0) return null;

  return (
    <section className="forecast-section" aria-label="3-day forecast">
      <h3 className="forecast-heading">3-Day Forecast</h3>
      <div className="forecast-grid">
        {forecastDays.map((dateStr, i) => (
          <ForecastCard
            key={dateStr}
            dateStr={dateStr}
            weatherCode={forecastCodes[i]}
            tempMax={forecastMax[i]}
            tempMin={forecastMin[i]}
          />
        ))}
      </div>
    </section>
  );
}
