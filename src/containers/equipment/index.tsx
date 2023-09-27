import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import EquipmentLine from "./equipmentLine";

const topNavs = [{ title: "장비 관리" }];

const DUMMY1 = [
  { title: "인공호흡기 일반", set: true, cnt: 1000 },
  { title: "인공호흡기 조산아", set: false, cnt: 0 },
  { title: "인큐베니터", set: true, cnt: 42 },
  { title: "CPRT", set: true, cnt: 14 },
  { title: "ECMO", set: true, cnt: 3 },
];

const DUMMY2 = [
  { title: "중심체온조절유도기", set: true, cnt: 2 },
  { title: "고압산소치료기", set: false, cnt: 0 },
  { title: "CT", set: true, cnt: 12 },
  { title: "MRL", set: true, cnt: 13 },
  { title: "혈관촬영기", set: true, cnt: 14 },
];

export default function MedicalEquipmentSettingContainer() {
  return (
    <>
      <TopNavContentWrapper topNav={{ items: topNavs }}>
        <div className="px-[8rem] py-[6rem]">
          <div className="flex justify-between">
            <p className="ml-[6rem] w-[24rem] text-[1.2rem] font-[600] text-gray">
              ? 현재 진료 사용가능한 장비를 선택해주세요
            </p>
            <button className="h-[5rem] w-[20rem] rounded-[1rem] bg-main text-[1.6rem] font-[600] text-white">
              저장하기
            </button>
          </div>
          <div className="mx-auto mt-[20rem] flex h-[33rem] w-[81rem] justify-between">
            <div className="h-[33rem] w-[35rem]">
              {DUMMY1.map((i, index) => (
                <EquipmentLine
                  key={index}
                  title={i.title}
                  set={i.set}
                  cnt={i.cnt}
                />
              ))}
            </div>
            <div className="h-[33rem] w-[35rem]">
              {DUMMY2.map((i, index) => (
                <EquipmentLine
                  key={index}
                  title={i.title}
                  set={i.set}
                  cnt={i.cnt}
                />
              ))}
            </div>
          </div>
        </div>
      </TopNavContentWrapper>
    </>
  );
}
