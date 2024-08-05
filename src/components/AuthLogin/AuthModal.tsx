import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";
import global from "../ParserOpenRPC/global.module.css";
import Icon from "../Icon/Icon";
import { authenticateAndAuthorize, AUTH_WALLET_PAIRING, AUTH_WALLET_SESSION_NAME, AUTH_WALLET_PROJECTS, saveTokenString, getUserIdFromSessionStorage } from "../../lib/siwsrp/auth";
import { DASHBOARD_URL, REQUEST_PARAMS } from "@site/src/lib/constants";

Modal.setAppElement("#__docusaurus");
type AuthModalProps = {
  open: boolean;
  setOpen: (arg: boolean) => void;
  setProjects: (arg: any[]) => void;
};

enum AUTH_LOGIN_STEP {
  CONNECTING = "connecting",
  WALLET_LOGIN_MULTI_USER = "wallet-login-multi-user",
  WALLET_LOGIN_EMAIL_PASSWORD = "wallet-login-email-password",
  CONNECTION_ERROR = "connection-error",
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

const ConnectionErrorModal = () => {
  return (
    <>
      <div className={styles.spinnerContainer}>
        <Icon name="spinner-error" classes={styles.spinner} />
        <Icon name="metamask" classes={styles.metamask} />
      </div>
      <div className={styles.heading}>There was an issue connecting your wallet</div>
      <div className={styles.content}>
        Please try again or <a href="#">contact us</a>.
      </div>
      <div className={styles.flexButton}>
        <button style={{ flex: "1", display: "block", margin: "0 5px" }} className={global.secondaryBtn}>Cancel</button>
        <button style={{ flex: "1", display: "block", margin: "0 5px" }} className={global.primaryBtn}>Retry</button>
      </div>
    </>
  );
};

const AuthModal = ({ open, setOpen, setProjects }: AuthModalProps) => {
  const [step, setStep] = useState<AUTH_LOGIN_STEP>(AUTH_LOGIN_STEP.CONNECTING);

  const login = async () => {
    // Call Profile SDK API to retrieve Hydra Access Token & Wallet userProfile
    // Hydra Access Token will be used to fetch Infura API
    const { accessToken, userProfile } = await authenticateAndAuthorize();

    // Check on Infura API if this wallet is paired with one or multiple Infura account
    const pairingResponse = await fetch(`${DASHBOARD_URL}/api/wallet/pairing`, {
      ...REQUEST_PARAMS(),
      headers: {
        ...REQUEST_PARAMS().headers,
        hydra_token: accessToken,
      },
      body: JSON.stringify({
        profileId: userProfile.profileId,
      }),
    });

    const usersPairing = await pairingResponse.json();
    const { data } = usersPairing
    // Saving of paired Infura accounts in local storage 
    localStorage.setItem(AUTH_WALLET_PAIRING, JSON.stringify({ data }))
    
    // Handling no wallet pairing or multiple pairing
    if (data.length !== 1) {
      const mm_auth = Buffer.from(JSON.stringify({
        token: true,
        step: data.length > 1 ? AUTH_LOGIN_STEP.WALLET_LOGIN_MULTI_USER : AUTH_LOGIN_STEP.WALLET_LOGIN_EMAIL_PASSWORD,
        mmAuthSession: localStorage.getItem(AUTH_WALLET_SESSION_NAME),
        walletPairing: data
      })).toString('base64')  
      window.location.href = `${DASHBOARD_URL}/login?mm_auth=${mm_auth}&token=true&redirect_to=${window.location.href}`
      return
    }
    
    // We have one wallet paired with one Infura account
    // Use this Infura email account and this ProfileId to login to Infura
    // Pass token in request params to generate and recieve an Infura access Token
    const email = data[0].email as string
    const userWithTokenResponse = await fetch(`${DASHBOARD_URL}/api/wallet/login?token=true`, {
      ...REQUEST_PARAMS(),
      headers: {
        ...REQUEST_PARAMS().headers,
        hydra_token: accessToken,
        recaptcha_bypass: "84450394",
      },
      body: JSON.stringify({
        email,
        profileId: userProfile.profileId
      })
    });

    const { token } = await userWithTokenResponse.json();
    saveTokenString(token)
    const userId = getUserIdFromSessionStorage()

    // You can use Infura Access Token to fetch any Infura API endpoint
    const projectsResponse = await fetch(`${DASHBOARD_URL}/api/v1/users/${userId}/projects`, {
      ...REQUEST_PARAMS('GET'),
      headers: {
        ...REQUEST_PARAMS('GET').headers,
        Authorization: `Bearer ${token}`
      }
    });
    const { result: { projects }} = await projectsResponse.json()
    sessionStorage.setItem(AUTH_WALLET_PROJECTS, JSON.stringify(projects))
    setProjects(projects)
    setOpen(false)
  };

  useEffect(() => {
    if (open) {
      (async () => {
        try {
          await login();
        } catch (e: any) {
          setStep(AUTH_LOGIN_STEP.CONNECTION_ERROR)
        }
      })();
    }
  }, [open]);

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      contentLabel="Example Modal"
      className={styles.modalWrapper}
      overlayClassName={styles.modalOverlay}
    >
      <div className={styles.modalContent}>
        <button
          type="button"
          className={styles.modalClose}
          onClick={() => setOpen(false)}
        >
          <Icon name="close" classes={styles.modalClose} />
        </button>
        {step === AUTH_LOGIN_STEP.CONNECTING ? <ConnectingModal /> : null}
        {step === AUTH_LOGIN_STEP.CONNECTION_ERROR ? <ConnectionErrorModal /> : null}
      </div>
    </Modal>
  );
};

export default AuthModal;
