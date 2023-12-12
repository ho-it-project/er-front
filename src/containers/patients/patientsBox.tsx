"use client";

import Spinner from "@/components/Spinner";
import useModal from "@/hooks/useModal";
import { usePatientList } from "@/hooks/usePatientsList";
import {
  ERPatientStatus,
  PatientSummary,
  usePatientListStore,
} from "@/states/patientsStore";
import { useEffect, useRef, useState } from "react";
import PatientDetailModal from "./patientDetailModal";
import PatientInfo from "./patientInfo";

interface PatientBoxProps {
  clickdeNav: ERPatientStatus | "전체";
}

export default function PatientsBox({ clickdeNav }: PatientBoxProps) {
  const patientListRef = useRef<HTMLDivElement>(null);

  const { isOpen, openModal, closeModal } = useModal();
  const [selectedPatient, setSelectedPatient] = useState<PatientSummary>();
  const { patients, isLoading } = usePatientList();
  const { query, setQueryPage, pageLimit } = usePatientListStore();

  useEffect(() => {
    if (patientListRef.current) {
      if (patientListRef.current.scrollTop > 0) {
        patientListRef.current.scrollTo(0, 0);
      }
    }
  }, [query.patient_status]);

  return (
    <div
      className="h-full w-full overflow-scroll"
      ref={patientListRef}
      onScroll={(e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        if (
          scrollHeight - scrollTop - clientHeight < 1 &&
          isLoading === false
        ) {
          if (query.page < pageLimit.total_page) {
            setQueryPage(query.page + 1);
          }
        }
      }}
    >
      <div className="flex flex-col pb-[13rem]">
        {isLoading ? (
          <Spinner />
        ) : (
          patients &&
          patients
            .filter(
              (patient) =>
                (clickdeNav === "전체" ||
                  patient.patient_status === clickdeNav) &&
                patient.patient_status !== "DISCHARGE"
            )
            .sort((a, b) => {
              if (
                a.patient_status === "PENDING" &&
                b.patient_status !== "PENDING"
              ) {
                return -1;
              } else if (
                a.patient_status !== "PENDING" &&
                b.patient_status === "PENDING"
              ) {
                return 1;
              }
              return 0;
            })
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
    </div>
  );
}
