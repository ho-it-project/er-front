import { RequestStatus } from "@/states/requestStore";

interface RequestButtonPros {
  requestStatus: RequestStatus;
  requestHandler: (status: RequestStatus) => void;
  bedAssignmentHandler: () => void;
}

export default function RequestButton({
  requestStatus,
  requestHandler,
  bedAssignmentHandler,
}: RequestButtonPros) {
  let button;

  switch (requestStatus) {
    case "ACCEPTED":
      button = (
        <button className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-main30">
          병상배치하기
        </button>
      );
      break;

    case "CANCELED":
      button = (
        <button className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-main">
          수락하기
        </button>
      );
      break;

    case "COMPLETED":
      button = (
        <button className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-L-gray">
          병상정보확인하기
        </button>
      );
      break;

    case "REJECTED":
      button = (
        <button
          className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-main"
          onClick={() => requestHandler("ACCEPTED")}
        >
          수락하기
        </button>
      );
      break;

    case "TRANSFER":
      button = (
        <button
          className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-L-gray"
          onClick={() => bedAssignmentHandler}
        >
          병상배치하기
        </button>
      );
      break;

    case "TRANSFER_COMPLETED":
      button = (
        <button
          className="flex h-[7rem] w-[36rem] cursor-pointer items-center justify-center rounded-3xl bg-main"
          onClick={bedAssignmentHandler}
        >
          병상배치하기
        </button>
      );
      break;

    default:
      button = (
        <>
          <button
            className="flex h-[7rem] w-[12rem] cursor-pointer items-center justify-center rounded-l-3xl bg-L-gray"
            onClick={() => requestHandler("REJECTED")}
          >
            거절하기
          </button>
          <button
            className="flex h-[7rem] w-[24rem] cursor-pointer items-center justify-center rounded-r-3xl bg-main"
            onClick={() => requestHandler("ACCEPTED")}
          >
            수락하기
          </button>
        </>
      );
  }

  return (
    <div className="flex justify-end px-[2rem] py-[3rem] text-[1.8rem] font-[500] text-white">
      {button}
    </div>
  );
}
