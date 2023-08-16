import { ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = (
  query: ReadonlyURLSearchParams | string | string[],
  ...set: [string, any][]
) => {
  const searchParams = new URLSearchParams(query.toString());
  if (set) {
    set.forEach(([key, value]) => {
      searchParams.set(key, value);
    });
  }

  return searchParams.toString();
};
