import React, { ReactChild } from "react";
import { MetaMaskProvider } from "@metamask/sdk-react";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function Root({ children }: { children: ReactChild }) {
  return (
    <BrowserOnly>
      {() => (
        <MetaMaskProvider
          debug={false}
          sdkOptions={{
            checkInstallationOnAllCalls: true,
            extensionOnly: true,
            preferDesktop: true,
            logging: {
              sdk: false,
            },
            dappMetadata: {
              name: "Reference pages",
              url: window.location.href,
            },
          }}
        >
          {children}
        </MetaMaskProvider>
      )}
    </BrowserOnly>
  );
}
