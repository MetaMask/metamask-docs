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

interface ILoginContext {
  projects: { [key: string]: Project };
  setProjects: (arg: { [key: string]: Project }) => void;
  metaMaskConnectHandler: () => Promise<void>;
  metaMaskDisconnect: () => Promise<void>;
  userId: string | undefined;
  account: string;
  setAccount: (arg: string[] | string) => void;
  provider: SDKProvider;
  setProvider: (arg: SDKProvider) => void;
  sdk: MetaMaskSDK;
  disconnect: () => Promise<void>;
  setWalletLinked: (arg: WALLET_LINK_TYPE) => void
  walletLinked: WALLET_LINK_TYPE | undefined
  setWalletLinkUrl: (arg: string) => void
  walletLinkUrl: string
}

export const LoginContext = createContext<ILoginContext>({
  projects: {},
  setProjects: () => {},
  metaMaskConnectHandler: () => new Promise(() => {}),
  metaMaskDisconnect: () => new Promise(() => {}),
  userId: undefined,
  account: undefined,
  setAccount: () => {},
  provider: undefined,
  setProvider: () => {},
  sdk: undefined,
  disconnect: () => new Promise(() => {}),
  setWalletLinked: () => {},
  walletLinked: undefined,
  setWalletLinkUrl: () => {},
  walletLinkUrl: ''
});

export const LoginProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [userId, setUserId] = useState<string>('');
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [provider, setProvider] = useState(undefined);
  const [account, setAccount] = useState(undefined);
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
      setAccount(accounts);
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        const provider = sdk.getProvider();
        setProvider(provider);
      }
    } catch (e) {}
  };

  useEffect(() => {
    if (isInitialized && sdk.isExtensionActive()) {
      const provider = sdk.getProvider();
      sdk.resume();
      setProvider(provider);
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
        name: account,
        id: account,
        username: account,
      });
    }
  }, [account]);

  const metaMaskConnectHandler = useCallback(async () => {
    try {
      setOpenAuthModal(true);
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  }, [sdk, setAccount, setProvider]);

  const metaMaskDisconnect = useCallback(async () => {
    try {
      await sdk?.terminate();
      setOpenAuthModal(false);
      setUserId(undefined);
      setAccount(undefined);
      setProjects({});
      setWalletLinked(undefined)
      clearStorage();
    } catch (err) {
      console.warn("failed to disconnect..", err);
    }
  }, [sdk, setOpenAuthModal, setUserId, setAccount, setProjects]);

  return (
    <BrowserOnly>
      {() => (
        <LoginContext.Provider
          value={
            {
              account,
              setAccount,
              projects,
              setProjects,
              metaMaskConnectHandler,
              metaMaskDisconnect,
              userId,
              provider,
              setProvider,
              sdk,
              walletLinked,
              setWalletLinked,
              walletLinkUrl,
              setWalletLinkUrl
            } as ILoginContext
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
        </LoginContext.Provider>
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
