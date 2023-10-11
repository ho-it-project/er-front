"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import useEmergencyStore from "@/states/emergencyStore";
import useLocationStore from "@/states/locationStore";
import usePageTransition from "@/states/pageTransitionStore";
import { Transition } from "@headlessui/react";
import { ReactNode, useEffect, useState } from "react";
import ContentWrapper from "../../components/common/ContentWrapper";
import PlaceBox from "../../components/common/PlaceBox";
import MessageBox from "../message/messageBox";
import ChatingBox from "./chatingBox";
import Hospitals from "./hospitals";
import Nav from "./nav";
import PlaceDetailBox from "./placeDetailBox";

interface EmergencyCenter {
  emergency_center_name: string;
  emergency_center_type: string;
  distance: number;
  emergency_center_primary_phone: string;
  emergency_center_address: string;
}

const TopNavs1 = [{ title: "타병원 찾기", link: "/findHospitals" }];
const TopNavs2 = [{ title: "메세지", link: "/message" }];

export default function FindHospitalsContainer() {
  const { latitude, longitude, setLatitude, setLongitude } = useLocationStore();
  const { isPageTransitioning, startPageTransition } = usePageTransition();
  const { emergencyCenters } = useEmergencyStore();

  const [selectedHospital, setSelectedHospital] = useState<EmergencyCenter>();
  const [, setSearchWord] = useState("");
  const [clickedNav, setClickedNav] = useState("전체");

  useEffect(() => {
    const { geolocation } = navigator;

    geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.warn("현재 위치를 가져오지 못했습니다.", error);
      }
    );
  }, [latitude, longitude, setLatitude, setLongitude]);

  const ChangeSearchInputHandler = (value: string) => {
    setSearchWord(value);
  };
  const ClickedNavHandler = (value: string) => {
    setClickedNav(value);
  };

  const ChangeSelectedHospital = (index: number) => {
    if (emergencyCenters) {
      setSelectedHospital(emergencyCenters[index]);
    }
  };

  // 버튼 클릭시 message로 전환
  const ClickedChagneMessage = () => {
    startPageTransition();
  };

  return (
    <>
      <TopNavContentWrapper
        topNav={isPageTransitioning ? { items: TopNavs2 } : { items: TopNavs1 }}
      >
        <MainContent isPageTransitioning={!isPageTransitioning}>
          <div className="sticky top-0 z-[1] mb-[5rem] mr-[4rem] flex h-[7rem] w-full items-center justify-between bg-white py-[1rem] pr-[4rem]">
            <Nav onClickNav={ClickedNavHandler} />
            <SearchInput
              size="sm"
              onChange={(value) => {
                ChangeSearchInputHandler(value);
              }}
            />
          </div>
          {latitude !== undefined && longitude !== undefined && (
            <Hospitals
              clickedNav={clickedNav}
              ChangeSelectedHospital={ChangeSelectedHospital}
              latitude={latitude}
              longitude={longitude}
            />
          )}
        </MainContent>
        <MainContent isPageTransitioning={isPageTransitioning}>
          <div className="h-full w-full min-w-[32rem]">
            <div className="flex w-full justify-between text-[1.5rem] text-L-gray">
              <div>대화창</div>
              <div className="text-[3rem]">+</div>
            </div>
            <div className="flex h-full flex-col gap-[1.5rem] px-[1.5rem]">
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
              <MessageBox />
            </div>
          </div>
        </MainContent>
      </TopNavContentWrapper>

      <Transition
        className={`w-full`}
        show={selectedHospital !== undefined}
        enter="transition-all duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`mt-[7rem] flex h-[calc(100%-7rem)] w-full flex-col`}>
          {selectedHospital && (
            <>
              <PlaceBox
                place={selectedHospital.emergency_center_name}
                ClickedChagneMessage={ClickedChagneMessage}
              />
              <div className="flex h-[calc(100%-11rem)] w-full gap-[2rem]">
                <ChatingBox isPageTransitioning={isPageTransitioning} />
                <div className="flex h-full w-full min-w-[32rem] justify-between gap-[2rem] transition-all duration-300">
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
            </>
          )}
        </div>
      </Transition>
    </>
  );
}

interface MainContentProps {
  children: ReactNode;
  isPageTransitioning: boolean;
}

function MainContent({ children, isPageTransitioning }: MainContentProps) {
  return (
    <Transition
      className="h-full w-full"
      show={isPageTransitioning}
      enter="transition-opacity opacity-0 duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity opacity-100 duration-0"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}
