import React, { useState, createContext, ReactChild, useEffect } from "react";
import { MetaMaskSDK } from "@metamask/sdk";
import { Provider as AlertProvider } from "react-alert";
import { AlertTemplate, options } from "@site/src/components/Alert";

export const MetamaskProviderContext = createContext(null);

export default function Root({ children }: { children: ReactChild }) {
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
    },
  });

  const metaMaskConnectHandler = async () => {
    try {
      const accounts = await sdk?.connect();
      setMetaMaskAccount(accounts);
      if (accounts && accounts.length > 0) {
        setMetaMaskAccount(accounts[0]);
        const provider = sdk?.getProvider();
        setMetaMaskProvider(provider);
      }
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  useEffect(() => {
    const loggedUserName = metaMaskAccount
      ? "logged-in-user"
      : "anonymous-user";
    if ((window as any)?.Sentry) {
      (window as any)?.Sentry?.setUser({
        name: loggedUserName,
        username: loggedUserName,
      });
    }
  }, [metaMaskAccount]);

  return (
    <MetamaskProviderContext.Provider
      value={{
        metaMaskProvider,
        metaMaskAccount,
        metaMaskConnectHandler,
      }}
    >
      <AlertProvider template={AlertTemplate} {...options}>
        {children}
      </AlertProvider>
    </MetamaskProviderContext.Provider>
  );
}
