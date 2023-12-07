import { EmergencyCenter } from "@/states/emergencyStore";
import HospitalInfo from "./hospitalInfo";

interface EmergencyBoxProps {
  index: number;
  ChangeSelectedHospital: (index: number) => void;
  emergencyCenter: EmergencyCenter;
}

const getColorByRatio = (occupiedCount: number, totalCount: number) => {
  const ratio = occupiedCount / totalCount;
  if (ratio > 0.5) {
    return "red";
  } else if (ratio > 0.3) {
    return "yellow";
  } else {
    return "main";
  }
};

export default function EmergencyBox({
  index,
  ChangeSelectedHospital,
  emergencyCenter,
}: EmergencyBoxProps) {
  const roomInfo = emergencyCenter.emergency_rooms.map((room) => ({
    name: room.emergency_room_name,
    color: getColorByRatio(
      room.emergency_room_beds.filter(
        (bed) => bed.emergency_room_bed_status === "OCCUPIED"
      ).length,
      room._count.emergency_room_beds
    ),
  }));
  return (
    <div
      key={index}
      className="relative flex cursor-pointer gap-[2rem] pl-[5rem] pr-[4rem]"
      onClick={() => ChangeSelectedHospital(index)}
    >
      <span className="absolute left-0 top-0 text-[3.6rem] font-semibold text-main">
        {index + 1}
      </span>
      <HospitalInfo
        name={emergencyCenter.emergency_center_name}
        sub={`${
          emergencyCenter.emergency_center_type ==
          "REGIONAL_EMERGENCY_MEDICAL_CENTER"
            ? "지역응급의료센터"
            : emergencyCenter.emergency_center_type ==
                "LOCAL_EMERGENCY_MEDICAL_INSTITUTION"
              ? "지역응급의료기관"
              : "권역응급의료센터"
        }`}
        distance={(Number(emergencyCenter.distance) / 1000).toFixed(1)}
        number={emergencyCenter.emergency_center_primary_phone}
        location={emergencyCenter.emergency_center_address}
        roomInfo={roomInfo}
      />
    </div>
  );
}
