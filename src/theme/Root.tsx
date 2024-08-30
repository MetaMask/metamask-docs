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
  metaMaskConnectHandler: () => Promise<void>;
  metaMaskDisconnect: () => Promise<void>;
  userId: string;
  account: string;
  provider: SDKProvider;
  sdk: MetaMaskSDK;
  disconnect: () => Promise<void>;
}

export const LoginContext = createContext<ILoginContext>({
  projects: {},
  metaMaskConnectHandler: () => new Promise(() => {}),
  metaMaskDisconnect: () => new Promise(() => {}),
  userId: undefined,
  account: undefined,
  provider: undefined,
  sdk: undefined,
  disconnect: () => new Promise(() => {}),
});

export const LoginProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [userId, setUserId] = useState<string>(undefined);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const [provider, setProvider] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [step, setStep] = useState<AUTH_LOGIN_STEP>(AUTH_LOGIN_STEP.CONNECTING);
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
      const accounts = await sdk.connect();
      if (sdk.isExtensionActive()) {
        setOpenAuthModal(true);
      }
      setAccount(accounts);
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
        const provider = sdk.getProvider();
        setProvider(provider);
      }
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
              projects,
              metaMaskConnectHandler,
              metaMaskDisconnect,
              userId,
              account,
              provider,
              sdk,
            } as ILoginContext
          }
        >
          {children}

          <AuthModal
            open={openAuthModal}
            metaMaskDisconnect={metaMaskDisconnect}
            setOpen={setOpenAuthModal}
            setProjects={setProjects}
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
