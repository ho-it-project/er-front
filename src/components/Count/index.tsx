"use client";

import { useEffect, useState } from "react";

interface CountProps {
  count: number;
  set: boolean;
  setCount: (count: number) => void;
  onChange?: (count: number) => void;
}

export default function Count({ count, set, setCount, onChange }: CountProps) {
  const [toggle, setToggle] = useState(set);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!isNaN(Number(newValue))) {
      console.log(newValue);

      setCount(Number(newValue));
      onChange && onChange(Number(newValue));
    }
  };

  useEffect(() => {
    setToggle(set);
  }, [set]);

  return (
    <input
      value={count}
      onChange={handleChange}
      disabled={!toggle}
      className={`h-[3rem] w-[6.5rem] rounded-xl border-2 text-center text-[1.5rem] font-[600] focus:outline-none
      ${toggle ? "border-main bg-white" : "border-L-gray bg-bg"}
      `}
    />
  );
}
