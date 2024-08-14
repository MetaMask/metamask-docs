import React, { useState, FC, useContext } from "react";
import clsx from "clsx";
import Button from "@site/src/components/Button";
import CopyIcon from "./copy.svg";
import DisconnectIcon from "./disconnect.svg";
import { LoginContext } from "@site/src/theme/Root";
import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "./navbarWallet.module.scss";

interface INavbarWalletComponent {
  includeUrl: string[];
}

const NavbarWalletComponent: FC = ({
  includeUrl = [],
}: INavbarWalletComponent) => {
  if (!includeUrl.some(item => location?.pathname.includes(item))) {
    return null;
  }

  const { account, sdk, metaMaskConnectHandler, metaMaskDisconnect } =
    useContext(LoginContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isExtensionActive = sdk.isExtensionActive();

  const toggleDropdown = () => {
    setDropdownOpen((value) => !value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(account);
  };

  return !account ? (
    <Button
      thin
      onClick={metaMaskConnectHandler}
      className={styles.navbarButton}
    >
      {!isExtensionActive ? "Install MetaMask" : "Connect MetaMask"}
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
            <span
              className={styles.walletId}
            >{`${account.slice(0, 7)}...${account.slice(-5)}`}</span>
            <button className={styles.copyButton} onClick={handleCopy}>
              <CopyIcon />
            </button>
          </li>
          <li className={styles.item}>
            <Button
              thin
              type="danger"
              onClick={metaMaskDisconnect}
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

const NavbarWallet = (props) => {
  return (
    <BrowserOnly>
      {() => <NavbarWalletComponent {...props} />}
    </BrowserOnly>
  );
};

export default NavbarWallet;