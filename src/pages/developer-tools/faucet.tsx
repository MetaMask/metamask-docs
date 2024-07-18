import React from "react";
import Layout from "@theme/Layout";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import styles from "./faucet.module.scss";
import Button from "@site/src/components/Button";
import Badge from "@site/src/components/Badge";
import { Faq } from "@site/src/components/Faucet";
import { useAlert } from "react-alert";
import { AlertCommonIssue, AlertCooldown, AlertSuccess } from "@site/src/components/Faucet";

export default function Faucet() {
  const alert = useAlert();

  return (
    <Layout title="Faucet" description="Faucet">
      <div className={styles.authCont}>
        <span className={styles.title}>MetaMask Faucet</span>
        <Button
          onClick={() => {
            alert.error(<AlertCommonIssue />);
            alert.info(<AlertCooldown />);
            alert.success(<AlertSuccess url='https://www.infura.io' />);
          }}
        >
          Sign in
        </Button>
      </div>
      <div className={styles.tabs}>
        <Tabs className={styles.header}>
          <TabItem
            className={styles.content}
            value="apple"
            label="Ethereum Sepolia"
            default
          >
            <div>Ethereum Sepolia</div>
            <ul>
              <li><Badge variant="success" label="Successful" /></li>
              <li><Badge variant="error" label="Failed" /></li>
              <li><Badge label="Pending" /></li>
            </ul>
            <Faq network="sepolia" className={styles.faq}></Faq>
          </TabItem>
          <TabItem
            className={styles.content}
            value="orange"
            label="Linea Sepolia"
          >
            <div>Linea Sepolia</div>
            <Faq network="linea" className={styles.faq}></Faq>
          </TabItem>
        </Tabs>
      </div>
    </Layout>
  );
}
