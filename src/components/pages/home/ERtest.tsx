"use client";

import React from "react";
import useSWR from "swr";
const ERtest = () => {
  const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
    fetch(input, init).then((res) => res.json());
  const { data } = useSWR("/api/er", fetcher);
  console.log(data);
  return <>{data}</>;
};

export default React.memo(ERtest);
