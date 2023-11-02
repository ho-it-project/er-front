export default function EmployeeListHeader() {
  return (
    <div className="flex h-[7.2rem] w-full items-center justify-between rounded-3xl border-2 border-main bg-bg px-[4rem] text-[1.8rem] font-[700] text-main">
      <span className="w-1/4 min-w-[15rem]">이름</span>
      <span className="w-1/4 min-w-[15rem]">역할</span>
      <span className="w-1/4 min-w-[15rem]">진료과</span>
      <span className="w-1/4 min-w-[15rem]">전문진료분야</span>
      <span className="min-w-[29rem]">상태</span>
    </div>
  );
}
