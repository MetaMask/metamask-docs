import React, { useEffect, useState } from "react";
import ldClient from "launchdarkly";

import Content from "@theme-original/Navbar/Content";

export default function ContentWrapper(props) {
  const [featureEnabled, setFeatureEnabled] = useState(false);

  useEffect(() => {
    ldClient.on("ready", () => {
      const flagValue = ldClient.variation("siwsrpLogin", false);
      setFeatureEnabled(flagValue);
    });

    // Optionally, listen for changes to feature flags
    ldClient.on("change:siwsrpLogin", (current) => {
      setFeatureEnabled(current);
    });
  }, []);
  
  return (
    <>
      <Content {...props} />
      <div>{featureEnabled ? "ON" : "OFF"}</div>
    </>
  );
}
