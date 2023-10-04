import SevereButton from "./severeButton";

const DUMMY = [
  { title: "재관류중재술", sub: "심근경색", set: true },
  { title: "재관류중재술", sub: "뇌경색", set: true },
  { title: "뇌출혈수술", sub: "거미막하출혈", set: true },
  { title: "뇌출혈수술", sub: "거미막하출혈 외", set: false },
  { title: "담낭담관질환", sub: "담낭질환", set: true },
  { title: "담낭담관질환", sub: "담도포함질환", set: true },
  { title: "복부응급수술", sub: "비와상", set: true },
  { title: "장중첩/폐색", sub: "영유아", set: false },
  { title: "사지접합", sub: "수족지접합", set: true },
  { title: "사지접합", sub: "수족지접합 외", set: true },
];

export default function SevereEmergencyIllnessContainer() {
  return (
    <>
      <div className="px-[8rem] py-[6rem]">
        <div className="flex justify-between">
          <p className="ml-[6rem] w-[24rem] text-[1.2rem] font-[600] text-gray">
            ? 현재 진료 가능한 중증응급질환을 선택해주세요.
          </p>
          <button className="h-[5rem] w-[20rem] rounded-[1rem] bg-main text-[1.6rem] font-[600] text-white">
            저장하기
          </button>
        </div>
        <div className="mx-auto mt-[12rem] h-[62rem] w-[123rem]">
          <div className="mt-4 grid grid-cols-6 gap-[2rem]">
            {DUMMY.map((i, index) => (
              <SevereButton
                title={i.title}
                sub={i.sub}
                key={index}
                set={i.set}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
