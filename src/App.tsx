import { useState, useCallback, useRef } from 'react';
import { geocodeCity } from './api/geocoding';
import { fetchWeather } from './api/weather';
import type { AppState } from './types/weather';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastSection from './components/ForecastSection';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [appState, setAppState] = useState<AppState>({ status: 'idle' });
  const requestIdRef = useRef(0);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const handleSearch = useCallback(async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const id = ++requestIdRef.current;
    setAppState({ status: 'loading' });

    try {
      const location = await geocodeCity(trimmed);
      if (id !== requestIdRef.current) return;

      const weather = await fetchWeather(location.latitude, location.longitude);
      if (id !== requestIdRef.current) return;

      setAppState({ status: 'success', data: { location, weather } });
    } catch (err) {
      if (id !== requestIdRef.current) return;
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setAppState({ status: 'error', message, retryQuery: trimmed });
    }
  }, []);

  const handleRetry = useCallback((query: string) => {
    handleSearch(query);
  }, [handleSearch]);

  return (
    <div className="app">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="app-main">
        <SearchBar onSearch={handleSearch} isLoading={appState.status === 'loading'} />

        {appState.status === 'loading' && <LoadingState />}

        {appState.status === 'error' && (
          <ErrorState
            message={appState.message}
            retryQuery={appState.retryQuery}
            onRetry={handleRetry}
          />
        )}

        {appState.status === 'success' && (
          <>
            <CurrentWeather data={appState.data} />
            <ForecastSection daily={appState.data.weather.daily} timezone={appState.data.weather.timezone} />
          </>
        )}

        {appState.status === 'idle' && <IdlePlaceholder />}
      </main>
    </div>
  );
}

function IdlePlaceholder() {
  return (
    <div className="idle-placeholder">
      <div className="idle-icon">🌤</div>
      <p className="idle-title">Search for any city to get started</p>
      <p className="idle-sub">Real-time weather data powered by Open-Meteo</p>
    </div>
  );
}
