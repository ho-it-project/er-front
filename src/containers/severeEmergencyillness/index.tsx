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
    title: "뇌출혈수술",
    sub: [
      { disease: "거미막하출혈", state: true },
      { disease: "거미막하출혈 외", state: false },
    ],
  },
  {
    title: "대동맥응급",
    sub: [
      { disease: "흉부", state: true },
      { disease: "복부", state: false },
    ],
  },
  {
    title: "사지접합",
    sub: [
      { disease: "수족지접합", state: true },
      { disease: "수족지접합 외", state: false },
    ],
  },
  {
    title: "담낭담관질환",
    sub: [
      { disease: "담낭질환", state: true },
      { disease: "담도포함질환", state: false },
    ],
  },
  {
    title: "응급투석",
    sub: [
      { disease: "HD", state: true },
      { disease: "CRRT", state: true },
    ],
  },
  {
    title: "응급내시경",
    sub: [
      { disease: "성인 위장관", state: true },
      { disease: "영유아 위장관", state: false },
      { disease: "성인 기관지", state: false },
      { disease: "영유아 기관지", state: false },
    ],
  },
  {
    title: "복부응급수술",
    sub: [{ disease: "비외상", state: true }],
  },
  {
    title: "장중첩/폐색",
    sub: [{ disease: "영유아", state: true }],
  },
  {
    title: "영상의학혈관중재",
    sub: [
      { disease: "성인", state: true },
      { disease: "영유아", state: true },
    ],
  },

  {
    title: "산부인과응급",
    sub: [
      { disease: "분만", state: true },
      { disease: "산과수술", state: false },
      { disease: "부인과수술", state: false },
    ],
  },
  {
    title: "저출생체중아",
    sub: [{ disease: "집중치료", state: true }],
  },

  {
    title: "정신과적응급",
    sub: [{ disease: "폐쇄병동입원", state: true }],
  },
  {
    title: "중증화상",
    sub: [{ disease: "전문치료", state: true }],
  },
  {
    title: "인과적수술",
    sub: [{ disease: "응급", state: true }],
  },
];

export default function SevereEmergencyIllnessContainer() {
  return (
    <>
      <div className="px-[8rem] py-[6rem]">
        <div className="flex justify-between">
          <p className="ml-[6rem] w-[24rem] text-[1.2rem] font-[600] text-gray">
            • 현재 진료 가능한 중증응급질환을 선택해주세요.
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
        </div>
      </div>
    </>
  );
}
