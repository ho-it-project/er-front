"use client";

import { ChangeEvent } from "react";

interface InputProps {
  size?: "sm" | "lg";
  onChange: (value: string) => void;
  title: string;
  value?: string;
}

export default function Input({
  size = "sm",
  onChange,
  title,
  value = "",
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const placeholderText =
    size === "sm" ? "입력해주세요" : `${title}을 입력해주세요`;
  const inputSize = size === "sm" ? "w-[20rem]" : "w-[57.6rem]";

  return (
    <div>
      <input
        className={`h-[3.8rem] rounded-xl border-2 border-main bg-white text-center text-black placeholder:text-L-gray focus:outline-none
      ${inputSize}
      `}
        onChange={handleChange}
        placeholder={placeholderText}
        value={value}
      />
    </div>
  );
}
