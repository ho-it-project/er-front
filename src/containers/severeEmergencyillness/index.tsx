"use client";

import SaveAlert from "@/components/common/saveAlert";
import useSaveAlert from "@/hooks/useSaveAlert";
import useUpdateServableListStore from "@/states/updateServableIllnessList";
import useUserStore from "@/states/userStore";
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
  const { userData, accessToken } = useUserStore();
  const url = `/api/er/${userData.hospital_id}/illnesses`;
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((r) => r.json());
  const { data } = useSWR(url, (url) => fetcher(url, accessToken));
  const [severeConditions, setSevereConditions] = useState<severeGroup[]>();
  const { updateList, addUpdateList } = useUpdateServableListStore();
  const { isAlertVisible, showSuccessAlert } = useSaveAlert();

  const clickHandler = (id: string, status: "ACTIVE" | "INACTIVE") => () => {
    addUpdateList(id, status);
  };

  const servableUpdateSubmit = () => {
    const url = "/api/er/current/illnesses";

    fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updateList),
    })
      .then((r) => r.json())
      .then(() => showSuccessAlert());
  };

  useEffect(() => {
    if (data) {
      if (!data.is_success) return;

      const groupedData = data.result.reduce(
        (acc: severeGroup[], item: severeIllness) => {
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
        },
        []
      );
      setSevereConditions(groupedData);
    }
  }, [data]);

  return (
    <>
      <div className="px-[6rem] py-[6rem]">
        {isAlertVisible && <SaveAlert />}
        <div className="flex justify-between">
          <p className="ml-[6rem] w-[24rem] text-[1.2rem] font-[600] text-gray">
            • 현재 진료 가능한 중증응급질환을 선택해주세요.
          </p>
          <button
            className="h-[5rem] w-[20rem] rounded-[1rem] bg-main text-[1.6rem] font-[600] text-white"
            onClick={servableUpdateSubmit}
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
