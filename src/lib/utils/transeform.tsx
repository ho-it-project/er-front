export const transformDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

  if (diffInMinutes / 60 > 1) {
    return `${Math.floor(diffInMinutes / 60)} 시간 전`;
  }

  return `${diffInMinutes} 분 전`;
};

export const transformAge = (birthdate: string): string => {
  const birthDate = new Date(Number(birthdate));

  if (isNaN(birthDate.getTime())) {
    return "미상";
  }

  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() < birthDate.getDate())
  ) {
    return String(age - 1);
  }

  return String(age) + "세";
};

export const transeformName = (name: string) => {
  if (name.length > 8) {
    return name.slice(0, 8) + "...";
  }
  return name;
};

export const transformFormatDate = (timestamp: string) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 맞춤
  const day = date.getDate().toString().padStart(2, "0"); // 일을 두 자리로 맞춤
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`;
};

export const transformPhone = (phone: string) => {
  return `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}`;
};

export const transeformDateClock = (timestamp: string) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 두 자리로 맞춤
  const day = date.getDate().toString().padStart(2, "0"); // 일을 두 자리로 맞춤
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};
