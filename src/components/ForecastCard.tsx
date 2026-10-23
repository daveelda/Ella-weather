import { getWeatherCondition } from '../utils/weatherCodes';
import { formatDayDate } from '../utils/dateUtils';
import './ForecastCard.css';

interface ForecastCardProps {
  dateStr: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
}

export default function ForecastCard({ dateStr, weatherCode, tempMax, tempMin }: ForecastCardProps) {
  const { label, Icon } = getWeatherCondition(weatherCode);
  const { day, date } = formatDayDate(dateStr);

  return (
    <article className="forecast-card" aria-label={`${day} forecast`}>
      <div className="fc-day">{day}</div>
      <div className="fc-date">{date}</div>
      <div className="fc-icon" aria-label={label}>
        <Icon size={40} strokeWidth={1.4} />
      </div>
      <div className="fc-condition">{label}</div>
      <div className="fc-temps">
        <span className="fc-max" title="High">{Math.round(tempMax)}°</span>
        <span className="fc-divider">/</span>
        <span className="fc-min" title="Low">{Math.round(tempMin)}°</span>
      </div>
    </article>
  );
}
