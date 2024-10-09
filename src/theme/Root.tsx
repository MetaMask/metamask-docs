import React, {
  ReactElement,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Provider as AlertProvider } from "react-alert";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BrowserOnly from "@docusaurus/BrowserOnly";
import siteConfig from "@generated/docusaurus.config";
import { AlertTemplate, options } from "@site/src/components/Alert";
import { MetaMaskSDK, SDKProvider } from "@metamask/sdk";
import {
  DASHBOARD_URL,
  REF_ALLOW_LOGIN_PATH,
  REQUEST_PARAMS,
  AUTH_WALLET_PROJECTS,
} from "@site/src/lib/constants";
import {
  clearStorage,
  getUserIdFromJwtToken,
  saveTokenString,
  getTokenString,
  getUksTier,
} from "@site/src/lib/siwsrp/auth";
import AuthModal, {
  AUTH_LOGIN_STEP,
  WALLET_LINK_TYPE,
} from "@site/src/components/AuthLogin/AuthModal";

interface Project {
  id: string;
  userId: string;
  name: string;
  created: number;
  updated: number;
  deleted: boolean;
  settings: any;
  networks: {
    [key: string]: { subnets: number[] };
  };
  role: string;
}

interface IMetamaskProviderContext {
  token: string;
  projects: { [key: string]: Project };
  setProjects: (arg: { [key: string]: Project }) => void;
  metaMaskDisconnect: () => Promise<void>;
  metaMaskWalletIdConnectHandler: () => Promise<void>;
  userId: string | undefined;
  metaMaskAccount: string;
  setMetaMaskAccount: (arg: string[] | string) => void;
  metaMaskProvider: SDKProvider;
  setMetaMaskProvider: (arg: SDKProvider) => void;
  uksTier: string;
  sdk: MetaMaskSDK;
  setWalletLinked: (arg: WALLET_LINK_TYPE) => void;
  walletLinked: WALLET_LINK_TYPE | undefined;
  setWalletLinkUrl: (arg: string) => void;
  walletLinkUrl: string;
  userAPIKey?: string;
  setUserAPIKey?: (key: string) => void;
}

export const MetamaskProviderContext = createContext<IMetamaskProviderContext>({
  token: undefined,
  projects: {},
  setProjects: () => {},
  metaMaskDisconnect: () => new Promise(() => {}),
  metaMaskWalletIdConnectHandler: () => new Promise(() => {}),
  userId: undefined,
  metaMaskAccount: undefined,
  setMetaMaskAccount: () => {},
  uksTier: undefined,
  metaMaskProvider: undefined,
  setMetaMaskProvider: () => {},
  sdk: undefined,
  setWalletLinked: () => {},
  walletLinked: undefined,
  setWalletLinkUrl: () => {},
  walletLinkUrl: "",
  userAPIKey: "",
  setUserAPIKey: () => {},
});

const sdk = new MetaMaskSDK({
  dappMetadata: {
    name: "Reference pages",
    url: "https://docs.metamask.io/",
  },
  preferDesktop: true,
  extensionOnly: true,
  checkInstallationImmediately: false,
  logging: {
    sdk: false,
  },
});

