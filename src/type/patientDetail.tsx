import { Gender, PatientSeverity, Status } from "@/states/requestStore";

export type AirwayStatus =
  | "OPEN"
  | "PARTIALLY_OBSTRUCTED"
  | "OBSTRUCTED"
  | "INTUBATED"
  | "UNKNOWN";
export type BreathingRate =
  | "NORMAL"
  | "SHALLOW"
  | "DEEP"
  | "LABORED"
  | "IRREGULAR"
  | "RAPID"
  | "SLOW"
  | "AGONAL";
export type DisabilityAVPU =
  | "ALERT"
  | "VERBAL_STIMULI"
  | "PAIN_STIMULI"
  | "UNRESPONSIVE";
export type AffectedArea =
  | "UNKNOWN"
  | "HEAD"
  | "NECK"
  | "CHEST"
  | "ABDOMEN"
  | "LEFT_ARM"
  | "RIGHT_ARM"
  | "LEFT_LEG"
  | "RIGHT_LEG"
  | "BACK"
  | "PELVIS";
export type GuardianRelation =
  | "OTHER"
  | "PARENT"
  | "SPOUSE"
  | "CHILD"
  | "SIBLING"
  | "FRIEND";
export type EmergencyCause =
  | "TRAFFIC_ACCIDENT"
  | "FIRE"
  | "CRIMINAL"
  | "DISASTER"
  | "DISEASE"
  | "OTHER";
export type EMSPatientStatus =
  | "PENDING"
  | "REQUESTED"
  | "ACCEPTED"
  | "CANCELED"
  | "COMPLETED";
export interface RAPID {
  patient_id: string;
  trauma: "TRUE" | "FALSE";
  conscious: "TRUE" | "FALSE";
  clear: "TRUE" | "FALSE";
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface ABCDE {
  patient_id: string;
  airway_status: AirwayStatus;
  breathing_rate: number;
  breathing_quality: BreathingRate;
  circulation_pulse: number;
  circulation_systolic_blood_pressure: number;
  circulation_diastolic_blood_pressure: number;
  disability_avpu: DisabilityAVPU;
  exposure_notes: string;
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface VS {
  patient_id: string;
  heart_rate: number;
  respiratory_rate: number;
  systolic_blood_pressure: number;
  diastolic_blood_pressure: number;
  temperature: number;
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface OPQRST {
  patient_id: string;
  onset: string;
  provocation: string;
  quality: string;
  radiation: string;
  severity: number;
  time: string;
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface SAMPLE {
  patient_id: string;
  signs_symptoms: string;
  allergies: string;
  medications: string;
  past_medical_history: string;
  last_oral_intake: string;
  events_leading_to_illness: string;
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface DCAP_BTLS {
  patient_id: string;
  affected_area: AffectedArea;
  deformity: string;
  contusion: string;
  abrasion: string;
  puncture: string;
  burn: string;
  tenderness: string;
  laceration: string;
  swelling: string;
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface GUARDIAN {
  guardian_id: string;
  guardian_name: string;
  guardian_phone: string;
  guardian_address: string;
  guardian_relation: GuardianRelation;
  created_at: string;
  updated_at: string;
  status: Status;
}
export interface AmbulanceEmployee {
  employee_id: string;
  employee_name: string;
  ambulance_company: {
    ambulance_company_name: string;
    ambulance_company_id: string;
    ambulance_company_phone: string;
  };
}
export interface VS {
  created_at: string;
  diastolic_blood_pressure: number;
  heart_rate: number;
  patient_id: string;
  respiratory_rate: number;
  status: Status;
  systolic_blood_pressure: number;
  temperature: number;
  updated_at: string;
}

export interface PatientDetail {
  patient_id: string;
  patient_name: string;
  patient_birth: string;
  patient_identity_number: string;
  patient_phone: string;
  patient_address: string;
  patient_gender: Gender;
  patient_latitude: 0;
  patient_longitude: 0;
  patient_severity: PatientSeverity;
  patient_emergency_cause: EmergencyCause;
  guardian_id: string;
  ems_employee_id: string;
  complete_date: string;
  patient_status: EMSPatientStatus;
  created_at: string;
  updated_at: string;
  status: Status;
  rapid: RAPID[];
  abcde: ABCDE[];
  opqrst: OPQRST[];
  sample: SAMPLE[];
  dcap_btls: DCAP_BTLS[];
  vs: VS[];
  guardian: GUARDIAN;
  employee: AmbulanceEmployee;
}
