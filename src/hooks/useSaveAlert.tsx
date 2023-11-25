import { useState } from "react";

export default function useSaveAlert() {
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showSuccessAlert = () => {
    setIsAlertVisible(true);
    setTimeout(() => {
      setIsAlertVisible(false);
    }, 2000);
  };

  return {
    isAlertVisible,
    showSuccessAlert,
  };
}
