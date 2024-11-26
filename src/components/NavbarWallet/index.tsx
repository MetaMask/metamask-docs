import React, { useEffect, useState, useRef, FC, useContext } from "react";
import ldClient from "launchdarkly";
import clsx from "clsx";
import Button from "@site/src/components/Button";
import CopyIcon from "./copy.svg";
import DisconnectIcon from "./disconnect.svg";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "./navbarWallet.module.scss";
import { Tooltip } from "@site/src/components/Tooltip";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";
import Link from "@docusaurus/Link";

interface INavbarWalletComponent {
  includeUrl: string[];
}

const LOGIN_FF = "mm-unified-login";

const EndIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.2915 3.33332C4.2915 2.96514 4.58998 2.66666 4.95817 2.66666H11.9998C12.368 2.66666 12.6665 2.96514 12.6665 3.33332V10.375C12.6665 10.7432 12.368 11.0417 11.9998 11.0417C11.6316 11.0417 11.3332 10.7432 11.3332 10.375V4.9428L3.80458 12.4714C3.54422 12.7317 3.12212 12.7317 2.86176 12.4714C2.60142 12.2111 2.60142 11.7889 2.86176 11.5286L10.3904 3.99999H4.95817C4.58998 3.99999 4.2915 3.70151 4.2915 3.33332Z"
      fill="currentColor"
    />
  </svg>
);

const reformatMetamaskAccount = (account) =>
  account ? `${account.slice(0, 7)}...${account.slice(-5)}` : null;

const NavbarWalletComponent: FC = ({
  includeUrl = [],
}: INavbarWalletComponent) => {
  if (!includeUrl.some((item) => location?.pathname.includes(item))) {
    return null;
  }

  const COPY_TEXT = "Copy to clipboard";
  const COPIED_TEXT = "Copied!";
  const {
    metaMaskAccount,
    metaMaskAccountEns,
    sdk,
    metaMaskWalletIdConnectHandler,
    metaMaskDisconnect,
  } = useContext(MetamaskProviderContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState(COPY_TEXT);
  const isExtensionActive = sdk.isExtensionActive();
  const dialogRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [userAccount, setUserAccount] = useState(
    metaMaskAccountEns || metaMaskAccount,
  );

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
    navigator.clipboard.writeText(userAccount);
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
    metaMaskWalletIdConnectHandler();
  };

  useEffect(() => {
    if (metaMaskAccountEns) {
      setUserAccount(metaMaskAccountEns);
    } else if (metaMaskAccount) {
      setUserAccount(metaMaskAccount);
    } else {
      setUserAccount(null);
    }
  }, [metaMaskAccount, metaMaskAccountEns]);

  return !userAccount ? (
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
      {!isExtensionActive ? "Install MetaMask" : "Connect MetaMask"}
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
            <div>
              <div className={styles.innerItemWrap}>
                <img
                  src="/img/icons/jazzicon.png"
                  className={styles.avatar}
                  alt="avatar"
                />{" "}
                <span className={styles.walletId}>
                  {metaMaskAccountEns || reformatMetamaskAccount(userAccount)}
                </span>
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
              </div>
              {
                !metaMaskAccountEns && (
                  <div className={styles.extLinkWrap}>
                    <Link to="https://names.linea.build/" className={styles.extLink}>
                      Claim Linea Name
                      <EndIcon />
                    </Link>
                    <span className={styles.extTag}>New</span>
                  </div>
                )
              }
            </div>
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
                <span>Disconnect MetaMask</span>
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
