import { Siren, Phone, MapPin } from 'lucide-react';

interface EmergencyBannerProps {
  emergencyNumber?: string;
  onFindEmergency: () => void;
}

export default function EmergencyBanner({
  emergencyNumber = '112',
  onFindEmergency,
}: EmergencyBannerProps) {
  return (
    <div className="bg-danger-600 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center gap-3 justify-between">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 animate-pulse-ring">
            <Siren className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium">
            Your symptoms may indicate a medical emergency.{' '}
            <span className="font-bold">Seek urgent medical attention now.</span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={`tel:${emergencyNumber}`}
            className="flex items-center gap-2 bg-white text-danger-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-danger-50 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call {emergencyNumber}
          </a>
          <button
            onClick={onFindEmergency}
            className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
          >
            <MapPin className="w-4 h-4" />
            Find ER
          </button>
        </div>
      </div>
    </div>
  );
}
