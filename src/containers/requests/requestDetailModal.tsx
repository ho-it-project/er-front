"use client";

import Spinner from "@/components/Spinner";
import {
  transformAge,
  transformFormatDate,
  transformPhone,
} from "@/lib/utils/transeform";
import { Patient, Request, useRequestListStore } from "@/states/requestStore";
import useUserStore from "@/states/userStore";
import { PatientDetail } from "@/type/patientDetail";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DetailBox from "./DetailBox";
import PatientStatus from "./patientStatus";

interface RequestDetailModalProps {
  request: Request;
  patient: Patient;
  closeModal: () => void;
}

interface GetDetailPatientResponse {
  result: {
    patient: PatientDetail;
  };
  is_success: boolean;
  message: string;
}

export default function RequestDetailModal({
  request,
  patient,
  closeModal,
}: RequestDetailModalProps) {
  const { accessToken } = useUserStore();
  const { setRequests } = useRequestListStore();

  const [patientDetail, setPatientDetail] = useState<PatientDetail | undefined>(
    undefined
  );

  const requestHandler = (res: "ACCEPTED" | "REJECTED") => {
    const url = `/api/requests/ems-to-er/${patient.patient_id}`;
    const option = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        response: res,
      }),
    };

    fetch(url, option)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.is_success) {
          setRequests((prevReq) =>
            prevReq.map((prev) =>
              prev.patient_id === patient.patient_id
                ? { ...prev, request_status: res }
                : prev
            )
          );
        }
      });
  };

  const url = `/api/er/request-patients/${patient.patient_id}`;
  const fetcher = (url: string, accessToken: string) =>
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((r) => r.json());
  const { data, isLoading } = useSWR<GetDetailPatientResponse>(
    url,
    (url: string) => fetcher(url, accessToken)
  );

  useEffect(() => {
    if (data) {
      if (!data.is_success) return;

      setPatientDetail(data.result.patient);
    }
  }, [data, setPatientDetail]);

  return (
    <div className="fixed left-1/2 top-1/2 z-30 mt-[2rem] h-[104rem] w-[110rem] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-white px-[2rem] pb-[15rem] drop-shadow-2xl">
      <span className="absolute -top-[5rem] left-0 flex h-[7rem] w-[26rem] items-center justify-between rounded-2xl bg-white px-[2rem]">
        <p className="text-[1.8rem] font-[600] text-main">요청 상세보기</p>
        <Image
          className="cursor-pointer"
          src="/fi-rr-cross-small.png"
          width={24}
          height={24}
          alt="닫기"
          onClick={closeModal}
        />
      </span>
      <div className="flex justify-end px-[2rem] py-[3rem] text-[1.8rem] font-[500] text-white">
        <div
          className="flex h-[7rem] w-[12rem] cursor-pointer items-center justify-center rounded-l-3xl bg-L-gray"
          onClick={() => requestHandler("REJECTED")}
        >
          거절하기
        </div>
        <div
          className="flex h-[7rem] w-[24rem] cursor-pointer items-center justify-center rounded-r-3xl bg-main"
          onClick={() => requestHandler("ACCEPTED")}
        >
          수락하기
        </div>
      </div>
      {isLoading && patientDetail ? (
        <Spinner />
      ) : (
        <div className="h-full w-full overflow-scroll px-[2rem]">
          <p>{request.request_status}</p>
          <div className="grid grid-cols-2 gap-x-[2rem] gap-y-[3rem] pb-[3rem]">
            <DetailBox title="구급업체 및 구급대원 정보">
              <p>
                {patient.ambulance_company_name} /{" "}
                {request.patient.ems_employee_name}
              </p>
            </DetailBox>
            <DetailBox title="요청시간">
              <p>{transformFormatDate(request.request_date)}</p>
            </DetailBox>
            <DetailBox title="환자 정보">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="leading-[3rem] text-main">성함</td>
                    <td>{patient.patient_name}</td>
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">나이 / 성별</td>
                    <td>
                      {transformAge(patient.patient_birth)} /{" "}
                      {patient.patient_gender === "MALE" ? "남" : "야"}
                    </td>
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">주민등록번호</td>
                    {/* <td>{patientDetail?.patient_identity_number}</td> */}
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">거주지</td>
                    <td>{}</td>
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">연락처</td>
                    <td>
                      {patientDetail &&
                        transformPhone(patientDetail?.patient_phone)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </DetailBox>
            <DetailBox title="보호자 정보">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="leading-[3rem] text-main">성함</td>
                    <td>
                      {patientDetail?.guardian &&
                        patientDetail?.guardian.guardian_name}
                    </td>
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">거주지</td>
                    <td>
                      {patientDetail?.guardian &&
                        patientDetail?.guardian.guardian_address}
                    </td>
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">연락처</td>
                    <td>
                      {patientDetail?.guardian &&
                        patientDetail?.guardian.guardian_phone}
                    </td>
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">환자와의 관계</td>
                    <td>
                      {patientDetail?.guardian &&
                        patientDetail?.guardian.guardian_relation}
                    </td>
                  </tr>
                </tbody>
              </table>
            </DetailBox>
          </div>
          <DetailBox title="환자 상태">
            <PatientStatus patient={patient} patientDetail={patientDetail} />
          </DetailBox>
        </div>
      )}
    </div>
  );
}
