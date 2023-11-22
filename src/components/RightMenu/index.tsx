"use client";

import { useState } from "react";
import ScrollBox from "../ScrollBox/ScrollBox";
import RequsetBox from "./RequestBox";
import StatusBox from "./StatusBox";

const DUMMY_REQUEST = [
  {
    id: 403829,
    time: "2:14",
    name: "김*종",
    gender: "남",
    age: 19,
    place: "서울 119 안전센터",
    symptom: ["복통", "식은땀", "발열", "구토"],
  },
  {
    id: 403829,
    time: "2:14",
    name: "김*종",
    gender: "남",
    age: 19,
    place: "서울 119 안전센터",
    symptom: ["복통", "식은땀", "발열", "구토"],
  },
  {
    id: 403829,
    time: "2:14",
    name: "김*종",
    gender: "남",
    age: 19,
    place: "서울 119 안전센터",
    symptom: ["복통", "식은땀", "발열", "구토"],
  },
  {
    id: 403829,
    time: "2:14",
    name: "김*종",
    gender: "남",
    age: 19,
    place: "서울 119 안전센터",
    symptom: ["복통", "식은땀", "발열", "구토"],
  },
  {
    id: 403829,
    time: "2:14",
    name: "김*종",
    gender: "남",
    age: 19,
    place: "서울 119 안전센터",
    symptom: ["복통", "식은땀", "발열", "구토"],
  },
  {
    id: 403829,
    time: "2:14",
    name: "김*종",
    gender: "남",
    age: 19,
    place: "서울 119 안전센터",
    symptom: ["복통", "식은땀", "발열", "구토"],
  },
];

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

  return (
    <div className="mr-[2rem] mt-[4.5rem] w-[38rem]">
      <p className="mb-[0.7rem] h-[1.8rem] text-right text-[1.5rem] font-[600] text-gray">
        {timer}
      </p>
      <StatusBox />
      <div className="flex justify-between gap-[2rem]">
        <button className="h-[8rem] w-[28rem] rounded-2xl bg-main text-[2rem] font-[700] text-white">
          병상 정보 관리
        </button>
        <div className="relative h-[8rem] w-[8rem] rounded-2xl border-2 border-slate-100 bg-white"></div>
      </div>
      <div className="h-[calc(100%-35rem)] overflow-hidden">
        <div className="h-full w-full">
          <div className="mt-[4rem] h-full">
            <h4 className="text-[2rem] font-bold text-main">환자 수용 요청</h4>
            <div className="relative h-full w-full overflow-y-hidden">
              <ScrollBox>
                <div className="mb-[7rem] flex flex-col gap-[2rem]">
                  {DUMMY_REQUEST.map((q, index) => (
                    <RequsetBox
                      id={q.id}
                      time={q.time}
                      name={q.name}
                      gender={q.gender}
                      age={q.age}
                      place={q.place}
                      symptom={q.symptom}
                      key={index}
                    />
                  ))}
                </div>
              </ScrollBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
