"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import { useState } from "react";
import ContentWrapper from "../../components/common/ContentWrapper";
import PlaceBox from "../../components/common/PlaceBox";
import HospitalInfo from "./hospitalInfo";
import Nav from "./nav";
import PlaceDetailBox from "./placeDetailBox";

const DUMMY = [
  {
    name: "국립중앙의료원1",
    sub: "지역응급의료센터",
    distance: "1.1km",
    number: "02-2260-7114",
    location: "서울특별시 중구 을지로 245 (을지로6가)",
  },
  {
    name: "국립중앙의료원2",
    sub: "지역응급의료센터",
    distance: "1.1km",
    number: "02-2260-7114",
    location: "서울특별시 중구 을지로 245 (을지로7가)",
  },
  {
    name: "국립중앙의료원3",
    sub: "지역응급의료센터",
    distance: "1.1km",
    number: "02-2260-7114",
    location: "서울특별시 중구 을지로 245 (을지로8가)",
  },
  {
    name: "국립중앙의료원",
    sub: "지역응급의료센터",
    distance: "1.1km",
    number: "02-2260-7114",
    location: "서울특별시 중구 을지로 245 (을지로6가)",
  },
  {
    name: "국립중앙의료원",
    sub: "지역응급의료센터",
    distance: "1.1km",
    number: "02-2260-7114",
    location: "서울특별시 중구 을지로 245 (을지로6가)",
  },
  {
    name: "국립중앙의료원",
    sub: "지역응급의료센터",
    distance: "1.1km",
    number: "02-2260-7114",
    location: "서울특별시 중구 을지로 245 (을지로6가)",
  },
];

interface selectedHospitalProps {
  name: string;
  sub: string;
  distance: string;
  number: string;
  location: string;
}

const TopNavs = [{ title: "타병원 찾기", link: "/findHospitals" }];

export default function FindHospitalsContainer() {
  const [selectedHospital, setSelectedHospital] =
    useState<selectedHospitalProps>();
  const [, setSearchWord] = useState("");
  const [, setClickedNav] = useState("");

  const ChangeSearchInputHandler = (value: string) => {
    setSearchWord(value);
  };
  const ClickedNavHandler = (value: string) => {
    console.log(value);
    setClickedNav(value);
  };

  const ChangeSelectedHospital = (index: number) => {
    setSelectedHospital(DUMMY[index]);
  };

  return (
    <>
      <TopNavContentWrapper topNav={{ items: TopNavs }}>
        <div className="px-[3rem]">
          <div className="sticky top-0 z-[1] mb-[5rem] mr-[4rem] flex h-[7rem] w-full justify-between bg-white py-[1rem] pr-[4rem]">
            <Nav onClickNav={ClickedNavHandler} />
            <SearchInput
              size="sm"
              onChange={(value) => {
                ChangeSearchInputHandler(value);
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-[2rem]">
            {DUMMY.map((i, index) => (
              <div
                key={index}
                className="relative flex cursor-pointer gap-[2rem] px-[4rem]"
                onClick={() => ChangeSelectedHospital(index)}
              >
                <span className="absolute left-0 top-0 text-[4rem] font-semibold text-main">
                  {index + 1}
                </span>
                <HospitalInfo
                  name={i.name}
                  sub={i.sub}
                  distance={i.distance}
                  number={i.number}
                  location={i.location}
                />
              </div>
            ))}
          </div>
        </div>
      </TopNavContentWrapper>
      {selectedHospital && (
        <div className="mt-[7rem] flex h-[calc(100%-8rem)] min-w-[32rem] transform flex-col duration-300">
          <PlaceBox place={selectedHospital.name} />
          <div className="flex h-[calc(100%-10rem)] w-full justify-between gap-[2rem]">
            <ContentWrapper>
              <PlaceDetailBox
                sub={selectedHospital.sub}
                number={selectedHospital.number}
                location={selectedHospital.location}
              />
            </ContentWrapper>
          </div>
        </div>
      )}
    </>
  );
}
