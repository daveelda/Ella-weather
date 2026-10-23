export interface GeocodingResult {
  name: string;
  country: string;
  country_code: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  daily: DailyWeather;
  timezone: string;
  timezone_abbreviation: string;
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
  };
}

export interface WeatherData {
  location: GeocodingResult;
  weather: WeatherResponse;
}

export type AppState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: WeatherData }
  | { status: 'error'; message: string; retryQuery?: string };
