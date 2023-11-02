import { useState } from "react";

interface DropItems {
  value: string;
  code: string;
}

interface DropDownInputProps {
  onChange: (selected: string) => void;
  values: DropItems[];
  value: string;
  type: "role" | "department";
}

export default function DropDownInput({
  onChange,
  values,
  value,
  type,
}: DropDownInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(value);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: DropItems) => {
    setSelected(value.value);
    onChange(value.code);
    setIsOpen(false);
  };

  const width = type == "role" ? "w-[20rem]" : "w-[25rem]";

  return (
    <div className="relative">
      <div
        className={`flex h-[3.8rem] ${width} cursor-pointer items-center justify-center border-main bg-white pr-[4rem]
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
          className={`absolute left-0 top-[3.8rem] max-h-[40rem] ${width} overflow-y-scroll rounded-b-xl border-x-2 border-b-2 border-main bg-white
        `}
        >
          {values.map((v) => (
            <div
              key={v.code}
              className="flex h-[4rem] cursor-pointer items-center justify-center pr-[4rem] text-black hover:bg-L-gray"
              onClick={() => handleSelect(v)}
            >
              {v.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
