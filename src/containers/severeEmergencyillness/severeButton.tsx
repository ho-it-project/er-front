"use client";

import { useState } from "react";

interface SevereButtonProps {
  title: string;
  sub: string;
  set: boolean;
}

export default function SevereButton({ title, sub, set }: SevereButtonProps) {
  const [selected, setSelected] = useState(set);
  const handleClicked = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div
      className={`relative flex h-[10rem] w-[18rem] cursor-pointer flex-col items-center justify-between rounded-3xl border-2 p-[2rem]
        ${selected ? "bg-main text-white" : "bg-bg text-main"}
  `}
      onClick={handleClicked}
    >
      <p className="text-[1.6rem] font-[600]">{title}</p>
      <span
        className={`absolute top-1/2 h-[0.2rem] w-[12rem]
      ${selected ? "bg-white" : "bg-main"}
      `}
      ></span>
      <p className="text-[1.6rem] font-[600]">{sub}</p>
    </div>
  );
}
