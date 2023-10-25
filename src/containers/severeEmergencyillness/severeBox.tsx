interface SevereBoxProps {
  children: React.ReactNode;
  title: string;
}

export default function SevereBox({ children, title }: SevereBoxProps) {
  return (
    <div className="relative flex w-max gap-[1rem] rounded-3xl border-2 border-L-gray px-[4rem] py-[3rem]">
      <span className="absolute -top-[1rem] z-10 h-[2rem] w-[10rem] bg-white text-center text-[1.5rem] text-gray">
        {title}
      </span>
      {children}
    </div>
  );
}
