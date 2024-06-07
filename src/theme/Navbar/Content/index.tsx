import React, { useState, useEffect } from "react";
import ldClient from "launchdarkly";
import Content from "@theme-original/Navbar/Content";

export default function ContentWrapper(props) {
  // to avoid flickering
  const [ldReady, setLdReady] = useState<boolean>(false);
  const [featureFlag, setFeatureFlag] = useState<boolean>(false);

  useEffect(() => {
    ldClient.waitUntilReady().then(() => {
      const flagValue = ldClient.variation("siwsrpLogin", false);
      setFeatureFlag(flagValue);
      setLdReady(true);
    });
    
    ldClient.on("change:siwsrpLogin", (current) => {
      setFeatureFlag(current);
    });

    // Clean all events listener
    return () => {
      ldClient.removeEventListener("change:siwsrpLogin");
    };
  });

  
  return (
    <>
      <Content {...props} />
      {ldReady ? <div>{featureFlag ? "ON" : "OFF"}</div> : <div>ld loading</div>}
    </>
  );
}
