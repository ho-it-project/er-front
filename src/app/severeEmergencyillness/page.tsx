import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SevereEmergencyIllnessContainer from "@/containers/severeEmergencyillness";

export default function SevereEmergencyIllness() {
  const topNavs = [
    { title: "진료과 관리", link: "/department" },
    { title: "중증응급질환 관리", link: "/severeEmergencyillness" },
  ];

  return (
    <TopNavContentWrapper topNav={{ items: topNavs }}>
      <SevereEmergencyIllnessContainer />
    </TopNavContentWrapper>
  );
}
