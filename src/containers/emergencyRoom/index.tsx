"use client";

import Spinner from "@/components/Spinner";
import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import useEmergencyCenterInfoStore, {
  emergencyRoom,
  emergencyRoomBed,
} from "@/states/EmergencyCenterInfoStore";
import useEmergencyRoomStore from "@/states/emergencyRoomStore";
import useUserStore from "@/states/userStore";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EmergencyRoom from "./emergencyRoom";

interface GetEmergencyRoom {
  result: emergencyRoom;
  is_success: boolean;
  message: string;
}

export default function EmergencyRoomContainer() {
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();
  const { navs } = useEmergencyRoomStore();
  const { accessToken } = useUserStore();

  const [beds, setBeds] = useState<emergencyRoomBed[]>();
  const pathname = usePathname();

  const url = emergencyCenterInfo
    ? `/api/er/emergency-centers/emergency-room${pathname}`
    : null;
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  const { data, isLoading } = useSWR<GetEmergencyRoom>(
    url,
    url ? (url: string) => fetcher(url, accessToken) : null
  );

  useEffect(() => {
    if (data && data.is_success) {
      const sortedBeds = data.result.emergency_room_beds.sort(
        (a, b) => a.emergency_room_bed_num - b.emergency_room_bed_num
      );
      setBeds(sortedBeds);
    }
  }, [data, setBeds, emergencyCenterInfo]);

  return (
    <TopNavContentWrapper topNav={{ items: navs }} goHome={false}>
      <div className="px-[1rem]">
        {isLoading ? <Spinner /> : <>{beds && <EmergencyRoom beds={beds} />}</>}
      </div>
    </TopNavContentWrapper>
  );
}
