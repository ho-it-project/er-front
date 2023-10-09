"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import SearchInput from "@/components/common/SearchInput";
import usePageTransition from "@/states/pageTransitionStore";
import { Transition } from "@headlessui/react";
import { ReactNode, useEffect, useState } from "react";
import ContentWrapper from "../../components/common/ContentWrapper";
import PlaceBox from "../../components/common/PlaceBox";
import MessageBox from "../message/messageBox";
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

const TopNavs1 = [{ title: "타병원 찾기", link: "/findHospitals" }];
const TopNavs2 = [{ title: "메세지", link: "/message" }];

export default function FindHospitalsContainer() {
  const { isPageTransitioning, startPageTransition } = usePageTransition();

  const [selectedHospital, setSelectedHospital] = useState<EmergencyCenter>();
  const [, setSearchWord] = useState("");
  const [clickedNav, setClickedNav] = useState("전체");
  const [emergency, setEmergency] = useState<EmergencyCenter[]>();
  const [, setIsLoading] = useState(true);

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
            setIsLoading(false);
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
    setClickedNav(value);
  };

  const ChangeSelectedHospital = (index: number) => {
    if (emergency) {
      setSelectedHospital(emergency[index]);
    }
  };

  // 버튼 클릭시 message로 전환 애니메이션
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
          {emergency !== undefined && (
            <div className="flex w-full flex-col gap-[2rem]">
              {emergency.map((e, index) => (
                <>
                  {clickedNav !== "전체" ? (
                    <>
                      {clickedNav == e.emergency_center_type && (
                        <EmergencyBox
                          index={index}
                          ChangeSelectedHospital={ChangeSelectedHospital}
                          e={e}
                        />
                      )}
                    </>
                  ) : (
                    <EmergencyBox
                      index={index}
                      ChangeSelectedHospital={ChangeSelectedHospital}
                      e={e}
                    />
                  )}
                </>
              ))}
            </div>
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
        {(ref) => (
          <div
            ref={ref}
            className={`mt-[7rem] flex h-[calc(100%-7rem)] w-full flex-col`}
          >
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
        )}
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
      enter="transition-opacity opacity-0 duration-300" // 나타날 때 opacity 0에서 1로 변경
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity opacity-100 duration-0" // 사라질 때 opacity 1에서 0으로 변경
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}

interface EmergencyBoxProps {
  index: number;
  ChangeSelectedHospital: (index: number) => void;
  e: EmergencyCenter;
}

function EmergencyBox({ index, ChangeSelectedHospital, e }: EmergencyBoxProps) {
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
            : e.emergency_center_type == "NON_EMERGENCY_MEDICAL_INSTITUTION"
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

interface ChatingBoxProps {
  isPageTransitioning: boolean;
}

function ChatingBox({ isPageTransitioning }: ChatingBoxProps) {
  return (
    <Transition
      show={isPageTransitioning}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave=""
      leaveFrom=""
      leaveTo="opacity-0"
    >
      {(ref) => (
        <div
          ref={ref}
          className="flex h-full w-full min-w-[62rem] justify-between gap-[2rem]"
        >
          <ContentWrapper>
            <div className="absolute bottom-[2rem] h-[5.5rem] w-[56rem] rounded-full border-2 border-main bg-white p-[1rem] px-[2rem]">
              <div className="flex h-full flex-col justify-center">
                <input className="w-full bg-white text-[1.5rem] focus:outline-none" />
              </div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </Transition>
  );
}
