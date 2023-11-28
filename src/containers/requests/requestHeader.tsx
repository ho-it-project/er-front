export default function RequestHeader() {
  return (
    <div className="flex h-[7.2rem] w-full items-center justify-between rounded-3xl border-2 border-main bg-bg px-[4rem] text-[1.8rem] font-[700] text-main">
      <span className="w-1/5 min-w-[15rem]">요청시간</span>
      <span className="w-1/5 min-w-[15rem]">환자정보</span>
      <span className="w-2/5 min-w-[15rem]">기관</span>
      <span className="w-1/5 min-w-[15rem]">증상</span>
      <span className="flex w-full justify-end">상태</span>
    </div>
  );
}
