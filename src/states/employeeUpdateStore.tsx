import { create } from "zustand";

interface EmployeeUpdateStore {
  isUpdate: boolean;
  update: () => void;
  reset: () => void;
}

const useEmployeeUpdateStore = create<EmployeeUpdateStore>((set) => ({
  isUpdate: false,
  update: () => set({ isUpdate: true }),
  reset: () => set({ isUpdate: false }),
}));

export default useEmployeeUpdateStore;
