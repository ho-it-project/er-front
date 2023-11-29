"use client";

import useEmergencyCenterStore, {
  EmergencyCenterInfo,
} from "@/states/EmergencyCenterStore";
import useUserStore from "@/states/userStore";
import { useEffect } from "react";
import useSWR from "swr";
import useMenu from "./useMenu";

interface GetEmergencyCenterResponse {
  result: EmergencyCenterInfo;
  is_success: boolean;
  message: string;
}

export default function TopMenu() {
  const { expanded, openMenu, closeMenu } = useMenu();
  const handleMouseLeave = () => {
    closeMenu();
  };

  const { userData, accessToken } = useUserStore();
  const { emergencyCenterInfo, setEmergencyCenterInfo } =
    useEmergencyCenterStore();

  const url = `/api/er/emergency-centers/${userData.emergency_center_id}`;
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res) => res.json());
  const { data } = useSWR<GetEmergencyCenterResponse>(url, (url: string) =>
    fetcher(url, accessToken)
  );

  useEffect(() => {
    if (data) {
      if (!data.is_success) return;

      setEmergencyCenterInfo(data.result);
    }
  }, [data, setEmergencyCenterInfo]);

  return (
    <div
      className="relative z-10 mt-[2rem] h-[8rem] w-[8rem] drop-shadow-xl"
      onMouseLeave={handleMouseLeave}
    >
      <span
        onClick={openMenu}
        className={`absolute left-0 top-0 z-10 transition-all duration-200 ease-in ${
          expanded
            ? "h-[38rem] w-[38rem] bg-white"
            : "h-[8rem] w-[8rem] cursor-pointer bg-gray"
        } rounded-3xl`}
      >
        <div
          className={`relative transition-all ${
            expanded ? "opacity-100 delay-200 " : "opacity-0"
          }`}
        >
          {expanded && (
            <div className="flex h-full w-full flex-col gap-[2rem] px-[3rem] py-[4rem]">
              <div className="flex justify-between text-gray">
                <div>응급실 정보</div>
                <div className="cursor-pointer">수정하기</div>
              </div>
              <div className="grid grid-cols-[7.5rem,1fr] items-center gap-[2rem] border-b-2 border-main30 pb-[2rem]">
                <div className="h-[7.5rem] w-[7.5rem] rounded-full bg-bg"></div>
                <div className="h-full w-full">
                  <div className="text-[1.8rem] font-[700] text-main">
                    {emergencyCenterInfo?.emergency_center_name}
                  </div>
                  <div className="text-[1.2rem] text-gray">
                    {emergencyCenterInfo?.emergency_center_name}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </span>
    </div>
  );
}
