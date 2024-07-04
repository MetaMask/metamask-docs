import { useState, useEffect } from "react";

export default function useMetamaskProvider() {
  const [isMetamaskInstalled, setMetamaskInstalled] = useState(false);
  const [metamaskProvider, setMetamaskProvider] = useState(undefined);

  useEffect(() => {
    if (window?.ethereum) {
      let metamaskProvider = window.ethereum;
      let isExtInstalled = !!metamaskProvider.isMetaMask;
      const providers = metamaskProvider.providers;
      if (isExtInstalled && providers) {
        metamaskProvider = providers?.find((provider) => provider.isMetaMask && !provider.isRabby);
        isExtInstalled = !!metamaskProvider;
      }
      setMetamaskInstalled(isExtInstalled);
      setMetamaskProvider(metamaskProvider);
    }
  }, []);

  return {
    isMetamaskInstalled,
    metamaskProvider
  };
}
