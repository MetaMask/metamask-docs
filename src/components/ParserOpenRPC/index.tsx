import React, { createContext, useContext, useMemo, useState, useEffect } from 'react'
import { usePluginData } from '@docusaurus/useGlobalData'
import { ResponseItem, NETWORK_NAMES } from '@site/src/plugins/plugin-json-rpc'
import DetailsBox from '@site/src/components/ParserOpenRPC/DetailsBox'
import InteractiveBox from '@site/src/components/ParserOpenRPC/InteractiveBox'
import RequestBox from '@site/src/components/ParserOpenRPC/RequestBox'
import ErrorsBox from '@site/src/components/ParserOpenRPC/ErrorsBox'
import { ModalDrawer } from '@site/src/components/ParserOpenRPC/ModalDrawer'
import global from './global.module.scss'
import modalDrawerStyles from './ModalDrawer/styles.module.scss'
import clsx from 'clsx'
import { useColorMode } from '@docusaurus/theme-common'
import { trackClickForSegment, trackInputChangeForSegment } from '@site/src/lib/segmentAnalytics'
import { AuthBox } from '@site/src/components/ParserOpenRPC/AuthBox'
import { MetamaskProviderContext } from '@site/src/theme/Root'
import ProjectsBox from '@site/src/components/ParserOpenRPC/ProjectsBox'
import { LINEA_REQUEST_URL } from '@site/src/lib/constants'
import useIsBrowser from '@docusaurus/useIsBrowser'
import { encrypt } from '@metamask/eth-sig-util'
import { hexlify } from 'ethers'

// Import local specs
import localLineaSpec from '@site/src/specs/linea/openrpc.json'

interface ParserProps {
  network: NETWORK_NAMES
  method?: string
  extraContent?: JSX.Element
  src?: 'local' | 'remote'
}

interface ParserOpenRPCContextProps {
  drawerLabel?: string
  setIsDrawerContentFixed?: (isFixed: boolean) => void
  setDrawerLabel?: (label: string) => void
  isComplexTypeView: boolean
  setIsComplexTypeView: (isComplexTypeView: boolean) => void
}

export const ParserOpenRPCContext = createContext<ParserOpenRPCContextProps | null>(null)

