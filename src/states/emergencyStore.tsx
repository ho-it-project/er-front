import { create } from "zustand";

interface EmergencyCenter {
  emergency_center_name: string;
  emergency_center_type: string;
  distance: number;
  emergency_center_primary_phone: string;
  emergency_center_address: string;
}

interface EmergencyStore {
  emergencyCenters: EmergencyCenter[];
  setEmergencyCenters: (centers: EmergencyCenter[]) => void;
}

const useEmergencyStore = create<EmergencyStore>((set) => ({
  emergencyCenters: [],
  setEmergencyCenters: (centers) => set({ emergencyCenters: centers }),
}));

export default useEmergencyStore;
