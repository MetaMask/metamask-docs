import React from "react";
import styles from "./styles.module.css";
import global from "../global.module.css";

interface AuthBoxProps {
  handleConnect: () => void;
}

export const AuthBox = ({ handleConnect }: AuthBoxProps) => {
  return (
    <div className={styles.msgWrapper}>
      <p className={styles.msgText}>
        Connect MetaMask to test requests using your wallet
      </p>
      <button
        className={global.primaryBtn}
        onClick={() => handleConnect()}
        data-test-id="connect-metamask"
      >
        Connect MetaMask
      </button>
    </div>
  );
};
