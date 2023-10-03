"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import PlaceBox from "../../components/common/PlaceBox";
import PlaceDetailBox from "./placeDetailBox";
import ContentWrapper from "../../components/common/ContentWrapper";
import HospitalInfo from "./hospitalInfo";
import { useState } from "react";
import SearchInput from "@/components/common/SearchInput";
import Nav from "./nav";

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

const TopNavs = [{ title: "타병원 찾기", link: "/findHospitals" }];

export default function FindHospitalsContainer() {
  const [selectedHospital, setSelectedHospital] = useState(DUMMY[0]);
  const [searchWord, setSearchWord] = useState("");
  const [clickedNav, setClickedNav] = useState("");

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
        <div className="sticky top-0 z-[1] mb-[5rem] mr-[4rem] flex h-[7rem] min-w-[96rem] justify-between bg-white p-[1rem]">
          <Nav onClickNav={ClickedNavHandler} />
          <SearchInput
            size="sm"
            onChange={(value) => {
              ChangeSearchInputHandler(value);
            }}
          />
        </div>
        <div className="flex min-w-[96rem] flex-col gap-[2rem]">
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
      </TopNavContentWrapper>
      {}
      <div className="mt-[7rem] flex h-[calc(100%-8rem)] min-w-[32rem] flex-col">
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
    </>
  );
}
