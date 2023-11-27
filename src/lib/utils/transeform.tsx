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
  if (name.length > 10) {
    return name.slice(0, 10) + "...";
  }
  return name;
};
