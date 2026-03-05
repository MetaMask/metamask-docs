---
description: Configuration options reference for MetaMask Connect.
keywords: [SDK, configure, configuration, option, options, dapp]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# MetaMask Connect options

When you create a MetaMask Connect client, pass configuration options to control how your dapp identifies itself, which networks it supports, and how connections behave.
This page documents the available options for each client type.

## Common options

These options are available for all client types (`createEVMClient`, `createSolanaClient`, `createMultichainClient`).

### `dapp`

<Tabs>
<TabItem value="Syntax">

```typescript
dapp: {
  name: string,
  url: string,
  iconUrl?: string,
}
```

</TabItem>
<TabItem value="Example">

```typescript
dapp: {
  name: "My Dapp",
  url: "https://mydapp.com",
  iconUrl: "https://mydapp.com/icon.png",
}
```

</TabItem>
</Tabs>

Metadata about the dapp using MetaMask Connect.

- `name` — Name of the dapp (required)
- `url` — URL of the dapp (required)
- `iconUrl` — URL of the dapp's icon (optional)

:::tip
Setting `dapp` metadata creates a clear and trustworthy user experience when connecting your dapp to MetaMask.
MetaMask displays this metadata in the connection modal to help users identify and verify the connection request.
:::

### `api.supportedNetworks`

<Tabs>
<TabItem value="Syntax">

```typescript
api: {
  supportedNetworks: Record<string, string>
}
```

</TabItem>
<TabItem value="Example (EVM)">

```typescript
api: {
  supportedNetworks: {
    '0x1': 'https://mainnet.infura.io/v3/YOUR_API_KEY',
    '0x89': 'https://polygon-mainnet.infura.io/v3/YOUR_API_KEY',
    '0xaa36a7': 'https://sepolia.infura.io/v3/YOUR_API_KEY',
  },
}
```

</TabItem>
<TabItem value="Example (Solana)">

```typescript
api: {
  supportedNetworks: {
    mainnet: 'https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
    devnet: 'https://solana-devnet.infura.io/v3/YOUR_INFURA_API_KEY',
  },
}
```

</TabItem>
</Tabs>

A map of network identifiers to RPC URLs for all networks your dapp supports.
For the EVM client, use hex chain ID strings as keys (for example, `'0x1'` for Ethereum Mainnet, `'0x89'` for Polygon).
For the multichain client, use [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) chain IDs (for example, `'eip155:1'` for Ethereum Mainnet, `'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'` for Solana Mainnet).
For the Solana client, use friendly network names (`mainnet`, `devnet`, `testnet`) — the client converts these to CAIP-2 identifiers internally.

:::caution
Use [Infura allowlists](/developer-tools/dashboard/how-to/secure-an-api/use-an-allowlist) to protect against other people submitting requests to your API key.
Restrict interactions to specific addresses, origins, user agents, and request methods.
:::

### `getInfuraRpcUrls`

```typescript
import { getInfuraRpcUrls } from '@metamask/connect-evm';

const urls = getInfuraRpcUrls('YOUR_INFURA_API_KEY');
```

A helper function exported from both `@metamask/connect-evm` and `@metamask/connect-multichain`.
It returns a `Record<string, string>` of RPC URLs for all Infura-supported networks, keyed by chain
identifier.
Use it to populate `api.supportedNetworks` instead of manually constructing RPC URL maps:

```typescript
api: {
  supportedNetworks: {
    ...getInfuraRpcUrls('YOUR_INFURA_API_KEY'),
    '0x89': 'https://polygon-rpc.com', // custom RPC for Polygon
  },
}
```

## EVM client options

Additional options available for `createEVMClient`.

### `ui`

```typescript
ui: {
  headless?: boolean,
  preferExtension?: boolean,
  showInstallModal?: boolean,
}
```

Controls how the connection UI behaves:

- `headless` — When `true`, the SDK emits a `display_uri` event but does not render any modal.
  You must render the QR code yourself.
  The default is `false`.
- `preferExtension` — When `true` (default), the SDK uses the MetaMask browser extension via
  `postMessage` if installed.
  Set to `false` to force the MetaMask Wallet Protocol (MWP) QR/deeplink flow.
- `showInstallModal` — When `true` (default), the SDK shows a modal prompting the user to install
  MetaMask if it is not detected.

### `mobile`

```typescript
mobile: {
  preferredOpenLink?: (deeplink: string) => void,
  useDeeplink?: boolean,
}
```

Controls mobile-specific behavior:

- `preferredOpenLink` — A function called to open a deeplink to MetaMask Mobile.
  **Required for React Native** (use `(deeplink) => Linking.openURL(deeplink)`).
  Without it, deeplinks fail silently and the connection flow hangs.
- `useDeeplink` — When `true`, the SDK uses deeplinks for mobile connections.

### `eventHandlers`

```typescript
eventHandlers: {
  display_uri?: (uri: string) => void,
  wallet_sessionChanged?: (session: any) => void,
  connect?: (info: { chainId: string, accounts: string[] }) => void,
  disconnect?: (error: { code: number, message: string }) => void,
  accountsChanged?: (accounts: string[]) => void,
  chainChanged?: (chainId: string) => void,
}
```

Register SDK-level event handlers during client creation.
These are called in addition to any EIP-1193 provider event listeners:

