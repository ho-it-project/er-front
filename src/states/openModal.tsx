import { create } from "zustand";

interface Modal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = create<Modal>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
