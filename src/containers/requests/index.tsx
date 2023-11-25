"use client";

import Spinner from "@/components/Spinner";
import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import useModal from "@/hooks/useModal";
import { useRequestList } from "@/hooks/useRequestList";
import { Request } from "@/states/requestStore";
import { useState } from "react";
import RequestDetailModal from "./requestDetailModal";

const TopNavRequest = [{ title: "요청 목록", link: "/requests" }];

export default function RequestsContainer() {
  // const { query, setQueryPage } = useRequestListStore();
  const { requests, isLoading } = useRequestList();
  const { isOpen, openModal, closeModal } = useModal();

  const [selectedRequest, setSelectedRequest] = useState<Request>();
  const clickRequestHanlder = (request: Request) => {
    setSelectedRequest(request);
  };

  return (
    <TopNavContentWrapper isScroll={false} topNav={{ items: TopNavRequest }}>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="relative h-full w-full px-[2rem]">
          <h1>요청 목록</h1>
          <div className="flex flex-wrap gap-[2rem]">
            {requests.map((request) => (
              <div
                key={request.emergency_center_id + request.patient_id}
                className="h-[19rem] w-[38rem] cursor-pointer rounded-2xl bg-bg px-[5rem] py-[3rem]"
                onClick={() => {
                  clickRequestHanlder(request);
                  openModal();
                }}
              >
                {request.patient.patient_name}
              </div>
            ))}
          </div>
          <h1>ACCEPTED</h1>
          <div className="flex flex-wrap gap-[2rem]">
            {requests
              .filter((request) => request.request_status === "ACCEPTED")
              .map((request) => (
                <div
                  key={request.emergency_center_id + request.patient_id}
                  className="h-[19rem] w-[38rem] cursor-pointer rounded-2xl bg-bg px-[5rem] py-[3rem]"
                  onClick={() => {
                    clickRequestHanlder(request);
                    openModal();
                  }}
                >
                  {request.patient.patient_name}
                </div>
              ))}
          </div>
          <h1>REJECTED</h1>
          <div className="flex flex-wrap gap-[2rem]">
            {requests
              .filter((request) => request.request_status === "REJECTED")
              .map((request) => (
                <div
                  key={request.emergency_center_id + request.patient_id}
                  className="h-[19rem] w-[38rem] cursor-pointer rounded-2xl bg-bg px-[5rem] py-[3rem]"
                  onClick={() => {
                    clickRequestHanlder(request);
                    openModal();
                  }}
                >
                  {request.patient.patient_name}
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
