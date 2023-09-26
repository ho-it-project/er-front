interface StatusProps {
  status: {
    a: number;
    A: number;
    aw: number;
    b: number;
    B: number;
  };
}

export default function StatusBox({ status }: StatusProps) {
  return (
    <div className="mx-auto mb-[2rem] h-[21rem] w-[38rem] rounded-2xl bg-white px-[2rem] py-[1.5rem]">
      <div className="mt-[1rem] flex justify-around">
        <div className="relative flex flex-col items-center justify-center">
          <p
            className={`rounded-3xl px-[1.4rem] py-[0.3rem] text-[1.5rem] font-[700] text-white ${
              status.a == status.A ? "bg-red" : "bg-main"
            }`}
          >
            일반
          </p>
          <p className="text-[1.8rem] font-[600]">
            {status.a} / {status.A}
          </p>
          <span className="absolute -bottom-[2rem] text-[1.5rem] font-[400]">
            대기 {status.aw}
          </span>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <p className="rounded-3xl bg-main px-[1.4rem] py-[0.3rem] text-[1.5rem] font-[700] text-white">
            코호트
          </p>
          <p className="text-[1.8rem] font-[600]">
            {status.b} / {status.B}
          </p>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <p className="rounded-3xl bg-main px-[1.4rem] py-[0.3rem] text-[1.5rem] font-[700] text-white">
            음압
          </p>
          <p className="text-[1.8rem] font-[600]">2 / 4</p>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <p className="rounded-2xl bg-main px-[1.4rem] py-[0.3rem] text-[1.5rem] font-[700] text-white">
            일반격리
          </p>
          <p className="text-[1.8rem] font-[600]">6 / 8</p>
        </div>
      </div>
      <div className="mt-[4rem] flex justify-around">
        <div className="relative flex flex-col items-center justify-center">
          <p className="rounded-3xl bg-main px-[1.4rem] py-[0.3rem] text-[1.5rem] font-[700] text-white">
            소아음압격리
          </p>
          <p className="text-[1.8rem] font-[600]">0 / 2</p>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <p className="rounded-3xl bg-red px-[1.4rem] py-[0.3rem] text-[1.5rem] font-[700] text-white">
            소아일반격리
          </p>
          <p className="text-[1.8rem] font-[600]">2 / 2</p>
          <span className="absolute -bottom-[2rem] text-[1.5rem] font-[400]">
            대기 12
          </span>
        </div>
        <div className="relative flex flex-col items-center justify-center">
          <p className="rounded-3xl bg-main px-[1.4rem] py-[0.3rem] text-[1.5rem] font-[700] text-white">
            소아
          </p>
          <p className="text-[1.8rem] font-[600]">7 / 8</p>
        </div>
      </div>
    </div>
  );
}