export default function ParserOpenRPC({
  network,
  method,
  extraContent,
  src = 'remote',
}: ParserProps) {
  const isBrowser = useIsBrowser()
  if (!isBrowser) {
    return null
  }
  if (!method || !network) return null
  const [isModalOpen, setModalOpen] = useState(false)
  const [reqResult, setReqResult] = useState(undefined)
  const [paramsData, setParamsData] = useState([])
  const [isDrawerContentFixed, setIsDrawerContentFixed] = useState(false)
  const [drawerLabel, setDrawerLabel] = useState(null)
  const [isComplexTypeView, setIsComplexTypeView] = useState(false)
  const { metaMaskAccount, metaMaskProvider, userAPIKey, userEncPublicKey, setUserEncPublicKey } =
    useContext(MetamaskProviderContext)
  const [defExampleResponse, setDefExampleResponse] = useState(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const { colorMode } = useColorMode()
  const trackAnalyticsForRequest = response => {
    trackClickForSegment({
      eventName: 'Request Sent',
      clickType: 'Request Sent',
      userExperience: 'B',
      // @ts-ignore
      ...(response?.code && { responseStatus: response.code }),
      responseMsg: null,
      timestamp: Date.now(),
    })
  }
  const openModal = () => {
    setModalOpen(true)
    trackClickForSegment({
      eventName: 'Customize Request',
      clickType: 'Customize Request',
      userExperience: 'B',
      responseStatus: null,
      responseMsg: null,
      timestamp: Date.now(),
    })
  }
  const closeModal = () => setModalOpen(false)

  const { netData } = usePluginData('plugin-json-rpc') as {
    netData?: ResponseItem[]
  }

  // Use local data when src="local", otherwise use plugin data
  const currentNetwork =
    src === 'local'
      ? {
          name: network,
          data: network === NETWORK_NAMES.linea ? localLineaSpec : null,
          error: network !== NETWORK_NAMES.linea, // Error if local spec not available for this network
        }
      : netData?.find(net => net.name === network)

  if (!currentNetwork || currentNetwork.error) return null

  const currentMethodData = useMemo(() => {
    const findReferencedItem = (items, refPath, componentType) => {
      return (
        items
          ?.map(item => {
            if (item?.name || (item?.code && item?.message)) return item
            if (item?.$ref) {
              const ref = item.$ref.replace(refPath, '')
              return currentNetwork.data.components[componentType][ref]
            }
            return null
          })
          .filter(Boolean) || []
      )
    }

    const currentMethod = currentNetwork.data.methods?.find(met => met.name === method)
    if (!currentMethod) return null

    const errors = findReferencedItem(currentMethod.errors, '#/components/errors/', 'errors')
    const tags = findReferencedItem(currentMethod.tags, '#/components/tags/', 'tags')

    if (!!userEncPublicKey && method === 'eth_decrypt') {
      const encDefValue = hexlify(
        Buffer.from(
          JSON.stringify(
            encrypt({
              publicKey: userEncPublicKey,
              data: 'Test message',
              version: 'x25519-xsalsa20-poly1305',
            })
          )
        )
      )
      currentMethod?.examples[0]?.params?.forEach(item => {
        if (item.name === 'EncryptedMessage' && !!encDefValue) {
          item.value = encDefValue
        }
      })
    }

    return {
      description: currentMethod.description || null,
      summary: currentMethod.summary || null,
      params: currentMethod.params || [],
      result: currentMethod.result || null,
      components: currentNetwork.data.components || null,
      examples: currentMethod?.examples,
      paramStructure: currentMethod?.paramStructure || null,
      errors,
      tags,
      servers: currentNetwork.data?.servers?.[0]?.url || null,
    }
  }, [currentNetwork, method, src])

  if (currentMethodData === null) return null

  const isMetamaskNetwork = network === NETWORK_NAMES.metamask

  useEffect(() => {
    const example = currentMethodData?.examples?.[0]
    if (example?.result) {
      if (example.id && example.jsonrpc) {
        setDefExampleResponse({
          id: example.id,
          jsonrpc: example.jsonrpc,
          result: example.result.value,
        })
      } else {
        setDefExampleResponse(example.result.value)
      }
    } else {
      setDefExampleResponse(undefined)
    }
  }, [currentMethodData])

  const resetResponseHandle = () => {
    setReqResult(undefined)
  }

  const onParamsChangeHandle = data => {
    trackInputChangeForSegment({
      eventName: 'Request Configuration Started',
      userExperience: 'B',
      timestamp: Date.now(),
    })

    if (typeof data !== 'object' || data === null || Object.keys(data).length === 0) {
      setParamsData([])
      return
    }

    if (typeof data === 'object' && currentMethodData.paramStructure === 'by-name') {
      setParamsData({ ...data })
      return
    }

    setParamsData(Object.values(data))
  }

  const handleMetaMaskRequest = async () => {
    if (!metaMaskProvider) return
    setIsLoading(true)
    try {
      const response = await metaMaskProvider.request({
        method,
        params: paramsData,
      })
      setReqResult(response)
      trackAnalyticsForRequest(response)
      if (method === 'eth_getEncryptionPublicKey' && response) {
        setUserEncPublicKey(response as string)
      }
    } catch (e) {
      setReqResult(e)
    } finally {
      setIsLoading(false)
    }
  }

  const INIT_URL =
    currentMethodData.servers !== null ? currentMethodData.servers : `${LINEA_REQUEST_URL}/v3/`

  const handleServiceRequest = async () => {
    const URL = `${INIT_URL}${userAPIKey}`
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params: paramsData,
        id: 1,
      }),
    }
    setIsLoading(true)
    try {
      const res = await fetch(URL, params)
      if (res.ok) {
        const response = await res.json()
        setReqResult(response)
        trackAnalyticsForRequest(response)
      } else {
        const errorText = await res.text()
        const errorState = JSON.parse(errorText)
        setReqResult(`Request failed. Status: ${res.status}. ${errorState}`)
      }
    } catch (e) {
      setReqResult(`${e}`)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitRequestHandle = async () => {
    if (isMetamaskNetwork) {
      await handleMetaMaskRequest()
    } else {
      await handleServiceRequest()
    }
  }

  const closeComplexTypeView = () => {
    setIsComplexTypeView(false)
    setIsDrawerContentFixed(false)
    setDrawerLabel(null)
  }

  const onModalClose = () => {
    closeModal()
    closeComplexTypeView()
  }

  return (
    <ParserOpenRPCContext.Provider
      value={{
        drawerLabel,
        setIsDrawerContentFixed,
        setDrawerLabel,
        isComplexTypeView,
        setIsComplexTypeView,
      }}>
      <div className={global.rowWrap}>
        <div className={global.colLeft}>
          <div className={global.colContentWrap} id="centerContent">
            <DetailsBox
              method={method}
              description={currentMethodData.description}
              summary={currentMethodData.summary}
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
                    onClick={closeComplexTypeView}>
                    <img
                      src={
                        colorMode === 'light'
                          ? '/img/icons/chevron-left-dark-icon.svg'
                          : '/img/icons/chevron-left-light-icon.svg'
                      }
                    />
                  </button>
                  Editing Param
                </span>
              ) : (
                'Customize request'
              )
            }
            isOpen={isModalOpen}
            onClose={onModalClose}
            isContentFixed={isDrawerContentFixed}
            headerLabel={drawerLabel ? drawerLabel : null}>
            <InteractiveBox
              params={currentMethodData.params}
              components={currentMethodData.components.schemas}
              examples={currentMethodData.examples}
              onParamChange={onParamsChangeHandle}
              drawerLabel={drawerLabel}
              closeComplexTypeView={closeComplexTypeView}
              isOpen={isModalOpen}
              onModalClose={onModalClose}
            />
          </ModalDrawer>
        </div>
        <div className={global.colRight}>
          <div className={global.stickyCol}>
            {!isMetamaskNetwork && <ProjectsBox />}
            {isMetamaskNetwork && !metaMaskAccount && <AuthBox theme={colorMode} />}
            <RequestBox
              colorMode={colorMode}
              isMetamaskInstalled={!!metaMaskAccount}
              method={method}
              params={currentMethodData.params}
              paramsData={paramsData}
              response={reqResult}
              openModal={openModal}
              submitRequest={onSubmitRequestHandle}
              isMetamaskNetwork={isMetamaskNetwork}
              defExampleResponse={defExampleResponse}
              resetResponseHandle={resetResponseHandle}
              requestURL={INIT_URL}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </ParserOpenRPCContext.Provider>
  )
}
