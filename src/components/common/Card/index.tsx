interface CardProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "x-medium";
  bg?:
    | "main"
    | "main30"
    | "bg"
    | "white"
    | "black"
    | "gray"
    | "L-gray"
    | "red"
    | "yellow";
  border?:
    | "main"
    | "bg"
    | "white"
    | "black"
    | "gray"
    | "L-gray"
    | "red"
    | "yellow"
    | "none";
  dropShadow?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "none";
}

export const Card = ({
  children,
  size = "small",
  bg = "white",
  border = "none",
  dropShadow = "none",
}: CardProps) => {
  return (
    <div
      className={`card-${size} bg-${bg} rounded-2xl ${
        border === "none" ? `` : `border-${border}`
      } drop-shadow-${dropShadow}`}
    >
      {children}
    </div>
  );
};
