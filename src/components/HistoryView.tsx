import { Trash2, ArrowLeft, Clock, MapPin, Activity } from 'lucide-react';
import type { ConsultationRecord } from '@/lib/types';

interface HistoryViewProps {
  records: ConsultationRecord[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

const TRIAGE_BADGE: Record<number, { label: string; cls: string }> = {
  1: { label: 'Self-care', cls: 'bg-success-100 text-success-700' },
  2: { label: 'Doctor', cls: 'bg-secondary-100 text-secondary-700' },
  3: { label: 'Same-day', cls: 'bg-accent-100 text-accent-700' },
  4: { label: 'Emergency', cls: 'bg-danger-100 text-danger-700' },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

export default function HistoryView({ records, onBack, onDelete }: HistoryViewProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-1">Consultation History</h2>
      <p className="text-neutral-500 mb-6">Your past health guidance lookups, stored on this device's database.</p>

      {records.length === 0 ? (
        <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7 text-neutral-400" />
          </div>
          <p className="text-neutral-600 font-medium">No consultations yet.</p>
          <p className="text-sm text-neutral-400 mt-1">Your past guidance sessions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {records.map((r) => {
            const badge = TRIAGE_BADGE[r.triage_level ?? 2] ?? TRIAGE_BADGE[2];
            return (
              <div key={r.id} className="bg-white rounded-2xl border border-neutral-200 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.cls} flex items-center gap-1.5`}>
                        <Activity className="w-3 h-3" />
                        {badge.label}
                      </span>
                      <span className="text-xs text-neutral-400">{formatDate(r.created_at)}</span>
                    </div>
                    <p className="font-medium text-neutral-900 line-clamp-2">{r.symptoms}</p>
                    {r.location && (
                      <p className="text-sm text-neutral-500 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {r.location}
                      </p>
                    )}
                    {r.hospitals && r.hospitals.length > 0 && (
                      <p className="text-xs text-primary-600 mt-1.5 font-medium">
                        {r.hospitals.length} nearby facilit{r.hospitals.length === 1 ? 'y' : 'ies'} found
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onDelete(r.id)}
                    className="p-2 text-neutral-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors flex-shrink-0"
                    aria-label="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
