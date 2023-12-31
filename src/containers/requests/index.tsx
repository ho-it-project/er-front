"use client";

import Spinner from "@/components/Spinner";
import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import useModal from "@/hooks/useModal";
import { useRequestList } from "@/hooks/useRequestList";
import {
  transeformName,
  transformAge,
  transformDate,
} from "@/lib/utils/transform";
import { Request, RequestStatus } from "@/states/requestStore";
import { useEffect, useState } from "react";
import RequestDetailModal from "./requestDetailModal";
import RequestHeader from "./requestHeader";
import RequestItem from "./requestItem";
import RequestNav from "./requestNav";

const TopNavRequest = [{ title: "환자 수용 요청", link: "/requests" }];

export default function RequestsContainer() {
  const { requests, isLoading, mutate } = useRequestList();
  const { isOpen, openModal, closeModal } = useModal();

  const [selectedRequest, setSelectedRequest] = useState<Request>();

  const clickRequestHanlder = (request: Request) => {
    setSelectedRequest(request);
  };

  const [clickedNav, setClickedNav] = useState<RequestStatus[] | "전체">(
    "전체"
  );
  const ClickedNavHandler = (value: RequestStatus[] | "전체") => {
    setClickedNav(value);
  };

  useEffect(() => {
    mutate();
    setSelectedRequest((prevSelectedRequest) => {
      return (
        (prevSelectedRequest &&
          requests.find(
            (request) =>
              request.patient_id === prevSelectedRequest.patient_id &&
              request.emergency_center_id ===
                prevSelectedRequest.emergency_center_id
          )) ||
        prevSelectedRequest
      );
    });
  }, [requests, setSelectedRequest, mutate]);

  useEffect(() => {
    if (isOpen && selectedRequest) {
      closeModal();
      openModal();
    }
  }, [selectedRequest, isOpen, closeModal, openModal]);

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
          <div className="mt-[2rem] h-[calc(100%-8rem)] w-full overflow-scroll pb-[5rem]">
            {requests
              .filter(
                (request) =>
                  ((clickedNav === "전체" &&
                    request.request_status !== "COMPLETED") ||
                    clickedNav.includes(request.request_status)) &&
                  request.request_status !== "CANCELED"
              )
              .map((request) => (
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
                    companyName={transeformName(
                      request.patient.ambulance_company_name
                    )}
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
              requestStatus={selectedRequest.request_status}
              close={closeModal}
            />
          )}
        </div>
      )}
    </TopNavContentWrapper>
  );
}
