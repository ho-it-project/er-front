import { arr_diff } from "@/lib/utils";
import { Role } from "@/type";
import { create } from "zustand";

export interface Employee {
  department_id: number;
  emplotee_doctor_specialization: [];
  employee_id: string;
  employee_name: string;
  emplotee_nurse_specialization: [];
  hospital_id: string;
  id_card: string;
  role: Role;
  status: "ACTIVE" | "INACTIVE";
}

interface EmployeeQuery {
  page: number;
  limit: number;
  role: Role[];
}

interface EmployeeListStore {
  query: EmployeeQuery;
  employees: Employee[];
  pageLimit: {
    total_count: number;
    total_page: number;
  };
  setQeuryRole: (role: Role[]) => void;
  setQueryPage: (page: number) => void;
  setQueryLimit: (limit: number) => void;
  setEmployees: (
    employee: Employee[] | ((prevState: Employee[]) => Employee[])
  ) => void;
  setPageLimit: (pageLimit: {
    total_count: number;
    total_page: number;
  }) => void;
}

export const useEmployeeListStore = create<EmployeeListStore>((set) => ({
  query: {
    page: 1,
    limit: 15,
    role: [],
  },
  employees: [],
  pageLimit: { total_count: 0, total_page: 0 },
  setQeuryRole: (role: Role[]) =>
    set((state) => {
      return {
        ...state,
        employees: arr_diff(role, state.query.role) ? [] : state.employees,
        query: { ...state.query, role, page: 1 },
      };
    }),
  setQueryPage: (page: number) =>
    set((state) => ({ ...state, query: { ...state.query, page } })),
  setQueryLimit: (limit: number) =>
    set((state) => ({ ...state, query: { ...state.query, limit } })),
  setEmployees: (
    employees: Employee[] | ((prevState: Employee[]) => Employee[])
  ) =>
    set((state) => {
      // Check if employees is a function and call it with the current state if it is
      const newEmployees =
        typeof employees === "function"
          ? employees(state.employees)
          : employees;

      return { ...state, employees: newEmployees };
    }),
  setPageLimit: (pageLimit: { total_count: number; total_page: number }) =>
    set((state) => ({ ...state, pageLimit })),
}));
