interface StatusProps {
  title: string;
  size?: "sm" | "md";
  status: number;
  full: number;
  wait?: number;
  view?: boolean;
}

export default function Status({
  title,
  size = "md",
  status,
  full,
  wait,
  view = true,
}: StatusProps) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <p
        className={`rounded-3xl font-[700] ${
          size == "md" && "px-[1.4rem] py-[0.3rem] text-[1.5rem] text-white"
        } ${
          size == "sm" &&
          "border-2 bg-white px-[1rem] py-[0.1rem] text-[1.2rem]"
        } ${size == "md" && status == full ? "bg-red" : "bg-main"} ${
          size == "sm" && status == full
            ? "border-red text-red"
            : "border-main text-main"
        }`}
      >
        <span className="truncate" title={title}>
          {title}
        </span>
      </p>
      {view ? (
        <>
          <p className="text-[1.8rem] font-[600]">
            {status} / {full}
          </p>
          {wait != 0 && (
            <span className="absolute -bottom-[2rem] text-[1.5rem] font-[400]">
              대기 {wait}
            </span>
          )}
        </>
      ) : null}
    </div>
  );
}
