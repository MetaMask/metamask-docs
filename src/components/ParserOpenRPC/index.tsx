import React, { useMemo, useState, useEffect } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import { ResponseItem, NETWORK_NAMES } from "@site/src/plugins/plugin-json-rpc";
import DetailsBox from "@site/src/components/ParserOpenRPC/DetailsBox";
import InteractiveBox from "@site/src/components/ParserOpenRPC/InteractiveBox";
import { AuthBox } from "@site/src/components/ParserOpenRPC/AuthBox";
import RequestBox from "@site/src/components/ParserOpenRPC/RequestBox";
import ErrorsBox from "@site/src/components/ParserOpenRPC/ErrorsBox";
import global from "./global.module.css";

interface ParserProps {
  network: NETWORK_NAMES;
  method?: string;
}

export default function ParserOpenRPC({ network, method }: ParserProps) {
  if (!method || !network) return null;
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);

  const { netData } = usePluginData("plugin-json-rpc") as { netData?: ResponseItem[] };
  const currentNetwork = netData.find(net => net.name === network);

  if (!currentNetwork && currentNetwork.error) return null;

  const currentMethodData = useMemo(() => {
    const currentMethod = currentNetwork.data.methods?.find((met: { name: string; }) => met.name === method);
    if (!currentMethod) return null;
    const preparedErrors = () => {
      if (!currentMethod.errors || currentMethod.errors.length === 0) return [];
      const updatedErrors = currentMethod.errors.map(item => {
        if (item?.code && item?.message) {
          return item;
        }
        if (item?.$ref) {
          const ref = item.$ref.replace("#/components/errors/", "");
          const refErrorItem = currentNetwork.data.components.errors[ref];
          if (refErrorItem) return refErrorItem;
        }
      });
      return updatedErrors.filter(Boolean);
    };
    return ({
      description: currentMethod.summary || currentMethod.description || null,
      params: currentMethod.params || [],
      result: currentMethod.result || null,
      components: currentNetwork.data.components || null,
      errors: preparedErrors(),
      examples: currentMethod?.examples,
    });
  }, [netData, network]);

  if (currentMethodData === null) return null;

  useEffect(() => {
    const installed = !!(window as any)?.ethereum;
    setMetamaskInstalled(installed);
  }, []);

  return (
    <div className="row">
      <div className="col col--7" style={{ borderRight: "1px solid #848C96" }}>
        <DetailsBox
          method={method}
          description={currentMethodData.description}
          params={currentMethodData.params}
          components={currentMethodData.components.schemas}
          result={currentMethodData.result}
        />
        <ErrorsBox errors={currentMethodData.errors} />
      </div>
      <div className="col col--5">
        <div className={global.stickyCol}>
          <AuthBox isMetamaskInstalled={metamaskInstalled} />
          <RequestBox
            isMetamaskInstalled={metamaskInstalled}
            method={method}
            params={[]}
            response={"0x"}
          />
          <InteractiveBox
            method={method}
            params={currentMethodData.params}
            components={currentMethodData.components.schemas}
            examples={currentMethodData.examples}
          />
        </div>
      </div>
    </div>
  );
}