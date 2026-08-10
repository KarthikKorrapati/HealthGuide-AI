import { supabase } from './supabase';
import type { GuidanceResponse, Hospital, ConsultationRecord } from './types';

export async function saveConsultation(params: {
  symptoms: string;
  age?: number;
  gender?: string;
  duration?: string;
  severity?: string;
  location?: string;
  guidance: GuidanceResponse;
  hospitals: Hospital[];
}): Promise<ConsultationRecord | null> {
  const { data, error } = await supabase
    .from('consultations')
    .insert({
      symptoms: params.symptoms,
      age: params.age ?? null,
      gender: params.gender ?? null,
      duration: params.duration ?? null,
      severity: params.severity ?? null,
      location: params.location ?? null,
      triage_level: params.guidance.triageLevel,
      guidance: params.guidance,
      hospitals: params.hospitals.length > 0 ? params.hospitals : null,
    })
    .select('*')
    .maybeSingle();

  if (error) {
    console.error('Failed to save consultation:', error.message);
    return null;
  }
  return data as ConsultationRecord;
}

export async function loadConsultations(): Promise<ConsultationRecord[]> {
  const { data, error } = await supabase
    .from('consultations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Failed to load consultations:', error.message);
    return [];
  }
  return (data ?? []) as ConsultationRecord[];
}

export async function deleteConsultation(id: string): Promise<boolean> {
  const { error } = await supabase.from('consultations').delete().eq('id', id);
  if (error) {
    console.error('Failed to delete consultation:', error.message);
    return false;
  }
  return true;
}
