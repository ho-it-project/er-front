import DepartmentLine from "./deparmentLine";
import InternalMedicine from "./internalMedicine";
import Surgery from "./surgery";

const DUMMY1 = [
  { title: "산부인과", set: false },
  { title: "방사선종양학과", set: true },
  { title: "병리과", set: true },
];

export default function DepartmentSettingContainer() {
  return (
    <>
      <div className="px-[8rem] py-[6rem]">
        <div className="flex justify-between">
          <p className="ml-[6rem] w-[24rem] text-[1.2rem] font-[600] text-gray">
            ? 현재 진료 가능한 과를 선택해주세요.
          </p>
          <button className="h-[5rem] w-[20rem] rounded-[1rem] bg-main text-[1.6rem] font-[600] text-white">
            저장하기
          </button>
        </div>
        <div className="mx-auto mt-[12rem] flex h-[60rem] w-[93rem] justify-between">
          <InternalMedicine />
          <Surgery>
            {DUMMY1.map((i, index) => (
              <DepartmentLine
                key={`${i.title} ${index}`}
                title={i.title}
                set={i.set}
              />
            ))}
          </Surgery>
          <div className="h-[59rem] w-[23.3rem]">
            {DUMMY1.map((i, index) => (
              <DepartmentLine
                key={`${i.title} ${index}`}
                title={i.title}
                set={i.set}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
