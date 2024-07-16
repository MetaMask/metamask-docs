import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";
import global from "../global.module.css";
import { EIP6963ProviderDetail } from "@site/src/hooks/store.ts"

interface AuthBoxProps {
  metamaskProviders: any;
  handleConnect: (i) => void;
  selectedProvider?: number;
}

const MetamaskInstallMessage = () => (
  <div className={styles.msgWrapper}>
    <strong className={styles.msgHeading}>Install MetaMask</strong>
    <p className={styles.msgText}>Install MetaMask for your browser to enable interactive features</p>
    <Link className={global.primaryBtn} href="https://metamask.io/download/">Install MetaMask</Link>
  </div>
);

export const AuthBox = ({ metamaskProviders = [], selectedProvider, handleConnect }: AuthBoxProps) => {
  if (metamaskProviders.length === 0) {
    return <MetamaskInstallMessage />
  }

  if (metamaskProviders.length > 0) {
    return null
  }

  return (
    <div className={styles.msgWrapper}>
      <p>Select a MetaMask provider to use interactive features:</p>
      <div className={styles.mmBtnRow}>
        {metamaskProviders.map((provider: EIP6963ProviderDetail, i) => (
          <div key={provider.info.uuid} className={styles.mmBtnCol}>
            <button className={styles.mmBtn} onClick={() => handleConnect(i)}>
              <img
                src={provider.info.icon}
                alt={provider.info.name}
                width="30"
              />
              <div className="padding-left--md">{provider.info.name}</div>
              {selectedProvider === i && <span className={styles.mmBtnCheck}>&#10003;</span>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
