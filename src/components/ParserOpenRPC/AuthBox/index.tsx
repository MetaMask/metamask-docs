import React from "react";
import Link from "@docusaurus/Link";
import styles from "./styles.module.css";

interface AuthBoxProps {
  isMetamaskInstalled: boolean;
}

const MetamaskInstallMessage = () => (
  <div className={styles.msgWrapper}>
    <strong className={styles.msgHeading}>Install MetaMask</strong>
    <p className={styles.msgText}>Install MetaMask for your browser to enable interactive features</p>
    <Link className={styles.primaryBtn} href="https://metamask.io/download/">Install MetaMask</Link>
  </div>
);

export const AuthBox = ({ isMetamaskInstalled }: AuthBoxProps) => {
  return (
    <>
      {isMetamaskInstalled ? <MetamaskInstallMessage /> : null}
    </>
  );
};
