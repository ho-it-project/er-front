import useUserStore from "@/states/userStore";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import DetailBox from "../requests/DetailBox";

interface PatientAddModalProps {
  close: () => void;
}

export default function PatientAddModal({ close }: PatientAddModalProps) {
  const residentNumber1Ref = useRef<HTMLInputElement>(null);
  const residentNumber2Ref = useRef<HTMLInputElement>(null);
  const addressRed = useRef<HTMLInputElement>(null);

  const { accessToken } = useUserStore();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [residentNumber1, setResidentNumber1] = useState("");
  const [residentNumber2, setResidentNumber2] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const ageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value)) && e.target.value.length < 4) {
      setAge(e.target.value);
    }
  };

  const residentNumber1ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value)) && e.target.value.length <= 6) {
      setResidentNumber1(e.target.value);
    }
    if (e.target.value.length === 6 && residentNumber2Ref.current) {
      residentNumber2Ref.current.focus();
    }
  };

  const residentNumber2ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value)) && e.target.value.length <= 7) {
      setResidentNumber2(e.target.value);
    }
    if (e.target.value.length === 7 && addressRed.current) {
      addressRed.current.focus();
    }
  };

  const addressChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const phoneNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = e.target.value.replace(/\D/g, ""); // 숫자 이외의 문자 제거

    if (!isNaN(Number(inputPhoneNumber)) && phoneNumber.length <= 12) {
      let formattedPhoneNumber = "";

      if (inputPhoneNumber.length <= 3) {
        formattedPhoneNumber = inputPhoneNumber;
      } else if (inputPhoneNumber.length <= 7) {
        formattedPhoneNumber = `${inputPhoneNumber.slice(
          0,
          3
        )}-${inputPhoneNumber.slice(3)}`;
      } else {
        formattedPhoneNumber = `${inputPhoneNumber.slice(
          0,
          3
        )}-${inputPhoneNumber.slice(3, 7)}-${inputPhoneNumber.slice(7)}`;
      }

      setPhoneNumber(formattedPhoneNumber);
    }
  };

  const addPatientHandler = () => {
    const url = "api/er/patients";
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        patient_name: name,
        patient_gender: gender,
        patient_birth: residentNumber1,
        patient_identity_number: `${residentNumber1}-${residentNumber2}`,
        patient_phone: phoneNumber,
        patient_address: address,
        doctor_id: "e7109a46-7593-4147-a51a-fe0b93070bd6",
        nurse_id: "a497c19d-b884-43fd-bf60-ceb3c1ec988b",
      }),
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.is_success) {
          close();
        }
      });
  };

  return (
    <div className="fixed left-1/2 top-1/2 z-30 mt-[2rem] h-[99rem] w-[57.8rem] -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-white px-[3.7rem] py-[3.5rem] drop-shadow-2xl">
      <span className="absolute -top-[5rem] left-0 flex h-[7rem] w-[26rem] items-center justify-between rounded-2xl bg-white px-[2rem]">
        <p className="text-[1.8rem] font-[600] text-main">환자 추가하기</p>
        <Image
          className="cursor-pointer"
          src="/fi-rr-cross-small.png"
          width={24}
          height={24}
          alt="닫기"
          onClick={close}
        />
      </span>
      <div className="relative flex h-full w-full flex-col gap-[3.5rem]">
        <DetailBox title="이름">
          <input
            type="text"
            value={name}
            className="flex h-full w-full items-center bg-transparent text-large font-medium focus:outline-none"
            onChange={nameChangeHandler}
          />
        </DetailBox>
        <div className="grid h-full w-full grid-cols-2 gap-[4rem]">
          <DetailBox title="나이">
            <input
              type="text"
              value={age}
              className="flex h-full w-full items-center bg-transparent text-large font-medium focus:outline-none"
              onChange={ageChangeHandler}
            />
          </DetailBox>
          <div className="flex h-full w-full flex-col gap-[1rem]">
            <div className="text-medium font-medium text-main">성별</div>
            <div className="flex h-full w-full items-center justify-around">
              <div
                className={`flex h-full w-full cursor-pointer items-center justify-center rounded-l-2xl text-large font-medium transition-all duration-200 ease-in hover:bg-bg ${
                  gender === "MALE" && "bg-bg"
                }`}
                onClick={() => setGender("MALE")}
              >
                남
              </div>
              <div
                className={`flex h-full w-full cursor-pointer items-center justify-center rounded-r-2xl text-large  font-medium transition-all duration-200 ease-in hover:bg-bg ${
                  gender === "FEMALE" && "bg-bg"
                }`}
                onClick={() => setGender("FEMALE")}
              >
                여
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-[1rem]">
          <div className="text-medium font-medium text-main">주민등록번호</div>
          <div className="flex h-full w-full items-center justify-center gap-[2rem] text-large font-medium">
            <input
              type="text"
              value={residentNumber1}
              ref={residentNumber1Ref}
              className="h-full w-full rounded-2xl bg-bg p-[3.5rem] text-large font-medium focus:outline-none"
              onChange={residentNumber1ChangeHandler}
            />
            <div>-</div>
            <input
              type="text"
              value={residentNumber2}
              ref={residentNumber2Ref}
              className="h-full w-full rounded-2xl bg-bg p-[3.5rem] text-large font-medium focus:outline-none"
              onChange={residentNumber2ChangeHandler}
            />
          </div>
        </div>
        <DetailBox title="거주지">
          <input
            type="text"
            value={address}
            ref={addressRed}
            className="flex h-full w-full items-center bg-transparent text-large font-medium focus:outline-none"
            onChange={addressChangeHandler}
          />
        </DetailBox>
        <DetailBox title="연락처">
          <input
            type="text"
            value={phoneNumber}
            className="flex h-full w-full items-center bg-transparent text-large font-medium focus:outline-none"
            onChange={phoneNumberChangeHandler}
          />
        </DetailBox>
        <div className="flex h-full w-full justify-center text-large font-large text-white">
          <button
            className="h-[7rem] w-[36rem] rounded-2xl bg-main"
            onClick={addPatientHandler}
          >
            환자 추가하기
          </button>
        </div>
      </div>
    </div>
  );
}
