import useEmergencyCenterInfoStore from "@/states/EmergencyCenterInfoStore";
import { useEffect, useState } from "react";

interface bedSummary {
  title: string;
  count: number;
  full: number;
}

export default function StatusBox() {
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();
  const [bedSummarys, setBedSummarys] = useState<bedSummary[]>();

  useEffect(() => {
    if (emergencyCenterInfo) {
      setBedSummarys(
        emergencyCenterInfo.emergency_rooms.map((room) => ({
          title: room.emergency_room_name,
          count: room.emergency_room_beds.filter(
            (bed) => bed.emergency_room_bed_status === "OCCUPIED"
          ).length,
          full: room._count.emergency_room_beds,
        }))
      );
    }
  }, [emergencyCenterInfo]);

  return (
    <div className="mb-[2rem] h-[21rem] w-[38rem] rounded-2xl bg-white px-[2rem] py-[3rem]">
      <div className="flex flex-wrap gap-[2rem]">
        {bedSummarys &&
          bedSummarys.map((summary, index) => (
            <div
              className="flex flex-col items-center justify-center text-regular font-large"
              key={index}
            >
              <div className="rounded-full bg-main px-[2rem] py-[0.5rem] text-white">
                {summary.title}
              </div>
              <div className="pt-[0.5rem] text-black">
                {summary.count} / {summary.full}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
