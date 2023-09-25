"use client";

import { useState } from "react";

interface CountProps {
  cnt: number;
  toggle: boolean;
}

export default function Count({ cnt, toggle }: CountProps) {
  const [count, setCount] = useState(toggle ? cnt : 0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    // 입력된 값을 숫자로 변환하여 상태 업데이트
    setCount(Number(newValue));
  };

  return (
    <input
      value={count}
      onChange={handleChange}
      className={`h-[3rem] w-[6.5rem] rounded-xl border-2  text-center text-[1.5rem] font-[600]
      ${toggle ? "border-main bg-white" : "border-L-gray bg-bg"}
      `}
    ></input>
  );
}