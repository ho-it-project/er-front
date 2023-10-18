"use client";

import useLoginStore from "@/states/loginStore";
import { ChangeEvent, useState } from "react";

export default function LoginBox() {
  const [emergencyId, setEmergencyId] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [fail, setFail] = useState(false);

  const changeEmergecyId = (value: string) => {
    setEmergencyId(value);
    setFail(false);
  };
  const changeId = (value: string) => {
    setId(value);
    setFail(false);
  };
  const changePassword = (value: string) => {
    setPassword(value);
    setFail(false);
  };

  const handleLogin = () => {
    const url = process.env.NEXT_PUBLIC_ER_DOMAIN + "/auth/login";
    if (emergencyId && id && password && url) {
      const data = {
        emergency_center_id: emergencyId,
        id_card: id,
        password: password,
      };
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.is_success) {
            useLoginStore.getState().login();
            useLoginStore.getState().openLoginBox();
          } else {
            setFail(true);
            setPassword("");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      setFail(true);
      setPassword("");
    }
  };

  return (
    <>
      <div className="fixed left-1/2 top-1/2 z-30 flex h-[81rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 transform flex-col justify-between rounded-2xl bg-white px-[3rem] py-[2rem]">
        <span className="absolute -top-[8.5rem] left-0 flex h-[9.5rem] w-[47rem] rounded-2xl bg-white px-[3rem] py-[2rem]">
          <span className="h-[6.6rem] w-[27rem] rounded-2xl bg-L-gray"></span>
        </span>
        <div className="relative mt-[4rem] flex flex-col gap-[4rem]">
          <LoginSection
            title="응급실 ID"
            value={emergencyId}
            onChange={(value) => changeEmergecyId(value)}
          />
          <LoginSection title="ID" value={id} onChange={changeId} />
          <LoginSection
            title="비밀번호"
            value={password}
            onChange={changePassword}
          />
          {fail && (
            <span className="relative bottom-[3rem] ml-auto px-[3rem] text-[1.5rem] font-[600] text-red">
              * 등록되지 않은 아이디거나, 아이디 또는 비밀번호가 회원정보와
              일치하지 않습니다.
            </span>
          )}
        </div>

        <div className=" relative flex flex-col gap-[4rem]">
          <button className="ml-auto w-[15rem] border-b-2 border-L-gray text-[2rem] font-[600] text-gray">
            ID/비밀번호 찾기
          </button>
          <button
            onClick={handleLogin}
            className="h-[10rem] w-full rounded-2xl bg-main text-[2.5rem] font-[700] text-white"
          >
            로그인
          </button>
        </div>
      </div>
      <span className="fixed left-0 top-0 z-20 h-full w-full bg-black opacity-70"></span>
    </>
  );
}

interface loginSectionProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

function LoginSection({ title, value, onChange }: loginSectionProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  };
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <p className="text-[2.4rem] font-[700] text-main">{title}</p>
      <input
        value={value}
        onChange={handleChange}
        placeholder={`${title}를 입력해주세요`}
        className="h-[8rem] w-[62rem] rounded-xl border-2 border-main bg-white text-center text-[2.4rem] placeholder:text-L-gray"
      />
    </div>
  );
}
