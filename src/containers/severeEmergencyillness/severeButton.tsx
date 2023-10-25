"use client";

import { useState } from "react";

interface SevereButtonProps {
  sub: string;
  set: boolean;
}

export default function SevereButton({ sub, set }: SevereButtonProps) {
  const [selected, setSelected] = useState(set);
  const handleClicked = () => {
    setSelected((prev) => !prev);
  };

  return (
    <div
      className={`relative flex h-[5rem] w-[15rem] cursor-pointer items-center justify-center rounded-3xl
        ${
          selected ? "bg-main text-white" : "bg-bg text-gray"
        } transition-all duration-300
  `}
      onClick={handleClicked}
    >
      <p className="text-[1.6rem] font-[600]">{sub}</p>
    </div>
  );
}
