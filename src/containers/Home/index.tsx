"use client";

import MainNavContentWrapper from "@/components/MainNavContentWrapper";
import Spinner from "@/components/Spinner";
import PatientCard from "@/components/pages/home/patientCard";
import useEmergencyCenterInfoStore, {
  emergencyRoom,
  emergencyRoomBed,
} from "@/states/EmergencyCenterInfoStore";
import useEmergencyRoomStore from "@/states/emergencyRoomStore";
import useUserStore from "@/states/userStore";
import { useEffect, useState } from "react";
import useSWR from "swr";

interface GetEmergencyRoom {
  result: emergencyRoom;
  is_success: boolean;
  message: string;
}

export default function HomeContainer() {
  const { emergencyCenterInfo } = useEmergencyCenterInfoStore();
  const { emergencyRoomNumber } = useEmergencyRoomStore();
  const { accessToken } = useUserStore();

  const [, setBeds] = useState<emergencyRoomBed[]>();

  const url = `/api/er/emergency-centers/emergency-room/${emergencyCenterInfo?.emergency_rooms[emergencyRoomNumber].emergency_room_id}`;
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  const { data, isLoading, mutate } = useSWR<GetEmergencyRoom>(
    url,
    (url: string) => fetcher(url, accessToken)
  );

  useEffect(() => {
    if (data) {
      if (!data.is_success) return;
      setBeds(data.result.emergency_room_beds);
      mutate();
    }
  }, [data, setBeds, mutate]);

  return (
    <MainNavContentWrapper>
      <div className="px-[1rem]">
        <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(24rem,24rem))] gap-[2rem]">
          {isLoading ? (
            <Spinner />
          ) : (
            data !== undefined &&
            data.result.emergency_room_beds.map((bed, index) => (
              <PatientCard key={index} />
            ))
          )}
        </div>
      </div>
    </MainNavContentWrapper>
  );
}
