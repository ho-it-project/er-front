import HospitalInfo from "./hospitalInfo";

interface EmergencyCenter {
  emergency_center_name: string;
  emergency_center_type: string;
  distance: number;
  emergency_center_primary_phone: string;
  emergency_center_address: string;
}

interface EmergencyBoxProps {
  index: number;
  ChangeSelectedHospital: (index: number) => void;
  e: EmergencyCenter;
}

export default function EmergencyBox({
  index,
  ChangeSelectedHospital,
  e,
}: EmergencyBoxProps) {
  return (
    <div
      key={index}
      className="relative flex cursor-pointer gap-[2rem] pl-[5rem] pr-[4rem]"
      onClick={() => ChangeSelectedHospital(index)}
    >
      <span className="absolute left-0 top-0 text-[4rem] font-semibold text-main">
        {index + 1}
      </span>
      <HospitalInfo
        name={e.emergency_center_name}
        sub={`${
          e.emergency_center_type == "REGIONAL_EMERGENCY_MEDICAL_CENTER"
            ? "지역응급의료센터"
            : e.emergency_center_type == "LOCAL_EMERGENCY_MEDICAL_INSTITUTION"
            ? "지역응급의료기관"
            : "권역응급의료센터"
        }`}
        distance={(e.distance / 1000).toFixed(1)}
        number={e.emergency_center_primary_phone}
        location={e.emergency_center_address}
      />
    </div>
  );
}
