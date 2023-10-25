import SevereBox from "./severeBox";
import SevereButton from "./severeButton";

const SEVERE_DUMMY = [
  {
    title: "재관류중재술",
    sub: [
      { disease: "심근경색", state: true },
      { disease: "뇌경색", state: false },
    ],
  },
  {
    title: "재관류중재술",
    sub: [
      { disease: "심근경색", state: true },
      { disease: "뇌경색", state: false },
    ],
  },
  {
    title: "재관류중재술",
    sub: [
      { disease: "심근경색", state: true },
      { disease: "뇌경색", state: false },
    ],
  },
  {
    title: "뇌출혈수술",
    sub: [
      { disease: "거미막하출혈", state: true },
      { disease: "거미막하출혈 외", state: false },
    ],
  },
  {
    title: "담낭담관 질환",
    sub: [
      { disease: "A", state: true },
      { disease: "B", state: false },
      { disease: "C", state: false },
    ],
  },
  {
    title: "사지접합",
    sub: [{ disease: "A", state: true }],
  },
  {
    title: "사지접합",
    sub: [{ disease: "A", state: true }],
  },
  {
    title: "사지접합",
    sub: [{ disease: "A", state: true }],
  },
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
        <div className="mt-[12rem] h-[62rem] w-full">
          <div className="flex flex-wrap gap-[4rem]">
            {SEVERE_DUMMY.map((severe, index) => (
              <SevereBox title={severe.title} key={index}>
                {severe.sub.map((sub, index) => (
                  <SevereButton sub={sub.disease} set={sub.state} key={index} />
                ))}
              </SevereBox>
            ))}
          </div>

          {/* <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(200px,200px))] gap-[2rem]">
            {DUMMY.map((i, index) => (
              <SevereButton
                title={i.title}
                sub={i.sub}
                key={index}
                set={i.set}
              />
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
}
