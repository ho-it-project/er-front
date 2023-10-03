import { ReactNode } from "react";
interface BoardProps {
  children: ReactNode;
}

export default function MiniBoard({ children }: BoardProps) {
  return (
    <div className="mt-[2rem] h-full w-full">
      <div className="h-full w-full overflow-hidden rounded-2xl drop-shadow-sm">
        <div className="relative top-0 h-[calc(100%-2rem)] rounded-2xl bg-white px-[3rem] py-[2rem]">
          {children}
        </div>
      </div>
    </div>
  );
}
