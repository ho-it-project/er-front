"use client";

import Spinner from "@/components/Spinner";
import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EquipmentLine from "./equipmentLine";

const topNavs = [{ title: "장비 관리", link: "/equipment" }];

interface Equipment {
  equipment_count: number;
  equipment_id: number;
  equipment_name: string;
}

export default function MedicalEquipmentSettingContainer() {
  const [equipments, setEquipments] = useState<Equipment[]>();

  const url = "api/er/hospitals/current/equipments";
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, isLoading } = useSWR(url, fetcher);

  useEffect(() => {
    if (data && data.is_success) {
      setEquipments(data.result);
    }
  }, [setEquipments]);

  return (
    <>
      <TopNavContentWrapper topNav={{ items: topNavs }}>
        <div className="px-[8rem] py-[6rem]">
          <div className="flex justify-between">
            <p className="ml-[6rem] w-[24rem] text-[1.2rem] font-[600] text-gray">
              • 현재 진료 사용가능한 장비를 선택해주세요
            </p>
            <button className="h-[5rem] w-[20rem] rounded-[1rem] bg-main text-[1.6rem] font-[600] text-white">
              저장하기
            </button>
          </div>
          <div className="mx-auto mt-[20rem] flex h-[33rem] w-[81rem] justify-between">
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="grid grid-cols-2 gap-x-[12rem]">
                {equipments &&
                  equipments.map((equipment) => (
                    <EquipmentLine
                      key={equipment.equipment_id}
                      id={equipment.equipment_id}
                      count={equipment.equipment_count}
                      name={equipment.equipment_name}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>
      </TopNavContentWrapper>
    </>
  );
}
