import React from "react";

interface DividerProps {
  type?: "horizontal" | "vertical";
  orientation?: "left" | "right" | "center";
  orientationMargin?: string | number;
  className?: string;
  children?: React.ReactNode;
  dashed?: boolean;
  plain?: boolean;
}

const Divider: React.FC<DividerProps> = ({
  type = "horizontal",
  orientation = "left",
  orientationMargin = 2,
  className = "",
  children,
  dashed = false,
  plain = false,
}) => {
  let baseStyle = "border-gray-200";
  if (dashed) baseStyle += " border-dashed";
  if (plain) baseStyle += " text-gray-500";

  let justifyContent = "justify-center";
  if (orientation === "left") justifyContent = "justify-start";
  if (orientation === "right") justifyContent = "justify-end";

  if (type === "vertical") {
    return <div className={`border-l ${baseStyle} ${className}`}></div>;
  } else {
    // horizontal
    if (children) {
      if (orientation === "left")
        return (
          <div
            className={`flex items-center ${justifyContent} my-${orientationMargin} ${className}`}
          >
            <span className={`px-2 ${plain ? "text-gray-500" : ""}`}>
              {children}
            </span>
            <div className={`flex-1 border-b ${baseStyle}`}></div>
          </div>
        );
      if (orientation === "right")
        return (
          <div
            className={`flex items-center ${justifyContent} my-${orientationMargin} ${className}`}
          >
            <div className={`flex-1 border-b ${baseStyle}`}></div>
            <span className={`px-2 ${plain ? "text-gray-500" : ""}`}>
              {children}
            </span>
          </div>
        );
      if (orientation === "center")
        return (
          <div
            className={`flex items-center ${justifyContent} my-${orientationMargin} ${className}`}
          >
            <div className={`flex-1 border-b ${baseStyle}`}></div>
            <span className={`px-2 ${plain ? "text-gray-500" : ""}`}>
              {children}
            </span>
            <div className={`flex-1 border-b ${baseStyle}`}></div>
          </div>
        );
    } else {
      return (
        <div
          className={`border-b my-${orientationMargin} ${baseStyle} ${className}`}
        ></div>
      );
    }
  }
};

export default Divider;
