---
sidebar_label: Migrate from legacy SDK
description: Migrate from @metamask/sdk to @metamask/connect-evm with step-by-step package, API, and configuration changes.
keywords: [SDK, migrate, migration, upgrade, connect, MetaMask, dapp]
toc_max_heading_level: 2
---

# Migrate from the legacy SDK

This guide walks you through migrating from `@metamask/sdk` or `@metamask/sdk-react` to
`@metamask/connect-evm`.

MetaMask Connect EVM (`@metamask/connect-evm`) is a rewrite of the legacy MetaMask SDK(`@metamask/sdk`) built on the
[CAIP-25 Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) with
async initialization, a singleton client, and built-in support for EVM, [Solana](../../solana/index.md), and
[multichain](../../multichain/index.md) sessions.

## 1. Replace packages

Remove the old packages and install the new ones:

```bash
# Remove old
npm uninstall @metamask/sdk @metamask/sdk-react

# Install new (EVM only)
npm install @metamask/connect-evm
```

## 2. Update imports

**Old: (remove these imports)**

```ts
// remove-start
- import { MetaMaskSDK } from '@metamask/sdk'
- import { MetaMaskProvider, useSDK } from '@metamask/sdk-react'
// remove-end
```

**New (EVM):**

```typescript
// add-start
+ import { createEVMClient, getInfuraRpcUrls } from '@metamask/connect-evm'
// add-end
```

## 3. Update initialization

**Old:**

```typescript
// remove-start
- const sdk = new MetaMaskSDK({
-  dappMetadata: {
-    name: 'My DApp',
-    url: window.location.href,
-  },
-   infuraAPIKey: 'YOUR_INFURA_KEY',
-   readonlyRPCMap: {
-     '0x89': 'https://polygon-rpc.com',
-   },
-  headless: true,
-  extensionOnly: false,
-  openDeeplink: link => window.open(link, '_blank'),
- })
- await sdk.init()
// remove-end
```

**New:**

```typescript
// add-start
+ const client = await createEVMClient({
+  dapp: {
+    name: 'My DApp',
+    url: window.location.href,
+  },
+  api: {
+    supportedNetworks: {
+      ...getInfuraRpcUrls('YOUR_INFURA_KEY'),
+      '0x89': 'https://polygon-rpc.com',
+    },
+  },
+  ui: {
+    headless: true,
+    preferExtension: false,
+  },
+  mobile: {
+    preferredOpenLink: (link: string) => window.open(link, '_blank'),
+  },
+ })
// add-end
```

### Option mapping

Use the following table to map `MetaMaskSDK` configuration options to their equivalents in `createEVMClient`.
The table includes renamed options, options that moved into grouped objects (for example, `ui` and `mobile`), and
options that MetaMask Connect EVM no longer exposes.
| Old (`MetaMaskSDK`) | New (`createEVMClient`) | Notes |
| ------------------------ | --------------------------------------------------- | ---------------------------------------------------------- |
| `dappMetadata` | `dapp` | Same shape: `{ name, url, iconUrl }` |
| `dappMetadata.name` | `dapp.name` | Required |
| `dappMetadata.url` | `dapp.url` | Auto-set in browsers; required in Node.js and React Native |
| `infuraAPIKey` | `api.supportedNetworks` via `getInfuraRpcUrls(key)` | Helper generates RPC URLs for all Infura-supported chains |
| `readonlyRPCMap` | `api.supportedNetworks` | Merge into the same object |
| `headless` | `ui.headless` | Same behavior |
| `extensionOnly` | `ui.preferExtension` | `true` prefers extension (default); not the same as "only" |
| `openDeeplink` | `mobile.preferredOpenLink` | Same signature: `(deeplink: string) => void` |
| `useDeeplink` | `mobile.useDeeplink` | Same behavior |
| `timer` | Removed | No longer configurable |
| `enableAnalytics` | Removed | No longer available |
| `communicationServerUrl` | Removed | Managed internally |
| `storage` | Removed | Managed internally |

## 4. Update connection flow

In MetaMask Connect EVM, you request chain permissions during `connect()` and receive the connected accounts
and selected chain ID in a single response. This replaces the previous flow where you connected first
and then made a separate JSON-RPC request for `eth_chainId`.

**Old:**

```typescript
// remove-start
- const accounts = await sdk.connect()
- const chainId = await sdk.getProvider().request({ method: 'eth_chainId' })
// remove-end
```

