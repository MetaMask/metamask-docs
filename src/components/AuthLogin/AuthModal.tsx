import React, { useContext, useEffect } from "react";
import Modal from "react-modal";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";
import global from "../ParserOpenRPC/global.module.css";
import Icon from "../Icon/Icon";
import {
  authenticateAndAuthorize,
  AUTH_WALLET_SESSION_NAME,
  AUTH_WALLET_PROJECTS,
  saveTokenString,
  getUserIdFromJwtToken,
} from "../../lib/siwsrp/auth";
import { DASHBOARD_URL, REQUEST_PARAMS } from "@site/src/lib/constants";
import { MetamaskProviderContext } from "@site/src/theme/Root";

Modal.setAppElement("#__docusaurus");
type AuthModalProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  setUser: (arg: string) => void;
  step: AUTH_LOGIN_STEP;
  setStep: (arg: AUTH_LOGIN_STEP) => void;
};

export enum AUTH_LOGIN_STEP {
  CONNECTING = "connecting",
  WALLET_LOGIN_MULTI_USER = "wallet-login-multi-user",
  WALLET_LOGIN_EMAIL_PASSWORD = "wallet-login-email-password",
  CONNECTION_ERROR = "connection-error",
  CONNECTION_SUCCESS = "connection-success",
}

export enum WALLET_LINK_TYPE {
  NO = "NO",
  ONE = "ONE",
  MULTIPLE = "MULTIPLE",
}

const ConnectingModal = () => {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <img src="/img/spinner.png" className={styles.spinner} />
        <Icon name="metamask" classes={styles.metamask} />
      </div>
      <div className={styles.heading}>Waiting for MetaMask</div>
      <div className={styles.content}>
        Don’t close or exit this window. Please continue connecting on your
        extension.
      </div>
      <button
        style={{
          display: "block",
          width: "100%",
          textAlign: "center",
          opacity: "0.5",
          margin: "22px 0 0 0",
        }}
        className={global.primaryBtn}
        disabled
        aria-disabled
      >
        Connecting...
      </button>
    </>
  );
};

const ConnectionSuccessModal = () => {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <Icon name="spinner-success" classes={styles.spinner} />
        <Icon name="metamask" classes={styles.metamask} />
      </div>
      <div className={styles.heading}>Wallet Connected!</div>
      <div className={styles.content}>
        Your wallet is successfully connected.
        <br />
        You’re all set!
      </div>
    </>
  );
};

const ConnectionErrorModal = ({
  setOpen,
  login,
  metaMaskDisconnect,
}: {
  setOpen: (arg: boolean) => void;
  login: () => void;
  metaMaskDisconnect: () => void;
}) => {
  const handleCancel = () => {
    metaMaskDisconnect();
    setOpen(false);
  };
  return (
    <>
      <div className={styles.spinnerContainer}>
        <Icon name="spinner-error" classes={styles.spinner} />
        <Icon name="metamask" classes={styles.metamask} />
      </div>
      <div className={styles.heading}>
        There was an issue connecting your wallet
      </div>
      <div className={styles.content}>
        Please try again or{" "}
        <a href="https://support.metamask.io/">contact us</a>.
      </div>
      <div className={styles.flexButton}>
        <button
          style={{ flex: "1", display: "block", margin: "0 5px" }}
          className={global.secondaryBtn}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          style={{ flex: "1", display: "block", margin: "0 5px" }}
          className={global.primaryBtn}
          onClick={login}
        >
          Retry
        </button>
      </div>
    </>
  );
};

