"use client";

import Spinner from "@/components/Spinner";
import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import useModal from "@/hooks/useModal";
import { useRequestList } from "@/hooks/useRequestList";
import {
  transeformName,
  transformAge,
  transformDate,
} from "@/lib/utils/transeform";
import {
  Request,
  RequestStatus,
  useRequestListStore,
} from "@/states/requestStore";
import { useState } from "react";
import RequestDetailModal from "./requestDetailModal";
import RequestHeader from "./requestHeader";
import RequestItem from "./requestItem";
import RequestNav from "./requestNav";

const TopNavRequest = [{ title: "요청 목록", link: "/requests" }];

export default function RequestsContainer() {
  const { setQueryStatus } = useRequestListStore();
  const { requests, isLoading } = useRequestList();
  const { isOpen, openModal, closeModal } = useModal();

  console.log("request_page", requests);

  const [selectedRequest, setSelectedRequest] = useState<Request>();
  const clickRequestHanlder = (request: Request) => {
    setSelectedRequest(request);
  };

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
              <div
                className="cursor-pointer"
                key={request.emergency_center_id + request.patient_id}
                onClick={() => {
                  clickRequestHanlder(request);
                  openModal();
                }}
              >
                <RequestItem
                  requestDate={transformDate(request.request_date)}
                  gender={
                    request.patient.patient_gender === "MALE" ? "남" : "여"
                  }
                  age={transformAge(request.patient.patient_birth)}
                  companyName={transeformName(request.emergency_center_name)}
                  symptom={request.patient.patient_symptom_summary}
                  status={request.request_status}
                />
              </div>
            ))}
          </div>
          {isOpen && selectedRequest && (
            <RequestDetailModal
              request={selectedRequest}
              patient={selectedRequest.patient}
              closeModal={closeModal}
            />
          )}
        </div>
      )}
    </TopNavContentWrapper>
  );
}
