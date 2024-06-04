import React, { useMemo } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import { ResponseItem, NETWORK_NAMES } from "@site/src/plugins/plugin-json-rpc";
import DetailsBox from "./DetailsBox";
import InteractiveBox from "./InteractiveBox";

interface ParserProps {
  network: NETWORK_NAMES;
  method?: string;
}

export default function ParserOpenRPC({ network, method }: ParserProps) {
  if (!method || !network) return null;

  const { netData } = usePluginData("plugin-json-rpc") as { netData?: ResponseItem[] };
  const currentNetwork = netData.find(net => net.name === network);

  if (!currentNetwork && currentNetwork.error) return null;

  const currentMethodData = useMemo(() => {
    const currentMethod = currentNetwork.data.methods?.find((met: { name: string; }) => met.name === method);
    if (!currentMethod) return null;
    return ({
      description: currentMethod.summary || null,
      params: currentMethod.params || [],
      result: currentMethod.result || null,
      components: currentNetwork.data.components || null,
    });
  }, [netData, network]);

  if (currentMethodData === null) return null;

  return (
    <div className="row">
      <div className="col col--7">
        <DetailsBox
          method={method}
          description={currentMethodData.description}
          params={currentMethodData.params}
          components={currentMethodData.components.schemas}
          result={currentMethodData.result}
        />
      </div>
      <div className="col col--5">
        <InteractiveBox
          method={method}
          params={currentMethodData.params}
          components={currentMethodData.components.schemas}
        />
      </div>
    </div>
  );
}