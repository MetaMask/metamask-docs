import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import siteConfig from "@generated/docusaurus.config";
import * as Sentry from "@sentry/browser";

const isProd = process.env.NODE_ENV === "production";

export default (function () {
  if (!ExecutionEnvironment.canUseDOM) {
    return null;
  }

  const { SENTRY_KEY } = siteConfig.customFields;

  Sentry.init({
    dsn: SENTRY_KEY as string,
    replaysOnErrorSampleRate: isProd ? 1.0 : 0,
    replaysSessionSampleRate: isProd ? 1.0 : 0,
    sampleRate: isProd ? 0.25 : 0,
    tracesSampleRate: 0,
    debug: !isProd,
  });

  Sentry.replayIntegration({
    maskAllText: false,
  });

  console.log("Sentry client ready");

  return Sentry;
})();
