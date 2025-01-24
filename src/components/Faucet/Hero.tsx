import React, { useContext, useEffect, useState } from "react";
import Text from "@site/src/components/Text";
import Button from "@site/src/components/Button";
import Input from "@site/src/components/Input";
import clsx from "clsx";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";
import { WALLET_LINK_TYPE } from "@site/src/components/AuthLogin/AuthModal";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import EthIcon from "./eth.svg";
import styles from "./hero.module.scss";

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
  const {
    metaMaskAccount,
    sdk,
    metaMaskWalletIdConnectHandler,
    walletLinked,
    projects,
    walletAuthUrl,
  } = useContext(MetamaskProviderContext);

  const isMobile = sdk.platformManager?.isMobile ?? false;
  const isExtensionActive = sdk.isExtensionActive();

  const showInstallButton = !isExtensionActive && !isMobile;

  const [isWalletLinking, setIsWalletLinking] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletLinking(true);
    trackClickForSegment({
      eventName: showInstallButton ? "Install MetaMask" : "Connect MetaMask",
      clickType: "Hero",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    metaMaskWalletIdConnectHandler();
  };

  const handleLinkWallet = () => {
    setIsWalletLinking(true);
    trackClickForSegment({
      eventName:
        walletLinked === WALLET_LINK_TYPE.NO
          ? "Link Infura Account"
          : "Select Infura Account",
      clickType: "Hero",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    window.location.href = walletAuthUrl;
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

  useEffect(() => {
    if (walletLinked) {
      setIsWalletLinking(false);
    }
  }, [walletLinked]);

  return (
    <div
      className={clsx(
        styles.hero,
        network === "linea" && styles.linea,
        network === "sepolia" && styles.sepolia,
        className,
      )}
    >
      {(showInstallButton || !(metaMaskAccount)) && <EthIcon />}
      <Text as="h1">
        <span>
          {network === "linea" && "Linea Sepolia"}
          {network === "sepolia" && "Sepolia"} ETH delivered straight to your
          wallet.
        </span>
      </Text>
      <Text as="p">
        {showInstallButton
          ? "Install MetaMask for your browser to get started and request ETH."
          : !Object.keys(projects).length
            ? walletLinked === undefined
              ? "Connect your MetaMask wallet to get started and request ETH."
              : walletLinked === WALLET_LINK_TYPE.NO
                ? "Link your Infura account to get started and request ETH."
                : "Select your Infura account to get started and request ETH."
            : "Enter your MetaMask wallet address and request ETH."}
      </Text>
      <div className={styles.actions}>
        {!!Object.keys(projects).length && (
          <div className={styles.inputCont}>
            <Input
              label="Wallet address"
              disabled={isLoading}
              value={inputValue}
              placeholder="ex. 0x or ENS"
              onChange={handleOnInputChange}
            />
            {isLimitedUserPlan && (
              <p className={styles.caption}>
                The amount of {network === "linea" && "Linea Sepolia"}
                {network === "sepolia" && "Sepolia"} ETH you'll get is
                determined by your address's Ethereum Mainnet activity to ensure
                fair and bot-free distribution.
              </p>
            )}
          </div>
        )}
        <div
          className={clsx(
            !!Object.keys(projects).length && styles.alignedButtons,
          )}
        >
          {showInstallButton ? (
            <Button
              testId="hero-cta-install-metamask"
              className={styles.button}
              onClick={handleConnectWallet}
            >
              Install MetaMask
            </Button>
          ) : !Object.keys(projects).length ? (
            <>
              {walletLinked === undefined && (
                <Button
                  testId="hero-cta-connect-metamask"
                  className={styles.button}
                  onClick={handleConnectWallet}
                  isLoading={isWalletLinking}
                >
                  Connect MetaMask
                </Button>
              )}
              {walletLinked === WALLET_LINK_TYPE.NO && (
                <Button
                  testId="hero-cta-link-infura-account"
                  className={styles.button}
                  onClick={handleLinkWallet}
                  isLoading={isWalletLinking}
                >
                  Link Infura Account
                </Button>
              )}
              {walletLinked === WALLET_LINK_TYPE.MULTIPLE && (
                <Button
                  testId="hero-cta-select-infura-account"
                  className={styles.button}
                  onClick={handleLinkWallet}
                  isLoading={isWalletLinking}
                >
                  Select Infura Account
                </Button>
              )}
            </>
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
