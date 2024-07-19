import React, { ReactChild } from "react";

export default function Root({ children }: { children: ReactChild}) {
  return (
    <>{children}</>
  );
}