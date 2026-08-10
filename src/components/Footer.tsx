import { HeartPulse } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
              <HeartPulse className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-white">HealthGuide</span>
          </div>
          <p className="text-xs text-neutral-400 text-center sm:text-right max-w-md leading-relaxed">
            HealthGuide provides general educational information and healthcare navigation. It does not
            diagnose, prescribe, or replace professional medical care. Always consult a qualified
            healthcare provider for medical concerns.
          </p>
        </div>
        <div className="mt-6 pt-6 border-t border-neutral-800 text-center text-xs text-neutral-500">
          Hospital data from OpenStreetMap contributors. Not a medical device.
        </div>
      </div>
    </footer>
  );
}
