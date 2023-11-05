import { create } from "zustand";

interface UpdateStore {
  isUpdate: boolean;
  update: () => void;
  reset: () => void;
}

const useUpdateStore = create<UpdateStore>((set) => ({
  isUpdate: false,
  update: () => set({ isUpdate: true }),
  reset: () => set({ isUpdate: false }),
}));

export default useUpdateStore;
