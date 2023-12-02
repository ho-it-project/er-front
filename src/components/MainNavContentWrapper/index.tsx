import Board from "../Board";
import { MainNav } from "../MainNav";
import ScrollBox from "../ScrollBox/ScrollBox";

interface MainNavContentWrapperProps {
  children: React.ReactNode;
  isScroll?: boolean;
}

export default function MainNavContentWrapper({
  children,
  isScroll = true,
}: MainNavContentWrapperProps) {
  return (
    <Board>
      <MainNav />
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
