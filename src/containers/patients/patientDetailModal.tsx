import useModal from "@/hooks/useModal";
import { usePatientList } from "@/hooks/usePatientsList";
import { getPatientStatusStyles } from "@/lib/utils/patientStyle";
import {
  transeformDateClock,
  transformAge,
  transformPhone,
} from "@/lib/utils/transform";
import { PatientSummary, usePatientListStore } from "@/states/patientsStore";
import useUserStore from "@/states/userStore";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import DetailBox from "../requests/DetailBox";
import DropDownInput from "../requests/dropdownInput";
import BedPlacementModal from "./bedPlacementModal";
import PatientButton from "./patientButton";

interface PatientDetailModalProps {
  patient: PatientSummary;
  close: () => void;
}

export default function PatientDetailModal({
  patient,
  close,
}: PatientDetailModalProps) {
  const { accessToken } = useUserStore();
  const { isOpen, openModal, closeModal } = useModal();
  const styles = getPatientStatusStyles(patient.patient_status);
  const [isModified, setIsModified] = useState(false);
  const [type, setType] = useState<string>("");
  const [desc, setDesc] = useState("");
  const { mutate } = usePatientList();
  const { setPatients } = usePatientListStore();

  const ChangeTypeHandler = (type: string) => {
    setType(type);
  };
  const ChangeDescHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const url = `/api/er/patients/${patient.patient_id}`;
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      log_type: type,
      log_desc: desc,
    }),
  };
  const logSubmit = () => {
    console.log(type, desc);
    if (!type || !desc) return;

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.is_success) {
          console.log("성공");
          if (type === "DISCHARGE") {
            setPatients((prevPatients) => {
              return prevPatients.map((patient) => {
                if (patient.patient_id === patient.patient_id) {
                  return { ...patient, patient_status: "DISCHARGE" };
                }
                return patient;
              });
            });
          }
          mutate();
          close();
        }
        setType("");
        setDesc("");
      });
  };

  const LOGTYPE = [
    { value: "진단", code: "DIAGNOSIS" },
    { value: "처지", code: "TREATMENT" },
    { value: "약물처방", code: "MEDICATION" },
    { value: "이송", code: "TRANSFER" },
    { value: "퇴원", code: "DISCHARGE" },
    { value: "사망", code: "DEATH" },
  ];

  return (
    <div className="fixed left-1/2 top-1/2 z-30 mt-[2rem] h-[99rem] w-[110rem] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-white px-[2rem] pb-[15rem] drop-shadow-2xl">
      <span className="absolute -top-[5rem] left-0 flex h-[7rem] w-[26rem] items-center justify-between rounded-2xl bg-white px-[2rem]">
        <p className="text-[1.8rem] font-[600] text-main">
          {patient.patient.patient_name} 환자
        </p>
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
        <BedPlacementModal
          patientId={patient.patient_id}
          closeModal={closeModal}
          close={close}
        />
      )}
      <div className="h-max w-full">
        <PatientButton
          patientStatus={patient.patient_status}
          bedAssignmentHandler={openModal}
        />
      </div>
      <div className="h-full w-full overflow-scroll px-[2rem]">
        <div className="flex items-center pb-[2rem] text-medium font-medium">
          <div className="pr-[2rem] text-main">상태</div>
          <div className="pr-[1rem] font-medium-L">{styles.type}</div>
          <div
            className={`bg-${styles.backgroundColor} h-[1rem] w-[1rem] rounded-full`}
          ></div>
        </div>
        <div className="grid grid-cols-2 gap-x-[2rem] gap-y-[3rem] pb-[3rem]">
          <DetailBox title="환자 정보">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="leading-[3rem] text-main">성함</td>
                  <td>{patient.patient.patient_name}</td>
                </tr>
                <tr>
                  <td className="leading-[3rem] text-main">나이 / 성별</td>
                  <td>
                    {transformAge(patient.patient.patient_birth)} /{" "}
                    {patient.patient.patient_gender === "MALE" ? "남" : "여"}
                  </td>
                </tr>
                <tr>
                  <td className="leading-[3rem] text-main">주민등록번호</td>
                  {/* <td>{patientDetail?.patient_identity_number}</td> */}
                </tr>
                <tr>
                  <td className="leading-[3rem] text-main">거주지</td>
                  <td>{patient.patient.patient_address}</td>
                </tr>
                <tr>
                  <td className="leading-[3rem] text-main">연락처</td>
                  <td>{transformPhone(patient.patient.patient_phone)}</td>
                </tr>
              </tbody>
            </table>
          </DetailBox>
          <DetailBox title="보호자 정보">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="leading-[3rem] text-main">성함</td>
                  <td></td>
                </tr>
                <tr>
                  <td className="leading-[3rem] text-main">거주지</td>
                  <td></td>
                </tr>
                <tr>
                  <td className="leading-[3rem] text-main">연락처</td>
                  <td></td>
                </tr>
                <tr>
                  <td className="leading-[3rem] text-main">환자와의 관계</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </DetailBox>
        </div>
        <div className="h-max w-full">
          <DetailBox title="환자 상태">
            <div className="relative min-h-[34rem]">
              <div
                className="absolute -right-[3rem] -top-[9rem] flex h-[3.7rem] w-[12.3rem] cursor-pointer items-center justify-center rounded-full bg-main text-regular font-large text-white"
                onClick={() => {
                  isModified && logSubmit();
                  setIsModified(!isModified);
                }}
              >
                {isModified ? "수정 완료" : "수정 및 추가"}
              </div>
              <div className="flex flex-col gap-[1rem]">
                {isModified && (
                  <div className="flex h-full w-full gap-[2rem]">
                    <div className="w-[20rem]">
                      <DropDownInput
                        onChange={ChangeTypeHandler}
                        values={LOGTYPE}
                        value={type}
                      />
                    </div>
                    <input
                      value={desc}
                      className="h-[4rem] w-full border-b-2 border-main bg-transparent px-[2rem] text-black focus:outline-none"
                      onChange={(e) => ChangeDescHandler(e)}
                    />
                  </div>
                )}
                {patient.patient.patient_logs.map((log) => (
                  <div key={log.patient_log_id} className="flex gap-[1rem]">
                    <div className="text-main">
                      {transeformDateClock(log.log_date)}
                    </div>
                    <div>{log.log_desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </DetailBox>
        </div>
      </div>
    </div>
  );
}