- `display_uri` — Fires during the connecting phase with the URI for QR code rendering.
  Register this when using `ui.headless: true`.
- `wallet_sessionChanged` — Fires when a session is created, restored, or modified.
  Use this to detect session restoration on page reload.

You can also subscribe to these events after creation using `client.on('display_uri', ...)`.

### `debug`

```typescript
debug: boolean
```

Enables verbose console logging from the SDK internals.
The default is `false`.

### Full example

```typescript
import { createEVMClient, getInfuraRpcUrls } from '@metamask/connect-evm';

const client = await createEVMClient({
  dapp: {
    name: 'My EVM Dapp',
    url: 'https://mydapp.com',
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls('YOUR_API_KEY'),
      '0x89': 'https://polygon-rpc.com',
    },
  },
  ui: {
    headless: false,
    preferExtension: true,
  },
  mobile: {
    preferredOpenLink: (deeplink) => window.open(deeplink, '_blank'),
  },
  eventHandlers: {
    display_uri: (uri) => console.log('QR URI:', uri),
    wallet_sessionChanged: (session) => console.log('Session:', session),
  },
  debug: false,
});
```

## Wagmi connector

MetaMask Connect provides a wagmi connector at `@metamask/connect-evm/wagmi`.

```typescript
import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { metaMask } from '@metamask/connect-evm/wagmi';

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask({
      dapp: {
        name: 'My DApp',
        url: typeof window !== 'undefined' ? window.location.href : undefined,
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
```

The connector ID is `'metaMaskSDK'`.
Find it with `connectors.find(c => c.id === 'metaMaskSDK')`.
All standard wagmi hooks (`useConnect`, `useAccount`, `useDisconnect`, etc.) work unchanged.

The `metaMask()` function accepts the same `dapp`, `mobile`, and `debug` options as `createEVMClient`.

## Solana client options

Additional options available for `createSolanaClient`.

### `skipAutoRegister`

```typescript
skipAutoRegister: boolean
```

Skips automatically registering MetaMask with the [Wallet Standard](https://github.com/wallet-standard/wallet-standard) registry when the client is created.
The default is `false`, meaning MetaMask is registered automatically and appears as a wallet option in any dapp using `@solana/wallet-adapter`.

Set to `true` if you want to control when registration happens by calling `registerWallet()` manually.

### Full example

```typescript
import { createSolanaClient } from '@metamask/connect-solana';

const client = await createSolanaClient({
  dapp: {
    name: 'My Solana Dapp',
    url: 'https://mydapp.com',
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      mainnet: 'https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      devnet: 'https://solana-devnet.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
});
```

## Multichain client options

Additional options available for `createMultichainClient`.

:::note Singleton behavior
`createMultichainClient` returns a single shared instance per global context.
Calling it a second time with different options merges the new `api.supportedNetworks`, `ui.*`, `mobile.*`, `transport.extensionId`, and `debug` values into the existing instance rather than creating a new one.
The `dapp` value is never overwritten on subsequent calls.
:::

### Full example

```typescript
import { createMultichainClient } from '@metamask/connect-multichain';

const client = await createMultichainClient({
  dapp: {
    name: 'My Multichain Dapp',
    url: 'https://mydapp.com',
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_API_KEY',
      'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_API_KEY',
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
});
```

## Legacy options

The following options are from the previous MetaMask SDK and may still be supported for backwards compatibility.

<details>
<summary>Legacy options reference</summary>

### `checkInstallationImmediately`

```typescript
checkInstallationImmediately: boolean
```

Enables or disables immediately checking if MetaMask is installed on the user's browser.
The default is `false`.

### `checkInstallationOnAllCalls`

```typescript
checkInstallationOnAllCalls: boolean
```

Enables or disables checking if MetaMask is installed before each RPC request.
The default is `false`.

### `communicationServerUrl`

```typescript
communicationServerUrl: string
```

The URL of the communication server to use.
This option is mainly used for debugging and testing.

### `dappMetadata`

```typescript
dappMetadata: {
  name: string,
  url: string,
  iconUrl?: string,
}
```

Legacy equivalent of `dapp`. Metadata about the dapp using MetaMask Connect.

### `enableAnalytics`

```typescript
enableAnalytics: boolean
```

Enables or disables sending anonymous analytics to MetaMask.
The default is `true`.

### `extensionOnly`

```typescript
extensionOnly: boolean
```

Enables or disables automatically using the MetaMask browser extension if detected.
The default is `true`.

### `infuraAPIKey`

```typescript
infuraAPIKey: string
```

The [Infura API key](/developer-tools/dashboard/get-started/create-api) to use for RPC requests.

### `headless`

```typescript
headless: boolean
```

Enables or disables headless mode for custom modals.
The default is `false`.

### `openDeeplink`

```typescript
openDeeplink: (link: string) => void
```

A function called to open a deeplink to the MetaMask mobile app.

### `readonlyRPCMap`

```typescript
readonlyRPCMap: Record<string, string>
```

A map of chain IDs to RPC URLs for read-only requests.

### `shouldShimWeb3`

```typescript
shouldShimWeb3: boolean
```

Enables or disables shimming the `window.web3` object.
The default is `true`.

</details>