export const LoginProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [userId, setUserId] = useState<string>("");
  const [token, setToken] = useState<string>(undefined);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [metaMaskProvider, setMetaMaskProvider] = useState(undefined);
  const [metaMaskAccount, setMetaMaskAccount] = useState(undefined);
  const [uksTier, setUksTier] = useState(undefined);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [step, setStep] = useState<AUTH_LOGIN_STEP>(AUTH_LOGIN_STEP.CONNECTING);
  const [walletLinked, setWalletLinked] = useState<
    WALLET_LINK_TYPE | undefined
  >(undefined);
  const [walletLinkUrl, setWalletLinkUrl] = useState<string>("");
  const [userAPIKey, setUserAPIKey] = useState("");
  const { siteConfig } = useDocusaurusContext();
  const { DASHBOARD_PREVIEW_URL, VERCEL_ENV } = siteConfig?.customFields || {};

  if (sdk.isInitialized() && !isInitialized) {
    setIsInitialized(true);
  }

  const getStaleDate = async () => {
    try {
      setProjects(
        JSON.parse(sessionStorage.getItem(AUTH_WALLET_PROJECTS) || "{}"),
      );
      setUserId(getUserIdFromJwtToken());
      setToken(getTokenString());
      setUksTier(getUksTier());
      const accounts = await sdk.connect();
      setMetaMaskAccount(accounts);
      if (accounts && accounts.length > 0) {
        setMetaMaskAccount(accounts[0]);
        const provider = sdk.getProvider();
        setMetaMaskProvider(provider);
      }
    } catch (e) {}
  };

  const { GF_SURVEY_KEY } = siteConfig.customFields;

  useEffect(() => {
    const provider = sdk?.getProvider();
    setMetaMaskProvider(provider);
    if ((window as any)?.usabilla && window?.innerWidth > 1720) {
      (window as any)?.usabilla?.load("w.usabilla.com", GF_SURVEY_KEY);
    }
  }, []);

  useEffect(() => {
    if (isInitialized && sdk.isExtensionActive()) {
      const provider = sdk.getProvider();
      sdk.resume();
      setMetaMaskProvider(provider);
    }
  }, [isInitialized]);

  useEffect(() => {
    const url = new URL(window.location.href);
    getStaleDate();
    if (REF_ALLOW_LOGIN_PATH.some((item) => url.pathname.includes(item))) {
      const token = url.searchParams.get("token");

      if (token) {
        saveTokenString(token);
        setToken(token);
        const userIdFromjwtToken = getUserIdFromJwtToken();
        setUserId(userIdFromjwtToken);

        (async () => {
          try {
            const projectsResponse = await fetch(
              `${DASHBOARD_URL(DASHBOARD_PREVIEW_URL, VERCEL_ENV)}/api/v1/users/${userIdFromjwtToken}/projects`,
              {
                ...REQUEST_PARAMS("GET", { Authorization: `Bearer ${token}` }),
              },
            );
            const res = await projectsResponse.json();
            if (res.error) throw new Error(res.error.message);

            const {
              result: { projects },
            } = res;
            sessionStorage.setItem(
              AUTH_WALLET_PROJECTS,
              JSON.stringify(projects),
            );
            setProjects(projects);
            window.location.replace(`${url.origin}${url.pathname}`);
          } catch (e: any) {
            setStep(AUTH_LOGIN_STEP.CONNECTION_ERROR);
            setOpenAuthModal(true);
          }
        })();
      }
    }
  }, []);

  const metaMaskWalletIdConnectHandler = useCallback(async () => {
    try {
      setOpenAuthModal(true);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  }, [setOpenAuthModal]);

  const metaMaskDisconnect = useCallback(async () => {
    try {
      await sdk?.terminate();
      setOpenAuthModal(false);
      setUserId(undefined);
      setToken(undefined);
      setMetaMaskAccount(undefined);
      setUksTier(undefined);
      setProjects({});
      setWalletLinked(undefined);
      setUserAPIKey("");
      clearStorage();
    } catch (err) {
      console.warn("failed to disconnect..", err);
    }
  }, [
    sdk,
    setOpenAuthModal,
    setUserId,
    setToken,
    setMetaMaskAccount,
    setUksTier,
    setProjects,
  ]);

  return (
    <BrowserOnly>
      {() => (
        <MetamaskProviderContext.Provider
          value={
            {
              token,
              metaMaskAccount,
              setMetaMaskAccount,
              projects,
              setProjects,
              metaMaskDisconnect,
              metaMaskWalletIdConnectHandler,
              userId,
              metaMaskProvider,
              uksTier,
              setMetaMaskProvider,
              sdk,
              walletLinked,
              setWalletLinked,
              walletLinkUrl,
              setWalletLinkUrl,
              userAPIKey,
              setUserAPIKey,
            } as IMetamaskProviderContext
          }
        >
          {children}

          <AuthModal
            open={openAuthModal}
            setOpen={setOpenAuthModal}
            setUser={setUserId}
            setToken={setToken}
            setUksTier={setUksTier}
            setStep={setStep}
            step={step}
          />
        </MetamaskProviderContext.Provider>
      )}
    </BrowserOnly>
  );
};

export default function Root({ children }: { children: ReactElement }) {
  return (
    <LoginProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        {children}
      </AlertProvider>
    </LoginProvider>
  );
}
