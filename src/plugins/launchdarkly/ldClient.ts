import { initialize } from "launchdarkly-js-client-sdk";

const ldClient = initialize(process.env.LD_CLIENT_ID, {
  key: "anonymous-user",
});

if (typeof window !== "undefined") {
  ldClient.on("ready", () => {
    console.log("LaunchDarkly client ready");
  });  
} else {
  console.log("LaunchDarkly client not loaded - window is not defined");
}

export default ldClient;