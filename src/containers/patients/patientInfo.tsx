import { transeformDateClock, transformAge } from "@/lib/utils/transform";
import { PatientSummary } from "@/states/patientsStore";
import PatientStatusView from "./patientStatusView";

interface PatientInfoProps {
  patient: PatientSummary;
}

export default function PatientInfo({ patient }: PatientInfoProps) {
  const getTitle = (log: string) => {
    const openingBracketIndex = log.indexOf("[");
    const closingBracketIndex = log.indexOf("]");

    if (
      openingBracketIndex !== -1 &&
      closingBracketIndex !== -1 &&
      openingBracketIndex < closingBracketIndex
    ) {
      return log.substring(openingBracketIndex + 1, closingBracketIndex);
    }

    return null;
  };

  return (
    <div className="flex h-[8rem] w-full items-center justify-center border-b-2 border-L-gray pl-[4rem] text-medium font-large">
      <div className="w-1/4 min-w-[20rem]">
        {transeformDateClock(patient.updated_at)}
      </div>
      <div className="w-1/4 min-w-[20rem]">
        {patient.patient.patient_name} /{" "}
        {patient.patient.patient_gender === "MALE" ? "남" : "여"} /{" "}
        {transformAge(patient.patient.patient_birth)}
      </div>
      <div className="w-1/4 min-w-[20rem]">
        {patient.patient.patient_logs.map((log) => getTitle(log.log_desc))}
      </div>
      <div className="flex w-1/4 min-w-[20rem] justify-end">
        <PatientStatusView status={patient.patient_status} />
      </div>
    </div>
  );
}
