import { RequestStatus } from "@/states/requestStore";

interface StatusProps {
  type: RequestStatus;
}

const getStatusStyles = (type: RequestStatus) => {
  switch (type) {
    case "ACCEPTED":
      return { backgroundColor: "main", type: "이송대기" };

    case "REJECTED":
      return { backgroundColor: "L-gray", type: "요청거절" };

    default:
      return { backgroundColor: "yellow", type: "응답대기" };
  }
};

export default function RequestStatusView({ type }: StatusProps) {
  const styles = getStatusStyles(type);

  return (
    <div
      className={`flex h-[4rem] w-[10rem] items-center justify-center rounded-full text-[1.8rem] font-[500] text-white bg-${styles.backgroundColor}`}
    >
      {styles.type}
    </div>
  );
}
