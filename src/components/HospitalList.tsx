import { MapPin, Clock, Navigation, Loader2, Hospital as HospitalIcon, SearchX, Phone, AlertCircle, CloudOff } from 'lucide-react';
import type { Hospital } from '@/lib/types';

interface HospitalListProps {
  hospitals: Hospital[];
  loading: boolean;
  location: string;
  emergencyOnly?: boolean;
  error?: string | null;
}

const EMERGENCY_NUMBER = '112';

export default function HospitalList({ hospitals, loading, location, emergencyOnly, error }: HospitalListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center animate-fade-in">
        <Loader2 className="w-8 h-8 text-primary-500 mx-auto mb-3 animate-spin" />
        <p className="text-neutral-600 font-medium">Searching for healthcare facilities near {location}...</p>
        <p className="text-sm text-neutral-400 mt-1">This uses live map data and may take a few seconds.</p>
      </div>
    );
  }

  if (error && hospitals.length === 0) {
    const isServiceError = error.includes('temporarily unavailable');
    return (
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
          {isServiceError ? (
            <CloudOff className="w-6 h-6 text-neutral-400" />
          ) : (
            <SearchX className="w-6 h-6 text-neutral-400" />
          )}
        </div>
        <p className="text-neutral-700 font-medium">
          {isServiceError
            ? 'Healthcare data service temporarily unavailable.'
            : 'No healthcare facilities found near this location.'}
        </p>
        <p className="text-sm text-neutral-400 mt-1">
          {isServiceError
            ? 'The map data service could not be reached. Please try again shortly.'
            : 'Try a more specific place name, or a nearby larger town or city.'}
        </p>
        <a
          href={`tel:${EMERGENCY_NUMBER}`}
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-danger-600 hover:bg-danger-700 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          <Phone className="w-4 h-4" />
          For emergencies call {EMERGENCY_NUMBER}
        </a>
      </div>
    );
  }

  if (hospitals.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
          <SearchX className="w-6 h-6 text-neutral-400" />
        </div>
        <p className="text-neutral-700 font-medium">No healthcare facilities found near this location.</p>
        <p className="text-sm text-neutral-400 mt-1">
          Try a more specific place name, or a nearby larger town or city.
        </p>
        <a
          href={`tel:${EMERGENCY_NUMBER}`}
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-danger-600 hover:bg-danger-700 text-white font-semibold rounded-lg text-sm transition-colors"
        >
          <Phone className="w-4 h-4" />
          For emergencies call {EMERGENCY_NUMBER}
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-neutral-500">
          <span className="font-semibold text-neutral-700">{hospitals.length}</span> facilit{hospitals.length === 1 ? 'y' : 'ies'} near {location}
        </p>
        <p className="text-xs text-neutral-400">
          {emergencyOnly ? 'Emergency-capable facilities prioritized' : 'Sorted by emergency capability and distance'}
        </p>
      </div>

      {emergencyOnly && (
        <div className="bg-danger-50 border border-danger-200 rounded-xl p-3 text-sm text-danger-700 font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          For a life-threatening emergency, call {EMERGENCY_NUMBER} immediately. Hospitals with emergency services are shown first.
        </div>
      )}

      {error && hospitals.length > 0 && (
        <div className="bg-accent-50 border border-accent-200 rounded-xl p-3 text-sm text-accent-700">
          Some map data may be incomplete. Showing available results below.
        </div>
      )}

      {hospitals.map((h, i) => (
        <div
          key={`${h.name}-${i}`}
          className={`bg-white rounded-2xl border p-5 hover:shadow-card transition-all duration-200 ${
            h.outsideInitialRadius ? 'border-accent-200' : 'border-neutral-200 hover:border-primary-200'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0 flex-1">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                h.emergencyService === 'Yes' ? 'bg-danger-50 text-danger-600' : 'bg-primary-50 text-primary-600'
              }`}>
                <HospitalIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold text-neutral-900 leading-snug">{h.name}</h4>
                <span className="text-xs text-neutral-500">{h.type}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
              {h.emergencyService === 'Yes' && (
                <span className="bg-danger-100 text-danger-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                  Emergency
                </span>
              )}
              {h.outsideInitialRadius && (
                <span className="bg-accent-100 text-accent-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                  Outside 10 km
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-neutral-600">
              <MapPin className="w-4 h-4 text-neutral-400 flex-shrink-0" />
              <span>{h.distance}{h.travelTime ? ` · ${h.travelTime}` : ''}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-600">
              <Clock className="w-4 h-4 text-neutral-400 flex-shrink-0" />
              <span className="truncate">{h.hours === 'Not available' ? 'Hours unknown' : h.hours}</span>
            </div>
          </div>

          <div className="mt-3 space-y-1.5 text-sm">
            <div>
              <span className="text-neutral-400">Address: </span>
              <span className="text-neutral-700">{h.address}</span>
            </div>
            <div>
              <span className="text-neutral-400">Service: </span>
              <span className="text-neutral-700">{h.relevantService}</span>
            </div>
          </div>

          <p className="mt-2 text-sm text-neutral-500 leading-relaxed">{h.whySuitable}</p>

          <a
            href={h.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary-600 hover:text-secondary-700 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Get directions
          </a>
        </div>
      ))}
    </div>
  );
}
