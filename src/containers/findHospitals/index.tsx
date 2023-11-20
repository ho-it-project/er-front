"use client";

import TopNavContentWrapper from "@/components/TopNavContentWrapper";
import { EmergencyCenter } from "@/states/emergencyStore";
import usePageTransition from "@/states/pageTransitionStore";
import { Transition } from "@headlessui/react";
import { ReactNode, useState } from "react";
import ContentWrapper from "../../components/common/ContentWrapper";
import PlaceBox from "../../components/common/PlaceBox";
import MessageBox from "../message/messageBox";
import ChatingBox from "./chatingBox";
import EmergencyCenterContainer from "./emergencyCenterContainer";
import PlaceDetailBox from "./placeDetailBox";

const TopNavs1 = [{ title: "타병원 찾기", link: "/findHospitals" }];
const TopNavs2 = [{ title: "메세지", link: "/message" }];

export default function FindHospitalsContainer() {
  const { isPageTransitioning, startPageTransition } = usePageTransition();
  const [selectedHospital, setSelectedHospital] = useState<
    EmergencyCenter | undefined
  >(undefined);

  // 버튼 클릭시 message로 전환
  const ClickedChagneMessage = () => {
    startPageTransition();
  };

  return (
    <>
      <TopNavContentWrapper
        isScroll={false}
        topNav={isPageTransitioning ? { items: TopNavs2 } : { items: TopNavs1 }}
      >
        <MainContent isPageTransitioning={!isPageTransitioning}>
          <EmergencyCenterContainer
            selectedHospital={selectedHospital}
            setSelectedHospital={setSelectedHospital}
          />
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
