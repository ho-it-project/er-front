import ScrollBox from "@/components/ScrollBox/ScrollBox";
import MiniBoard from "./miniBoard";

interface MessageContentWrapperProps {
  children: React.ReactNode;
}

export default function MessageContentWrapper({
  children,
}: MessageContentWrapperProps) {
  return (
    <MiniBoard>
      <ScrollBox>
        <div>{children}</div>
      </ScrollBox>
    </MiniBoard>
  );
}
