"use client";

import useUpdateServableListStore from "@/states/updateServableIllnessList";
import { useEffect, useState } from "react";
import useSWR from "swr";
import SevereBox from "./severeBox";
import SevereButton from "./severeButton";

interface severeGroup {
  servable_title: string;
  servable_illness: severeIllness[];
}

interface severeIllness {
  servable_illness_id: string;
  servable_illness_name: string;
  status: "ACTIVE" | "INACTIVE";
}

export default function SevereEmergencyIllnessContainer() {
  const url = "/api/er/hospitals/current/illness";
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR(url, fetcher);
  const [severeConditions, setSevereConditions] = useState<severeGroup[]>();

  const { updateList, addUpdateList } = useUpdateServableListStore();

  const clickHandler = (id: string, status: "ACTIVE" | "INACTIVE") => () => {
    addUpdateList(id, status);
    console.log(updateList);
  };

  const deparmentUpdateSubmit = () => {
    const url = "/api/er/hospitals/current/illness";
    console.log(updateList);

    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateList),
    })
      .then((r) => r.json())
      .then((d) => console.log(d));
  };

  useEffect(() => {
    if (data && data.result) {
      const groupedData = data.result
        .slice(0, 29)
        .reduce((acc: severeGroup[], item: severeIllness) => {
          const match = item.servable_illness_name.match(/\[(.*?)](.*)/);
          const servableTitle = match && match[1];
          const servableName = match && match[2].trim();

          if (!servableName || !servableTitle) return;

          const existingItem = acc.find(
            (group) =>
              servableTitle && group.servable_title.includes(servableTitle)
          );

          if (existingItem) {
            existingItem.servable_illness.push({
              servable_illness_id: item.servable_illness_id,
              servable_illness_name: servableName,
              status: item.status,
            });
          } else {
            acc.push({
              servable_title: servableTitle,
              servable_illness: [
                {
                  servable_illness_id: item.servable_illness_id,
                  servable_illness_name: servableName,
                  status: item.status,
                },
              ],
            });
          }

          return acc;
        }, []);
      setSevereConditions(groupedData);
    }
  }, [data]);

  return (
    <>
      <div className="px-[6rem] py-[6rem]">
        <div className="flex justify-between">
          <p className="ml-[6rem] w-[24rem] text-[1.2rem] font-[600] text-gray">
            • 현재 진료 가능한 중증응급질환을 선택해주세요.
          </p>
          <button
            className="h-[5rem] w-[20rem] rounded-[1rem] bg-main text-[1.6rem] font-[600] text-white"
            onClick={deparmentUpdateSubmit}
          >
            저장하기
          </button>
        </div>
        <div className="mt-[12rem] h-[62rem] w-full">
          <div className="flex flex-wrap gap-[4rem]">
            {severeConditions &&
              severeConditions.map((severe, index) => (
                <SevereBox title={severe.servable_title} key={index}>
                  {severe.servable_illness.map((illness, index) => (
                    <SevereButton
                      name={illness.servable_illness_name}
                      status={illness.status}
                      onClick={clickHandler(
                        illness.servable_illness_id,
                        illness.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                      )}
                      key={index}
                    />
                  ))}
                </SevereBox>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
