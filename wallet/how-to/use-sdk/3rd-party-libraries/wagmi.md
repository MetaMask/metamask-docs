---
description: Integrate MetaMask SDK with Wagmi in your JavaScript dapp.
sidebar_position: 2
sidebar_label: Wagmi
tags:
  - JavaScript SDK
---

# Use Wagmi with MetaMask SDK

Wagmi is a powerful and efficient library designed to streamline the development of dapps by
simplifying Ethereum interactions.
Through the MetaMask SDK integration with Wagmi, developers can offer users a seamless and secure
way to integrate their MetaMask wallets with dapps, facilitating a wide range of blockchain operations.

This guide explains how to integrate MetaMask SDK into your dapp using Wagmi.

## Prerequisites

Before proceeding with the integration, ensure you have a basic understanding of Ethereum smart
contracts and React Hooks.
It's also crucial to start with a Wagmi-based project.
If you haven't set up a Wagmi project yet, follow the getting-started guide to create one:

[Getting Started with Wagmi](https://wagmi.sh/react/getting-started)

This guide will provide you with all the necessary steps to set up a new Wagmi project, from
installation to initial configuration, ensuring you have the right foundation to integrate MetaMask SDK.

## Steps

### 1. Configure Wagmi with the SDK connector

The first step in integrating MetaMask with your dapp is to configure Wagmi to use the MetaMask connector.
This involves setting up the Wagmi configuration to include MetaMask as a connector and specifying
the Ethereum chains your application will support.

```javascript
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "Your dapp name",
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
```

### 2. Configure the SDK

#### Dapp metadata

It is crucial to provide [`dappMetadata`](../../../reference/sdk-js-options.md#dappmetadata) when
configuring your connector, as it is now a mandatory requirement for integration.
This metadata helps in identifying your dapp within the MetaMask ecosystem.

#### Universal links

To avoid issues with deep links on iOS, use universal links in your dapp.
This ensures a smoother transition for users accessing your dapp from mobile devices, providing a
better user experience compared to traditional deep linking methods.

So we don't recommend setting the MetaMaskSDK
[`useDeeplink`](../../../reference/sdk-js-options.md#usedeeplink) option to `true`.

### 3. Implement contract interaction using `usePrepareContractWrite`

Due to a known issue in Safari where a 500ms timeout can interrupt smart contract interactions, it
is recommended to use the `usePrepareContractWrite` hook from Wagmi.
This approach ensures smooth transactions by preparing the contract write operation ahead of the actual execution.

```javascript
import { usePrepareContractWrite, useContractWrite } from "wagmi";

const { config } = usePrepareContractWrite({
  address: "0xContractAddress",
  abi: contractABI,
  functionName: "functionToCall",
  args: [arg1, arg2],
});

const { write } = useContractWrite(config);

write();
```

### 4. Use the Infura API for read-only calls

For read-only blockchain calls, it's best practice to use the Infura API.
This approach offloads the read operations to Infura's nodes, reducing the load on your own
infrastructure and ensuring high availability and reliability.

Wagmi is not optimized for mobile environments.
This limitation becomes evident when dealing with read-only calls, which are queries that fetch data
from the blockchain without making a transaction.
Since mobile apps may not maintain a continuous connection to MetaMask, these read-only calls can
fail, leading to a suboptimal user experience.

These are the errors that might occur after a while in mobile environments when using Wagmi in your
dapp without an Infura API key:

![Wagmi errors](../../../assets/wagmi-errors.png)

An Infura API key is crucial because it provides a direct and reliable connection to the Ethereum
network, independent of the user's wallet connection.
This is particularly beneficial for mobile apps that rely on Wagmi, which is not inherently designed
for mobile's variable connectivity and background processing constraints.

By including an Infura API key in the MetaMask SDK props, developers ensure:

- **Uninterrupted Access:** Continuous network access for read-only calls, regardless of MetaMask's state.

- **Enhanced Stability:** Stabilized app functionality by relying on Infura's robust infrastructure
  rather than mobile's fluctuating network conditions.

In essence, an Infura API key compensates for Wagmi's lack of mobile optimization by providing a
stable network backend for read-only operations.

Visit [Infura.io](https://www.infura.io/) to get an API key.
