import React, { useMemo, useState } from "react";
import Layout from "@theme/Layout";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import Button from "@site/src/components/Button";
import {
  Faq,
  AlertCommonIssue,
  AlertCooldown,
  AlertSuccess,
  TransactionTable,
  Hero,
} from "@site/src/components/Faucet";
import { useAlert } from "react-alert";
import { useSDK } from "@metamask/sdk-react";

import styles from "./faucet.module.scss";
import { useTimeout } from "react-use";

export default function Faucet() {
  const alert = useAlert();
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { sdk, ready, connected, provider, account } = useSDK();

  const isWalletConnected = useMemo(() => {
    return true; // ready && connected && !!account;
  }, [ready, connected, account]);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert.info(<AlertCooldown />);
      setIsUserConnected((value) => !value);
    }, 2000);
  };

  const connectSDKHandler = async () => {
    // @TODO remove later
    alert.error(<AlertCommonIssue />);

    try {
      const accounts = await sdk?.connect();
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const handleRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert.success(<AlertSuccess url="https://www.infura.io" />);
    }, 2000);
  };

  const handleOnInputChange = (value) => {
    setWalletAddress(value);
  };

  const tabItemContent = (network: "linea" | "sepolia") => {
    return (
      <>
        <div className={styles.topContent}>
          <Hero
            isUserConnected={isUserConnected}
            network={network}
            className={styles.hero}
            handleLogin={handleLogin}
            handleC
            isWalletConnected={isWalletConnected}
            handleConnectWallet={connectSDKHandler}
            handleRequest={handleRequest}
            handleOnInputChange={handleOnInputChange}
            inputValue={walletAddress}
            isLoading={isLoading}
          />
          <TransactionTable classNameHeading={styles.sectionHeading} />
        </div>
        <div className={styles.bottomContent}>
          <Faq
            network={network}
            className={styles.faq}
            classNameHeading={styles.sectionHeading}
          ></Faq>
        </div>
      </>
    );
  };

  return (
    <Layout title="Faucet" description="Faucet">
      <div className={styles.authCont}>
        <span className={styles.title}>MetaMask Faucet</span>
        {!isUserConnected ? (
          <Button onClick={handleLogin}>Sign in</Button>
        ) : !isWalletConnected ? (
          <Button onClick={connectSDKHandler}>Install MetaMask</Button>
        ) : (
          <div>walletId</div>
        )}
      </div>
      <div className={styles.tabs}>
        <Tabs className={styles.header}>
          <TabItem
            className={styles.content}
            value="sepolia"
            label="Ethereum Sepolia"
            default
          >
            {tabItemContent("sepolia")}
          </TabItem>
          <TabItem
            className={styles.content}
            value="linea"
            label="Linea Sepolia"
          >
            {tabItemContent("linea")}
          </TabItem>
        </Tabs>
      </div>
    </Layout>
  );
}
