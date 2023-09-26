import { ReactNode } from "react";
interface BoardProps {
  children: ReactNode;
}

export default function Board({ children }: BoardProps) {
  return (
    <div className="mb-[2rem] mt-[2rem] w-full">
      <div className="mb-[2rem] h-full w-full overflow-hidden rounded-2xl drop-shadow-sm">
        <div className="relative top-0 mb-[2rem] mt-[5rem] h-[calc(100%-5rem)] rounded-2xl bg-white px-[3rem] py-[2rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
