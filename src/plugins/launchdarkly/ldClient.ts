import { initialize } from "launchdarkly-js-client-sdk";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import siteConfig from "@generated/docusaurus.config";
import Cookies from "js-cookie";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  const { LD_CLIENT_ID } = siteConfig.customFields;
  const COOKIE_NAME = "feature_preview";
  const feature_preview = Cookies.get(COOKIE_NAME);

  const context = {
    kind: "user",
    anonymous: true,
    key: "ld-anonymous-user-key",
    ...(feature_preview && { feature_preview }),
  };

  const ldClient = initialize(LD_CLIENT_ID as string, context, {
    allAttributesPrivate: true,
    bootstrap: "localStorage",
  });

  ldClient.on("ready", () => {
    console.log("LaunchDarkly client ready");
  });

  return ldClient;
})();
