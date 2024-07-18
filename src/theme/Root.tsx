import React, { ReactChild } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { AlertTemplate, options } from "@site/src/components/Alert";

export default function Root({ children }: { children: ReactChild }) {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return (
          <MetaMaskProvider
            debug={false}
            sdkOptions={{
              logging: {
                developerMode: false,
              },
              checkInstallationImmediately: false,
              dappMetadata: {
                name: "New mm app",
                url: "https://docs.metamask.io/",
              },
              preferDesktop: true,
            }}
          >
            <AlertProvider template={AlertTemplate} {...options}>
              {children}
            </AlertProvider>
          </MetaMaskProvider>
        );
      }}
    </BrowserOnly>
  );
}
