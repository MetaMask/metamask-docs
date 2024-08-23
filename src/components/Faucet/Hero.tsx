import React, { useContext } from "react";
import Text from "@site/src/components/Text";
import Button from "@site/src/components/Button";
import Input from "@site/src/components/Input";
import clsx from "clsx";
import { LoginContext } from "@site/src/theme/Root";
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
  const { account, sdk, metaMaskConnectHandler } = useContext(LoginContext);
  const isExtensionActive = sdk.isExtensionActive();

  return (
    <div className={clsx(styles.hero, className)}>
      {!(isExtensionActive && account) && <EthIcon />}
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
          : !account
            ? "Connect your MetaMask wallet to get started and request ETH."
            : "Enter your MetaMask wallet address and request ETH."}
      </Text>
      <div className={styles.actions}>
        {isExtensionActive && account && (
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
            isExtensionActive && account && styles.alignedButtons,
          )}
        >
          {!account ? (
            <Button className={styles.button} onClick={metaMaskConnectHandler}>
              {!isExtensionActive ? "Install MetaMask" : "Connect MetaMask"}
            </Button>
          ) : (
            <Button
              isLoading={isLoading}
              disabled={!inputValue}
              className={styles.button}
              onClick={handleRequest}
            >
              Request ETH
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
