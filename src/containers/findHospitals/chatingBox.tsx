import ContentWrapper from "@/components/common/ContentWrapper";
import { Transition } from "@headlessui/react";

interface ChatingBoxProps {
  isPageTransitioning: boolean;
}

export default function ChatingBox({ isPageTransitioning }: ChatingBoxProps) {
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
      <div className="flex h-full w-full min-w-[62rem] justify-between gap-[2rem]">
        <ContentWrapper>
          <div className="absolute bottom-[2rem] h-[5.5rem] w-[56rem] rounded-full border-2 border-main bg-white p-[1rem] px-[2rem]">
            <div className="flex h-full flex-col justify-center">
              <input className="w-full bg-white text-[1.5rem] focus:outline-none" />
            </div>
          </div>
        </ContentWrapper>
      </div>
    </Transition>
  );
}
