export default function ManagementHeader() {
  return (
    <div className="flex h-[8rem] w-full items-center justify-between rounded-3xl px-[2rem] text-[1.8rem] font-[700] text-main">
      <div className="min-w-[15rem]">종류</div>
      <div className="flex h-[8rem] w-full items-center justify-between rounded-2xl px-[4rem]">
        <span className="w-2/6 min-w-[15rem]">명칭</span>
        <span className="w-1/6 min-w-[15rem]">총 병상 수</span>
        <span className="w-1/6 min-w-[15rem]">사용중인 병상 수</span>
        <span className="w-1/6 min-w-[15rem]">대기 수</span>
        <span className="w-1/6 min-w-[20rem]"></span>
      </div>
    </div>
  );
}
