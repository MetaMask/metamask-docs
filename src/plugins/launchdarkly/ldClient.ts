import { initialize } from "launchdarkly-js-client-sdk";

let ldClient;

if (typeof window !== "undefined") {
  const clientId = window.__LD_CLIENT_ID__;
  console.log(`client, ${clientId}`);
  console.log(`process, ${process.env.LD_CLIENT_ID}`);
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