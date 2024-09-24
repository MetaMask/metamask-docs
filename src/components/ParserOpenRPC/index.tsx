import React, { createContext, useContext, useMemo, useState } from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import { useLocation } from "@docusaurus/router";
import { ResponseItem, NETWORK_NAMES } from "@site/src/plugins/plugin-json-rpc";
import DetailsBox from "@site/src/components/ParserOpenRPC/DetailsBox";
import InteractiveBox from "@site/src/components/ParserOpenRPC/InteractiveBox";
import RequestBox from "@site/src/components/ParserOpenRPC/RequestBox";
import ErrorsBox from "@site/src/components/ParserOpenRPC/ErrorsBox";
import { ModalDrawer } from "@site/src/components/ParserOpenRPC/ModalDrawer";
import global from "./global.module.css";
import modalDrawerStyles from "./ModalDrawer/styles.module.css";
import clsx from "clsx";
import { useColorMode } from "@docusaurus/theme-common";
import {
  trackClickForSegment,
  trackInputChangeForSegment,
} from "@site/src/lib/segmentAnalytics";
import { AuthBox } from "@site/src/components/ParserOpenRPC/AuthBox";
import { MetamaskProviderContext } from "@site/src/theme/Root";
import ProjectsBox from "@site/src/components/ParserOpenRPC/ProjectsBox";

interface ParserProps {
  network: NETWORK_NAMES;
  method?: string;
  extraContent?: JSX.Element;
}

interface ParserOpenRPCContextProps {
  drawerLabel?: string;
  setIsDrawerContentFixed?: (isFixed: boolean) => void;
  setDrawerLabel?: (label: string) => void;
  isComplexTypeView: boolean;
  setIsComplexTypeView: (isComplexTypeView: boolean) => void;
}

export const ParserOpenRPCContext =
  createContext<ParserOpenRPCContextProps | null>(null);

const REF_PATH = "/wallet/reference/new-reference";

