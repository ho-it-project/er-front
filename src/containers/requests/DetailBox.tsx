import { ReactNode } from "react";

interface DetailBoxProps {
  title: string;
  children: ReactNode;
}

export default function DetailBox({ title, children }: DetailBoxProps) {
  return (
    <div className="flex h-full w-full min-w-[50rem] flex-col gap-[1rem]">
      <div className="text-[1.8rem] font-[600] text-main">{title}</div>
      <div className="h-full w-full rounded-2xl bg-bg px-[3.5rem] py-[4rem] text-[1.5rem]">
        {children}
      </div>
    </div>
  );
}
