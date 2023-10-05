"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import { useEffect, useState } from "react";
import ContentWrapper from "../../components/common/ContentWrapper";
import PlaceBox from "../../components/common/PlaceBox";
import HospitalInfo from "./hospitalInfo";
import Nav from "./nav";
import PlaceDetailBox from "./placeDetailBox";

interface EmergencyCenter {
  emergency_center_name: string;
  emergency_center_type: string;
  distance: number;
  emergency_center_primary_phone: string;
  emergency_center_address: string;
}

const TopNavs = [{ title: "타병원 찾기", link: "/findHospitals" }];

export default function FindHospitalsContainer() {
  const [selectedHospital, setSelectedHospital] = useState<EmergencyCenter>();
  const [, setSearchWord] = useState("");
  const [, setClickedNav] = useState("");
  const [emergency, setEmergency] = useState<EmergencyCenter[]>();

  useEffect(() => {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const url = `https://api.ho-it.me/api/er/emergency-center?latitude=${latitude}&longitude=${longitude}`;

        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setEmergency(data.result.emergency_center_list);
            console.log(data.result.emergency_center_list);
          })
          .catch((error) => {
            console.error("GET 요청 실패", error);
          });
      },
      (error) => {
        console.warn("현재 위치를 가져오지 못했습니다.", error);
      }
    );
  }, []);

  const ChangeSearchInputHandler = (value: string) => {
    setSearchWord(value);
  };
  const ClickedNavHandler = (value: string) => {
    console.log(value);
    setClickedNav(value);
  };

  const ChangeSelectedHospital = (index: number) => {
    if (emergency) {
      setSelectedHospital(emergency[index]);
    }
  };

  return (
    <>
      <TopNavContentWrapper topNav={{ items: TopNavs }}>
        <div>
          <div className="sticky top-0 z-[1] mb-[5rem] mr-[4rem] flex h-[7rem] w-full items-center justify-between bg-white py-[1rem] pr-[4rem]">
            <Nav onClickNav={ClickedNavHandler} />
            <SearchInput
              size="sm"
              onChange={(value) => {
                ChangeSearchInputHandler(value);
              }}
            />
          </div>
          {emergency !== undefined && (
            <div className="flex w-full flex-col gap-[2rem]">
              {emergency.map((e, index) => (
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
                      e.emergency_center_type ==
                      "REGIONAL_EMERGENCY_MEDICAL_CENTER"
                        ? "지역응급의료센터"
                        : e.emergency_center_type ==
                          "NON_EMERGENCY_MEDICAL_INSTITUTION"
                        ? "지역응급의료기관"
                        : "권역응급의료센터"
                    }`}
                    distance={(e.distance / 1000).toFixed(1)}
                    number={e.emergency_center_primary_phone}
                    location={e.emergency_center_address}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </TopNavContentWrapper>
      {selectedHospital && (
        <div className="mt-[7rem] flex h-[calc(100%-8rem)] w-full min-w-[32rem] flex-col">
          <PlaceBox place={selectedHospital.emergency_center_name} />
          <div className="flex h-[calc(100%-10rem)] w-full justify-between gap-[2rem]">
            <ContentWrapper>
              <PlaceDetailBox
                sub={`${
                  selectedHospital.emergency_center_type ==
                  "REGIONAL_EMERGENCY_MEDICAL_CENTER"
                    ? "지역응급의료센터"
                    : selectedHospital.emergency_center_type ==
                      "NON_EMERGENCY_MEDICAL_INSTITUTION"
                    ? "지역응급의료기관"
                    : "권역응급의료센터"
                }`}
                number={selectedHospital.emergency_center_primary_phone}
                location={selectedHospital.emergency_center_address}
              />
            </ContentWrapper>
          </div>
        </div>
      )}
    </>
  );
}
