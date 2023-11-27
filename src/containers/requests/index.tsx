"use client";

import Spinner from "@/components/Spinner";
import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import { useRequestList } from "@/hooks/useRequestList";
import {
  transeformName,
  transformAge,
  transformDate,
} from "@/lib/utils/transeform";
import { RequestStatus, useRequestListStore } from "@/states/requestStore";
import { useState } from "react";
import RequestHeader from "./requestHeader";
import RequestItem from "./requestItem";
import RequestNav from "./requestNav";

const TopNavRequest = [{ title: "요청 목록", link: "/requests" }];

export default function RequestsContainer() {
  const { setQueryStatus } = useRequestListStore();
  const { requests, isLoading } = useRequestList();

  console.log("request_page", requests);

  const [, setClickedNav] = useState<RequestStatus[] | "전체">("전체");
  const ClickedNavHandler = (value: RequestStatus[] | "전체") => {
    setClickedNav(value);
    console.log(value);

    if (value !== "전체") {
      setQueryStatus(value);
    } else {
      setQueryStatus([]);
    }
  };

  return (
    <TopNavContentWrapper isScroll={false} topNav={{ items: TopNavRequest }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="relative h-full w-full px-[2rem]">
          <div className="top-0 flex w-full bg-white pb-[5rem]">
            <RequestNav onClickNav={ClickedNavHandler} />
          </div>
          <RequestHeader />
          <div className="mt-[2rem] h-[calc(100%-8rem)] w-full overflow-scroll">
            {requests.map((request) => (
              <RequestItem
                key={request.emergency_center_id + request.patient_id}
                requestDate={transformDate(request.request_date)}
                gender={request.patient.patient_gender === "MALE" ? "남" : "여"}
                age={transformAge(request.patient.patient_birth)}
                companyName={transeformName(request.emergency_center_name)}
                symptom={request.patient.patient_symptom_summary}
                status={request.request_status}
              />
            ))}
          </div>
        </div>
      )}
    </TopNavContentWrapper>
  );
}
