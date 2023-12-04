import { create } from "zustand";

interface Nav {
  title: string;
}
interface EmergencyRoomNumber {
  emergencyRoomNumber: number;
  setEmergencyRoomNumber: (Clicked: number) => void;
  navs: Nav[];
  setNavs: (newNavs: Nav[]) => void;
}

const useEmergencyRoomStore = create<EmergencyRoomNumber>((set) => ({
  emergencyRoomNumber: 0,
  setEmergencyRoomNumber(clicked) {
    set({ emergencyRoomNumber: clicked });
  },
  navs: [],
  setNavs: (newNavs: Nav[]) => {
    set({
      navs: newNavs,
    });
  },
}));

export default useEmergencyRoomStore;
