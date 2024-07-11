import React, { useState, useMemo } from "react";
import useUser from "@site/src/hooks/useUser";
import TerminalViewBox from "./TerminalViewBox";
import ControlPanel from "./ControlPanel";
import { INFO_MSG } from "./AlertMsg";
import MessageBox from "@site/src/components/MessageBox/MessageBox";
import { INIT_REQ_SET } from "@site/src/lib/constants";
import Heading from '@theme/Heading'

const CodeTerminal = () => {
  const { user, keys, loading: keysLoading } = useUser()
  const [msgParams, setMsgParams] = useState({ ...INFO_MSG.EMPTY_MSG })
  const [curReqSettings, setCurReqSettings] = useState({ ...INIT_REQ_SET })
  const [responseReg, setResponseReg] = useState(undefined)

  const changeSelectHandler = (value, param) => {
    setCurReqSettings((prev) => {
      const init = { ...prev }
      init[param] = value
      return init
    })
  }

  const keysOptions = useMemo(() => {
    if (keys.length > 0) {
      changeSelectHandler(
        {
          label: keys[0].name,
          value: keys[0].id,
          private: keys[0].private || "",
        },
        "apiKey"
      )
      return keys.map((item) => ({
        label: item.name,
        value: item.id,
        private: item?.private || "",
      }))
    }
    return []
  }, [keys])

  const isNoApiKeys = useMemo(() => {
    const isNoKeys = user && keys.length === 0 && !keysLoading
    if (isNoKeys) {
      setMsgParams({ ...INFO_MSG.NO_KEYS })
    }
    if (user && !isNoKeys) {
      setMsgParams({ ...INFO_MSG.REQ_READY })
    }
    return isNoKeys
  }, [user, keys, keysLoading])

  const endpointUrl = useMemo(() => {
    const { netName, netType, netMethod, apiKey } = curReqSettings
    let url = netType.value
    let params = netMethod.params.mainnet
    if (netName.complexEndpoint) {
      url = `${netName.value}-${netType.value}`
    }
    if (netMethod.params[netType.value]) {
      params = netMethod.params[netType.value]
    }
    if (netName.isExpansion) {
      return {
        url: `${netName.value}.${netType.urlType}/v3/${apiKey.value}/networks/${netType.value}/${netMethod.value}`,
        params: [],
        isExpansionNetwork: true,
      }
    }
    return {
      url: `${url}.${netType.urlType}`,
      params: params,
      isExpansionNetwork: false,
    }
  }, [curReqSettings])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setMsgParams({ ...INFO_MSG.EMPTY_MSG })
    const { apiKey, netMethod } = curReqSettings
    let URL = `https://${endpointUrl.url}/v3/${apiKey.value}`
    let params = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: netMethod.value,
        params: endpointUrl.params,
        id: 1,
      }),
    }
    if (endpointUrl.isExpansionNetwork) {
      URL = `https://${endpointUrl.url}`
      params = {
        method: "GET",
      }
    }
    try {
      const res = await fetch(URL, params)
      if (res.ok) {
        const response = await res.json()
        setMsgParams({ ...INFO_MSG.REQ_SUCCESS })
        setResponseReg(JSON.stringify(response, null, 2))
      } else {
        res.status === 401
          ? setMsgParams({ ...INFO_MSG.NO_ACCESS })
          : setMsgParams({ ...INFO_MSG.REQ_ERROR })
        setResponseReg(undefined)
      }
    } catch {
      setMsgParams({ ...INFO_MSG.REQ_ERROR })
      setResponseReg(undefined)
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className="terminal-form">
        <MessageBox
          opened={msgParams.opened}
          type={msgParams.type}
          title={msgParams.title}
          description={msgParams.description}
        />
        <Heading as="h3" className="code-terminal-heading">
          Connect to a network
        </Heading>
        {keysOptions.length > 0 && (
          <ControlPanel
            keysOptions={keysOptions}
            initValues={curReqSettings}
            onChange={changeSelectHandler}
          />
        )}
        <TerminalViewBox
          url={endpointUrl.url}
          id={curReqSettings.apiKey.value}
          method={curReqSettings.netMethod.value}
          params={endpointUrl.params}
          logged={!!user}
          hideFooter={isNoApiKeys || keysLoading}
          response={responseReg}
          isExpansionNetwork={endpointUrl.isExpansionNetwork}
        />
      </form>
    </>
  )
}

export default CodeTerminal
