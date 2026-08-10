import type { Hospital } from './types';

const TAG = '[HealthGuide]';

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

const INITIAL_RADIUS = 10_000;
const Fallback_RADII = [10_000, 20_000, 30_000];
const MIN_FACILITIES = 3;
const REQUEST_TIMEOUT_MS = 25_000;

interface GeoLocation {
  lat: number;
  lon: number;
  displayName: string;
}

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  tags?: Record<string, string>;
  center?: { lat: number; lon: number };
  lat?: number;
  lon?: number;
}

export interface HospitalSearchResult {
  hospitals: Hospital[];
  error: string | null;
}

// ── Geocoding ──────────────────────────────────────────────────────────────

async function geocodeOnce(place: string): Promise<GeoLocation | null> {
  const params = new URLSearchParams({ q: place, format: 'json', limit: '1' });
  const url = `${NOMINATIM_URL}?${params.toString()}`;
  console.log(`${TAG} Geocoding: "${place}"`);
  try {
    const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
    if (!res.ok) {
      console.error(`${TAG} API ERROR: Nominatim returned HTTP ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    if (Number.isNaN(lat) || Number.isNaN(lon)) return null;
    console.log(`${TAG} Geocoded coordinates: ${lat}, ${lon} (${data[0].display_name})`);
    return { lat, lon, displayName: data[0].display_name };
  } catch (err) {
    console.error(`${TAG} API ERROR: Nominatim fetch failed —`, err);
    return null;
  }
}

async function geocode(place: string): Promise<GeoLocation | null> {
  const candidates = [place, `${place}, India`];
  for (const candidate of candidates) {
    const loc = await geocodeOnce(candidate);
    if (loc) return loc;
  }
  console.error(`${TAG} Geocoding failed for all candidates of "${place}"`);
  return null;
}

// ── Overpass ───────────────────────────────────────────────────────────────

function buildQuery(lat: number, lon: number, radius: number): string {
  return `[out:json][timeout:25];
    (
      nwr["amenity"="hospital"](around:${radius},${lat},${lon});
      nwr["amenity"="clinic"](around:${radius},${lat},${lon});
      nwr["amenity"="doctors"](around:${radius},${lat},${lon});
      nwr["amenity"="health_centre"](around:${radius},${lat},${lon});
    );
    out center tags;`;
}

async function fetchWithTimeout(url: string, body: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function queryOverpass(lat: number, lon: number, radius: number): Promise<OverpassElement[] | null> {
  const query = buildQuery(lat, lon, radius);
  for (const endpoint of OVERPASS_ENDPOINTS) {
    console.log(`${TAG} Overpass request: ${endpoint} (radius ${radius}m)`);
    try {
      const res = await fetchWithTimeout(endpoint, query);
      if (!res.ok) {
        console.error(`${TAG} API ERROR: ${endpoint} returned HTTP ${res.status}`);
        continue;
      }
      const data = await res.json();
      const elements: OverpassElement[] = data.elements || [];
      console.log(`${TAG} Overpass returned ${elements.length} elements from ${endpoint}`);
      return elements;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`${TAG} API ERROR: ${endpoint} fetch failed — ${msg}`);
      continue;
    }
  }
  console.error(`${TAG} All Overpass endpoints failed`);
  return null;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function estimateDriveTime(distanceKm: number): string {
  const avgSpeed = 35;
  const minutes = (distanceKm / avgSpeed) * 60;
  if (minutes < 1) return 'Less than 1 min';
  return `~${Math.round(minutes)} min drive`;
}

function getElementCoords(el: OverpassElement): { lat: number; lon: number } | null {
  if (el.type === 'node' && el.lat !== undefined && el.lon !== undefined) {
    return { lat: el.lat, lon: el.lon };
  }
  if (el.center && el.center.lat !== undefined && el.center.lon !== undefined) {
    return { lat: el.center.lat, lon: el.center.lon };
  }
  if (el.lat !== undefined && el.lon !== undefined) {
    return { lat: el.lat, lon: el.lon };
  }
  return null;
}

function buildAddress(tags: Record<string, string>): string {
  const parts: string[] = [];
  const street = tags['addr:street'];
  const housenumber = tags['addr:housenumber'];
  if (housenumber && street) parts.push(`${housenumber} ${street}`);
  else if (street) parts.push(street);
  const subdistrict = tags['addr:subdistrict'];
  if (subdistrict) parts.push(subdistrict);
  const city = tags['addr:city'] || tags['addr:town'] || tags['addr:village'] || tags['addr:county'];
  if (city) parts.push(city);
  const state = tags['addr:state'];
  if (state) parts.push(state);
  const postcode = tags['addr:postcode'];
  if (postcode) parts.push(postcode);
  if (parts.length === 0) return 'Not available';
  return parts.join(', ');
}

function classifyFacility(tags: Record<string, string>): {
  type: string;
  relevantService: string;
  emergencyService: 'Yes' | 'No' | 'Unknown';
} {
  if (tags.amenity === 'hospital') {
    const emergency = tags.emergency === 'yes' ? 'Yes' : tags.emergency === 'no' ? 'No' : 'Unknown';
    const service =
      tags.healthcare === 'specialty' && tags['healthcare:speciality']
        ? tags['healthcare:speciality']
        : 'General medical care';
    return { type: 'Hospital', relevantService: service, emergencyService: emergency };
  }
  if (tags.amenity === 'health_centre') {
    const emergency = tags.emergency === 'yes' ? 'Yes' : 'Unknown';
    return { type: 'Health Centre', relevantService: 'Primary and community health services', emergencyService: emergency };
  }
  if (tags.amenity === 'clinic') {
    const service =
      tags.healthcare === 'specialty' && tags['healthcare:speciality']
        ? tags['healthcare:speciality']
        : 'Primary care clinic';
    return { type: 'Clinic', relevantService: service, emergencyService: 'No' };
  }
  if (tags.amenity === 'doctors') {
    const specialty = tags.healthcare === 'specialty' && tags['healthcare:speciality']
      ? tags['healthcare:speciality']
      : 'General practitioner';
    return { type: 'Doctor', relevantService: specialty, emergencyService: 'No' };
  }
  return { type: 'Healthcare facility', relevantService: 'Medical services', emergencyService: 'Unknown' };
}

function elementsToHospitals(
  elements: OverpassElement[],
  origin: GeoLocation,
  currentRadius: number,
  initialRadius: number,
): Hospital[] {
  const facilities: Hospital[] = [];
  for (const el of elements) {
    if (!el.tags) continue;
    const name = el.tags.name || el.tags['name:en'];
    if (!name) continue;

    const coords = getElementCoords(el);
    if (!coords) continue;

    const tags = el.tags;
    const distanceKm = haversine(origin.lat, origin.lon, coords.lat, coords.lon);
    const { type, relevantService, emergencyService } = classifyFacility(tags);

    const hours = tags.opening_hours || 'Not available';
    const address = buildAddress(tags);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lon}`;
    const outsideInitialRadius = distanceKm * 1000 > initialRadius;

    let whySuitable = `${type} offering ${relevantService.toLowerCase()}.`;
    if (emergencyService === 'Yes') whySuitable += ' Emergency services reported available.';
    if (distanceKm < 5) whySuitable += ' Very close to your location.';
    if (outsideInitialRadius) whySuitable += ' Outside the initial 10 km search — included as a fallback option.';

    facilities.push({
      name,
      type,
      distance: `${distanceKm.toFixed(1)} km`,
      travelTime: estimateDriveTime(distanceKm),
      address,
      relevantService,
      emergencyService,
      hours,
      whySuitable,
      mapsUrl,
      outsideInitialRadius,
      lat: coords.lat,
      lon: coords.lon,
    });
  }
  console.log(`${TAG} Facilities after filtering (named + coordinated): ${facilities.length}`);
  return facilities;
}

function sortFacilities(facilities: Hospital[], emergencyMode: boolean): Hospital[] {
  const typeRank: Record<string, number> = {
    Hospital: 0,
    'Health Centre': 1,
    Clinic: 2,
    Doctor: 3,
    'Healthcare facility': 4,
  };

  return facilities.sort((a, b) => {
    const aEmergency = a.emergencyService === 'Yes';
    const bEmergency = b.emergencyService === 'Yes';

    if (emergencyMode) {
      if (aEmergency && !bEmergency) return -1;
      if (!aEmergency && bEmergency) return 1;
      const typeDiff = (typeRank[a.type] ?? 5) - (typeRank[b.type] ?? 5);
      if (typeDiff !== 0) return typeDiff;
    } else {
      if (aEmergency && !bEmergency) return -1;
      if (!aEmergency && bEmergency) return 1;
    }

    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    return distA - distB;
  });
}

function deduplicate(facilities: Hospital[]): Hospital[] {
  const seen = new Set<string>();
  const result: Hospital[] = [];
  for (const f of facilities) {
    const key = f.name.toLowerCase().trim();
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(f);
  }
  return result;
}

// ── Public API ─────────────────────────────────────────────────────────────

export async function findHospitals(
  place: string,
  options?: { emergencyMode?: boolean; maxResults?: number },
): Promise<HospitalSearchResult> {
  const emergencyMode = options?.emergencyMode ?? false;
  const maxResults = options?.maxResults ?? 10;

  console.log(`${TAG} User location: "${place}"`);

  const location = await geocode(place);
  if (!location) {
    return {
      hospitals: [],
      error: `Could not find the location "${place}" on the map. Try a more specific place name, or include the state and country.`,
    };
  }

  let allFacilities: Hospital[] = [];
  let lastError: string | null = null;
  let lastRadiusUsed = 0;

  for (const radius of Fallback_RADII) {
    const elements = await queryOverpass(location.lat, location.lon, radius);
    if (elements === null) {
      lastError = 'Healthcare data service is temporarily unavailable. Please try again in a moment.';
      continue;
    }

    lastError = null;
    lastRadiusUsed = radius;
    const facilities = elementsToHospitals(elements, location, radius, INITIAL_RADIUS);
    allFacilities = deduplicate([...allFacilities, ...facilities]);

    console.log(`${TAG} Cumulative unique facilities: ${allFacilities.length} (after ${radius / 1000}km search)`);

    if (allFacilities.length >= MIN_FACILITIES) break;
  }

  if (allFacilities.length === 0) {
    if (lastError) {
      return { hospitals: [], error: lastError };
    }
    return {
      hospitals: [],
      error: `No healthcare facilities were found within ${lastRadiusUsed / 1000} km of "${place}" in the map data. Try a nearby larger town or city.`,
    };
  }

  const sorted = sortFacilities(allFacilities, emergencyMode);
  const finalHospitals = sorted.slice(0, maxResults);
  console.log(`${TAG} Final facilities: ${finalHospitals.length}`);
  for (const h of finalHospitals) {
    console.log(`${TAG}   - ${h.name} (${h.distance}, ${h.type}, ER:${h.emergencyService})`);
  }

  return { hospitals: finalHospitals, error: null };
}
