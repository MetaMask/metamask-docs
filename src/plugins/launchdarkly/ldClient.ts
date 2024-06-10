import * as LDClient from "launchdarkly-js-client-sdk";

let ldClient;

if (typeof window !== "undefined") {
  ldClient = LDClient.initialize(process.env.LD_CLIENT_ID, {
    key: "anonymous-user",
  });
  
  ldClient.on("ready", () => {
    console.log("LaunchDarkly client ready");
  });  
} else {
  console.log("LaunchDarkly client not loaded - window is not defined");
}

export default ldClient;