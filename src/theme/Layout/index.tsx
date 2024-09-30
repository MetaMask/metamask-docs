import React, { useMemo } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import { useLocation } from "@docusaurus/router";
import Layout from "@theme-original/Layout";
import ParserOpenRPC from "@site/src/components/ParserOpenRPC";
import { ResponseItem, NETWORK_NAMES } from "@site/src/plugins/plugin-json-rpc";
import styles from "./styles.module.css";

const REF_PATH = "/wallet/reference/";

export default function LayoutWrapper({ children }) {
  const location = useLocation();
  const { netData } = usePluginData("plugin-json-rpc") as {
    netData?: ResponseItem[];
  };

  const metamaskNetwork = netData?.find(
    (net) => net.name === NETWORK_NAMES.metamask
  );
  const metamaskMethods =
    metamaskNetwork?.data?.methods?.map((item) => item.name) || [];

  const referencePageName = useMemo(() => {
    const currentPath = location.pathname;
    if (currentPath.includes(REF_PATH) && metamaskMethods.length > 0) {
      const methodPath = currentPath.replace(REF_PATH, "").replace("/", "");
      const page = metamaskMethods.find(
        (name) => name.toLowerCase() === methodPath
      );
      return page;
    }
    return false;
  }, [location.pathname, metamaskMethods]);

  return (
    <>
      {referencePageName ? (
        <Layout>
          <div className={styles.pageWrapper}>
            {children?.props?.children[0]?.type === "aside" && (
              <>{children.props.children[0]}</>
            )}
            <div className={styles.mainContainer}>
              <div className={styles.contentWrapper}>
                <ParserOpenRPC
                  network={NETWORK_NAMES.metamask}
                  method={referencePageName}
                />
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <Layout>{children}</Layout>
      )}
    </>
  );
}
