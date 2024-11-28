import React, { useState, useEffect } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { authenticateAndAuthorize } from "@site/src/lib/siwsrp/auth";
import { REQUEST_PARAMS } from "@site/src/lib/constants";

const DebugAuth = () => {
  const [ userData, setUserData ] = useState({
    accessToken: null,
    userProfile: null,
    data: null,
    session: null,
    token: null
  });
  const { siteConfig } = useDocusaurusContext();
  const { DASHBOARD_URL, VERCEL_ENV } = siteConfig?.customFields || {};
  const fetchLoginData = async () => {
    const { accessToken, userProfile } = await authenticateAndAuthorize(
      VERCEL_ENV as string,
    );
    setUserData(prev => ({...prev, accessToken, userProfile}));
    try {
      const loginResponse = await (
        await fetch(
          `${DASHBOARD_URL}/api/wallet/login`,
          {
            ...REQUEST_PARAMS("POST", {
              hydra_token: accessToken,
              token: "true",
            }),
            body: JSON.stringify({
              profileId: userProfile.profileId,
              redirect_to: window.location.href,
            }),
          },
        )
      ).json();
      const { data, session, token } = loginResponse;
      setUserData(prev => ({...prev, data, session, token}));
    } catch {
      setUserData(prev => ({...prev, data: "login api error"}));
    }
  };

  return (
    <div>
      <button onClick={fetchLoginData}>user</button>
      <div>
        {JSON.stringify(userData, null, 2)}
      </div>
    </div>
  )
};

export default DebugAuth;
