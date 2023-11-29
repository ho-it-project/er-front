import Spinner from "@/components/Spinner";
import SearchInput from "@/components/common/SearchInput";
import { useEmergencyCenterList } from "@/hooks/useEmergencyCenterList";
import {
  EmergencyCenter,
  EmergencyCenterType,
  useEmergencyCenterListStore,
} from "@/states/emergencyStore";
import { useEffect, useRef, useState } from "react";
import EmergencyBox from "./emergencyBox";
import EmergencyCenterNav from "./emergencyCenterNav";

interface EmergencyCenterContainerProps {
  selectedHospital?: EmergencyCenter;
  setSelectedHospital: (emergencyCenters: EmergencyCenter) => void;
}

export default function EmergencyCenterContainer({
  selectedHospital,
  setSelectedHospital,
}: EmergencyCenterContainerProps) {
  const emergencyCenterListRef = useRef<HTMLDivElement>(null);
  const { query, setQueryPage, setQueryType, pageLimit } =
    useEmergencyCenterListStore();

  const [, setSearchWord] = useState("");
  const [, setClickedNav] = useState<EmergencyCenterType | "전체">("전체");

  const { emergencyCenters, isLoading } = useEmergencyCenterList();

  const ChangeSelectedHospital = (index: number) => {
    if (emergencyCenters) {
      if (selectedHospital !== emergencyCenters[index]) {
        setSelectedHospital(emergencyCenters[index]);
      }
    }
  };

  const ChangeSearchInputHandler = (value: string) => {
    setSearchWord(value);
  };
  const ClickedNavHandler = (value: EmergencyCenterType | "전체") => {
    setClickedNav(value);
    if (value !== "전체") {
      setQueryType([value]);
    } else {
      setQueryType([]);
    }
  };

  useEffect(() => {
    if (emergencyCenterListRef.current) {
      emergencyCenterListRef.current.scrollTo(0, 0);
    }
  }, [query.emergency_center_type, query.search]);

  return (
    <div className="h-full w-full pb-[10rem]">
      <div className="mb-[5rem] mr-[4rem] flex h-[7rem] w-full items-center justify-between bg-white py-[1rem] pr-[4rem]">
        <EmergencyCenterNav onClickNav={ClickedNavHandler} />
        <SearchInput
          size="sm"
          onChange={(value) => {
            ChangeSearchInputHandler(value);
          }}
        />
      </div>
      <div
        className="relative flex h-full w-full flex-col gap-[2rem] overflow-scroll"
        ref={emergencyCenterListRef}
        onScroll={(e) => {
          const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
          if (scrollHeight - scrollTop === clientHeight) {
            if (query.page < pageLimit.total_page) {
              setQueryPage(query.page + 1);
              console.log(query.page + 1);
            }
          }
        }}
      >
        {emergencyCenters.map((emergencyCenter, index) => (
          <EmergencyBox
            key={index}
            index={index}
            ChangeSelectedHospital={ChangeSelectedHospital}
            emergencyCenter={emergencyCenter}
          />
        ))}
        <span className=" absolute left-1/2 top-1/2">
          {isLoading && <Spinner />}
        </span>
      </div>
    </div>
  );
}
