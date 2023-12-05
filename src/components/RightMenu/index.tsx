"use client";

import RequestDetailModal from "@/containers/requests/requestDetailModal";
import { useRequestList } from "@/hooks/useRequestList";
import { transformAge } from "@/lib/utils/transeform";
import { useModal } from "@/states/Modal";
import { Request } from "@/states/requestStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import ScrollBox from "../ScrollBox/ScrollBox";
import Spinner from "../Spinner";
import RequsetBox from "./RequestBox";
import StatusBox from "./StatusBox";

export default function RightMenu() {
  const currentTimer = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    return `현재시각 ${year}.${month}.${day} ${hour}:${minute}`;
  };
  const [timer, setTimer] = useState(() => currentTimer());
  setInterval(() => setTimer(currentTimer()), 1000);

  const { requests, isLoading, mutate } = useRequestList();
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedRequest, setSelectedRequest] = useState<Request>();
  const clickRequestHanlder = (request: Request) => {
    setSelectedRequest(request);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = currentTimer();
      if (newTime !== timer) {
        setTimer(newTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  useEffect(() => {
    mutate();
  }, [requests, mutate]);

  return (
    <div className=" right-menu mr-[2rem] mt-[4.5rem] w-[38rem]">
      <p className="mb-[0.7rem] h-[1.8rem] text-right text-[1.5rem] font-[600] text-gray">
        {timer}
      </p>
      <StatusBox />
      <div className="flex justify-between gap-[2rem]">
        <Link href={"/roomManagement"}>
          <div className="flex h-[8rem] w-[28rem] items-center justify-center rounded-2xl bg-main text-[2rem] font-[700] text-white">
            병상 정보 관리
          </div>
        </Link>
        <div className="relative h-[8rem] w-[8rem] rounded-2xl border-2 border-slate-100 bg-white"></div>
      </div>
      <div className="h-[calc(100%-35rem)] overflow-hidden">
        <div className="h-full w-full">
          <div className="mt-[4rem] h-full">
            <div className="flex items-center justify-between">
              <h4 className="text-[2rem] font-bold text-main">
                환자 수용 요청
              </h4>
              <Link href={"/patients"}>
                <div className="h-[2rem] w-[8rem] cursor-pointer rounded-3xl bg-white"></div>
              </Link>
            </div>
            <div className="relative h-full w-full overflow-y-hidden">
              <ScrollBox>
                <div className="mb-[7rem] flex flex-col gap-[2rem] pt-[1rem]">
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    requests
                      .filter(
                        (request) => request.request_status !== "CANCELED"
                      )
                      .map((request) => (
                        <div
                          className="cursor-pointer"
                          key={request.patient_id}
                          onClick={() => {
                            clickRequestHanlder(request);
                            openModal();
                          }}
                        >
                          <RequsetBox
                            date={request.request_date}
                            name={request.patient.patient_name}
                            gender={
                              request.patient.patient_gender === "MALE"
                                ? "남"
                                : "여"
                            }
                            age={transformAge(request.patient.patient_birth)}
                            companyName={request.patient.ambulance_company_name}
                            symptom={request.patient.patient_symptom_summary}
                            status={request.request_status}
                          />
                        </div>
                      ))
                  )}
                </div>
              </ScrollBox>
            </div>
          </div>
        </div>
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
  );
}