export default function ParserOpenRPC({
  network,
  method,
  extraContent,
}: ParserProps) {
  if (!method || !network) return null;
  const location = useLocation();
  const { pathname } = location;
  const [isModalOpen, setModalOpen] = useState(false);
  const [reqResult, setReqResult] = useState(undefined);
  const [paramsData, setParamsData] = useState([]);
  const [isDrawerContentFixed, setIsDrawerContentFixed] = useState(false);
  const [drawerLabel, setDrawerLabel] = useState(null);
  const [isComplexTypeView, setIsComplexTypeView] = useState(false);
  const { metaMaskAccount, metaMaskProvider } =
    useContext(MetamaskProviderContext);
  const { colorMode } = useColorMode();
  const openModal = () => {
    setModalOpen(true);
    trackClickForSegment({
      eventName: "Customize Request",
      clickType: "Customize Request",
      userExperience: "B",
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    });
  };
  const closeModal = () => setModalOpen(false);

  const { netData } = usePluginData("plugin-json-rpc") as {
    netData?: ResponseItem[];
  };
  const currentNetwork = netData?.find((net) => net.name === network);

  if (!currentNetwork && currentNetwork.error) return null;

  const currentMethodData = useMemo(() => {
    const findReferencedItem = (items, refPath, componentType) => {
      return (
        items
          ?.map((item) => {
            if (item?.name || (item?.code && item?.message)) return item;
            if (item?.$ref) {
              const ref = item.$ref.replace(refPath, "");
              return currentNetwork.data.components[componentType][ref];
            }
            return null;
          })
          .filter(Boolean) || []
      );
    };

    const currentMethod = currentNetwork.data.methods?.find(
      (met) => met.name === method
    );
    if (!currentMethod) return null;

    const errors = findReferencedItem(
      currentMethod.errors,
      "#/components/errors/",
      "errors"
    );
    const tags = findReferencedItem(
      currentMethod.tags,
      "#/components/tags/",
      "tags"
    );

    return {
      description: currentMethod.description || currentMethod.summary || null,
      params: currentMethod.params || [],
      result: currentMethod.result || null,
      components: currentNetwork.data.components || null,
      examples: currentMethod?.examples,
      paramStructure: currentMethod?.paramStructure || null,
      errors,
      tags,
    };
  }, [currentNetwork, method]);

  if (currentMethodData === null) return null;

  const isMetamaskNetwork = network === NETWORK_NAMES.metamask;

  const onParamsChangeHandle = (data) => {
    trackInputChangeForSegment({
      eventName: "Request Configuration Started",
      userExperience: "B",
      timestamp: Date.now(),
    });

    if (
      typeof data !== "object" ||
      data === null ||
      Object.keys(data).length === 0
    ) {
      setParamsData([]);
      return;
    }

    if (
      typeof data === "object" &&
      currentMethodData.paramStructure === "by-name"
    ) {
      setParamsData({ ...data });
      return;
    }

    setParamsData(Object.values(data));
  };

  const onSubmitRequestHandle = async () => {
    if (!metaMaskProvider) return;
    try {
      const response = await metaMaskProvider?.request({
        method: method,
        params: paramsData,
      });
      setReqResult(response);
      trackClickForSegment({
        eventName: "Request Sent",
        clickType: "Request Sent",
        userExperience: "B",
        ...(response?.code && { responseStatus: response.code }),
        responseMsg: null,
        timestamp: Date.now(),
      });
    } catch (e) {
      setReqResult(e);
    }
  };

  const closeComplexTypeView = () => {
    setIsComplexTypeView(false);
    setIsDrawerContentFixed(false);
    setDrawerLabel(null);
  };

  const onModalClose = () => {
    closeModal();
    closeComplexTypeView();
  };

  return (
    <ParserOpenRPCContext.Provider
      value={{
        drawerLabel,
        setIsDrawerContentFixed,
        setDrawerLabel,
        isComplexTypeView,
        setIsComplexTypeView,
      }}
    >
      <div className={global.rowWrap}>
        <div className={global.colLeft}>
          <div className={global.colContentWrap}>
            <DetailsBox
              method={method}
              description={currentMethodData.description}
              params={currentMethodData.params}
              components={currentMethodData.components.schemas}
              result={currentMethodData.result}
              tags={currentMethodData.tags}
              extraContent={extraContent}
            />
            <ErrorsBox errors={currentMethodData.errors} />
          </div>
          <ModalDrawer
            title={
              isComplexTypeView && colorMode ? (
                <span className={modalDrawerStyles.modalTitleContainer}>
                  <button
                    className={clsx(
                      modalDrawerStyles.modalHeaderIcon,
                      modalDrawerStyles.modalHeaderIconBack
                    )}
                    onClick={closeComplexTypeView}
                  >
                    <img
                      src={
                        colorMode === "light"
                          ? "/img/icons/chevron-left-dark-icon.svg"
                          : "/img/icons/chevron-left-light-icon.svg"
                      }
                    />
                  </button>
                  Editing Param
                </span>
              ) : (
                "Customize request"
              )
            }
            isOpen={isModalOpen}
            onClose={onModalClose}
            isContentFixed={isDrawerContentFixed}
            headerLabel={drawerLabel ? drawerLabel : null}
          >
            <InteractiveBox
              params={currentMethodData.params}
              components={currentMethodData.components.schemas}
              examples={currentMethodData.examples}
              onParamChange={onParamsChangeHandle}
              drawerLabel={drawerLabel}
              closeComplexTypeView={closeComplexTypeView}
              isOpen={isModalOpen}
            />
          </ModalDrawer>
        </div>
        <div className={global.colRight}>
          <div className={global.stickyCol}>
            {pathname.startsWith(REF_PATH) && <ProjectsBox />}
            {!pathname.startsWith(REF_PATH) && !metaMaskAccount && <AuthBox isMetamaskNetwork={isMetamaskNetwork} />}
            <RequestBox
              isMetamaskInstalled={!!metaMaskAccount}
              method={method}
              params={currentMethodData.params}
              paramsData={paramsData}
              response={reqResult}
              openModal={openModal}
              submitRequest={onSubmitRequestHandle}
              isMetamaskNetwork={isMetamaskNetwork}
            />
          </div>
        </div>
      </div>
    </ParserOpenRPCContext.Provider>
  );
}
