import React from "react";
import styles from "./styles.module.css";
import global from "../global.module.css";
import clsx from "clsx";

interface AuthBoxProps {
  handleConnect: () => void;
}

export const AuthBox = ({ handleConnect }: AuthBoxProps) => {
  return (
    <div className={styles.msgWrapper}>
      <div className={styles.msgText}>Connect your MetaMask wallet to send requests to your Infura API keys.</div>
      <div>
        <button
          className={clsx(global.primaryBtn, styles.msgButton)}
          onClick={() => handleConnect()}
          data-test-id="connect-wallet"
        >
          Connect Wallet
        </button>
      </div>
    </div>
  );
};
