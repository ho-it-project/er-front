import Board from "../Board";
import ScrollBox from "../ScrollBox/ScrollBox";
import { TopNav } from "../TopNav";

interface TopNavItem {
  title: string;
}
interface TopNavProps {
  items: TopNavItem[];
}
interface TopNavContentWrapperProps {
  children: React.ReactNode;
  topNav: TopNavProps;
}

export default function TopNavContentWrapper({
  topNav,
  children,
}: TopNavContentWrapperProps) {
  return (
    <Board>
      <TopNav items={topNav.items} />
      <ScrollBox>
        <div>{children}</div>
      </ScrollBox>
    </Board>
  );
}
