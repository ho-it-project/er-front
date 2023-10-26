import { useState } from "react";

interface ValueProps {
  value: string;
}

interface DropDownInputProps {
  onChange: (selected: string) => void;
  values: ValueProps[];
  set_value?: string;
}

export default function DropDownInput({
  onChange,
  values,
  set_value = "",
}: DropDownInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(set_value);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className={`flex h-[3.8rem] w-[20rem] cursor-pointer items-center justify-center border-main bg-white pr-[4rem]
         ${
           isOpen ? "rounded-t-xl border-x-2 border-t-2" : "rounded-xl border-2"
         }
        `}
        onClick={handleToggle}
      >
        <span className={`${selected ? "text-black" : "text-L-gray"}`}>
          {selected || "선택하세요"}
        </span>
        <span className="absolute inset-y-0 right-[2rem] flex items-center">
          {isOpen ? "▲" : "▼"}
        </span>
      </div>
      {isOpen && (
        <div
          className={`absolute left-0 top-[3.8rem] w-[20rem] rounded-b-xl border-x-2 border-b-2 border-main bg-white
         ${isOpen ? "" : ""}
        `}
        >
          {values.map((v, index) => (
            <div
              key={index}
              className="flex h-[4rem] cursor-pointer items-center justify-center pr-[4rem] text-black hover:bg-L-gray"
              onClick={() => handleSelect(v.value)}
            >
              {v.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
