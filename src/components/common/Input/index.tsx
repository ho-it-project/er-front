import { ChangeEvent } from "react";

interface InputProps {
  size?: "sm" | "lg";
  onChange: (value: string) => void;
  title: string;
  set_value?: string;
}

export default function Input({
  size = "sm",
  onChange,
  title,
  set_value = "",
}: InputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  const placeholderText =
    size === "sm" ? "입력해주세요" : `${title}을 입력해주세요`;
  const inputSize = size === "sm" ? "w-[20rem]" : "w-[57.6rem]";

  return (
    <div>
      <input
        className={`h-[3.8rem] rounded-xl border-2 border-main bg-white text-center text-black placeholder:text-L-gray 
      ${inputSize}
      `}
        onChange={handleChange}
        placeholder={placeholderText}
        value={set_value}
      />
    </div>
  );
}
