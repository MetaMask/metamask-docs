---
description: Configuration options reference for MetaMask Connect.
keywords: [SDK, configure, configuration, option, options, dapp]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# MetaMask Connect options

When you create a MetaMask Connect client, you can pass configuration options to control how your dapp identifies itself, which networks it supports, and how connections behave.
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
    'eip155:1': 'https://mainnet.infura.io/v3/YOUR_API_KEY',
    'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_API_KEY',
    'eip155:11155111': 'https://sepolia.infura.io/v3/YOUR_API_KEY',
  },
}
```

</TabItem>
<TabItem value="Example (Solana)">

```typescript
api: {
  supportedNetworks: {
    'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
    'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ': 'https://api.devnet.solana.com',
  },
}
```

</TabItem>
</Tabs>

A map of chain IDs to RPC URLs for all networks your dapp supports.
Chain IDs follow the [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) format — use the `eip155` namespace for EVM networks (for example, `eip155:1` for Ethereum Mainnet) and the `solana` namespace with the genesis hash for Solana networks.

:::caution
Use [Infura allowlists](/developer-tools/dashboard/how-to/secure-an-api/use-an-allowlist) to protect against other people submitting requests to your API key.
You can restrict interactions to specific addresses, origins, user agents, and request methods.
:::

## EVM client options

Additional options available for `createEVMClient`.

### Full example

```typescript
import { createEVMClient } from '@metamask/connect-evm';

const client = createEVMClient({
  dapp: {
    name: 'My EVM Dapp',
    url: 'https://mydapp.com',
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_API_KEY',
      'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_API_KEY',
    },
  },
});
```

## Solana client options

Additional options available for `createSolanaClient`.

### Full example

```typescript
import { createSolanaClient } from '@metamask/connect-solana';

const client = createSolanaClient({
  dapp: {
    name: 'My Solana Dapp',
    url: 'https://mydapp.com',
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
      'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ': 'https://api.devnet.solana.com',
    },
  },
});
```

## Multichain client options

Additional options available for `createMultichainClient`.

### Full example

```typescript
import { createMultichainClient } from '@metamask/connect-multichain';

const client = createMultichainClient({
  dapp: {
    name: 'My Multichain Dapp',
    url: 'https://mydapp.com',
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_API_KEY',
      'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_API_KEY',
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
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
