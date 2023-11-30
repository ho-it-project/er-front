"use client";

import Spinner from "@/components/Spinner";
import useEmergencyCenterInfoStore, {
  EmergencyCenterInfo,
} from "@/states/EmergencyCenterInfoStore";
import useEmergencyRoomStore from "@/states/emergencyRoomStore";
import useUserStore from "@/states/userStore";
import { useEffect } from "react";
import useSWR from "swr";

interface GetEmergencyCenterResponse {
  result: EmergencyCenterInfo;
  is_success: boolean;
  message: string;
}

export default function InfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userData, accessToken } = useUserStore();
  const { setEmergencyCenterInfo } = useEmergencyCenterInfoStore();
  const { setEmergencyRooms, setNavs } = useEmergencyRoomStore();

  const url =
    userData && `/api/er/emergency-centers/${userData.emergency_center_id}`;

  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());

  const { data, isLoading } = useSWR<GetEmergencyCenterResponse>(
    url,
    (url: string) => fetcher(url, accessToken)
  );

  useEffect(() => {
    const handleDataChange = () => {
      if (data) {
        if (data.is_success) {
          setEmergencyCenterInfo(data.result);
          setEmergencyRooms(data.result.emergency_rooms);
          const items = data.result.emergency_rooms.map((room) => ({
            title: room.emergency_room_name,
          }));
          setNavs(items);
        }
      }
    };

    handleDataChange();
  }, [data, setEmergencyCenterInfo, setEmergencyRooms, setNavs]);

  return <>{isLoading ? <Spinner /> : children}</>;
}
