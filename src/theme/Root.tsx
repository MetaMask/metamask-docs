import React, { ReactChild } from "react";
import { MetaMaskProvider } from '@metamask/sdk-react';

export default function Root({ children }: { children: ReactChild}) {
  return (
    <MetaMaskProvider debug={false} sdkOptions={{
      logging:{
          developerMode: false,
        },
        checkInstallationImmediately: false,
        dappMetadata: {
          name: "Test app",
          url: window.location.host,
        },
        preferDesktop: true
    }}>
      {children}
    </MetaMaskProvider>
  );
}