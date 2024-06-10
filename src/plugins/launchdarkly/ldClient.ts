import { initialize } from "launchdarkly-js-client-sdk";

let ldClient;

if (typeof window !== "undefined" && window.__LD_CLIENT_ID__) {
  const clientId = window.__LD_CLIENT_ID__;
  ldClient = initialize(clientId, {
    key: "anonymous-user",
  });

  ldClient.on("ready", () => {
    console.log("LaunchDarkly client ready");
  });  
} else {
  console.log("LaunchDarkly client not loaded - window is not defined");
}

export default ldClient;