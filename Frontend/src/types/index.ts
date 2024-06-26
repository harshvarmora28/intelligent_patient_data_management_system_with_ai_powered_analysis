import { ReactNode } from "react";

export type MedicalHistory = {
  _id: string;
  allergies: string;
  past_medical_history: string;
  family_medical_history: string;
  current_medication: string;
  vaccination_history: Array<{
    name: string;
    status: 'yes' | 'no';
  }>
}

export type Lifestyle = {
  _id: string;
  smoking: string;
  alcohol: string;
  sleep_time: string;
};

interface Patient {
  _id: string;
  name: string;
  email: string;
  gender?: string;
  age?: number;
}

interface CurrentSymptoms {
  description: string;
  duration_days: number;
  affected_area: string;
}

interface Prescription {
  medicine: string[];
}

export interface MedicalRecord {
  current_symptoms: CurrentSymptoms;
  prescription: Prescription;
  _id: string;
  patient: Patient;
  medical_history: MedicalHistory; // Assuming it could be any data type or interface
  life_style: Lifestyle;
  createdAt: string;
  updatedAt: string;
  doctor_id: Patient;
}

export type LayoutProps = {
  children: ReactNode;
};

export type NavbarProps = {
  navLinks: Array<{ name: string, path: string }>
}

export type GlobalState = {
  patientProfile: {
    _id: string;
    name: string;
    date_of_birth: Date | null;
    age: number | null;
    gender: 'male' | 'female' | 'other' | null;
    city: string;
    state: string;
    email: string;
    role: string;
  };
  token: string | null;
  isLoggedIn: boolean;
  medicalHistory: MedicalHistory;
  lifeStyle: Lifestyle;
}

export type GlobalStateAction = {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}