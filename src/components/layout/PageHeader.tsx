import React from "react";
import { IPageHeader } from "./DefaultLayout";

interface IPageHeaderProps {
  value: IPageHeader;
}

const PageHeader = ({ value }: IPageHeaderProps) => {
  return (
    <div className={`px-5 pt-7 sm:px-10`}>
      <div className="flex items-center text-3xl text-gray-900">
        {value.title}
      </div>
    </div>
  );
};

export default React.memo(PageHeader);
