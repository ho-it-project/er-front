"use client";

import MainNavContentWrapper from "@/components/MainNavContentWrapper";
import PatientCard from "@/components/pages/home/patientCard";
import useEmergencyCenterInfoStore from "@/states/EmergencyCenterInfoStore";
import useEmergencyRoomStore from "@/states/emergencyRoomStore";

export default function HomeContainer() {
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();
  const { emergencyRoomNumber } = useEmergencyRoomStore();

  return (
    <MainNavContentWrapper>
      <div className="px-[1rem]">
        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] gap-[2rem]">
          {emergencyCenterInfo?.emergency_rooms &&
            emergencyCenterInfo.emergency_rooms[
              emergencyRoomNumber
            ].emergency_room_beds.map((bed, index) => (
              <PatientCard key={bed.patient_id + index} />
            ))}
        </div>
        {/* {Array.from({ length: 4 }, (_, index) => (
          <div className="mb-[3rem]" key={index}>
            <h4 className="text-[2rem] font-[600] text-main">
              {index + 1} 구역
            </h4>
            <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] gap-[2rem]">
              {Array.from({ length: 8 }, (_, index) => (
                <PatientCard key={index} />
              ))}
            </div>
          </div>
        ))} */}
      </div>
    </MainNavContentWrapper>
  );
}
