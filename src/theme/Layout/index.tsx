import React, { useState, useEffect, useMemo } from "react";
import BrowserOnly from '@docusaurus/BrowserOnly';
import { usePluginData } from "@docusaurus/useGlobalData";
import ldClient from "launchdarkly";
import { useLocation } from "@docusaurus/router";
import Layout from "@theme-original/Layout";
import ParserOpenRPC from "@site/src/components/ParserOpenRPC";
import { ResponseItem, NETWORK_NAMES } from "@site/src/plugins/plugin-json-rpc";
import { trackPageViewForSegment } from "@site/src/lib/segmentAnalytics";
import styles from "./styles.module.css";

const REF_FF = "mm-new-reference-enabled";
const REF_PATH = "/wallet/reference/";
const EXEPT_METHODS = [
  "wallet_requestPermissions",
  "wallet_revokePermissions",
  "eth_signTypedData_v4"
];

export default function LayoutWrapper({ children }) {
  const location = useLocation();
  const { netData } = usePluginData("plugin-json-rpc") as { netData?: ResponseItem[] };
  const [ldReady, setLdReady] = useState(false);
  const [newReferenceEnabled, setNewReferenceEnabled] = useState(false);

  const metamaskNetwork = netData?.find(net => net.name === NETWORK_NAMES.metamask);
  const metamaskMethods = metamaskNetwork?.data?.methods?.map((item) => item.name) || [];

  const referencePageName = useMemo(() => {
    const currentPath = location.pathname;
    if (currentPath.includes(REF_PATH) && metamaskMethods.length > 0) {
      const methodPath = currentPath.replace(REF_PATH, "").replace("/", "");
      const page = metamaskMethods.find(name => name.toLowerCase() === methodPath && !EXEPT_METHODS.includes(name));
      trackPageViewForSegment({
        name: "Reference page",
        path: location.pathname,
        userExperience: page ? "B" : "A"
      })
      return page;
    }
    return false;
  }, [location.pathname, metamaskMethods]);

  useEffect(() => {
    ldClient.waitUntilReady().then(() => {
      setNewReferenceEnabled(ldClient.variation(REF_FF, false));
      setLdReady(true);
    });
    const handleChange = (current) => {
      setNewReferenceEnabled(current);
    };
    ldClient.on(`change:${REF_FF}`, handleChange);
    return () => {
      ldClient.off(`change:${REF_FF}`, handleChange);
    };
  }, []);

  return (
    <BrowserOnly>
      {
        () => {
          return (
            <>
              {newReferenceEnabled && ldReady && referencePageName ? (
                <Layout>
                  <div className={styles.pageWrapper}>
                    {children?.props?.children[0]?.type === "aside" && (
                      <>{children.props.children[0]}</>
                    )}
                    <div className={styles.mainContainer}>
                      <div className={styles.contentWrapper}>
                        <ParserOpenRPC network={NETWORK_NAMES.metamask} method={referencePageName} />
                      </div>
                    </div>
                  </div>
                </Layout>
              ) : (
                <Layout>{children}</Layout>
              )}
            </>
          )
        }
      }
    </BrowserOnly>
  );
}
