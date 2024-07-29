import React, { useContext, useState } from "react";
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
  Maintenance,
} from "@site/src/components/Faucet";
import { useAlert } from "react-alert";
import { MetamaskProviderContext } from "@site/src/theme/Root";

import styles from "./faucet.module.scss";

const LINEA = [
  {
    id: "01",
    createdAt: "2024-06-05T13:24:49.207Z",
    txnHash:
      "0x38412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0001",
    status: "success",
  },
  {
    id: "02",
    createdAt: "2024-05-05T13:24:49.207Z",
    txnHash:
      "0x48412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0002",
    status: "failed",
  },
  {
    id: "03",
    createdAt: "2024-07-05T13:24:49.207Z",
    txnHash:
      "0x58412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0003",
    status: "pending",
  },
];

const SEPOLIA = [
  {
    id: "03",
    createdAt: "2024-07-05T13:24:49.207Z",
    txnHash:
      "0x58412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0003",
    status: "pending",
  },
  {
    id: "01",
    createdAt: "2024-06-05T13:24:49.207Z",
    txnHash:
      "0x38412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0001",
    status: "success",
  },
  {
    id: "02",
    createdAt: "2024-05-05T13:24:49.207Z",
    txnHash:
      "0x48412083eb28fdf332d4ca7e1955cbb40a94adfae14ef7a3e9856f95c32b2ef2",
    value: "0.0002",
    status: "failed",
  },
];

export default function Faucet() {
  const { metaMaskConnectHandler, metaMaskAccount } = useContext(
    MetamaskProviderContext,
  );
  const alert = useAlert();
  const [isUserConnected, setIsUserConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [alertType, setAlertType] = useState(1);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsUserConnected((value) => !value);
    }, 2000);
  };

  const connectSDKHandler = async () => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsWalletConnected(true);
      }, 2000);
      metaMaskConnectHandler();
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  const handleRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      switch (alertType) {
        case 1:
          alert.success(<AlertSuccess url="https://www.infura.io" />);
          break;
        case 2:
          alert.error(<AlertCommonIssue />);
          break;
        default:
          alert.info(<AlertCooldown />);
      }
      setAlertType((value) => value + 1);
      setWalletAddress("");
    }, 2000);
  };

  const handleOnInputChange = (value) => {
    setWalletAddress(value);
  };

  const tabItemContent = (network: "linea" | "sepolia") => {
    return (
      <>
        {network === "linea" && <Maintenance network={network} />}
        <div className={styles.topContent}>
          <Hero
            isUserConnected={isUserConnected}
            network={network}
            className={styles.hero}
            handleLogin={handleLogin}
            isWalletConnected={isWalletConnected || metaMaskAccount}
            handleConnectWallet={connectSDKHandler}
            handleRequest={handleRequest}
            handleOnInputChange={handleOnInputChange}
            inputValue={walletAddress}
            isLoading={isLoading}
          />
          {isUserConnected && (
            <TransactionTable
              data={network === "linea" ? LINEA : SEPOLIA}
              classNameHeading={styles.sectionHeading}
            />
          )}
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
          <Button isLoading={isLoading} onClick={handleLogin}>
            Sign in
          </Button>
        ) : !(isWalletConnected || metaMaskAccount) ? (
          <Button isLoading={isLoading} onClick={connectSDKHandler}>
            Install MetaMask
          </Button>
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
