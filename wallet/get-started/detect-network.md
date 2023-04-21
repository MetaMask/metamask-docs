---
description: Detect a user's network and network changes.
---

# Detect a user's network

It's important to keep track of the user's network chain ID because all RPC requests are submitted
to the currently connected network.

Use the [`eth_chainId`](https://metamask.github.io/api-playground/api-documentation/#eth_chainId)
RPC method to detect the chain ID of the user's current network.
Listen to the [`chainChanged`](../reference/provider-api.md#chainchanged) provider event to
detect when the user changes networks.

In the [example project script](set-up-dev-environment.md#example), the following code detects a
user's network and when the user changes networks:

```javascript title="index.js"
const chainId = await window.ethereum.request({ method: 'eth_chainId' });

window.ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(chainId) {
  // We recommend reloading the page, unless you must do otherwise.
  window.location.reload();
}
```

## Chain IDs

These are the chain IDs of the Ethereum networks that MetaMask supports by default.
Consult [chainid.network](https://chainid.network) for more.

| Hex      | Decimal  | Network                                                                   |
|----------|----------|---------------------------------------------------------------------------|
| 0x1      | 1        | Ethereum main network (Mainnet)                                           |
| 0x5      | 5        | Goerli test network                                                       |
| 0xaa36a7 | 11155111 | Sepolia test network                                                      |
| 0xe704   | 59140    | [Linea Goerli test network](https://docs.linea.build/)                    |
| 0x539    | 1337     | Localhost test networks (including [Ganache](run-development-network.md)) |
