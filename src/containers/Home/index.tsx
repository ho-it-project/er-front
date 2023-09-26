import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import PatientCard from "@/components/pages/home/patientCard";
const exTopNavs = [
  { title: "B1 응급병동" },
  { title: "B1 음압병동" },
  { title: "1F 소아응급병동" },
  { title: "B1 중증응급병동" },
];
export default function HomeContainer() {
  return (
    <>
      <TopNavContentWrapper topNav={{ items: exTopNavs }}>
        <div className="">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="mb-[3rem]" key={index}>
              <h4 className="text-[2rem] font-[600] text-main">
                {index + 1} 구역
              </h4>
              <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(240px,240px))] gap-[2rem]">
                {Array.from({ length: 10 }, (_, index) => (
                  <PatientCard key={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </TopNavContentWrapper>
    </>
  );
}
