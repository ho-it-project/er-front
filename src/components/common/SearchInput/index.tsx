"use client";

import useModal from "@/hooks/useModal";
import Image from "next/image";
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
    <div
      className={`flex items-center justify-end gap-[2rem] transition-all duration-200 ${
        size == "sm" ? "w-[28rem]" : "w-[42rem]"
      }`}
    >
      {isOpen ? (
        <div className="flex h-[4rem] w-full gap-[1rem] rounded-2xl border-2 border-main bg-white py-[0.7rem] pl-[1rem] transition-all duration-300">
          <Image src="/fi-rs-search.png" width={24} height={24} alt="돋보기" />
          <input
            className="w-full bg-white text-[1.6rem] font-[600] focus:outline-none"
            onChange={handleChange}
            placeholder={`${size == "sm" ? "병원 검색하기" : "이름 검색하기"}`}
          />
        </div>
      ) : (
        <div
          className="flex h-[4rem] w-[12.5rem] cursor-pointer items-center justify-center gap-[1rem] rounded-2xl border-2 border-main bg-white text-[1.6rem] font-[600] text-main transition-all duration-300"
          onClick={openModal}
        >
          <Image src="/fi-rs-search.png" width={24} height={24} alt="돋보기" />
          <span>검색하기</span>
        </div>
      )}
      {isOpen && (
        <span
          className="cursor-pointer text-[2rem] font-medium text-main"
          onClick={closeModal}
        >
          X
        </span>
      )}
    </div>
  );
}
