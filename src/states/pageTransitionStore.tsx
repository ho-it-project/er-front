import { create } from "zustand";

type PageTransitionStore = {
  isPageTransitioning: boolean;
  startPageTransition: () => void;
};

const usePageTransition = create<PageTransitionStore>((set) => ({
  isPageTransitioning: false,
  startPageTransition: () =>
    set((state) => ({ isPageTransitioning: !state.isPageTransitioning })),
}));

export default usePageTransition;