const AuthModal = ({
  open,
  setOpen,
  step,
  setStep,
}: AuthModalProps) => {
  const { siteConfig } = useDocusaurusContext();
  const { DASHBOARD_PREVIEW_URL, VERCEL_ENV } = siteConfig?.customFields || {};
  const { sdk, setWalletLinked, setWalletLinkUrl, metaMaskDisconnect, setProjects, setMetaMaskAccount, setMetaMaskProvider } = useContext(MetamaskProviderContext);

  const login = async () => {
    setStep(AUTH_LOGIN_STEP.CONNECTING);
    try {
      if (!sdk.isExtensionActive()) {
        setOpen(false);
      }

      // Try to connect wallet first
      const accounts = await sdk.connect();
      setMetaMaskAccount(accounts);
      if (accounts && accounts.length > 0) {
        setMetaMaskAccount(accounts[0]);
        const provider = sdk.getProvider();
        setMetaMaskProvider(provider);
      }
      
      // Call Profile SDK API to retrieve Hydra Access Token & Wallet userProfile
      // Hydra Access Token will be used to fetch Infura API
      const { accessToken, userProfile } = await authenticateAndAuthorize(VERCEL_ENV as string);

      const loginResponse = await (
        await fetch(
          `${DASHBOARD_URL(DASHBOARD_PREVIEW_URL, VERCEL_ENV)}/api/wallet/login`,
          {
            ...REQUEST_PARAMS(),
            headers: {
              ...REQUEST_PARAMS().headers,
              hydra_token: accessToken,
              token: 'true',
            },
            body: JSON.stringify({
              profileId: userProfile.profileId,
              redirect_to: window.location.href,
            }),
          }
        )
      ).json();

      if (!loginResponse) throw new Error("Something went wrong");

      const { data, session, token } = loginResponse;

      if (data.step) {
        // Handling no wallet pairing or multiple pairing
        const mm_auth = Buffer.from(
          JSON.stringify({
            step: data.step,
            mmAuthSession: localStorage.getItem(AUTH_WALLET_SESSION_NAME),
            walletPairing: data.pairing,
            token: true
          })
        ).toString("base64");

        const walletLinkUrl = `${DASHBOARD_URL(DASHBOARD_PREVIEW_URL, VERCEL_ENV)}/login?mm_auth=${mm_auth}&redirect_to=${session.redirect_to}`;

        setWalletLinkUrl(walletLinkUrl);

        if (data.pairing && !data.pairing.length) {
          setWalletLinked(WALLET_LINK_TYPE.NO);
        }

        if (data.pairing && data.pairing.length > 1) {
          setWalletLinked(WALLET_LINK_TYPE.MULTIPLE);
        }

        setStep(AUTH_LOGIN_STEP.CONNECTION_SUCCESS);
        setOpen(false);
        return;
      }

      setWalletLinked(WALLET_LINK_TYPE.ONE);

      if (!token) {
        setStep(AUTH_LOGIN_STEP.CONNECTION_ERROR);
        return;
      }

      saveTokenString(token);
      setStep(AUTH_LOGIN_STEP.CONNECTION_SUCCESS);
      const userId = getUserIdFromJwtToken();

      // You can use Infura Access Token to fetch any Infura API endpoint
      const projectsResponse = await fetch(
        `${DASHBOARD_URL(DASHBOARD_PREVIEW_URL, VERCEL_ENV)}/api/v1/users/${userId}/projects`,
        {
          ...REQUEST_PARAMS("GET"),
          headers: {
            ...REQUEST_PARAMS("GET").headers,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const {
        result: { projects },
      } = await projectsResponse.json();
      sessionStorage.setItem(AUTH_WALLET_PROJECTS, JSON.stringify(projects));
      setProjects(projects);
      setOpen(false);
    } catch (e: any) {
      setStep(AUTH_LOGIN_STEP.CONNECTION_ERROR);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (open && step == AUTH_LOGIN_STEP.CONNECTING) {
      (async () => {
        try {
          await login();
        } catch (e: any) {
          setStep(AUTH_LOGIN_STEP.CONNECTION_ERROR);
        }
      })();
    }

    if (!open) setStep(AUTH_LOGIN_STEP.CONNECTING);
  }, [open]);

  const handleClose = () => {
    if (step === AUTH_LOGIN_STEP.CONNECTION_ERROR) {
      metaMaskDisconnect();
    }
    setOpen(false);
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={handleClose}
      contentLabel="Connect Wallet"
      className={styles.modalWrapper}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.modalClose}
          onClick={handleClose}
        >
          <Icon name="close" classes={styles.modalClose} />
        </button>
        {step === AUTH_LOGIN_STEP.CONNECTING ? <ConnectingModal /> : null}
        {step === AUTH_LOGIN_STEP.CONNECTION_SUCCESS ? (
          <ConnectionSuccessModal />
        ) : null}
        {step === AUTH_LOGIN_STEP.CONNECTION_ERROR ? (
          <ConnectionErrorModal
            setOpen={setOpen}
            login={login}
            metaMaskDisconnect={metaMaskDisconnect}
          />
        ) : null}
      </div>
    </Modal>
  );
};

export default AuthModal;
