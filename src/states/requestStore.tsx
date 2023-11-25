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

export interface EmsToErReq {
  patient_id: string;
  emergency_center_id: string;
  request_status: RequestStatus;
  request_date: string;
  reject_reason: string | null;
  /**
   * 유닉스 타임스탬프 "1970-01-01T00:00:00Z" = 아직 응답 안함
   */
  response_date: string;
  emergency_center_name: string;
  emergency_center_latitude: number;
  emergency_center_longitude: number;
  /**
   * 응급차와 응급실 사이의 거리
   */
  distance: number;
  /**
   * default
   */
  created_at: string;
  updated_at: string;
  status: Status;
  patient: {
    patient_id: string;
    /**
     * 익명으로 기본값
     */
    patient_name: string;
    /**
     * 생년월일 0000-00-00 형식 0000-00-00은 미상
     */
    patient_birth: string;
    patient_gender: Gender;
    /**
     * 중증, 경증, 정상, 미상
     */
    patient_severity: PatientSeverity;
    patient_symptom_summary: string;
    /**
     * 위도 - 사고지점
     */
    patient_latitude: number;
    /**
     * 경도 - 사고지점
     */
    patient_longitude: number;
    /**
     * 요청한 곳
     */
    ambulance_company_id: string;
    ambulance_company_name: string;
    ems_employee_id: string;
    ems_employee_name: string;
    /**
     * default
     */
    created_at: string;
    updated_at: string;
    status: Status;
  };
}

export interface EmsToErUpdate {
  ambulance_company_id: string;
  ambulance_company_name: string;
  ems_employee_id: string;
  patient_id: string;
  emergency_center_id: string;
  request_status: RequestStatus;
}

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
    limit: 1000,
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
