import { ShieldCheck, MapPin, Stethoscope, Siren } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

const features = [
  { icon: Stethoscope, title: 'Understand symptoms', desc: 'Get safe, general guidance for common health concerns.' },
  { icon: ShieldCheck, title: 'Know when to act', desc: 'Clear triage levels tell you when to self-care or seek care.' },
  { icon: MapPin, title: 'Find nearby care', desc: 'Locate hospitals and clinics close to your location.' },
  { icon: Siren, title: 'Emergency alerts', desc: 'Warning signs are flagged so you never miss red flags.' },
];

export default function Hero({ onStart }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-white" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />
      <div className="absolute top-32 -left-24 w-80 h-80 bg-secondary-100/40 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white border border-primary-200 rounded-full px-4 py-1.5 text-sm text-primary-700 font-medium shadow-soft mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-breathe" />
            Not a substitute for professional medical care
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-neutral-900 leading-[1.1] text-balance animate-fade-in-up">
            Understand your symptoms.
            <br />
            <span className="text-primary-600">Find care nearby.</span>
          </h1>

          <p className="mt-6 text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto animate-fade-in-up">
            Describe what you're feeling and where you are. HealthGuide gives you safe,
            general guidance and helps you locate suitable hospitals and clinics close by.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up">
            <button
              onClick={onStart}
              className="px-7 py-3.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-card hover:shadow-float transition-all duration-200 hover:-translate-y-0.5"
            >
              Get health guidance
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="bg-white/70 backdrop-blur border border-neutral-200 rounded-2xl p-5 shadow-soft hover:shadow-card transition-all duration-200 hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-neutral-900 text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
