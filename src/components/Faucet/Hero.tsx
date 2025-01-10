import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Text from "@site/src/components/Text";
import Button from "@site/src/components/Button";
import Input from "@site/src/components/Input";
import clsx from "clsx";
import { trackClickForSegment } from "@site/src/lib/segmentAnalytics";
import { WALLET_LINK_TYPE } from "@site/src/components/AuthLogin/AuthModal";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import EthIcon from "./eth.svg";
import styles from "./hero.module.scss";

interface IHero {
  className: string;
  network: "linea" | "sepolia";
  handleRequest: VoidFunction;
  handleOnInputChange: (valiue: string) => void;
  inputValue?: string;
  isLoading?: boolean;
  isLimitedUserPlan?: boolean;
}

const useConsoleListener = () => {
  const logsRef = useRef([]);
  const [, forceUpdate] = useState(0); // State to force re-render

  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;

    const stringify = (arg) => {
      try {
        return typeof arg === "object" ? JSON.stringify(arg) : arg;
      } catch (e) {
        return "[Unserializable Object]";
      }
    };

    const handleLog = (args) => {
      const message = args.map(stringify).join(" ");
      logsRef.current = [...logsRef.current, `LOG: ${message}`];
    };

    const handleError = (args) => {
      const message = args.map(stringify).join(" ");
      logsRef.current = [...logsRef.current, `ERROR: ${message}`];
    };

    console.log = (...args) => {
      handleLog([...args]);
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      handleError([...args]);
      originalError.apply(console, args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  const clearLogs = useCallback(() => {
    logsRef.current = [];
    forceUpdate((prev) => prev + 1); // Force re-render
  }, []);

  const refreshLogs = useCallback(() => {
    forceUpdate((prev) => prev + 1); // Force re-render
  }, []);

  return [logsRef.current, clearLogs, refreshLogs] as const;
};

export default function Hero({
  network,
  className,
  handleRequest,
  inputValue,
  handleOnInputChange,
  isLoading,
  isLimitedUserPlan,
}: IHero) {
  const {
    metaMaskAccount,
    sdk,
    metaMaskWalletIdConnectHandler,
    walletLinked,
    projects,
    walletAuthUrl,
  } = useContext(MetamaskProviderContext);

  const [logs, clearLogs, refreshLogs] = useConsoleListener();

  // const isMobile = sdk.platformManager.isMobile;
  const isMobile = true;
  console.log(sdk.platformManager);
  const isExtensionActive = sdk.isExtensionActive();

  const showInstallButton = !isExtensionActive && !isMobile;

  const [isWalletLinking, setIsWalletLinking] = useState(false);

  const handleConnectWallet = () => {
    setIsWalletLinking(true);
    trackClickForSegment({
      eventName: showInstallButton ? "Install MetaMask" : "Connect MetaMask",
      clickType: "Hero",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    console.log("gon trigg");
    metaMaskWalletIdConnectHandler();
  };

  const handleLinkWallet = () => {
    setIsWalletLinking(true);
    trackClickForSegment({
      eventName:
        walletLinked === WALLET_LINK_TYPE.NO
          ? "Link Infura Account"
          : "Select Infura Account",
      clickType: "Hero",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    window.location.href = walletAuthUrl;
  };

  const handleRequestEth = () => {
    trackClickForSegment({
      eventName: "Request ETH",
      clickType: "Hero",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
    handleRequest();
  };

  useEffect(() => {
    if (walletLinked) {
      setIsWalletLinking(false);
    }
  }, [walletLinked]);

  return (
    <div
      className={clsx(
        styles.hero,
        network === "linea" && styles.linea,
        network === "sepolia" && styles.sepolia,
        className
      )}
    >
      {!(!showInstallButton && metaMaskAccount) && <EthIcon />}
      <Text as="h1">
        <span>
          {network === "linea" && "Linea Sepolia"}
          {network === "sepolia" && "Sepolia"} ETH delivered straight to your
          wallet.
        </span>
      </Text>
      <Text as="p">
        {showInstallButton
          ? "Install MetaMask for your browser to get started and request ETH."
          : !Object.keys(projects).length
            ? walletLinked === undefined
              ? "Connect your MetaMask wallet to get started and request ETH."
              : walletLinked === WALLET_LINK_TYPE.NO
                ? "Link your Infura account to get started and request ETH."
                : "Select your Infura account to get started and request ETH."
            : "Enter your MetaMask wallet address and request ETH."}
      </Text>
      <details>
        <summary>DEBUG LOGS ({logs.length})</summary>
        <button onClick={clearLogs}>Clear Logs</button>
        <button onClick={refreshLogs}>Refresh Logs</button>
        <div
          style={{
            maxHeight: "200px", // Adjust the height as needed
            overflowY: "auto",
            whiteSpace: "nowrap", // Prevent text wrapping
            border: "1px solid #ccc",
            padding: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          {logs.map((log, index) => (
            <div
              key={index}
              style={{
                fontFamily: "monospace",
                marginBottom: "5px",
              }}
            >
              {log}
            </div>
          ))}
        </div>
      </details>
      <button
        onClick={async () => {
          console.log("START TEST");

          console.log("CONNECT ACCOUNTS");
          const accounts = await sdk.connect();
          console.log("CONNECT ACCOUNTS DONE", accounts);

          console.log("GET PROVIDER");
          const provider = sdk.getProvider();
          console.log("GET PROVIDER DONE", provider);

          console.log("WALLET RPC CALL");
          const walletResponse = await provider.request({
            method: "eth_accounts",
            params: [],
          });
          console.log("WALLET RPC CALL DONE", walletResponse);

          console.log("SNAP wallet_getSnaps CALL");
          const wallet_getSnaps_response = await provider.request({
            method: "wallet_getSnaps",
          });
          console.log(
            "SNAP wallet_getSnaps CALL DONE",
            wallet_getSnaps_response
          );

          console.log("SNAP wallet_requestSnaps CALL");
          const wallet_requestSnaps_response = await provider.request({
            method: "wallet_requestSnaps",
            params: {
              ["npm:@metamask/message-signing-snap"]: {},
            },
          });
          console.log(
            "SNAP wallet_requestSnaps CALL DONE",
            wallet_requestSnaps_response
          );

          // THIS REQUEST FAILS ON MOBILE!!
          // ERROR: MetaMask - RPC Error: Property 'handleSnapRequest' doesn't exist {"code":-32603,"message":"Property 'handleSnapRequest' ...
          console.log("SNAP wallet_invokeSnap_getPublicKey CALL");
          const wallet_invokeSnap_getPublicKey_response =
            await provider.request({
              method: "wallet_invokeSnap",
              params: {
                snapId: "npm:@metamask/message-signing-snap",
                request: { method: "getPublicKey" },
              },
            });
          console.log(
            "SNAP wallet_invokeSnap_getPublicKey CALL DONE",
            wallet_invokeSnap_getPublicKey_response
          );

          console.log("END TEST");

          refreshLogs();
        }}
      >
        DEBUG TEST
      </button>
      <div className={styles.actions}>
        {!!Object.keys(projects).length && (
          <div className={styles.inputCont}>
            <Input
              label="Wallet address"
              disabled={isLoading}
              value={inputValue}
              placeholder="ex. 0x or ENS"
              onChange={handleOnInputChange}
            />
            {isLimitedUserPlan && (
              <p className={styles.caption}>
                The amount of {network === "linea" && "Linea Sepolia"}
                {network === "sepolia" && "Sepolia"} ETH you'll get is
                determined by your address's Ethereum Mainnet activity to ensure
                fair and bot-free distribution.
              </p>
            )}
          </div>
        )}
        <div
          className={clsx(
            !!Object.keys(projects).length && styles.alignedButtons
          )}
        >
          {showInstallButton ? (
            <Button
              testId="hero-cta-install-metamask"
              className={styles.button}
              onClick={handleConnectWallet}
            >
              Install MetaMask
            </Button>
          ) : !Object.keys(projects).length ? (
            <>
              {walletLinked === undefined && (
                <Button
                  testId="hero-cta-connect-metamask"
                  className={styles.button}
                  onClick={handleConnectWallet}
                  isLoading={isWalletLinking}
                >
                  Connect MetaMask
                </Button>
              )}
              {walletLinked === WALLET_LINK_TYPE.NO && (
                <Button
                  testId="hero-cta-link-infura-account"
                  className={styles.button}
                  onClick={handleLinkWallet}
                  isLoading={isWalletLinking}
                >
                  Link Infura Account
                </Button>
              )}
              {walletLinked === WALLET_LINK_TYPE.MULTIPLE && (
                <Button
                  testId="hero-cta-select-infura-account"
                  className={styles.button}
                  onClick={handleLinkWallet}
                  isLoading={isWalletLinking}
                >
                  Select Infura Account
                </Button>
              )}
            </>
          ) : (
            <Button
              testId="hero-cta-request-eth"
              isLoading={isLoading}
              disabled={!inputValue}
              className={styles.button}
              onClick={handleRequestEth}
            >
              Request ETH
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
