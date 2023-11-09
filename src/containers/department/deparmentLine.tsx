"use clinet";

import Switch from "@/components/Switch";

interface DepartmentLineProps {
  title: string;
  set: boolean;
  onClick?: () => void;
}

export default function DepartmentLine({
  title,
  set,
  onClick,
}: DepartmentLineProps) {
  const clickSwitch = () => {
    onClick && onClick();
  };

  return (
    <span className="mb-[2rem] flex justify-between">
      <span className="text-[1.8rem] font-[700]">{title}</span>
      <Switch set={set} onClick={clickSwitch} />
    </span>
  );
}
