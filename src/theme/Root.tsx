import React, { ReactChild, createContext, useEffect, useState } from "react";
import { Provider as AlertProvider } from "react-alert";
import { AlertTemplate, options } from "@site/src/components/Alert";
import { MetaMaskProvider, useSDK } from "@metamask/sdk-react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import {
  DASHBOARD_URL,
  REF_FAUCET_PATH,
  REQUEST_PARAMS,
} from "@site/src/lib/constants";
import {
  AUTH_WALLET_PROJECTS,
  getUserIdFromSessionStorage,
  saveTokenString,
} from "@site/src/lib/siwsrp/auth";
import AuthModal from "@site/src/components/AuthLogin/AuthModal";
import { SDKState } from "@metamask/sdk-react";

interface ILoginContext extends SDKState {
  projects: any;
  metaMaskConnectHandler: () => Promise<void>;
  userId: string;
}
const LoginContext = createContext<
  Omit<ILoginContext, "connecting" | "readOnlyCalls" | "ready">
>({
  projects: {},
  metaMaskConnectHandler: () => new Promise(() => {}),
  userId: "",
  extensionActive: false,
  provider: undefined,
  account: "",
  sdk: undefined,
  connected: false,
});

const LoginProvider = ({ children }) => {
  const { extensionActive, provider, account, sdk, connected } = useSDK();
  const [projects, setProjects] = useState(
    JSON.parse(sessionStorage.getItem(AUTH_WALLET_PROJECTS) || "{}"),
  );
  const [userId, setUserId] = useState<string>("");
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.pathname.includes(REF_FAUCET_PATH)) {
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

  const metaMaskConnectHandler = async () => {
    try {
      if (extensionActive && location.pathname.includes(REF_FAUCET_PATH)) {
        setOpenAuthModal(true);
      } else {
        await sdk?.connect();
      }
    } catch (err) {
      console.warn("failed to connect..", err);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        metaMaskConnectHandler,
        projects,
        extensionActive,
        userId,
        provider,
        account,
        sdk,
        connected,
      }}
    >
      {children}
      <AuthModal
        open={openAuthModal}
        setOpen={setOpenAuthModal}
        setProjects={setProjects}
      />
    </LoginContext.Provider>
  );
};

export { LoginContext, LoginProvider };

export default function Root({ children }: { children: ReactChild }) {
  const MetaMaskWrapper = ({ children }) => {
    return (
      <BrowserOnly>
        {() => (
          <MetaMaskProvider
            debug={false}
            sdkOptions={{
              checkInstallationOnAllCalls: true,
              extensionOnly: true,
              preferDesktop: true,
              logging: {
                sdk: false,
              },
              dappMetadata: {
                name: "Reference pages",
                url: window.location.href,
              },
            }}
          >
            {children}
          </MetaMaskProvider>
        )}
      </BrowserOnly>
    );
  };

  return (
    <MetaMaskWrapper>
      <AlertProvider template={AlertTemplate} {...options}>
        <LoginProvider>{children}</LoginProvider>
      </AlertProvider>
    </MetaMaskWrapper>
  );
}
