import {
  Stethoscope,
  Search,
  CheckCircle2,
  AlertTriangle,
  Siren,
  Info,
  Activity,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import type { GuidanceResponse } from '@/lib/types';

interface GuidanceResultProps {
  guidance: GuidanceResponse;
  onScrollToHospitals: () => void;
  hasHospitals: boolean;
}

const TRIAGE_CONFIG: Record<
  number,
  { label: string; color: string; bgColor: string; borderColor: string; icon: typeof Activity }
> = {
  1: {
    label: 'Level 1 — Self-Care / Monitor',
    color: 'text-success-700',
    bgColor: 'bg-success-50',
    borderColor: 'border-success-200',
    icon: CheckCircle2,
  },
  2: {
    label: 'Level 2 — Doctor Consultation',
    color: 'text-secondary-700',
    bgColor: 'bg-secondary-50',
    borderColor: 'border-secondary-200',
    icon: Stethoscope,
  },
  3: {
    label: 'Level 3 — Same-Day Medical Care',
    color: 'text-accent-700',
    bgColor: 'bg-accent-50',
    borderColor: 'border-accent-200',
    icon: AlertTriangle,
  },
  4: {
    label: 'Level 4 — Emergency',
    color: 'text-danger-700',
    bgColor: 'bg-danger-50',
    borderColor: 'border-danger-200',
    icon: Siren,
  },
};

function Section({
  icon: Icon,
  title,
  children,
  accent,
}: {
  icon: typeof Info;
  title: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 animate-fade-in-up">
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent}`}>
          <Icon className="w-4 h-4" />
        </div>
        <h3 className="font-display font-bold text-neutral-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function GuidanceResult({ guidance, onScrollToHospitals, hasHospitals }: GuidanceResultProps) {
  const triage = TRIAGE_CONFIG[guidance.triageLevel] ?? TRIAGE_CONFIG[2];
  const TriageIcon = triage.icon;

  return (
    <div className="space-y-4">
      <div className={`rounded-2xl border-2 ${triage.borderColor} ${triage.bgColor} p-5 sm:p-6 animate-fade-in-up`}>
        <div className="flex items-start gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${triage.bgColor} border ${triage.borderColor}`}>
            <TriageIcon className={`w-6 h-6 ${triage.color}`} />
          </div>
          <div className="flex-1">
            <div className={`font-display font-bold text-lg ${triage.color}`}>{triage.label}</div>
            <p className="text-sm text-neutral-700 mt-1 leading-relaxed">{guidance.triageReason}</p>
          </div>
        </div>
      </div>

      <Section icon={Stethoscope} title="Understanding Your Symptoms" accent="bg-primary-50 text-primary-600">
        <p className="text-neutral-700 leading-relaxed">{guidance.understanding}</p>
      </Section>

      <Section icon={Search} title="Possible Causes" accent="bg-secondary-50 text-secondary-600">
        <ul className="space-y-2.5">
          {guidance.possibleCauses.map((cause, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-2.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-neutral-800">{cause.name}:</span>{' '}
                <span className="text-neutral-600">{cause.description}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-xs text-neutral-400 mt-3 italic">
          The symptoms alone cannot determine the exact cause. A healthcare professional can.
        </p>
      </Section>

      <Section icon={CheckCircle2} title="What You Can Do Now" accent="bg-success-50 text-success-600">
        <ul className="space-y-2.5">
          {guidance.selfCare.map((step, i) => (
            <li key={i} className="flex gap-3">
              <CheckCircle2 className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
              <span className="text-neutral-700">{step}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section icon={AlertTriangle} title="When to See a Doctor" accent="bg-accent-50 text-accent-600">
        <ul className="space-y-2.5">
          {guidance.whenToSeeDoctor.map((item, i) => (
            <li key={i} className="flex gap-3">
              <AlertTriangle className="w-4 h-4 text-accent-500 mt-0.5 flex-shrink-0" />
              <span className="text-neutral-700">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="rounded-2xl border-2 border-danger-200 bg-danger-50 p-5 sm:p-6 animate-fade-in-up">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-danger-100 text-danger-600">
            <Siren className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-danger-800">Emergency Warning Signs</h3>
        </div>
        <ul className="space-y-2.5">
          {guidance.emergencySigns.map((sign, i) => (
            <li key={i} className="flex gap-3">
              <Siren className="w-4 h-4 text-danger-500 mt-0.5 flex-shrink-0" />
              <span className="text-danger-800 font-medium">{sign}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-danger-700 mt-3 font-medium">
          If you experience any of these, seek emergency medical care immediately.
        </p>
      </div>

      {guidance.personalizationNotes.length > 0 && (
        <Section icon={Sparkles} title="Personalized for You" accent="bg-primary-50 text-primary-600">
          <ul className="space-y-2.5">
            {guidance.personalizationNotes.map((note, i) => (
              <li key={i} className="flex gap-3">
                <Sparkles className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-700">{note}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {hasHospitals && (
        <button
          onClick={onScrollToHospitals}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold rounded-xl shadow-card hover:shadow-float transition-all duration-200 hover:-translate-y-0.5"
        >
          View nearby healthcare options
          <ArrowRight className="w-4 h-4" />
        </button>
      )}

      <div className="flex items-start gap-2.5 bg-neutral-50 border border-neutral-200 rounded-xl p-4">
        <Info className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-neutral-500 leading-relaxed">
          This information is for general educational and healthcare-navigation purposes and does not
          replace evaluation by a qualified healthcare professional. Always consult a doctor for
          personal medical advice, diagnosis, or treatment.
        </p>
      </div>
    </div>
  );
}
