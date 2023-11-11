"use client";

import { useState } from "react";

interface SevereButtonProps {
  name: string;
  status: "ACTIVE" | "INACTIVE";
  id: string;
  onClick?: () => void;
}

export default function SevereButton({
  name,
  status,
  id,
  onClick,
}: SevereButtonProps) {
  const [selected, setSelected] = useState(status);
  const handleClicked = () => {
    setSelected((prev) => (prev === "ACTIVE" ? "INACTIVE" : "ACTIVE"));
    onClick && onClick();
  };

  return (
    <div
      className={`relative flex h-[5rem] w-[15rem] cursor-pointer items-center justify-center rounded-3xl
        ${
          selected === "ACTIVE" ? "bg-main text-white" : "bg-bg text-gray"
        } transition-all duration-300
  `}
      onClick={handleClicked}
    >
      <p className="text-[1.6rem] font-[600]">{name}</p>
    </div>
  );
}
