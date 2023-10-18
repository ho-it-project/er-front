import { create } from "zustand";

interface LoginStore {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
  isOpen: boolean;
  openLoginBox: () => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  isLogin: false,
  login: () => set({ isLogin: true }),
  logout: () => set({ isLogin: false }),
  isOpen: false,
  openLoginBox: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useLoginStore;
