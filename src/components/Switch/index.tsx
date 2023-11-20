import { useEffect, useState } from "react";

interface SwitchProps {
  onClick?: () => void;
  set: boolean;
  colorType?: "gray" | "yellow";
}

export default function Switch({
  set,
  colorType = "gray",
  onClick,
}: SwitchProps) {
  const [toggle, setToggle] = useState(set);

  useEffect(() => {
    setToggle(set);
  }, [set]);

  const clickedToggle = () => {
    setToggle((prev) => !prev);
    onClick && onClick();
  };

  return (
    <div
      onClick={clickedToggle}
      className={`relative h-[3rem] w-[6rem] cursor-pointer rounded-full border-2 ${
        toggle
          ? "border-main"
          : colorType === "gray"
          ? "border-L-gray"
          : "border-yellow"
      } flex items-center justify-center bg-bg`}
    >
      <span
        className={`absolute h-[2.4rem] w-[2.4rem] rounded-full transition-all duration-150 ease-in-out ${
          toggle
            ? "left-[3rem] bg-main"
            : colorType === "gray"
            ? "left-[0.2rem] bg-L-gray"
            : "left-[0.2rem] bg-yellow"
        }`}
      ></span>
    </div>
  );
}
