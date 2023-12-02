"use client";

import Spinner from "@/components/Spinner";
import useModal from "@/hooks/useModal";
import {
  transformAge,
  transformFormatDate,
  transformPhone,
} from "@/lib/utils/transeform";
import {
  Patient,
  Request,
  RequestStatus,
  useRequestListStore,
} from "@/states/requestStore";
import useUserStore from "@/states/userStore";
import { PatientDetail } from "@/type/patientDetail";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DetailBox from "./DetailBox";
import BedAssignmentModal from "./bedAssignmentModal";
import PatientStatus from "./patientStatus";
import RequestButton from "./requestButton";

interface RequestDetailModalProps {
  request: Request;
  patient: Patient;
  requestStatus: RequestStatus;
  close: () => void;
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
  requestStatus,
  close,
}: RequestDetailModalProps) {
  const { accessToken } = useUserStore();
  const { setRequests } = useRequestListStore();

  const [patientDetail, setPatientDetail] = useState<PatientDetail | undefined>(
    undefined
  );
  const [count, setCount] = useState(0);
  const { isOpen, openModal, closeModal } = useModal();

  const requestHandler = (res: RequestStatus) => {
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
  const { data, isLoading, mutate } = useSWR<GetDetailPatientResponse>(
    url,
    (url: string) => fetcher(url, accessToken)
  );

  useEffect(() => {
    if (data) {
      if (!data.is_success) return;
      const { patient } = data.result;

      setPatientDetail(patient);
      const maxCount = Math.max(
        patient.abcde.length,
        patient.dcap_btls.length,
        patient.opqrst.length,
        patient.rapid.length,
        patient.sample.length,
        patient.vs.length
      );
      setCount(maxCount);
      mutate();
    }
  }, [data, setPatientDetail, mutate]);

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
          onClick={close}
        />
      </span>
      {isOpen && (
        <BedAssignmentModal
          patientId={patient.patient_id}
          closeModal={closeModal}
        />
      )}
      <div className="h-max w-full">
        <RequestButton
          requestStatus={requestStatus}
          requestHandler={requestHandler}
          bedAssignmentHandler={openModal}
        />
      </div>
      {isLoading && patientDetail ? (
        <Spinner />
      ) : (
        <div className="h-full w-full overflow-scroll px-[2rem]">
          <p>{requestStatus}</p>
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
                      {patient.patient_gender === "MALE" ? "남" : "여"}
                    </td>
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">주민등록번호</td>
                    {/* <td>{patientDetail?.patient_identity_number}</td> */}
                  </tr>
                  <tr>
                    <td className="leading-[3rem] text-main">거주지</td>
                    <td>{patientDetail?.patient_address}</td>
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
          {Array.from({ length: count }).map((_, index) => (
            <DetailBox title="환자 상태" key={index}>
              <PatientStatus
                patient={patient}
                rapid={patientDetail?.rapid[index]}
                abcde={patientDetail?.abcde[index]}
                opqrst={patientDetail?.opqrst[index]}
                sample={patientDetail?.sample[index]}
                dcap_btls={patientDetail?.dcap_btls[index]}
                vs={patientDetail?.vs[index]}
              />
            </DetailBox>
          ))}
        </div>
      )}
    </div>
  );
}
