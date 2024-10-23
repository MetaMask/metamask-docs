---
description: Integrate MetaMask SDK with Wagmi in your JavaScript dapp.
sidebar_position: 1
sidebar_label: Wagmi
tags:
  - JavaScript SDK
---

# Connect to MetaMask using Wagmi

[Wagmi](https://wagmi.sh/) is a powerful and efficient React Hooks library designed to streamline
dapp development by simplifying Ethereum interactions.

You can integrate MetaMask SDK into your dapp alongside Wagmi,
using the MetaMask connector with Wagmi, to enable your users to seamlessly and securely connect to
the MetaMask browser extension and MetaMask Mobile.

## Prerequisites

- Ensure you have a basic understanding of Ethereum smart contracts and React Hooks.
- Set up a project with [Wagmi](https://wagmi.sh/react/getting-started).
- Create an Infura API key and allowlist to [make read-only requests](../../how-to/make-read-only-requests.md).

## Steps

### 1. Configure MetaMask SDK

In your Wagmi project, configure MetaMask SDK with the proper [SDK options](../../reference/sdk-js-options.md).
Specify [`dappMetadata`](../../reference/sdk-js-options.md#dappmetadata), including the `name` and
`url`, to help identify your dapp within the MetaMask ecosystem.
This is required when configuring the MetaMask connector with Wagmi.

```javascript
const MetaMaskOptions = {
  dappMetadata: {
    name: "Example Wagmi dapp",
    url: window.location.href,
  },
  // Other options.
}
```

### 2. Configure Wagmi with the MetaMask connector

Configure Wagmi to include MetaMask as a connector and specify the Ethereum chains your dapp will support.
Use the `MetaMaskOptions` you created in the previous step when adding the `metaMask` connector.
For example:

```javascript
import { createConfig, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { metaMask } from "wagmi/connectors"

const MetaMaskOptions = {
  dappMetadata: {
    name: "Example Wagmi dapp",
    url: window.location.href,
  },
  // Other options.
}

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask(MetaMaskOptions),
    // Other connectors
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```
