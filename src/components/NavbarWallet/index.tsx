import React, { useEffect, useState, useRef, FC, useContext } from "react";
import ldClient from "launchdarkly";
import clsx from "clsx";
import Button from "@site/src/components/Button";
import CopyIcon from "./copy.svg";
import DisconnectIcon from "./disconnect.svg";
import { LoginContext } from "@site/src/theme/Root";
import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "./navbarWallet.module.scss";
import { Tooltip } from "@site/src/components/Tooltip";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";

interface INavbarWalletComponent {
  includeUrl: string[];
}

const LOGIN_FF = "mm-unified-login";

const NavbarWalletComponent: FC = ({
  includeUrl = [],
}: INavbarWalletComponent) => {
  if (!includeUrl.some((item) => location?.pathname.includes(item))) {
    return null;
  }

  const COPY_TEXT = "Copy to clipboard";
  const COPIED_TEXT = "Copied!";
  const { account, sdk, metaMaskConnectHandler, metaMaskDisconnect } =
    useContext(LoginContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState(COPY_TEXT);
  const isExtensionActive = sdk.isExtensionActive();
  const dialogRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((value) => !value);
    trackClickForSegment({
      eventName: "Account dropdown",
      clickType: "Navbar",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(account);
    setCopyMessage(COPIED_TEXT);
    trackClickForSegment({
      eventName: "Copy wallet address",
      clickType: "Navbar",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as HTMLElement) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as HTMLElement)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDisconnect = () => {
    trackClickForSegment({
      eventName: "Disconnect account",
      clickType: "Navbar",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    metaMaskDisconnect();
    setDropdownOpen(false);
  };

  const handleConnectWallet = () => {
    trackClickForSegment({
      eventName: !isExtensionActive ? "Install MetaMask" : "Connect Wallet",
      clickType: "Navbar",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    metaMaskConnectHandler();
  };

  return !account ? (
    <Button
      testId={
        !isExtensionActive
          ? "navbar-cta-install-metamask"
          : "navbar-cta-connect-wallet"
      }
      thin
      onClick={handleConnectWallet}
      className={styles.navbarButton}
    >
      {!isExtensionActive ? "Install MetaMask" : "Connect Wallet"}
    </Button>
  ) : (
    <div className={styles.navbarWallet}>
      <button
        data-testid="navbar-account-toggle"
        ref={buttonRef}
        className={styles.cta}
        onClick={toggleDropdown}
      >
        <img
          src="/img/icons/jazzicon.png"
          className={clsx(styles.avatar, dropdownOpen && styles.active)}
          alt="avatar"
        />
      </button>
      {dropdownOpen && (
        <ul ref={dialogRef} className={styles.dropdown}>
          <li className={styles.item}>
            <img
              src="/img/icons/jazzicon.png"
              className={styles.avatar}
              alt="avatar"
            />{" "}
            <span
              className={styles.walletId}
            >{`${account.slice(0, 7)}...${account.slice(-5)}`}</span>
            <button
              data-testid="navbar-account-copy"
              className={styles.copyButton}
              onClick={handleCopy}
            >
              <Tooltip
                message={copyMessage}
                className={styles.tooltip}
                onHidden={() => {
                  setCopyMessage(COPY_TEXT);
                }}
              >
                <CopyIcon />
              </Tooltip>
            </button>
          </li>
          <li className={styles.item}>
            <Button
              thin
              type="danger"
              testId="navbar-account-disconnect"
              onClick={handleDisconnect}
              className={styles.disconnect}
            >
              <span className={styles.content}>
                <DisconnectIcon className={styles.icon} />{" "}
                <span>Disconnect Wallet</span>
              </span>
            </Button>
          </li>
        </ul>
      )}
    </div>
  );
};

const NavbarWallet = (props) => {
  const [ldReady, setLdReady] = useState(false);
  const [loginEnabled, setLoginEnabled] = useState(false);

  useEffect(() => {
    ldClient.waitUntilReady().then(() => {
      setLoginEnabled(ldClient.variation(LOGIN_FF, false));
      setLdReady(true);
    });
    const handleChange = (current) => {
      setLoginEnabled(current);
    };
    ldClient.on(`change:${LOGIN_FF}`, handleChange);
    return () => {
      ldClient.off(`change:${LOGIN_FF}`, handleChange);
    };
  }, []);

  return (
    ldReady &&
    loginEnabled && (
      <BrowserOnly>{() => <NavbarWalletComponent {...props} />}</BrowserOnly>
    )
  );
};

export default NavbarWallet;
