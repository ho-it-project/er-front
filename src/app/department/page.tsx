import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import DepartmentSettingContainer from "@/containers/department";

const topNavs = [
  { title: "진료과 관리", link: "/department" },
  { title: "중증응급질환 관리", link: "/severeEmergencyillness" },
];

export default function Department() {
  return (
    <TopNavContentWrapper topNav={{ items: topNavs }}>
      <DepartmentSettingContainer />
    </TopNavContentWrapper>
  );
}
