import { initialize } from "launchdarkly-js-client-sdk";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import siteConfig from "@generated/docusaurus.config";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  const { LD_CLIENT_ID } = siteConfig.customFields;

  const getCookie = (name: string) => {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[]\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  const context = {
    kind: "user",
    anonymous: true,
    key: "ld-anonymous-user-key",
    feature_preview: getCookie("feature_preview"),
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
