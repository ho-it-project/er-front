interface AlertProps {
  message: string;
  type: "success" | "warning" | "error" | "info";
}

const Alert = ({ message, type }: AlertProps) => {
  let backgroundColor;

  switch (type) {
    case "success":
      backgroundColor = "bg-green-500";
      break;
    case "warning":
      backgroundColor = "bg-yellow-500";
      break;
    case "error":
      backgroundColor = "bg-red-500";
      break;
    case "info":
      backgroundColor = "bg-blue-500";
      break;
    default:
      backgroundColor = "bg-blue-500";
      break;
  }

  return (
    <div
      className={`relative mb-4 rounded border-0 px-6 py-4 text-white ${backgroundColor}`}
    >
      <span className="mr-5 inline-block align-middle text-xl">
        <i className="fas fa-bell" />
      </span>
      <span className="mr-8 inline-block align-middle">{message}</span>
    </div>
  );
};

export default Alert;
