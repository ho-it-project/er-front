import { ReactNode } from "react";
interface BoardProps {
  children: ReactNode;
}

export default function Board({ children }: BoardProps) {
  return (
    <div className="mx-[1rem] flex w-[192rem]">
      <div className="m-[1rem] mx-auto">
        <div className="relative mx-auto mt-[6rem] h-[99rem] w-[138rem] rounded-2xl bg-white pt-[2rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
