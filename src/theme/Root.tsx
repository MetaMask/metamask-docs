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
import { AlertTemplate, options } from "@site/src/components/Alert";
import { MetaMaskSDK, SDKProvider } from "@metamask/sdk";
import {
  DASHBOARD_URL,
  REF_ALLOW_LOGIN_PATH,
  REQUEST_PARAMS,
} from "@site/src/lib/constants";
import {
  AUTH_WALLET_PROJECTS,
  clearStorage,
  getUserIdFromJwtToken,
  saveTokenString,
} from "@site/src/lib/siwsrp/auth";
import AuthModal, {
  AUTH_LOGIN_STEP,
  WALLET_LINK_TYPE
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
  projects: { [key: string]: Project };
  setProjects: (arg: { [key: string]: Project }) => void;
  metaMaskConnectHandler: () => Promise<void>;
  metaMaskDisconnect: () => Promise<void>;
  userId: string | undefined;
  metaMaskAccount: string;
  setMetaMaskAccount: (arg: string[] | string) => void;
  metaMaskProvider: SDKProvider;
  setMetaMaskProvider: (arg: SDKProvider) => void;
  sdk: MetaMaskSDK;
  disconnect: () => Promise<void>;
  setWalletLinked: (arg: WALLET_LINK_TYPE) => void
  walletLinked: WALLET_LINK_TYPE | undefined
  setWalletLinkUrl: (arg: string) => void
  walletLinkUrl: string
}

export const MetamaskProviderContext = createContext<IMetamaskProviderContext>({
  projects: {},
  setProjects: () => {},
  metaMaskConnectHandler: () => new Promise(() => {}),
  metaMaskDisconnect: () => new Promise(() => {}),
  userId: undefined,
  metaMaskAccount: undefined,
  setMetaMaskAccount: () => {},
  metaMaskProvider: undefined,
  setMetaMaskProvider: () => {},
  sdk: undefined,
  disconnect: () => new Promise(() => {}),
  setWalletLinked: () => {},
  walletLinked: undefined,
  setWalletLinkUrl: () => {},
  walletLinkUrl: ''
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
  const [userId, setUserId] = useState<string>('');
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [metaMaskProvider, setMetaMaskProvider] = useState(undefined);
  const [metaMaskAccount, setMetaMaskAccount] = useState(undefined);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [step, setStep] = useState<AUTH_LOGIN_STEP>(AUTH_LOGIN_STEP.CONNECTING);
  const [walletLinked, setWalletLinked] = useState<WALLET_LINK_TYPE | undefined>(undefined);
  const [walletLinkUrl, setWalletLinkUrl] = useState<string>('');
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
      const accounts = await sdk.connect();
      setMetaMaskAccount(accounts);
      if (accounts && accounts.length > 0) {
        setMetaMaskAccount(accounts[0]);
        const provider = sdk.getProvider();
        setMetaMaskProvider(provider);
      }
    } catch (e) {}
  };

  useEffect(() => {
    const provider = sdk?.getProvider();
    setMetaMaskProvider(provider);
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
        const userIdFromjwtToken = getUserIdFromJwtToken();
        setUserId(userIdFromjwtToken);

        (async () => {
          try {
            const projectsResponse = await fetch(
              `${DASHBOARD_URL(DASHBOARD_PREVIEW_URL, VERCEL_ENV)}/api/v1/users/${userIdFromjwtToken}/projects`,
              {
                ...REQUEST_PARAMS("GET"),
                headers: {
                  ...REQUEST_PARAMS("GET").headers,
                  Authorization: `Bearer ${token}`,
                },
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

  useEffect(() => {
    if ((window as any)?.Sentry) {
      (window as any)?.Sentry?.setUser({
        name: metaMaskAccount,
        id: metaMaskAccount,
        username: metaMaskAccount,
      });
    }
  }, [metaMaskAccount]);

  const metaMaskConnectHandler = useCallback(async () => {
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
      setMetaMaskAccount(undefined);
      setProjects({});
      setWalletLinked(undefined)
      clearStorage();
    } catch (err) {
      console.warn("failed to disconnect..", err);
    }
  }, [sdk, setOpenAuthModal, setUserId, setMetaMaskAccount, setProjects]);

  return (
    <BrowserOnly>
      {() => (
        <MetamaskProviderContext.Provider
          value={
            {
              metaMaskAccount,
              setMetaMaskAccount,
              projects,
              setProjects,
              metaMaskConnectHandler,
              metaMaskDisconnect,
              userId,
              metaMaskProvider,
              setMetaMaskProvider,
              sdk,
              walletLinked,
              setWalletLinked,
              walletLinkUrl,
              setWalletLinkUrl
            } as IMetamaskProviderContext
          }
        >
          {children}

          <AuthModal
            open={openAuthModal}
            setOpen={setOpenAuthModal}
            setUser={setUserId}
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
