import LDClient from "launchdarkly-js-client-sdk";

const ldClient = LDClient.initialize(process.env.LD_CLIENT_ID, {
  key: "anonymous-user",
});

ldClient.on("ready", () => {
  console.log("LaunchDarkly client ready");
});

export default ldClient;