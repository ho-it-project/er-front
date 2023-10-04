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
          className={`flex h-[4rem] items-center justify-between gap-[2rem] rounded-2xl border-main
        ${size == "sm" ? "w-[28rem]" : "w-[42rem]"}
        `}
        >
          <div className="flex h-[4rem] w-full gap-[1rem] rounded-2xl border-2 border-main bg-white py-[0.7rem] pl-[1rem]">
            <img src="/fi-rs-search.png" />
            <input
              className="w-full bg-white text-[1.6rem] font-[600] focus:outline-none"
              onChange={handleChange}
              placeholder="검색하기"
            />
          </div>
          <span
            className="cursor-pointer text-[2rem] font-medium text-main"
            onClick={closeModal}
          >
            X
          </span>
        </div>
      ) : (
        <div
          className="flex h-[4rem] w-[12.5rem] cursor-pointer items-center justify-center gap-[1rem] rounded-2xl border-2 border-main bg-white text-[1.6rem] font-[600] text-main"
          onClick={openModal}
        >
          <img src="/fi-rs-search.png" />
          <span>검색하기</span>
        </div>
      )}
    </div>
  );
}
