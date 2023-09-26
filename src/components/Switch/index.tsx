interface SwitchProps {
  clickedToggle: () => void;
  toggle: boolean;
}

export default function Switch({ clickedToggle, toggle }: SwitchProps) {
  return (
    <div
      onClick={clickedToggle}
      className={`relative h-[3rem] w-[6rem] rounded-full border-2 ${
        toggle ? "border-main" : "border-L-gray"
      } bg-bg`}
    >
      <span
        className={`absolute top-[0.1rem] h-[2.4rem] w-[2.4rem] rounded-full transition-all duration-150 ease-in-out ${
          toggle ? "left-[3rem] bg-main" : "left-[0.2rem] bg-L-gray"
        } `}
      ></span>
    </div>
  );
}
