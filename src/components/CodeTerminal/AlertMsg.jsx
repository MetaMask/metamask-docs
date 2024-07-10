import React from "react"
import { MSG_TYPES, API_URL } from "@site/src/lib/constants"
import Link from "@docusaurus/Link"

export const INFO_MSG = {
  EMPTY_MSG: {
    opened: false,
    type: MSG_TYPES.INFO,
    title: "",
    description: "",
  },
  REQ_ERROR: {
    opened: true,
    type: MSG_TYPES.ERROR,
    title: "Request failed",
    description: (
      <>
        Please try again. If the problem persists contact our{" "}
        <Link to="https://support.infura.io/hc/en-us">support team</Link>
      </>
    ),
  },
  REQ_SUCCESS: {
    opened: true,
    type: MSG_TYPES.SUCCESS,
    title: "Request sent!",
    description: (
      <>
        Your request has been sent to the network endpoint you selected which
        returned a response with the requested information. Let’s see how it
        performed in <Link to={`${API_URL}/dashboard/stats`}>stats</Link> or
        dive into{" "}
        <Link to="https://docs.infura.io/dashboard-stats">stats docs</Link>.
      </>
    ),
  },
  REQ_READY: {
    opened: true,
    type: MSG_TYPES.INFO,
    title: "Connect API key",
    description: (
      <>
        Select an API key, a network name, network type, and the method from the
        dropdowns below then click “Send Request” to send the request.
      </>
    ),
  },
  NO_KEYS: {
    opened: true,
    type: MSG_TYPES.INFO,
    title: "No API keys created",
    description: (
      <>
        You don’t have any API Keys yet.{" "}
        <Link to={`${API_URL}/dashboard`}>Create an API key</Link> to access
        your keys and send requests.
      </>
    ),
  },
  NO_ACCESS: {
    opened: true,
    type: MSG_TYPES.ERROR,
    title: "Access Denied",
    description: (
      <>
        The API key selected is not authorized for this specific product. To
        enable access, please add this product to your API key through the{" "}
        <Link to={`${API_URL}/dashboard`}>Infura Dashboard</Link>
      </>
    ),
  },
}
