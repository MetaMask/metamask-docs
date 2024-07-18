import React from "react";
import Layout from "@theme/Layout";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import styles from "./faucet.module.scss";
import Button from "@site/src/components/Button";
import { Faq } from "@site/src/components/Faucet";
import { useAlert } from "react-alert";
import { AlertTitle, AlertText } from "@site/src/components/Alert";
import { types } from "react-alert";

export default function Faucet() {
  const alert = useAlert();

  const alertMessage = ({ type, title, text }) => {
    alert.show(
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertText>{text}</AlertText>
      </div>,
      { type: type },
    );
  };

  return (
    <Layout title="Faucet" description="Faucet">
      <div className={styles.authCont}>
        <span className={styles.title}>MetaMask Faucet</span>
        <Button
          onClick={() => {
            alertMessage({
              type: types.ERROR,
              title: "error title",
              text: "text text",
            });
            alertMessage({
              type: types.SUCCESS,
              title: "success title",
              text: "text text",
            });
            alertMessage({
              type: types.INFO,
              title: "info title",
              text: "text text",
            });
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