**New:**

```typescript
// add-start
+ const { accounts, chainId } = await client.connect({
+   chainIds: ['0x1'],
+ })
// add-end
```

`connect()` now returns an object with both `accounts` and `chainId` in a single call.
The `chainIds` parameter specifies which chains to request permission for (hex strings).
Ethereum Mainnet (`0x1`) is always included regardless of what you pass.

### Connect-and-sign shortcut

Use `connectAndSign` to connect and sign a `personal_sign` message in one user approval.
The method returns the signature directly:

```typescript
const signature = await client.connectAndSign({
  message: 'Sign in to My DApp',
  chainIds: ['0x1'],
})
```

### Connect-and-execute shortcut

Connect and execute any JSON-RPC method in a single user approval.
The method returns the RPC result directly:

```typescript
const txHash = await client.connectWith({
  method: 'eth_sendTransaction',
  params: account => [{ from: account, to: '0x...', value: '0x0' }],
  chainIds: ['0x1'],
})
```

## 5. Update provider access

In MetaMask Connect EVM, `client.getProvider()` returns an EIP-1193 provider. You no longer use the
`SDKProvider` returned by `sdk.getProvider()`.

**Old:**

```typescript
// remove-start
- const provider = sdk.getProvider() // SDKProvider (may be undefined)
- await provider.request({ method: 'eth_chainId' })
// remove-end
```

**New:**

```typescript
// add-start
+ const provider = client.getProvider() // EIP-1193 provider (always exists)
+ await provider.request({ method: 'eth_chainId' })
// add-end
```

Key differences:

- The provider is a standard EIP-1193 provider, not the custom `SDKProvider`.
- The provider is available immediately after `createEVMClient` resolves, even before `connect()`.
- Read-only calls (like `eth_blockNumber`) work immediately against `supportedNetworks` RPCs.
  Account-dependent calls require `connect()` first.
- `client.getProvider()` never returns `undefined`.

## 6. Update event handling

EIP-1193 provider events work exactly the same way:

```typescript
const provider = client.getProvider()
provider.on('chainChanged', chainId => {
  /* hex string */
})
provider.on('accountsChanged', accounts => {
  /* address array */
})
provider.on('disconnect', () => {
  /* ... */
})
```

MetaMask Connect EVM also supports SDK-level event handlers that you register during initialization:

```typescript
const client = await createEVMClient({
  dapp: { name: 'My DApp' },
  api: {
    supportedNetworks: {
      '0x1': 'https://mainnet.infura.io/v3/YOUR_KEY',
    },
  },
  eventHandlers: {
    displayUri: uri => {
      /* render QR code for mobile connection */
    },
    connect: ({ chainId, accounts }) => {
      /* connection established */
    },
    disconnect: () => {
      /* disconnected */
    },
  },
})
```

You can also listen for the `display_uri` event on the **provider** for custom QR code UI:

```typescript
const provider = client.getProvider()
provider.on('display_uri', uri => {
  /* render custom QR code */
})
```

## 7. Adopt new capabilities

MetaMask Connect EVM introduces features that are not available in `@metamask/sdk`:

| Capability             | Description                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Multichain client**  | `createMultichainClient` from `@metamask/connect-multichain` supports CAIP-25 scopes across EVM and Solana |
| **`invokeMethod`**     | Call RPC methods on specific CAIP-2 scopes without switching chains                                        |
| **Solana support**     | `createSolanaClient` from `@metamask/connect-solana` with wallet-standard adapter                          |
| **`connectAndSign`**   | Connect and sign a message in a single user approval                                                       |
| **`connectWith`**      | Connect and execute any RPC method in a single user approval                                               |
| **Partial disconnect** | `disconnect(scopes)` revokes specific CAIP scopes while keeping others active                              |
| **Singleton client**   | Subsequent `create*Client` calls merge options into the existing instance                                  |

### Next step: Go multichain

If your dapp supports (or plans to support) both EVM and Solana, consider upgrading to the
[multichain client](../../multichain/connect/quickstart.md).
The EVM client is built on top of `createMultichainClient` internally, so the upgrade is
straightforward:

