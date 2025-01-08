import { SDK } from "@metamask/profile-sync-controller";
import { SDKProvider } from "@metamask/sdk";
import jwt from "jsonwebtoken";

type HydraEnv = {
  authApiUrl: string;
  oidcApiUrl: string;
  userStorageApiUrl: string;
  env: SDK.Env;
  platform: SDK.Platform;
};

const { AuthType, Env, getEnvUrls, JwtBearerAuth, Platform } = SDK;
export const AUTH_WALLET_PAIRING = "auth.wallet.pairing";
export const AUTH_WALLET_SESSION_NAME = "auth.wallet.session";
export const AUTH_WALLET_TOKEN = "auth.wallet.token";
export const AUTH_WALLET_PROJECTS = "auth.wallet.projects";
export const AUTH_WALLET_USER_PLAN = "auth.wallet.uksTier";
export const AUTH_WALLET_ENS = "auth.wallet.ens";

export const getWalletEns = () => {
  return sessionStorage.getItem(AUTH_WALLET_ENS);
};

export const getUksTier = (): string => {
  return sessionStorage.getItem(AUTH_WALLET_USER_PLAN);
};

const getHydraEnv = (env: string): HydraEnv => {
  const platform = Platform.INFURA;

  if (env === "production") {
    return {
      ...getEnvUrls(Env.PRD),
      env: Env.PRD,
      platform,
    };
  } else {
    return {
      ...getEnvUrls(Env.DEV),
      env: Env.DEV,
      platform,
    };
  }
};

const storage: SDK.AuthStorageOptions = {
  getLoginResponse: async () => {
    const storedResponse = sessionStorage.getItem(AUTH_WALLET_SESSION_NAME);
    return storedResponse ? JSON.parse(storedResponse) : null;
  },
  setLoginResponse: async (val: SDK.LoginResponse) => {
    sessionStorage.setItem(AUTH_WALLET_SESSION_NAME, JSON.stringify(val));
  },
};

const auth = (env: string) =>
  new JwtBearerAuth(
    {
      env: getHydraEnv(env).env,
      platform: getHydraEnv(env).platform,
      type: AuthType.SRP,
    },
    {
      storage,
    }
  );

export const authenticateAndAuthorize = async (
  env: string,
  customProvider: SDKProvider
) => {
  let accessToken: string, userProfile: SDK.UserProfile;
  try {
    const authInstance = auth(env);

    console.log("about to set customProvider");
    authInstance.setCustomProvider(customProvider);
    console.log("after setting customProvider");

    console.log('about to get eth_accounts')
    const ethAccounts = await customProvider.request({
      method: "eth_accounts",
      params: [],
    });
    console.log('after get eth_accounts')
    console.log(ethAccounts)

    console.log('about to get snaps')
    // @ts-ignore
    const walletsnaps = await window.ethereum.request({
      method: "wallet_getSnaps",
    });
    console.log(walletsnaps);

    console.log("about to connectSnap");
    await authInstance.connectSnap();
    console.log("after connectSnap");
    accessToken = await authInstance.getAccessToken();
    userProfile = await authInstance.getUserProfile();
  } catch (e: any) {
    throw new Error(e.message);
  }

  return {
    accessToken,
    userProfile,
  };
};

export const saveTokenString = (token: string) => {
  sessionStorage.setItem(AUTH_WALLET_TOKEN, token);
};

export const getTokenString = (): string => {
  return sessionStorage.getItem(AUTH_WALLET_TOKEN);
};

export const getUserIdFromJwtToken = () => {
  const token = sessionStorage.getItem(AUTH_WALLET_TOKEN);
  const decoded = jwt.decode(token as string, { complete: true }) as jwt.Jwt;
  const { id } = decoded.payload as jwt.Payload;
  return id;
};

export const clearStorage = () => {
  sessionStorage.clear();
};
