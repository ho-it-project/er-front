import Nav from "@/containers/hrm/nav";

export default function HRM() {
  return (
    <div className="mx-[1rem] flex w-[192rem]">
      <div className="m-[1rem] mx-auto">
        <div className="relative mx-auto mt-[6rem] h-[99rem] w-[138rem] rounded-2xl bg-white pt-[2rem]">
          <span className="absolute -top-[4rem] flex h-[5rem] w-[32rem] items-center rounded-2xl bg-white">
            <p className="ml-[3rem] text-[1.8rem] font-[700] text-main">
              인력관리
            </p>
          </span>
          <span className="absolute -top-[3rem] left-[26rem] flex h-[3rem] w-[3rem] items-center rounded-full bg-main2"></span>
          <div className="px-[2rem]">
            <Nav />
            <div>
              <div className="flex h-[7.2rem] w-[129rem] items-center justify-between rounded-3xl border-2 border-main2 bg-bg pl-[4rem] pr-[1rem] text-[1.8rem] font-[700] text-main">
                <span>이름</span>
                <span>분류</span>
                <span>진료과</span>
                <span>전문진료분야</span>
                <span>
                  <button className="h-[5.4rem] w-[20rem] rounded-3xl bg-main text-[1.6rem] font-[600] text-white">
                    인력 추가하기
                  </button>
                </span>
              </div>
              <div className="flex h-[8.5rem] w-[129rem] items-center justify-between border-b-2 border-gray pl-[4rem] pr-[1rem] text-[1.8rem] font-[700]">
                <span>최세종</span>
                <span>전문의</span>
                <span>응급의학과</span>
                <span>중환자의학</span>
                <span className="relative flex h-[5.4rem] w-[20rem] items-center">
                  <span className="absolute right-[4rem] h-[2rem] w-[2rem] rounded-full bg-yellow"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
