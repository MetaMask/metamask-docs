---
description: Detect a user's network and network changes.
sidebar_position: 1
---

# Detect a user's network

It's important to keep track of the user's network chain ID because all RPC requests are submitted
to the currently connected network.

Use the [`eth_chainId`](/wallet/reference/json-rpc-methods/eth_chainId)
RPC method to detect the chain ID of the user's current network.
Listen to the [`chainChanged`](../../reference/provider-api.md#chainchanged) provider event to
detect when the user changes networks.

For example, the following code detects a user's network and when the user changes networks:

```javascript title="index.js"
const chainId = await provider // Or window.ethereum if you don't support EIP-6963.
  .request({ method: "eth_chainId" })

provider // Or window.ethereum if you don't support EIP-6963.
  .on("chainChanged", handleChainChanged)

function handleChainChanged(chainId) {
  // We recommend reloading the page, unless you must do otherwise.
  window.location.reload()
}
```
