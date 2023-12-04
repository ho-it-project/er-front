import { getPatientStatusStyles } from "@/lib/utils/patientStyle";
import { ERPatientStatus } from "@/states/patientsStore";

interface PatientStatusViewPropsP {
  status: ERPatientStatus;
}

export default function PatientStatusView({ status }: PatientStatusViewPropsP) {
  const styles = getPatientStatusStyles(status);

  return (
    <div
      className={`flex h-[4rem] w-[10rem] items-center justify-center rounded-full text-[1.8rem] font-[500] text-white bg-${styles.backgroundColor}`}
    >
      {styles.type}
    </div>
  );
}
