import {
  AuthType,
  Env,
  UserStorage,
  JwtBearerAuth,
  AuthStorageOptions,
  LoginResponse,
} from "@metamask/profile-sync-controller";

export const storage: AuthStorageOptions = {
  getLoginResponse: async () => {
    const storedResponse = localStorage.getItem("authentication/session");
    return storedResponse ? JSON.parse(storedResponse) : null;
  },
  setLoginResponse: async (val: LoginResponse) => {
    localStorage.setItem("authentication/session", JSON.stringify(val));
  },
};

export const auth = new JwtBearerAuth({
  env: Env.DEV,
  type: AuthType.SRP,
}, {
  storage,
});

export const userStorage = new UserStorage({
  auth,
  env: Env.DEV,
}, {});

export const authenticateAndAuthorize = async () => {
  try {
    await window.ethereum.request({
      method: "wallet_requestSnaps",
      params: {
        "npm:@metamask/message-signing-snap": {},
      },
    });
    return {
      accessToken: await auth.getAccessToken(),
      identifier: await auth.getIdentifier(),
      userProfile: await auth.getUserProfile(),
    };
  } catch (e) {
    console.error(e);
  }
};