"use client";

import useModal from "@/hooks/useModal";
import { ChangeEvent } from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
  size?: "sm" | "md";
}

export default function SearchInput({
  onChange,
  size = "md",
}: SearchInputProps) {
  const { isOpen, openModal, closeModal } = useModal();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    onChange(searchValue);
  };

  return (
    <div className="transition-all duration-300">
      {isOpen ? (
        <div
          className={`flex h-[4rem] items-center justify-between rounded-2xl  border-main pr-[1rem]
        ${size == "sm" ? "w-[28rem]" : "w-[42rem]"}
        `}
        >
          <input
            className={`h-[4rem] rounded-2xl border-2 border-main bg-white px-[1rem] text-[1.6rem] font-[600]
            ${size == "sm" ? "w-[24rem]" : "w-[38rem]"}
            `}
            onChange={handleChange}
            placeholder="🔍 검색하기"
          />
          <span
            className="cursor-pointer text-[2rem] font-medium text-main"
            onClick={closeModal}
          >
            X
          </span>
        </div>
      ) : (
        <div
          className="flex h-[4rem] w-[12.5rem] cursor-pointer items-center justify-center rounded-2xl border-2 border-main bg-white text-[1.6rem] font-[600] text-main"
          onClick={openModal}
        >
          🔍 검색하기
        </div>
      )}
    </div>
  );
}