```typescript
import { createMultichainClient } from '@metamask/connect-multichain'

const multichainClient = await createMultichainClient({
  dapp: { name: 'My DApp', url: window.location.href },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp':
        'https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
})

// EVM call
await multichainClient.invokeMethod({
  scope: 'eip155:1',
  request: { method: 'eth_getBalance', params: ['0x...', 'latest'] },
})

// Solana call
await multichainClient.invokeMethod({
  scope: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  request: { method: 'getBalance', params: { pubkey: '...' } },
})
```

See the [multichain quickstart](../../multichain/connect/quickstart.md) for a full walkthrough.

## Full option mapping

| Old (`@metamask/sdk`)    | New (`@metamask/connect-evm`)                      | Status                                |
| ------------------------ | -------------------------------------------------- | ------------------------------------- |
| `new MetaMaskSDK(opts)`  | `await createEVMClient(opts)`                      | Renamed, async                        |
| `sdk.init()`             | Not needed                                         | Init happens in `createEVMClient`     |
| `sdk.connect()`          | `client.connect({ chainIds })`                     | Returns `{ accounts, chainId }`       |
| `sdk.getProvider()`      | `client.getProvider()`                             | Returns EIP-1193 provider             |
| `sdk.disconnect()`       | `client.disconnect()`                              | Same, plus partial disconnect support |
| `dappMetadata`           | `dapp`                                             | Renamed                               |
| `infuraAPIKey`           | `getInfuraRpcUrls(key)` in `api.supportedNetworks` | Helper function                       |
| `readonlyRPCMap`         | `api.supportedNetworks`                            | Merged with Infura URLs               |
| `headless`               | `ui.headless`                                      | Moved to `ui` namespace               |
| `extensionOnly`          | `ui.preferExtension`                               | Renamed, slightly different semantics |
| `openDeeplink`           | `mobile.preferredOpenLink`                         | Moved to `mobile` namespace           |
| `useDeeplink`            | `mobile.useDeeplink`                               | Moved to `mobile` namespace           |
| `SDKProvider`            | `EIP1193Provider`                                  | Standard provider interface           |
| `timer`                  | Removed                                            | --                                    |
| `enableAnalytics`        | Removed                                            | --                                    |
| `communicationServerUrl` | Removed                                            | --                                    |
| `storage`                | Removed                                            | --                                    |

:::info Important notes

- **`createEVMClient` is async**: Unlike `new MetaMaskSDK()`, it returns a promise.
  Always `await` it before accessing the client.
- **The client is a singleton**: Calling `createEVMClient` or `createMultichainClient` multiple
  times merges options into the same instance. Do not recreate it on every render.
- **`connect()` returns an object**: Destructure `{ accounts, chainId }` instead of treating the
  return value as an accounts array.
- **Chain IDs must be hex strings**: Use `'0x1'` not `1` or `'1'` in `chainIds` and
  `supportedNetworks` keys.
- **Provider exists before connection**: `client.getProvider()` never returns `undefined`.
  Read-only RPC calls work immediately; account-dependent calls require `connect()` first.
- **`@metamask/sdk-react` has no direct replacement**: if you were using `MetaMaskProvider` and
  `useSDK()`, migrate to [wagmi hooks](./quickstart/wagmi.md) or manage the client instance in your
  own React context (see example below).
- **Test on both extension and mobile**: the transport layer has changed, and behavior differences
  may surface in one environment but not the other.
  :::

### React context pattern (replacing `useSDK`)

If you were using `@metamask/sdk-react`, you can create a minimal React context to hold the
EVM client instance:

```tsx
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { createEVMClient, getInfuraRpcUrls } from '@metamask/connect-evm'
import type { MetamaskConnectEVM } from '@metamask/connect-evm'

const EVMContext = createContext<MetamaskConnectEVM | null>(null)

export function EVMProvider({ children }: { children: React.ReactNode }) {
  const [client, setClient] = useState<MetamaskConnectEVM | null>(null)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    createEVMClient({
      dapp: { name: 'My DApp', url: window.location.href },
      api: { supportedNetworks: getInfuraRpcUrls('YOUR_INFURA_API_KEY') },
    }).then(setClient)
  }, [])

  return <EVMContext.Provider value={client}>{children}</EVMContext.Provider>
}

export function useEVMClient() {
  return useContext(EVMContext)
}
```

For a full-featured solution, consider using [wagmi](./quickstart/wagmi.md) with the MetaMask
connector, which provides React hooks out of the box.
