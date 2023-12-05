export default function PatientHeader() {
  return (
    <div className="flex h-[7.2rem] w-full items-center justify-between rounded-3xl border-2 border-main bg-bg pl-[4rem] text-[1.8rem] font-[700] text-main">
      <span className="w-1/4 min-w-[20rem]">접수시간</span>
      <span className="w-1/4 min-w-[20rem]">환자정보</span>
      <span className="w-1/4 min-w-[20rem]">증상</span>
      <div className="flex w-1/4 min-w-[20rem] justify-end">
        <span className="pr-[4rem]">상태</span>
      </div>
    </div>
  );
}
