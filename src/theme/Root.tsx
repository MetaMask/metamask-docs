import React, {
  ReactElement,
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Provider as AlertProvider } from "react-alert";
import { AlertTemplate, options } from "@site/src/components/Alert";
import { MetaMaskSDK, SDKProvider } from "@metamask/sdk";
import {
  DASHBOARD_URL,
  REF_ALLOW_LOGIN_PATH,
  REQUEST_PARAMS,
} from "@site/src/lib/constants";
import {
  AUTH_WALLET_PROJECTS,
  getUserIdFromSessionStorage,
  saveTokenString,
} from "@site/src/lib/siwsrp/auth";
import AuthModal from "@site/src/components/AuthLogin/AuthModal";

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

interface ILoginContext {
  projects: { [key: string]: { name: string } };
  metaMaskConnectHandler: () => Promise<void>;
  userId: string;
  account: string;
  provider: SDKProvider;
  sdk: MetaMaskSDK;
  disconnect: () => Promise<void>;
}

export const LoginContext = createContext<ILoginContext>({
  projects: {},
  metaMaskConnectHandler: () => new Promise(() => {}),
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

  if (sdk.isInitialized() && !isInitialized) {
    setIsInitialized(true);
  }

  const getStaleDate = async () => {
    try {
      setProjects(
        JSON.parse(sessionStorage.getItem(AUTH_WALLET_PROJECTS) || "{}"),
      );
      setUserId(getUserIdFromSessionStorage());
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
    if (REF_ALLOW_LOGIN_PATH.includes(url.pathname)) {
      const token = url.searchParams.get("token");
      if (token) {
        saveTokenString(token);
        const userIdFromSession = getUserIdFromSessionStorage();
        setUserId(userIdFromSession);

        (async () => {
          const projectsResponse = await fetch(
            `${DASHBOARD_URL}/api/v1/users/${userId}/projects`,
            {
              ...REQUEST_PARAMS("GET"),
              headers: {
                ...REQUEST_PARAMS("GET").headers,
                Authorization: `Bearer ${token}`,
              },
            },
          );
          const {
            result: { projects },
          } = await projectsResponse.json();
          sessionStorage.setItem(
            AUTH_WALLET_PROJECTS,
            JSON.stringify(projects),
          );
          setProjects(projects);
          window.location.replace(`${url.origin}${url.pathname}`);
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
      if (sdk.isExtensionActive()) {
        setOpenAuthModal(true);
      }
      const accounts = await sdk.connect();
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
    } catch (err) {
      console.warn("failed to disconnect..", err);
    }
  }, [sdk, setOpenAuthModal, setUserId, setAccount, setProjects]);

  return (
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
        setOpen={setOpenAuthModal}
        setProjects={setProjects}
        setUser={setUserId}
      />
    </LoginContext.Provider>
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
