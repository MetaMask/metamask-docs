import React, { useContext } from "react";
import styles from "./styles.module.css";
import global from "../global.module.css";
import clsx from "clsx";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";
import { MetamaskProviderContext } from "@site/src/theme/Root";

interface AuthBoxProps {
  isMetamaskNetwork?: boolean;
}

export const AuthBox = ({ isMetamaskNetwork = false }: AuthBoxProps) => {
  const { metaMaskConnectHandler, metaMaskWalletIdConnectHandler } = useContext(MetamaskProviderContext);
  const connectHandler = () => {
    trackClickForSegment({
      eventName: "Connect wallet",
      clickType: "Connect wallet",
      userExperience: "B",
    });
    isMetamaskNetwork ? metaMaskConnectHandler() : metaMaskWalletIdConnectHandler();
  };
  return (
    <div className={styles.msgWrapper}>
      <div className={styles.msgText}>
        Connect your MetaMask wallet to run requests successfully.
      </div>
      <div>
        <button
          className={clsx(global.primaryBtn, styles.msgButton)}
          onClick={connectHandler}
          data-test-id="connect-wallet"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};
