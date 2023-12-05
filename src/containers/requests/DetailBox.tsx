import { ReactNode } from "react";

interface DetailBoxProps {
  title: string;
  children: ReactNode;
}

export default function DetailBox({ title, children }: DetailBoxProps) {
  return (
    <div className="flex h-full w-full flex-col gap-[1rem]">
      <div className="text-medium font-medium text-main">{title}</div>
      <div className="h-full w-full rounded-2xl bg-bg p-[3.5rem] text-[1.5rem]">
        {children}
      </div>
    </div>
  );
}
