"use client";

import Count from "@/components/Count";
import Switch from "@/components/Switch";
import { useEffect, useState } from "react";

interface EquipmentLineProps {
  id: number;
  count: number;
  name: string;
  onClickSwitch?: (status: boolean) => void;
  onChangeCount?: (count: number) => void;
}

export default function EquipmentLine({
  count,
  name,
  onClickSwitch,
  onChangeCount,
}: EquipmentLineProps) {
  const [equipmentCount, setEquipmentCount] = useState(count);
  const [status, setStatus] = useState(count > 0);

  const clickSwitch = () => {
    setStatus((prev) => !prev);
    onClickSwitch && onClickSwitch(!status);
  };

  useEffect(() => {
    if (!status) {
      setEquipmentCount(0);
    }
  }, [status, setEquipmentCount]);

  return (
    <span className="my-[3.5rem] flex justify-between gap-[2rem]">
      <span className="flex w-[26rem] justify-between">
        <span className="text-[2rem] font-[600]">{name}</span>
        <Switch set={status} onClick={() => clickSwitch()} />
      </span>
      <Count
        count={equipmentCount}
        set={status}
        setCount={(count) => setEquipmentCount(count)}
        onChange={(count) => onChangeCount && onChangeCount(count)}
      />
    </span>
  );
}
