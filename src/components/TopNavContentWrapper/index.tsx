import Board from "../Board";
import ScrollBox from "../ScrollBox/ScrollBox";
import { TopNav } from "../TopNav";

interface TopNavItem {
  title: string;
  link: string;
}
interface TopNavProps {
  items: TopNavItem[];
}
interface TopNavContentWrapperProps {
  children: React.ReactNode;
  topNav: TopNavProps;
  isScroll?: boolean;
}

export default function TopNavContentWrapper({
  topNav,
  children,
  isScroll = true,
}: TopNavContentWrapperProps) {
  return (
    <Board>
      <TopNav items={topNav.items} />
      {isScroll ? (
        <ScrollBox>
          <div>{children}</div>
        </ScrollBox>
      ) : (
        <>{children}</>
      )}
    </Board>
  );
}
