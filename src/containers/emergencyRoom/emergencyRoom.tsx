import { emergencyRoomBed } from "@/states/EmergencyCenterInfoStore";
import React from "react";
import Bed from "./Bed";

interface EmergencyRoomProps {
  beds: emergencyRoomBed[];
}

const EmergencyRoom = React.memo(({ beds }: EmergencyRoomProps) => {
  return (
    <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] gap-[2rem]">
      {beds &&
        beds.map((bed) => (
          <Bed
            key={bed.emergency_room_bed_num}
            bed={bed}
            patientId={bed.patient_id}
          />
        ))}
    </div>
  );
});

EmergencyRoom.displayName = "EmergencyRoom";

export default EmergencyRoom;
