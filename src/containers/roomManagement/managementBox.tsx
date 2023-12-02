"use client";

import useEmergencyCenterInfoStore, {
  emergencyRoom,
} from "@/states/EmergencyCenterInfoStore";
import { useEffect, useState } from "react";
import RoomInfo from "./roomInfo";

export default function ManagementBox() {
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();
  const [rooms, setRooms] = useState<emergencyRoom[]>();

  useEffect(() => {
    if (!emergencyCenterInfo) return;
    setRooms(emergencyCenterInfo.emergency_rooms);
  }, [emergencyCenterInfo, setRooms]);

  return (
    <div className="flex flex-col gap-[2rem] border-l-[0.2rem] border-main backdrop-blur-[5rem]">
      {rooms &&
        rooms.map((room, index) => <RoomInfo key={index} room={room} />)}
    </div>
  );
}
