import { Role } from "@/type";
import { create } from "zustand";

interface UserData {
  emergency_center_id?: string;
  employee_id?: string;
  hospital_id?: string;
  id_card?: string;
  role?: Role;
}

interface UserStore {
  userData: UserData;
  updateUserData: (newUserData: UserData) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userData: {
    emergency_center_id: undefined,
    employee_id: undefined,
    hospital_id: undefined,
    id_card: undefined,
    role: undefined,
  },
  updateUserData: (newUserData: UserData) => {
    set({
      userData: newUserData,
    });
  },
}));

export default useUserStore;
