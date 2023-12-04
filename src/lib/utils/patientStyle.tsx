import { ERPatientStatus } from "@/states/patientsStore";

export const getPatientStatusStyles = (status: ERPatientStatus) => {
  switch (status) {
    case "PENDING":
      return { backgroundColor: "red", type: "병상대기" };
    case "ADMISSION":
      return { backgroundColor: "gray", type: "배치완료" };
    default:
      return { backgroundColor: "gray", type: "상태" };
  }
};
