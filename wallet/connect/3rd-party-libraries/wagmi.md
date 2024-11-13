---
description: Integrate MetaMask SDK with Wagmi in your JavaScript dapp.
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
- Create an Infura API key and allowlist to [make read-only requests](../../how-to/javascript/make-read-only-requests.md).

## Configure the MetaMask connector

In your Wagmi project, configure the MetaMask connector:

```javascript
import { metaMask } from "wagmi/connectors"

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask({
      infuraAPIKey: import.meta.env.VITE_INFURA_API_KEY,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    // You can also configure the transcripts to use INFURA_API_KEY directly into the Wagmi config
    // to share with other providers.
    // [mainnet.id]: http("https://mainnet.infura.io/v3/...")
    [sepolia.id]: http(),
  },
})
```

Make sure to configure the MetaMask connector with the proper [SDK options](../../reference/sdk-js-options.md).

To provide a better mobile user experience, specify the [`infuraAPIKey`](../../reference/sdk-js-options.md#infuraapikey)
option to [make read-only requests](../../how-to/javascript/make-read-only-requests.md) using the Infura API.
You can set your Infura API key in environment variables:

```env
VITE_INFURA_API_KEY=<YOUR-API-KEY>
```

## Benefits of using the Infura API with Wagmi

Read-only requests are blockchain requests that do not require user wallet interaction.
Mobile dapps can lose their continuous connection with MetaMask, causing read-only requests to fail. 
When the mobile wallet is disconnected, the dapp must deeplink into the wallet to "wake up" the connection.

Without setting the `infuraAPIKey`, the dapp might experience issues in mobile environments:

![Wagmi errors](../../assets/wagmi-errors.png)

To overcome this limitation in mobile dapps that rely on a continuous connection with MetaMask,
use the Infura API to make read-only requests.
This approach offloads the read operations to Infura's nodes, reducing the load on your own
infrastructure and ensuring high availability and reliability, independent of the user's wallet connection.

By using the Infura API, you can ensure:

- **Uninterrupted access** - Continuous network access for read-only requests, regardless of MetaMask's state.
- **Enhanced stability** - Stabilized dapp functionality by relying on Infura's robust infrastructure
  rather than the mobile environment's variable connectivity and background processing constraints.
