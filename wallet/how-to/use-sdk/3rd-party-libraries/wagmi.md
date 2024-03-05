---
description: Integrate MetaMask SDK with Wagmi in your JavaScript dapp.
sidebar_position: 2
sidebar_label: Wagmi
tags:
  - JavaScript SDK
---

# Use Wagmi with MetaMask SDK

[Wagmi](https://wagmi.sh/) is a powerful and efficient React Hooks library designed to streamline
dapp development by simplifying Ethereum interactions.

You can integrate [MetaMask SDK](../../../concepts/sdk/index.md) into your dapp alongside Wagmi,
using the MetaMask connector with Wagmi, to enable your users to seamlessly and securely connect to
the MetaMask browser extension and MetaMask Mobile.

## Prerequisites

- Ensure you have a basic understanding of Ethereum smart contracts and React Hooks.
- Set up a project with [Wagmi](https://wagmi.sh/react/getting-started).
- Create an Infura API key and allowlist to [make read-only requests](../../make-read-only-requests.md).

## Steps

### 1. Configure Wagmi with the MetaMask connector

Configure Wagmi to include MetaMask as a connector and specify the Ethereum chains your dapp will support.
For example:

```javascript
import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        metaMask({
            dappMetadata: {
                name: "Example Wagmi dapp",
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

When configuring the connector, make sure to configure the proper
[SDK options](../../../reference/sdk-js-options.md).

```javascript
connectors: [
    metaMask({
        dappMetadata: {
            name: "Example Wagmi dapp",
        },
        infuraAPIKey: "YOUR-API-KEY",
        // Other options
    }),
],
```

#### Dapp metadata

Specify the [`dappMetadata`](../../../reference/sdk-js-options.md#dappmetadata) option to help
identify your dapp within the MetaMask ecosystem.
This option is required when configuring the MetaMask connector with Wagmi.

#### Infura API key

We recommend specifying the [`infuraAPIKey`](../../../reference/sdk-js-options.md#infuraapikey)
option to [make read-only requests](../../make-read-only-requests.md) using the Infura API.
Read more about the [benefits of using the Infura API with Wagmi](#benefits-of-using-the-infura-api-with-wagmi).

#### Universal links

We recommend using universal links instead of deeplinks to avoid issues on iOS.
Thus, do not enable the [`useDeeplink`](../../../reference/sdk-js-options.md#usedeeplink) option.
Using universal links ensures a smoother transition for users accessing your dapp from mobile
devices, providing a better user experience compared to traditional deeplinking methods.

### 3. Implement contract interaction using `usePrepareContractWrite`

Due to a known issue in Safari where a 500ms timeout can interrupt smart contract interactions, we
recommend using the [`usePrepareContractWrite`](https://1.x.wagmi.sh/react/prepare-hooks/usePrepareContractWrite)
hook from Wagmi.
This approach ensures smooth transactions by preparing the contract write operation ahead of the
actual execution.

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

## Benefits of using the Infura API with Wagmi

Wagmi is not optimized for mobile environments.
This limitation becomes evident when making read-only requests, which are queries that fetch data
from the blockchain without making a transaction.
Since mobile dapps might not maintain a continuous connection to MetaMask, these read-only requests
can fail, leading to a suboptimal user experience.

These are some errors that might occur in mobile environments:

![Wagmi errors](../../../assets/wagmi-errors.png)

To overcome this limitation in mobile dapps that rely on Wagmi, use the Infura API to make read-only
requests.
You can do this by [configuring the SDK with an Infura API key](#2-configure-the-sdk).
This approach offloads the read operations to Infura's nodes, reducing the load on your own
infrastructure and ensuring high availability and reliability, independent of the user's wallet connection.

By using the Infura API, you can ensure:

- **Uninterrupted access:** Continuous network access for read-only requests, regardless of MetaMask's state.

- **Enhanced stability:** Stabilized dapp functionality by relying on Infura's robust infrastructure
  rather than the mobile environment's variable connectivity and background processing constraints.

In summary, using the Infura API compensates for Wagmi's lack of mobile optimization by providing a
stable network backend for read-only operations.
