"use client";

import { useState } from "react";
import RequsetBox from "./RequestBox";
import StatusBox from "./StatusBox";

export default function RightMenu() {
  const status = {
    a: 12,
    A: 12,
    aw: 12,
    b: 1,
    B: 3,
  };
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

  return (
    <div className="ml-[2rem] mr-[2rem] mt-[4.5rem] w-[38rem]">
      <p className="mb-[0.7rem] h-[1.8rem] text-right text-[1.5rem] font-[600] text-gray">
        {timer}
      </p>
      <StatusBox status={status} />
      <div className="mx-auto">
        <div className="mt-[2rem] flex justify-between">
          <button className="h-[8rem] w-[28rem] rounded-2xl bg-main text-[2rem] font-[700] text-white">
            병상 정보 관리
          </button>
          <div className="relative h-[8rem] w-[8rem] rounded-2xl border-2 border-slate-100 bg-white"></div>
        </div>
        <div className="mt-[4rem]">
          <h4 className="text-[2rem] font-bold text-main">환자 수용 요청</h4>
          <div className="flex flex-col">
            <RequsetBox />
            <RequsetBox />
            <RequsetBox />
          </div>
        </div>
      </div>
    </div>
  );
}
