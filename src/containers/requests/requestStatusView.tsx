import { getStatusStyles } from "@/lib/utils/requestStyle";
import { RequestStatus } from "@/states/requestStore";

interface StatusProps {
  status: RequestStatus;
}

export default function RequestStatusView({ status }: StatusProps) {
  const styles = getStatusStyles(status);

  return (
    <div
      className={`flex h-[4rem] w-[10rem] items-center justify-center rounded-full text-[1.8rem] font-[500] text-white bg-${styles.backgroundColor}`}
    >
      {styles.type}
    </div>
  );
}
