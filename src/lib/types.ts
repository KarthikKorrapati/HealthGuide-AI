export interface SymptomInput {
  symptoms: string;
  age?: number;
  gender?: string;
  duration?: string;
  severity?: string;
  existingConditions?: string;
  medications?: string;
  allergies?: string;
  location?: string;
  pregnancy?: boolean;
}

export type TriageLevel = 1 | 2 | 3 | 4;

export interface PossibleCause {
  name: string;
  description: string;
}

export interface GuidanceResponse {
  understanding: string;
  possibleCauses: PossibleCause[];
  selfCare: string[];
  whenToSeeDoctor: string[];
  emergencySigns: string[];
  triageLevel: TriageLevel;
  triageReason: string;
  personalizationNotes: string[];
}

export interface Hospital {
  name: string;
  type: string;
  distance: string;
  travelTime?: string;
  address: string;
  relevantService: string;
  emergencyService: 'Yes' | 'No' | 'Unknown';
  hours: string;
  whySuitable: string;
  mapsUrl: string;
  outsideInitialRadius?: boolean;
  lat?: number;
  lon?: number;
}

export interface ConsultationRecord {
  id: string;
  symptoms: string;
  age?: number | null;
  gender?: string | null;
  duration?: string | null;
  severity?: string | null;
  location?: string | null;
  triage_level?: number | null;
  guidance: GuidanceResponse | null;
  hospitals: Hospital[] | null;
  created_at: string;
}
