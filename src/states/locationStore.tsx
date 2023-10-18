import { create } from "zustand";

interface LocationStore {
  latitude: number | undefined;
  setLatitude: (lat: number) => void;
  longitude: number | undefined;
  setLongitude: (lng: number) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  latitude: undefined,
  setLatitude: (lat: number) => set({ latitude: lat }),
  longitude: undefined,
  setLongitude: (lng: number) => set({ longitude: lng }),
}));

export default useLocationStore;
// NON_EMERGENCY_MEDICAL_INSTITUTION
// LOCAL_EMERGENCY_MEDICAL_INSTITUTION
// LOCAL_EMERGENCY_MEDICAL_CENTER
// REGIONAL_EMERGENCY_MEDICAL_CENTER
