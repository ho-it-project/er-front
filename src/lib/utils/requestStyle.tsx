import { RequestStatus } from "@/states/requestStore";

export const getStatusStyles = (status: RequestStatus) => {
  switch (status) {
    case "ACCEPTED":
      return { backgroundColor: "main", type: "이송대기" };

    case "REJECTED":
      return { backgroundColor: "L-gray", type: "요청거절" };

    case "TRANSFER":
      return { backgroundColor: "gray", type: "이송 중" };

    case "TRANSFER_COMPLETED":
      return { backgroundColor: "red", type: "이송완료" };

    case "COMPLETED":
      return { backgroundColor: "gray", type: "이송완료" };

    case "CANCELED":
      return { backgroundColor: "L-gray", type: "요청취소" };

    default:
      return { backgroundColor: "yellow", type: "응답대기" };
  }
};
