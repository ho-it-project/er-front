import Spinner from "@/components/Spinner";
import { transformAge } from "@/lib/utils/transeform";
import { emergencyRoomBed } from "@/states/EmergencyCenterInfoStore";
import useUserStore from "@/states/userStore";
import { PatientDetail } from "@/type/patientDetail";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface BedProps {
  bed: emergencyRoomBed;
  patientId: string | null;
}

interface GetDetailPatientResponse {
  result: {
    patient: PatientDetail;
  };
  is_success: boolean;
  message: string;
}

export default function Bed({ bed, patientId }: BedProps) {
  const { accessToken } = useUserStore();
  const [patient, setPatient] = useState<PatientDetail | null>();

  const url = patientId ? `/api/er/patients/${patientId}` : null;
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());

  const { data, isLoading } = useSWR<GetDetailPatientResponse>(
    url,
    url ? (url: string) => fetcher(url, accessToken) : null
  );

  useEffect(() => {
    if (data && data.is_success) {
      setPatient(data.result.patient);
    } else {
      setPatient(null);
    }
  }, [data, setPatient, patientId]);

  return (
    <div className="flex h-[16rem] w-[24rem] flex-col rounded-3xl border-2 border-main bg-bg px-[2rem] pt-[2rem]">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className=" text-regular font-regular">
          <div className="flex justify-between">
            <div>{bed.emergency_room_bed_num}</div>
            <div className="text-gray">{patient?.patient_name}</div>
          </div>
          {patient && (
            <div>
              {patient?.patient_gender === "MALE"
                ? "남"
                : patient.patient_gender === "FEMALE"
                  ? "여"
                  : null}{" "}
              / {patient && transformAge(patient.patient_birth)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
