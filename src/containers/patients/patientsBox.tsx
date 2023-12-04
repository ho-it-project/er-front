"use client";

import Spinner from "@/components/Spinner";
import useModal from "@/hooks/useModal";
import { ERPatientStatus, PatientSummary } from "@/states/patientsStore";
import useUserStore from "@/states/userStore";
import { useEffect, useState } from "react";
import useSWR from "swr";
import PatientDetailModal from "./patientDetailModal";
import PatientInfo from "./patientInfo";

interface GetPatientsResponse {
  result: {
    count: number;
    patient_list: PatientSummary[];
  };
  is_success: boolean;
  message: string;
}

interface PatientBoxProps {
  clickdeNav: ERPatientStatus | "전체";
}

export default function PatientsBox({ clickdeNav }: PatientBoxProps) {
  const { accessToken } = useUserStore();
  const [patients, setPatients] = useState<PatientSummary[]>();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary>();

  const url = "/api/er/patients";
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());

  const { data, isLoading } = useSWR<GetPatientsResponse>(url, (url: string) =>
    fetcher(url, accessToken)
  );

  useEffect(() => {
    if (data && data.is_success) {
      setPatients(data.result.patient_list);
    }
  });
  return (
    <div className="flex flex-col">
      {isLoading ? (
        <Spinner />
      ) : (
        patients &&
        patients
          .filter(
            (patient) =>
              clickdeNav === "전체" || patient.patient_status === clickdeNav
          )
          .map((patient, index) => (
            <div
              className="cursor-pointer"
              key={index}
              onClick={() => {
                setSelectedPatient(patient);
                openModal();
              }}
            >
              <PatientInfo patient={patient} />
            </div>
          ))
      )}
      {isOpen && selectedPatient && (
        <PatientDetailModal patient={selectedPatient} close={closeModal} />
      )}
    </div>
  );
}
