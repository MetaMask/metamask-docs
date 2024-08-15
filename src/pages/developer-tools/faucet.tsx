import React, { useContext, useEffect, useState } from "react";
import Layout from "@theme/Layout";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import ldClient from "launchdarkly";
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
import { LoginContext } from "@site/src/theme/Root";

import styles from "./faucet.module.scss";
import { DASHBOARD_URL, GET_OPTIONS } from "@site/src/lib/constants";

const lineaMaintenanceFlag = "linea-maintenance-mode";
const sepoliaMaintenanceFlag = "sepolia-maintenance-mode";

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
  const { userId } = useContext(LoginContext);
  const alert = useAlert();
  const [transactions, setTransactions] = useState({ linea: [], sepolia: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [alertType, setAlertType] = useState(1);
  const [ldReady, setLdReady] = useState(false);
  const [isLineaMaintenance, setIsLineaMaintenance] = useState(false);
  const [isSepoliaMaintenance, setIsSepoliaMaintenance] = useState(false);

  useEffect(() => {
    ldClient.waitUntilReady().then(() => {
      setIsLineaMaintenance(ldClient.variation(lineaMaintenanceFlag, false));
      setIsSepoliaMaintenance(
        ldClient.variation(sepoliaMaintenanceFlag, false),
      );
      setLdReady(true);
    });
    const handleChangeLinea = (current) => {
      setIsLineaMaintenance(current);
    };
    const handleChangeSepolia = (current) => {
      setIsSepoliaMaintenance(current);
    };
    ldClient.on(`change:${lineaMaintenanceFlag}`, handleChangeLinea);
    ldClient.on(`change:${sepoliaMaintenanceFlag}`, handleChangeSepolia);
    return () => {
      ldClient.off(`change:${lineaMaintenanceFlag}`, handleChangeLinea);
      ldClient.off(`change:${sepoliaMaintenanceFlag}`, handleChangeSepolia);
    };
  }, []);

  const getTransactions = async () => {
    const transactions = await fetch(
      `${DASHBOARD_URL}/api/v1/faucets/linea/transactions?take=10&skip=0`,
      GET_OPTIONS,
    );
    console.log(transactions)
  };

  useEffect(() => {
    if (userId) {
      getTransactions();
    }
  }, [userId]);

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
        <div className={styles.topContent}>
          <Hero
            network={network}
            className={styles.hero}
            handleRequest={handleRequest}
            handleOnInputChange={handleOnInputChange}
            inputValue={walletAddress}
            isLoading={isLoading}
          />
          {transactions && (
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
      </div>
      <div className={styles.tabs}>
        <Tabs className={styles.header}>
          <TabItem
            className={styles.content}
            value="sepolia"
            label="Ethereum Sepolia"
            default
          >
            {isSepoliaMaintenance && <Maintenance network="sepolia" />}
            {ldReady ? tabItemContent("sepolia") : null}
          </TabItem>
          <TabItem
            className={styles.content}
            value="linea"
            label="Linea Sepolia"
          >
            {isLineaMaintenance && <Maintenance network="linea" />}
            {ldReady ? tabItemContent("linea") : null}
          </TabItem>
        </Tabs>
      </div>
    </Layout>
  );
}