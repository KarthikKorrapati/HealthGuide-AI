import { useState, useRef, useEffect, useCallback } from 'react';
import { RotateCcw, MapPin, Loader2, Search } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EmergencyBanner from '@/components/EmergencyBanner';
import SymptomForm from '@/components/SymptomForm';
import GuidanceResult from '@/components/GuidanceResult';
import HospitalList from '@/components/HospitalList';
import HistoryView from '@/components/HistoryView';
import Footer from '@/components/Footer';
import { generateGuidance } from '@/lib/healthKnowledge';
import { findHospitals } from '@/lib/hospitalFinder';
import type { HospitalSearchResult } from '@/lib/hospitalFinder';
import { saveConsultation, loadConsultations, deleteConsultation } from '@/lib/consultationStore';
import type { SymptomInput, GuidanceResponse, Hospital, ConsultationRecord } from '@/lib/types';

type View = 'home' | 'result' | 'history';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [loading, setLoading] = useState(false);
  const [hospitalLoading, setHospitalLoading] = useState(false);
  const [guidance, setGuidance] = useState<GuidanceResponse | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hospitalError, setHospitalError] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<SymptomInput | null>(null);
  const [history, setHistory] = useState<ConsultationRecord[]>([]);

  const formRef = useRef<HTMLDivElement>(null);
  const hospitalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadConsultations().then(setHistory);
  }, []);

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToHospitals = useCallback(() => {
    hospitalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSubmit = useCallback(async (input: SymptomInput) => {
    setLoading(true);
    setGuidance(null);
    setHospitals([]);

    const guidanceResult = generateGuidance(input);
    setGuidance(guidanceResult);
    setLastInput(input);

    let foundHospitals: Hospital[] = [];
    if (input.location) {
      setHospitalLoading(true);
      setHospitalError(null);
      try {
        const searchResult: HospitalSearchResult = await findHospitals(input.location, {
          emergencyMode: guidanceResult.triageLevel === 4,
        });
        foundHospitals = searchResult.hospitals;
        setHospitals(foundHospitals);
        setHospitalError(searchResult.error);
      } catch {
        setHospitals([]);
        setHospitalError('Healthcare data service is temporarily unavailable. Please try again in a moment.');
      } finally {
        setHospitalLoading(false);
      }
    }

    setLoading(false);

    saveConsultation({
      symptoms: input.symptoms,
      age: input.age,
      gender: input.gender,
      duration: input.duration,
      severity: input.severity,
      location: input.location,
      guidance: guidanceResult,
      hospitals: foundHospitals,
    }).then(() => loadConsultations().then(setHistory));
  }, []);

  const handleReset = useCallback(() => {
    setGuidance(null);
    setHospitals([]);
    setHospitalError(null);
    setLastInput(null);
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDeleteRecord = useCallback(async (id: string) => {
    const ok = await deleteConsultation(id);
    if (ok) setHistory((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const isEmergency = guidance?.triageLevel === 4;

  if (view === 'history') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header onShowHistory={() => setView('home')} historyCount={history.length} />
        <div className="flex-1">
          <HistoryView records={history} onBack={() => setView('home')} onDelete={handleDeleteRecord} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onShowHistory={() => setView('history')} historyCount={history.length} />

      {guidance && isEmergency && (
        <EmergencyBanner onFindEmergency={scrollToHospitals} />
      )}

      <main className="flex-1">
        {!guidance && <Hero onStart={scrollToForm} />}

        <div ref={formRef} className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {!guidance ? (
            <SymptomForm onSubmit={handleSubmit} loading={loading} />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-2xl text-neutral-900">Your Guidance</h2>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-primary-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  New consultation
                </button>
              </div>

              <GuidanceResult
                guidance={guidance}
                onScrollToHospitals={scrollToHospitals}
                hasHospitals={hospitals.length > 0 || hospitalLoading}
              />
            </div>
          )}
        </div>

        {guidance && (lastInput?.location || hospitalLoading) && (
          <div ref={hospitalRef} className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-secondary-50 text-secondary-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h2 className="font-display font-bold text-xl text-neutral-900">
                Nearby Healthcare Options
              </h2>
            </div>

            {lastInput?.location ? (
              hospitalLoading ? (
                <div className="bg-white rounded-2xl border border-neutral-200 p-8 text-center">
                  <Loader2 className="w-7 h-7 text-secondary-500 mx-auto mb-3 animate-spin" />
                  <p className="text-neutral-600 font-medium">Finding facilities near {lastInput.location}...</p>
                </div>
              ) : hospitals.length > 0 ? (
                <HospitalList
                  hospitals={hospitals}
                  loading={false}
                  location={lastInput.location}
                  emergencyOnly={isEmergency}
                  error={hospitalError}
                />
              ) : hospitalError ? (
                <HospitalList
                  hospitals={[]}
                  loading={false}
                  location={lastInput.location}
                  emergencyOnly={isEmergency}
                  error={hospitalError}
                />
              ) : (
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 text-center">
                  <Search className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
                  <p className="text-neutral-600 font-medium">
                    No facilities found near {lastInput.location}.
                  </p>
                  <p className="text-sm text-neutral-400 mt-1">
                    Try a nearby larger town or city name.
                  </p>
                </div>
              )
            ) : (
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 text-center">
                <MapPin className="w-6 h-6 text-neutral-400 mx-auto mb-2" />
                <p className="text-neutral-600 font-medium">
                  Add a location to find nearby hospitals and clinics.
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
