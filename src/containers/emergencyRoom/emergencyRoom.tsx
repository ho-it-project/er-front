import useModal from "@/hooks/useModal";
import { emergencyRoomBed } from "@/states/EmergencyCenterInfoStore";
import { PatientSummary } from "@/states/patientsStore";
import useUserStore from "@/states/userStore";
import React, { useState } from "react";
import PatientDetailModal from "../patients/patientDetailModal";
import Bed from "./Bed";

interface EmergencyRoomProps {
  beds: emergencyRoomBed[];
}

const EmergencyRoom = React.memo(({ beds }: EmergencyRoomProps) => {
  const { accessToken } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();
  const [selected, setSelected] = useState<PatientSummary>();

  const clickedPatient = (id: string | null) => {
    if (id !== null) {
      const url = `/api/er/patients/${id}`;
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          setSelected(data.result);
          openModal();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] gap-[2rem]">
        {beds &&
          beds.map((bed) => (
            <div
              key={bed.emergency_room_bed_num}
              className="cursor-pointer"
              onClick={() => clickedPatient(bed.patient_id)}
            >
              <Bed bed={bed} patientId={bed.patient_id} />
            </div>
          ))}
      </div>
      {isOpen && selected && (
        <PatientDetailModal patient={selected} close={closeModal} />
      )}
    </>
  );
});

EmergencyRoom.displayName = "EmergencyRoom";

export default EmergencyRoom;
