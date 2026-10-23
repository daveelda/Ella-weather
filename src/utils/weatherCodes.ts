import {
  Sun,
  CloudSun,
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  type LucideIcon,
} from 'lucide-react';

export interface WeatherCondition {
  label: string;
  Icon: LucideIcon;
}

export function getWeatherCondition(code: number): WeatherCondition {
  if (code === 0) return { label: 'Clear Sky', Icon: Sun };
  if (code === 1) return { label: 'Mainly Clear', Icon: Sun };
  if (code === 2) return { label: 'Partly Cloudy', Icon: CloudSun };
  if (code === 3) return { label: 'Overcast', Icon: Cloud };
  if (code === 45 || code === 48) return { label: 'Foggy', Icon: CloudFog };
  if (code >= 51 && code <= 57) return { label: 'Drizzle', Icon: CloudDrizzle };
  if (code >= 61 && code <= 67) return { label: 'Rain', Icon: CloudRain };
  if (code >= 71 && code <= 77) return { label: 'Snow', Icon: CloudSnow };
  if (code >= 80 && code <= 82) return { label: 'Rain Showers', Icon: CloudRain };
  if (code === 85 || code === 86) return { label: 'Snow Showers', Icon: CloudSnow };
  if (code >= 95 && code <= 99) return { label: 'Thunderstorm', Icon: CloudLightning };
  return { label: 'Unknown', Icon: Cloud };
}
