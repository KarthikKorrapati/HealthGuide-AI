import { HeartPulse, History } from 'lucide-react';

interface HeaderProps {
  onShowHistory: () => void;
  historyCount: number;
}

export default function Header({ onShowHistory, historyCount }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-soft">
            <HeartPulse className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-display font-bold text-lg text-neutral-900 leading-none">
              HealthGuide
            </span>
            <span className="block text-[11px] text-primary-600 font-medium leading-none mt-0.5">
              AI Symptom & Hospital Finder
            </span>
          </div>
        </div>

        <button
          onClick={onShowHistory}
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
        >
          <History className="w-4 h-4" />
          <span className="hidden sm:inline">History</span>
          {historyCount > 0 && (
            <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
              {historyCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
