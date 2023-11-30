import { create } from "zustand";
import { emergencyRoom } from "./EmergencyCenterInfoStore";

interface Nav {
  title: string;
}
interface EmergencyRoomNumber {
  emergencyRoomNumber: number;
  setEmergencyRoomNumber: (Clicked: number) => void;
  emergencyRooms: emergencyRoom[] | null;
  setEmergencyRooms: (newRoom: emergencyRoom[]) => void;
  navs: Nav[];
  setNavs: (newNavs: Nav[]) => void;
}

const useEmergencyRoomStore = create<EmergencyRoomNumber>((set) => ({
  emergencyRoomNumber: 0,
  setEmergencyRoomNumber(clicked) {
    set({ emergencyRoomNumber: clicked });
  },
  emergencyRooms: null,
  setEmergencyRooms: (newRooms) =>
    set({
      emergencyRooms: newRooms,
    }),
  navs: [],
  setNavs: (newNavs: Nav[]) => {
    set({
      navs: newNavs,
    });
  },
}));

export default useEmergencyRoomStore;
