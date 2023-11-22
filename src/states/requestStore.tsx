import { create } from "zustand";

export type Status = "ACTIVE" | "INACTIVE" | "DELETED";
export type RequestStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "CANCELED"
  | "COMPLETED"
  | "VIEWED"
  | "REJECTED";
export type PatientSeverity = "UNKNOWN" | "SEVERE" | "MILD" | "NONE";
export type Gender = "MALE" | "FEMALE";

export interface Patient {
  ambulance_company_id: string;
  ambulance_company_name: string;
  ems_employee_id: string;
  ems_employee_name: string;
  patient_birth: string;
  patient_gender: Gender;
  patient_id: string;
  patient_latitude: number;
  patient_longitude: number;
  patient_name: string;
  patient_severity: PatientSeverity;
  patient_symptom_summary: string;
  status: Status;
}

export interface Request {
  distance: number;
  emergency_center_id: string;
  emergency_center_latitude: number;
  emergency_center_longitude: number;
  emergency_center_name: string;
  patient: Patient;
  patient_id: string;
  reject_reason?: boolean;
  request_date: string;
  request_status: RequestStatus;
  response_date: string;
  status: Status;
  updated_at: string;
}

export interface RequestQuery {
  page: number;
  limit: number;
  search?: string;
  request_status?: RequestStatus[];
  patient_getder?: Gender[];
  patient_severity?: PatientSeverity[];
}

interface RequestListStore {
  query: RequestQuery;
  requests: Request[];
  pageLimit: {
    total_count: number;
    total_page: number;
  };
  setQuerySearch: (search: string) => void;
  setQueryPage: (page: number) => void;
  setQueryLimit: (limit: number) => void;
  setRequests: (
    request: Request[] | ((prevState: Request[]) => Request[])
  ) => void;
  setPageLimit: (pageLimit: {
    total_count: number;
    total_page: number;
  }) => void;
}

export const useRequestListStore = create<RequestListStore>((set) => ({
  query: {
    search: "",
    page: 1,
    limit: 10,
  },
  pageLimit: {
    total_count: 0,
    total_page: 0,
  },
  requests: [],
  setQuerySearch: (search: string) =>
    set((state) => ({
      ...state,
      requests: search !== state.query.search ? [] : state.requests,
      query: { ...state.query, search, page: 1 },
    })),
  setQueryPage: (page: number) =>
    set((state) => ({ ...state, query: { ...state.query, page } })),
  setQueryLimit: (limit: number) =>
    set((state) => ({ ...state, query: { ...state.query, limit } })),
  setRequests: (requests: Request[] | ((prevState: Request[]) => Request[])) =>
    set((state) => {
      // Check if employees is a function and call it with the current state if it is
      const newRequest =
        typeof requests === "function" ? requests(state.requests) : requests;

      return { ...state, requests: newRequest };
    }),
  setPageLimit: (pageLimit: { total_count: number; total_page: number }) =>
    set((state) => ({ ...state, pageLimit })),
}));

// • page?: number;
// • default: 1
// • limit?: number;
// • default: 10
// • search?: string;
// • search_type?: 'ambulance_company_name' | 'patient _name' I 'patient_symptom_summary';
// • 검색 타입
// • request_status?: RequestStatus[;
// • 요청 상태 필터링
// • patient_gender?: Gender[];
// • 환자 성별 필터링
// • patient_severity?: ems_Severityl;
// • 환자 중증도 필터링
// • request_start_date?: string & tags. Formatdate-time>; 11 요청 시작 날짜 및 시간
// • 요청 시작 날짜 및 시간
