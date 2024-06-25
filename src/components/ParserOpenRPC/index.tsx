import React, { useMemo, useState, useEffect } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import { ResponseItem, NETWORK_NAMES } from "@site/src/plugins/plugin-json-rpc";
import DetailsBox from "@site/src/components/ParserOpenRPC/DetailsBox";
import InteractiveBox from "@site/src/components/ParserOpenRPC/InteractiveBox";
import { AuthBox } from "@site/src/components/ParserOpenRPC/AuthBox";
import RequestBox from "@site/src/components/ParserOpenRPC/RequestBox";
import ErrorsBox from "@site/src/components/ParserOpenRPC/ErrorsBox";
import { ModalDrawer } from "@site/src/components/ParserOpenRPC/ModalDrawer";
import global from "./global.module.css";

interface ParserProps {
  network: NETWORK_NAMES;
  method?: string;
}

export default function ParserOpenRPC({ network, method }: ParserProps) {
  if (!method || !network) return null;
  const [metamaskInstalled, setMetamaskInstalled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [reqResult, setReqResult] = useState(null);
  const [paramsData, setParamsData] = useState([]);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { netData } = usePluginData("plugin-json-rpc") as { netData?: ResponseItem[] };
  const currentNetwork = netData.find(net => net.name === network);

  if (!currentNetwork && currentNetwork.error) return null;

  const currentMethodData = useMemo(() => {
    const findReferencedItem = (items, refPath, componentType) => {
      return items?.map(item => {
        if (item?.name || (item?.code && item?.message)) return item;
        if (item?.$ref) {
          const ref = item.$ref.replace(refPath, "");
          return currentNetwork.data.components[componentType][ref];
        }
        return null;
      }).filter(Boolean) || [];
    };

    const currentMethod = currentNetwork.data.methods?.find(met => met.name === method);
    if (!currentMethod) return null;

    const errors = findReferencedItem(currentMethod.errors, "#/components/errors/", "errors");
    const tags = findReferencedItem(currentMethod.tags, "#/components/tags/", "tags");

    return {
      description: currentMethod.summary || currentMethod.description || null,
      params: currentMethod.params || [],
      result: currentMethod.result || null,
      components: currentNetwork.data.components || null,
      examples: currentMethod?.examples,
      errors,
      tags,
    };
  }, [currentNetwork, method]);

  if (currentMethodData === null) return null;

  useEffect(() => {
    const installed = !!(window as any)?.ethereum;
    setMetamaskInstalled(installed);
  }, []);

  const onParamsChangeHandle = (data) => {
    if (typeof data !== 'object' || data === null || Object.keys(data).length === 0) {
      setParamsData([]);
    }
    setParamsData(Object.values(data));
  }

  const onSubmitRequestHandle = async () => {
    try {
      const response = await (window as any).ethereum.request({
        method: method,
        params: paramsData
      })
      setReqResult(response);
    } catch (e) {
      setReqResult(e);
    };
  };

  return (
    <div className={global.rowWrap}>
      <div className={global.colLeft}>
        <DetailsBox
          method={method}
          description={currentMethodData.description}
          params={currentMethodData.params}
          components={currentMethodData.components.schemas}
          result={currentMethodData.result}
          tags={currentMethodData.tags}
        />
        <ErrorsBox errors={currentMethodData.errors} />
        <ModalDrawer
          title="Customize request"
          isOpen={isModalOpen}
          onClose={closeModal}
        >
          <InteractiveBox
            params={currentMethodData.params}
            components={currentMethodData.components.schemas}
            examples={currentMethodData.examples}
            onParamChange={onParamsChangeHandle}
          />
        </ModalDrawer>
      </div>
      <div className={global.colRight}>
        <div className={global.stickyCol}>
          <AuthBox isMetamaskInstalled={metamaskInstalled} />
          <RequestBox
            isMetamaskInstalled={metamaskInstalled}
            method={method}
            params={currentMethodData.params}
            paramsData={paramsData}
            response={reqResult}
            openModal={openModal}
            submitRequest={onSubmitRequestHandle}
          />
        </div>
      </div>
    </div>
  );
}