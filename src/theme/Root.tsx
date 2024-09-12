import React, { useState, createContext, ReactChild } from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import BrowserOnly from "@docusaurus/BrowserOnly";
// import Sentry from "sentry-plugin";

export const MetamaskProviderContext = createContext(null);

export default function Root({ children }: { children: ReactChild}) {
  const [metaMaskProvider, setMetaMaskProvider] = useState(undefined);
  const [metaMaskAccount, setMetaMaskAccount] = useState(undefined);
  const sdk = new MetaMaskSDK({
    dappMetadata: {
      name: "Reference pages",
      url: "https://docs.metamask.io/",
    },
    preferDesktop: true,
    extensionOnly: true,
    checkInstallationImmediately: false,
    logging: {
      sdk: false,
    }
  });

  const metaMaskConnectHandler = async () => {
    try {
      const accounts = await sdk?.connect();
      setMetaMaskAccount(accounts)
      if (accounts && accounts.length > 0) {
        setMetaMaskAccount(accounts[0])
        const provider = sdk?.getProvider();
        setMetaMaskProvider(provider);
      }
      // Sentry.setUser({ email: "" })
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  }

  return (
    <BrowserOnly>
      {
        () => (
          <MetamaskProviderContext.Provider value={{
            metaMaskProvider,
            metaMaskAccount,
            metaMaskConnectHandler
          }}>
            {children}
          </MetamaskProviderContext.Provider>
        )
      }
    </BrowserOnly>
  );
}