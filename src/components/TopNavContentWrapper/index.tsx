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
  goHome?: boolean;
}

export default function TopNavContentWrapper({
  topNav,
  children,
  isScroll = true,
  goHome = true,
}: TopNavContentWrapperProps) {
  return (
    <Board>
      <TopNav items={topNav.items} goHome={goHome} />
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
