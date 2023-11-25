import { Patient, Request } from "@/states/requestStore";
import { Card } from "../common/Card";

interface RequestProps {
  request: Request;
  patient: Patient;
}

export default function RequestBox({ request, patient }: RequestProps) {
  return (
    <Card size="medium" dropShadow="xl">
      <div className="relative px-[2rem] py-[1.5rem] text-[1.8rem] font-[600]">
        <div className="mb-[1rem] flex justify-between">
          <p>{patient.patient_id}</p>
          <p className="text-red">{request.request_date}</p>
        </div>
        <div className="mb-[1rem] flex justify-between">
          <p>
            {patient.patient_name} / {patient.patient_gender} /{" "}
            {patient.patient_birth}세
          </p>
          <p>{request.reject_reason}</p>
        </div>
        <div className="mt-[5rem]">{request.reject_reason}</div>
      </div>
    </Card>
  );
}
