import type { GeocodingResult } from '../types/weather';

const OPEN_METEO_GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const PHOTON_URL = 'https://photon.komoot.io/api/';

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

async function geocodeOpenMeteo(query: string): Promise<GeocodingResult | null> {
  const params = new URLSearchParams({ name: query, count: '1', language: 'en', format: 'json' });
  const response = await fetchWithTimeout(`${OPEN_METEO_GEO_URL}?${params}`, 2000);
  if (!response.ok) return null;
  const data = await response.json();
  if (!data.results || data.results.length === 0) return null;
  const r = data.results[0];
  return {
    name: r.name,
    country: r.country,
    country_code: r.country_code,
    latitude: r.latitude,
    longitude: r.longitude,
    admin1: r.admin1,
  };
}

async function geocodePhoton(query: string): Promise<GeocodingResult | null> {
  const params = new URLSearchParams({ q: query, limit: '1', layer: 'city' });
  const response = await fetchWithTimeout(`${PHOTON_URL}?${params}`, 5000);
  if (!response.ok) return null;
  const data = await response.json();
  if (!data.features || data.features.length === 0) return null;
  const feature = data.features[0];
  const props = feature.properties;
  // Photon returns coordinates as [longitude, latitude]
  const [longitude, latitude] = feature.geometry.coordinates;
  return {
    name: props.name || props.city || query,
    country: props.country || '',
    country_code: props.country_code || '',
    latitude,
    longitude,
    admin1: props.state,
  };
}

export async function geocodeCity(query: string): Promise<GeocodingResult> {
  // Try Open-Meteo first with 2-second timeout
  try {
    const result = await geocodeOpenMeteo(query);
    if (result) return result;
  } catch {
    // timeout or network error — fall through to Photon
  }

  // Fallback to Photon
  try {
    const result = await geocodePhoton(query);
    if (result) return result;
  } catch {
    // both failed
  }

  throw new Error(`City "${query}" not found. Please try a different spelling or city name.`);
}
