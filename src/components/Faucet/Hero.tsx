import React, { useContext } from "react";
import Text from "@site/src/components/Text";
import Button from "@site/src/components/Button";
import Input from "@site/src/components/Input";
import clsx from "clsx";
import {MetamaskProviderContext} from "@site/src/theme/Root";
import EthIcon from "./eth.svg";

import styles from "./hero.module.scss";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";

interface IHero {
  className: string;
  network: "linea" | "sepolia";
  handleRequest: VoidFunction;
  handleOnInputChange: (valiue: string) => void;
  inputValue?: string;
  isLoading?: boolean;
  isLimitedUserPlan?: boolean;
}

export default function Hero({
  network,
  className,
  handleRequest,
  inputValue,
  handleOnInputChange,
  isLoading,
  isLimitedUserPlan,
}: IHero) {
  const { metaMaskAccount, sdk, metaMaskWalletIdConnectHandler } = useContext(MetamaskProviderContext);
  const isExtensionActive = sdk.isExtensionActive();

  const handleConnectWallet = () => {
    trackClickForSegment({
      eventName: !isExtensionActive ? "Install MetaMask" : "Connect Wallet",
      clickType: "Hero",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    metaMaskWalletIdConnectHandler();
  };

  const handleRequestEth = () => {
    trackClickForSegment({
      eventName: "Request ETH",
      clickType: "Hero",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    handleRequest();
  };

  return (
    <div
      className={clsx(
        styles.hero,
        network === "linea" && styles.linea,
        network === "sepolia" && styles.sepolia,
        className,
      )}
    >
      {!(isExtensionActive && metaMaskAccount) && <EthIcon />}
      <Text as="h1">
        <span>
          {network === "linea" && "Linea Sepolia"}
          {network === "sepolia" && "Sepolia"} ETH delivered straight to your
          wallet.
        </span>
      </Text>
      <Text as="p">
        {!isExtensionActive
          ? "Install MetaMask for your browser to get started and request ETH."
          : !metaMaskAccount
            ? "Connect your MetaMask wallet to get started and request ETH."
            : "Enter your MetaMask wallet address and request ETH."}
      </Text>
      <div className={styles.actions}>
        {isExtensionActive && metaMaskAccount && (
          <div className={styles.inputCont}>
            <Input
              label="Wallet address"
              disabled={isLoading}
              value={inputValue}
              placeholder="ex. 0x"
              onChange={handleOnInputChange}
            />
            {isLimitedUserPlan && (
              <p className={styles.caption}>
                The amount of {network === "linea" && "Linea Sepolia"}
                {network === "sepolia" && "Sepolia"} ETH you’ll get is
                determined by your addresses Ethereum Mainnet activity to ensure
                fair and bot-free distribution
              </p>
            )}
          </div>
        )}
        <div
          className={clsx(
            isExtensionActive && metaMaskAccount && styles.alignedButtons,
          )}
        >
          {!metaMaskAccount ? (
            <Button
              testId={
                !isExtensionActive
                  ? "hero-cta-install-metamask"
                  : "hero-cta-connect-wallet"
              }
              className={styles.button}
              onClick={handleConnectWallet}
            >
              {!isExtensionActive ? "Install MetaMask" : "Connect Wallet"}
            </Button>
          ) : (
            <Button
              testId="hero-cta-request-eth"
              isLoading={isLoading}
              disabled={!inputValue}
              className={styles.button}
              onClick={handleRequestEth}
            >
              Request ETH
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
