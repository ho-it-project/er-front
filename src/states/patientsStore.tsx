import { arr_diff } from "@/lib/utils";
import { create } from "zustand";
import { Gender, RequestStatus, Status } from "./requestStore";

export type ERPatientStatus =
  | "PENDING"
  | "DISCHARGE"
  | "DEATH"
  | "ADMISSION"
  | "TRANSFERED";

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

export interface PatientSummary {
  patient: PatientInfo;
  patient_id: string;
  hospital_id: string;
  patient_status: ERPatientStatus;
  created_at: string;
  status: Status;
  updated_at: string;
}

interface PatientQuery {
  page: number;
  limit: number;
  patient_status: ERPatientStatus[];
}

interface PatientListStore {
  query: PatientQuery;
  patients: PatientSummary[];
  pageLimit: {
    total_count: number;
    total_page: number;
  };
  setQueryPaientStatus: (patient_status: ERPatientStatus[]) => void;
  setQueryPage: (page: number) => void;
  setQueryLimit: (limit: number) => void;
  setPatients: (
    patients:
      | PatientSummary[]
      | ((prevState: PatientSummary[]) => PatientSummary[])
  ) => void;
  setPageLimit: (pageLimit: {
    total_count: number;
    total_page: number;
  }) => void;
}

export const usePatientListStore = create<PatientListStore>((set) => ({
  query: {
    page: 1,
    limit: 30,
    patient_status: [],
  },
  patients: [],
  pageLimit: { total_count: 0, total_page: 0 },
  setQueryPaientStatus: (patient_status: ERPatientStatus[]) =>
    set((state) => {
      return {
        ...state,
        patients: arr_diff(patient_status, state.query.patient_status)
          ? []
          : state.patients,
        query: { ...state.query, patient_status, page: 1 },
      };
    }),
  setQueryPage: (page: number) =>
    set((state) => ({ ...state, query: { ...state.query, page } })),
  setQueryLimit: (limit: number) =>
    set((state) => ({ ...state, query: { ...state.query, limit } })),
  setPatients: (
    patients:
      | PatientSummary[]
      | ((prevState: PatientSummary[]) => PatientSummary[])
  ) =>
    set((state) => {
      // Check if employees is a function and call it with the current state if it is
      const newPatients =
        typeof patients === "function" ? patients(state.patients) : patients;

      return { ...state, patients: newPatients };
    }),
  setPageLimit: (pageLimit: { total_count: number; total_page: number }) =>
    set((state) => ({ ...state, pageLimit })),
}));
