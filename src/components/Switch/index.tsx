interface SwitchProps {
  clickedToggle: () => void;
  toggle: boolean;
  colorType?: "gray" | "yellow";
}

export default function Switch({
  clickedToggle,
  toggle,
  colorType = "gray",
}: SwitchProps) {
  return (
    <div
      onClick={clickedToggle}
      className={`relative h-[3rem] w-[6rem] cursor-pointer rounded-full border-2 ${
        toggle
          ? "border-main"
          : colorType === "gray"
          ? "border-L-gray"
          : "border-yellow"
      } bg-bg`}
    >
      <span
        className={`absolute top-[0.1rem] h-[2.4rem] w-[2.4rem] rounded-full transition-all duration-150 ease-in-out ${
          toggle
            ? "left-[3rem] bg-main"
            : colorType === "gray"
            ? "left-[0.2rem] bg-L-gray"
            : "left-[0.2rem] bg-yellow"
        } `}
      ></span>
    </div>
  );
}
