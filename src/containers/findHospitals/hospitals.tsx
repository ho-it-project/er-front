import useEmergencyStore from "@/states/emergencyStore";
import { useEffect } from "react";
import EmergencyBox from "./emergencyBox";

interface HospitalsProps {
  clickedNav: string;
  ChangeSelectedHospital: (index: number) => void;
  latitude: number;
  longitude: number;
}

export default function Hospitals({
  clickedNav,
  ChangeSelectedHospital,
  latitude,
  longitude,
}: HospitalsProps) {
  const { emergencyCenters, setEmergencyCenters } = useEmergencyStore();

  useEffect(() => {
    const url =
      clickedNav == "전체"
        ? `/api/er/emergency-centers?latitude=${latitude}&longitude=${longitude}`
        : `/api/er/emergency-centers?emergency_center_type=${clickedNav}&latitude=${latitude}&longitude=${longitude}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEmergencyCenters(data.result.emergency_center_list);
      });
  }, [latitude, longitude, clickedNav, setEmergencyCenters]);

  return (
    <div className="flex w-full flex-col gap-[2rem]">
      {emergencyCenters.map((e, index) => (
        <EmergencyBox
          key={index}
          index={index}
          ChangeSelectedHospital={ChangeSelectedHospital}
          e={e}
        />
      ))}
    </div>
  );
}
