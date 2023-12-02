import { PatientStatus } from "@/type/patientDetail";
import { Gender, RequestStatus, Status } from "./requestStore";

export interface PatientLog {
  patient_log_id: string;
  patient_id: string;
  log_date: string;
  log_type: RequestStatus;
  log_desc: string;
  employee_id: string;
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface PatientInfo {
  patient_logs: PatientLog[];
  patient_id: string;
  patient_name: string;
  patient_birth: string;
  patient_identity_number: string;
  patient_gender: Gender;
  patient_phone: string;
  patient_address: string;
  guardian_id: string;
  doctor_id: string;
  nurse_id: string;
  created_at: string;
  updated_at: string;
  status: Status;
}

export interface Patient {
  patient: PatientInfo[];
  patient_id: string;
  hospital_id: string;
  patient_status: PatientStatus;
  created_at: string;
  status: Status;
  updated_at: string;
}
