import React, { useState, FC, useContext } from "react";
import clsx from "clsx";
import Button from "@site/src/components/Button";
import CopyIcon from "./copy.svg";
import DisconnectIcon from "./disconnect.svg";
import styles from "./navbarWallet.module.scss";
import { LoginContext } from "@site/src/theme/Root";

interface INavbarWallet {
  includeUrl: string[];
}

const NavbarWallet: FC = ({ includeUrl = [] }: INavbarWallet) => {
  if (!includeUrl.includes(location.pathname)) {
    return null;
  }

  const { account, connected, metaMaskConnectHandler } =
    useContext(LoginContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((value) => !value);
  };

  return !account ? (
    <Button
      thin
      onClick={metaMaskConnectHandler}
      className={styles.navbarButton}
    >
      Connect MetaMask
    </Button>
  ) : (
    <div className={styles.navbarWallet}>
      <button className={styles.cta} onClick={toggleDropdown}>
        <img
          src="/img/icons/jazzicon.png"
          className={clsx(styles.avatar, dropdownOpen && styles.active)}
          alt="avatar"
        />
      </button>
      {dropdownOpen && (
        <ul className={styles.dropdown}>
          <li className={styles.item}>
            <img
              src="/img/icons/jazzicon.png"
              className={styles.avatar}
              alt="avatar"
            />{" "}
            <span className={styles.walletId}>0xcBf60...a2B44</span>
            <button className={styles.copyButton}>
              <CopyIcon />
            </button>
          </li>
          <li className={styles.item}>
            <Button
              thin
              type="danger"
              onClick={() => {}}
              className={styles.disconnect}
            >
              <DisconnectIcon className={styles.icon} />{" "}
              <span>Disconnect Wallet</span>
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavbarWallet;
