"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import useEmergencyCenterInfoStore from "@/states/EmergencyCenterInfoStore";
import useEmergencyRoomStore from "@/states/emergencyRoomStore";
import EmergencyRoom from "../emergencyRoom/emergencyRoom";

export default function HomeContainer() {
  const { navs } = useEmergencyRoomStore();
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();

  const roomsData = emergencyCenterInfo?.emergency_rooms.map((room) => ({
    name: room.emergency_room_name,
    beds: room.emergency_room_beds.sort(
      (a, b) => a.emergency_room_bed_num - b.emergency_room_bed_num
    ),
  }));

  return (
    <TopNavContentWrapper topNav={{ items: navs }} goHome={false}>
      <div className="flex flex-col gap-[4rem] px-[1rem]">
        {roomsData &&
          roomsData.map((room, index) => (
            <div key={index} className="h-full w-full">
              <div className="text-large font-large text-main">{room.name}</div>
              <EmergencyRoom beds={room.beds} />
            </div>
          ))}
      </div>
    </TopNavContentWrapper>
  );
}
