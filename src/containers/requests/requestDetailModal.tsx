import BackGround from "@/components/common/background";
import { Patient, Request } from "@/states/requestStore";
import Image from "next/image";
import DetailBox from "./DetailBox";
import PatientStatus from "./patientStatus";

interface RequestDetailModalProps {
  request: Request;
  patient: Patient;
  closeModal: () => void;
}

export default function RequestDetailModal({
  request,
  patient,
  closeModal,
}: RequestDetailModalProps) {
  const formatDateFromNumber = (number: number) => {
    const dateString = number.toString();
    const date = new Date(
      parseInt(dateString.substring(0, 4)),
      parseInt(dateString.substring(4, 6)) - 1,
      parseInt(dateString.substring(6, 8))
    );

    const formattedDate = date.toISOString().split("T")[0];

    return formattedDate;
  };
  const calculateAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();

    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  return (
    <div className="fixed left-1/2 top-1/2 z-30 mt-[2rem] h-[104rem] w-[110rem] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-white px-[2rem] pb-[20rem] drop-shadow-2xl">
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
        <div className="flex h-[7rem] w-[12rem] items-center justify-center rounded-l-3xl bg-L-gray">
          거절하기
        </div>
        <div className="flex h-[7rem] w-[24rem] items-center justify-center rounded-r-3xl bg-main">
          수락하기
        </div>
      </div>
      <div className="h-full w-full overflow-scroll px-[2rem]">
        <div className="grid grid-cols-2 gap-x-[2rem] gap-y-[3rem] pb-[3rem]">
          <DetailBox title="구급업체 및 구급대원 정보">
            <p>
              {patient.ambulance_company_name} / {patient.patient_name}
            </p>
          </DetailBox>
          <DetailBox title="요청시간">
            <p>{request.request_date}</p>
          </DetailBox>
          <DetailBox title="환자 정보">
            <table className="w-full">
              <tr>
                <td className="leading-[3rem] text-main">성함</td>
                <td>{patient.patient_name}</td>
              </tr>
              <tr>
                <td className="leading-[3rem] text-main">나이 / 성별</td>
                <td>
                  {calculateAge(
                    formatDateFromNumber(Number(patient.patient_birth))
                  )}
                  세 / {patient.patient_gender === "MALE" ? "남" : "야"}
                </td>
              </tr>
              <tr>
                <td className="leading-[3rem] text-main">주민등록번호</td>
                <td></td>
              </tr>
              <tr>
                <td className="leading-[3rem] text-main">거주지</td>
                <td>?</td>
                <td></td>
              </tr>
              <tr>
                <td className="leading-[3rem] text-main">연락처</td>
                <td></td>
              </tr>
            </table>
          </DetailBox>
          <DetailBox title="보호자 정보">
            <table className="w-full">
              <tr>
                <td className="leading-[3rem] text-main">성함</td>
                <td>{patient.patient_name}</td>
              </tr>
              <tr>
                <td className="leading-[3rem] text-main">거주지</td>

                <td></td>
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
            </table>
          </DetailBox>
        </div>
        <DetailBox title="환자 상태">
          <PatientStatus />
        </DetailBox>
      </div>
      <BackGround />
    </div>
  );
}
