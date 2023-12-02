import { emergencyRoomBed } from "@/states/EmergencyCenterInfoStore";
import Bed from "./Bed";

interface EmergencyRoomProps {
  beds: emergencyRoomBed[];
}

export default function EmergencyRoom({ beds }: EmergencyRoomProps) {
  return (
    <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] gap-[2rem]">
      {beds &&
        beds.map((bed, index) => (
          <Bed key={index} bed={bed} patientId={bed.patient_id} />
        ))}
    </div>
  );
}
