import ScrollBox from "@/components/ScrollBox/ScrollBox";
import MiniBoard from "../../../containers/message/miniBoard";

interface ContentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <MiniBoard>
      <ScrollBox>{children}</ScrollBox>
    </MiniBoard>
  );
}
