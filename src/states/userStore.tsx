import { Role } from "@/type";
import { create } from "zustand";

interface UserData {
  emergency_center_id: string | null;
  employee_id: string | null;
  employee_name: string | null;
  hospital_id: string | null;
  id_card: string | null;
  role: Role | null;
}

interface UserStore {
  accessToken: string;
  setAccessToken: (newToken: string) => void;
  userData: UserData;
  updateUserData: (newUserData: UserData) => void;
}

const useUserStore = create<UserStore>((set) => ({
  accessToken: "",
  setAccessToken: (newToken: string) => {
    set({
      accessToken: newToken,
    });
  },
  userData: {
    emergency_center_id: null,
    employee_id: null,
    employee_name: null,
    hospital_id: null,
    id_card: null,
    role: null,
  },
  updateUserData: (newUserData: UserData) => {
    set({
      userData: newUserData,
    });
  },
}));

export default useUserStore;
