import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'YOUR_PROJECT_ID'

// 2. Create a metadata object - optional
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://example.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks = [mainnet, arbitrum]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
})

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
description: Reference content for the Gas API.
sidebar_label: API reference
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Gas API reference

This section provides reference information for the various Gas REST APIs.
Use the APIs to:

- [Get EIP-1559 gas prices.](./gasprices-type2.md)
- [Get the base fee history (in Gwei).](./basefeehistory.md)
- [Get the base fee percentile (in Gwei).](./basefeepercentile.md)
- [Get the busy threshold for a network.](./busythreshold.md)

## Supported API request formats

You can call the Gas APIs in two ways:

- **Using the API key only** - Add your [API key](../../../../developer-tools/dashboard/get-started/create-api)
  as a path option.
- **Using the API key and API key secret** - Use basic authentication and specify the API key
  and [API key secret](../../../../developer-tools/dashboard/how-to/secure-an-api/api-key-secret/).

<Tabs>
  <TabItem value="API key only" label="Use an API key only" default>

```bash
curl -X "GET" "https://gas.api.infura.io/v3/<YOUR-API-KEY>/networks/1/suggestedGasFees"
```

  </TabItem>
  <TabItem value="API key and API key secret" label="Use an API key and API key secret" >

```bash
curl -X "GET" -u <YOUR-API-KEY>:<YOUR-API-KEY-SECRET> "https://gas.api.infura.io/networks/1/suggestedGasFees"
```

  </TabItem>
</Tabs>
