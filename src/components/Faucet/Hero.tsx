import React from "react";
import Text from "@site/src/components/Text";
import Button from "@site/src/components/Button";
import Input from "@site/src/components/Input";
import clsx from "clsx";

import styles from "./hero.module.scss";

interface IHero {
  className: string;
  network: "linea" | "sepolia";
  isWalletConnected: boolean;
  isUserConnected: boolean;
  handleConnectWallet: VoidFunction;
  handleLogin: VoidFunction;
  handleRequest: VoidFunction;
  handleOnInputChange: VoidFunction;
  inputValue?: string;
  isLoading?: boolean;
}

export default function Hero({
  network,
  className,
  isWalletConnected,
  isUserConnected,
  handleConnectWallet,
  handleLogin,
  handleRequest,
  inputValue,
  handleOnInputChange,
  isLoading,
}: IHero) {
  return (
    <div className={clsx(styles.hero, className)}>
      <Text as="h1">
        {network === "linea" && "Linea Sepolia"}
        {network === "sepolia" && "Sepolia"} ETH delivered straight to your
        wallet.
      </Text>
      <Text as="p">Enter your MetaMask wallet address and request ETH.</Text>

      <div className={styles.actions}>
        <div className={styles.inputCont}>
          <Input
            label="Wallet address"
            value={inputValue}
            placeholder="ex. 0x"
            onChange={handleOnInputChange}
          />
          <p className={styles.caption}>
            The amount of Sepolia ETH you’ll get is determined by your addresses
            Ethereum Mainnet activity to ensure fair and bot-free distribution
          </p>
        </div>
        {!isUserConnected ? (
          <Button
            isLoading={isLoading}
            className={styles.button}
            onClick={handleLogin}
          >
            Sign in
          </Button>
        ) : !isWalletConnected ? (
          <Button
            isLoading={isLoading}
            className={styles.button}
            onClick={handleConnectWallet}
          >
            Install MetaMask
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
  );
}
