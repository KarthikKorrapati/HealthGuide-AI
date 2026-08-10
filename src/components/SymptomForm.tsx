import { useState } from 'react';
import { ChevronDown, ChevronUp, Send, Loader2, MapPin } from 'lucide-react';
import type { SymptomInput } from '@/lib/types';

interface SymptomFormProps {
  onSubmit: (input: SymptomInput) => void;
  loading: boolean;
}

export default function SymptomForm({ onSubmit, loading }: SymptomFormProps) {
  const [symptoms, setSymptoms] = useState('');
  const [location, setLocation] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [duration, setDuration] = useState('');
  const [severity, setSeverity] = useState('');
  const [existingConditions, setExistingConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [allergies, setAllergies] = useState('');
  const [pregnancy, setPregnancy] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() || loading) return;
    const input: SymptomInput = {
      symptoms: symptoms.trim(),
      location: location.trim() || undefined,
      age: age ? parseInt(age, 10) : undefined,
      gender: gender || undefined,
      duration: duration.trim() || undefined,
      severity: severity || undefined,
      existingConditions: existingConditions.trim() || undefined,
      medications: medications.trim() || undefined,
      allergies: allergies.trim() || undefined,
      pregnancy: pregnancy || undefined,
    };
    onSubmit(input);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card border border-neutral-200 p-6 sm:p-8 animate-fade-in-up">
      <div className="space-y-5">
        <div>
          <label htmlFor="symptoms" className="block text-sm font-semibold text-neutral-800 mb-2">
            What symptoms are you experiencing? <span className="text-danger-500">*</span>
          </label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={3}
            placeholder="e.g., I have fever, cough, and body pains for 2 days"
            className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-neutral-800 mb-2">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary-600" />
                Your location
              </span>
            </label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Proddatur, Andhra Pradesh"
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-neutral-400 mt-1.5">Used to find nearby hospitals and clinics.</p>
          </div>

          <div>
            <label htmlFor="severity" className="block text-sm font-semibold text-neutral-800 mb-2">
              How severe does it feel?
            </label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
            >
              <option value="">Not sure</option>
              <option value="mild">Mild — manageable</option>
              <option value="moderate">Moderate — uncomfortable</option>
              <option value="severe">Severe — very distressing</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          {showDetails ? 'Hide optional details' : 'Add more details (optional)'}
        </button>

        {showDetails && (
          <div className="space-y-4 pt-2 border-t border-neutral-100 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-semibold text-neutral-800 mb-2">Age</label>
                <input
                  id="age"
                  type="number"
                  min="0"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g., 32"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-semibold text-neutral-800 mb-2">Gender</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white"
                >
                  <option value="">Not specified</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="duration" className="block text-sm font-semibold text-neutral-800 mb-2">Duration</label>
                <input
                  id="duration"
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 2 days"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="conditions" className="block text-sm font-semibold text-neutral-800 mb-2">Existing medical conditions</label>
              <input
                id="conditions"
                type="text"
                value={existingConditions}
                onChange={(e) => setExistingConditions(e.target.value)}
                placeholder="e.g., diabetes, asthma"
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="medications" className="block text-sm font-semibold text-neutral-800 mb-2">Current medications</label>
                <input
                  id="medications"
                  type="text"
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  placeholder="e.g., metformin"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label htmlFor="allergies" className="block text-sm font-semibold text-neutral-800 mb-2">Allergies</label>
                <input
                  id="allergies"
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g., penicillin"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {gender === 'female' && (
              <label className="flex items-center gap-2.5 text-sm text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pregnancy}
                  onChange={(e) => setPregnancy(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                Currently pregnant
              </label>
            )}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={!symptoms.trim() || loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-card hover:shadow-float transition-all duration-200 hover:-translate-y-0.5 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Get guidance
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
