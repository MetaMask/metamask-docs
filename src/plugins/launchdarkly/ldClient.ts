import { initialize } from "launchdarkly-js-client-sdk";

let ldClient;

if (typeof window !== "undefined") {
  const clientId = window.__LD_CLIENT_ID__;
  console.log(`client, ${clientId}`);
  console.log(`process, ${process.env.LD_CLIENT_ID}`);
  ldClient = initialize("6449dfe32c088a1338d69a96", {
    key: "anonymous-user",
  });

  ldClient.on("ready", () => {
    console.log("LaunchDarkly client ready");
  });  
} else {
  console.log("LaunchDarkly client not loaded - window is not defined");
}

export default ldClient;