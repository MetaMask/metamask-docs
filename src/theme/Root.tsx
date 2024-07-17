import React, { ReactChild } from "react";
import { MetaMaskProvider } from '@metamask/sdk-react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Root({ children }: { children: ReactChild}) {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {
        () => {
          if ((window as any)?.Sentry) {
            (window as any)?.Sentry?.replayIntegration({
              maskAllText: false
            })
          }
          return (
            <MetaMaskProvider debug={false} sdkOptions={{
              logging:{
                  developerMode: false,
                },
                checkInstallationImmediately: false,
                dappMetadata: {
                  name: "New mm app",
                  url: "https://docs.metamask.io/",
                },
                preferDesktop: true
            }}>
              {children}
            </MetaMaskProvider>
          )
        }
      }
    </BrowserOnly>
  );
}