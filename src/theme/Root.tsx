import React, { ReactChild } from "react";
import { Provider as AlertProvider } from "react-alert";
import { AlertTemplate, options } from "@site/src/components/Alert";

export default function Root({ children }: { children: ReactChild }) {
  return (
      <AlertProvider template={AlertTemplate} {...options}>
        {children}
      </AlertProvider>
  );
}
