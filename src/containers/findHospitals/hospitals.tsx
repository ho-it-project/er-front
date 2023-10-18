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
        ? process.env.NEXT_PUBLIC_ER_EMERGENCY_CENTER +
          `?latitude=${latitude}&longitude=${longitude}`
        : process.env.NEXT_PUBLIC_ER_EMERGENCY_CENTER +
          `?emergency_center_type=${clickedNav}&latitude=${latitude}&longitude=${longitude}`;

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
