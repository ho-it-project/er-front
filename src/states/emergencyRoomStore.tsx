import { create } from "zustand";

interface Nav {
  title: string;
  link: string;
}
interface EmergencyRoomNumber {
  navs: Nav[];
  setNavs: (newNavs: Nav[]) => void;
}

const useEmergencyRoomStore = create<EmergencyRoomNumber>((set) => ({
  navs: [],
  setNavs: (newNavs: Nav[]) => {
    set({
      navs: newNavs,
    });
  },
}));

export default useEmergencyRoomStore;
