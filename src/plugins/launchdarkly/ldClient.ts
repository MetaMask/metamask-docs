import { initialize } from "launchdarkly-js-client-sdk";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  const context = {
    kind: "user",
    anonymous: true,
    key: "ld-anonymous-user-key",
  };
  
  const ldClient = initialize(process.env.LD_CLIENT_ID, context, {
    allAttributesPrivate: true,
    bootstrap: "localStorage",
  });

  ldClient.on("ready", () => {
    console.log("LaunchDarkly client ready");
  });  

  return ldClient;
})();
