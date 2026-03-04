---
sidebar_label: Migrate from legacy SDK
description: Migrate from @metamask/sdk to @metamask/connect-evm with step-by-step package, API, and configuration changes.
keywords: [SDK, migrate, migration, upgrade, connect, MetaMask, dapp]
toc_max_heading_level: 2
---

# Migrate from the legacy SDK

This guide walks you through migrating from `@metamask/sdk` (or `@metamask/sdk-react`) to
`@metamask/connect-evm`.
MetaMask Connect is a complete rewrite of the legacy SDK, built on the
[CAIP-25 Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) with
async initialization, a singleton client, and built-in support for EVM, Solana, and multichain
sessions.

## 1. Replace packages

Remove the old packages and install the new ones:

```bash
# Remove old
npm uninstall @metamask/sdk @metamask/sdk-react

# Install new (EVM only)
npm install @metamask/connect-evm

# If you also need Solana support
npm install @metamask/connect-solana
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

**New (Multichain):**

```typescript
// add-start
+ import { createMultichainClient } from '@metamask/connect-multichain'
// add-end
```

**New (Solana):**

```typescript
// add-start
+ import { createSolanaClient } from '@metamask/connect-solana'
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

`createEVMClient` is async and returns a singleton.
Calling it again merges new options into the existing instance rather than creating a new one.
There is no separate `init()` step.

### Option mapping

| Old (`MetaMaskSDK`)      | New (`createEVMClient`)                             | Notes                                                      |
| ------------------------ | --------------------------------------------------- | ---------------------------------------------------------- |
| `dappMetadata`           | `dapp`                                              | Same shape: `{ name, url, iconUrl }`                       |
| `dappMetadata.name`      | `dapp.name`                                         | Required                                                   |
| `dappMetadata.url`       | `dapp.url`                                          | Auto-set in browsers; required in Node.js and React Native |
| `infuraAPIKey`           | `api.supportedNetworks` via `getInfuraRpcUrls(key)` | Helper generates RPC URLs for all Infura-supported chains  |
| `readonlyRPCMap`         | `api.supportedNetworks`                             | Merge into the same object                                 |
| `headless`               | `ui.headless`                                       | Same behavior                                              |
| `extensionOnly`          | `ui.preferExtension`                                | `true` prefers extension (default); not the same as "only" |
| `openDeeplink`           | `mobile.preferredOpenLink`                          | Same signature: `(deeplink: string) => void`               |
| `useDeeplink`            | `mobile.useDeeplink`                                | Same behavior                                              |
| `timer`                  | Removed                                             | No longer configurable                                     |
| `enableAnalytics`        | Removed                                             | No longer available                                        |
| `communicationServerUrl` | Removed                                             | Managed internally                                         |
| `storage`                | Removed                                             | Managed internally                                         |

## 4. Update connection flow

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

Connect and sign a `personal_sign` message in a single user approval:

```typescript
const { accounts, chainId, signature } = await client.connectAndSign({
  message: 'Sign in to My DApp',
  chainIds: ['0x1'],
})
```

### Connect-and-execute shortcut

Connect and execute any JSON-RPC method in a single user approval:

```typescript
const { accounts, chainId, result } = await client.connectWith({
  method: 'eth_sendTransaction',
  params: [{ from: '0x...', to: '0x...', value: '0x0' }],
  chainIds: ['0x1'],
})
```

## 5. Update provider access

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

- The provider is a standard **EIP-1193 provider**, not the custom `SDKProvider`.
- The provider is available **immediately** after `createEVMClient` resolves, even before `connect()`.
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

MetaMask Connect also exposes SDK-level events you can register during initialization:

```typescript
const client = await createEVMClient({
  dapp: { name: 'My DApp' },
  eventHandlers: {
    display_uri: uri => {
      /* render QR code for mobile connection */
    },
    wallet_sessionChanged: session => {
      /* session restored on page reload */
    },
  },
})
```

Or subscribe after creation:

```typescript
client.on('display_uri', uri => {
  /* ... */
})
client.on('wallet_sessionChanged', session => {
  /* ... */
})
```

## 7. Adopt new capabilities

These features are new in MetaMask Connect and have no legacy SDK equivalent:

| Capability                  | Description                                                                                                |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Multichain client**       | `createMultichainClient` from `@metamask/connect-multichain` supports CAIP-25 scopes across EVM and Solana |
| **`invokeMethod`**          | Call RPC methods on specific CAIP-2 scopes without switching chains                                        |
| **Solana support**          | `createSolanaClient` from `@metamask/connect-solana` with wallet-standard adapter                          |
| **`connectAndSign`**        | Connect and sign a message in a single user approval                                                       |
| **`connectWith`**           | Connect and execute any RPC method in a single user approval                                               |
| **Partial disconnect**      | `disconnect(scopes)` revokes specific CAIP scopes while keeping others active                              |
| **Singleton client**        | Subsequent `create*Client` calls merge options into the existing instance                                  |
| **`wallet_sessionChanged`** | Event fired when a session is restored on page load                                                        |

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

- **`createEVMClient` is async** -- unlike `new MetaMaskSDK()`, it returns a promise.
  Always `await` it before accessing the client.
- **The client is a singleton** -- calling `createEVMClient` or `createMultichainClient` multiple
  times merges options into the same instance. Do not recreate it on every render.
- **`connect()` returns an object** -- destructure `{ accounts, chainId }` instead of treating the
  return value as an accounts array.
- **Chain IDs must be hex strings** -- use `'0x1'` not `1` or `'1'` in `chainIds` and
  `supportedNetworks` keys.
- **Provider exists before connection** -- `client.getProvider()` never returns `undefined`.
  Read-only RPC calls work immediately; account-dependent calls require `connect()` first.
- **`@metamask/sdk-react` has no 1:1 replacement** -- if you were using `MetaMaskProvider` and
  `useSDK()`, migrate to either wagmi hooks or manage the client instance in your own React context.
- **Test on both extension and mobile** -- the transport layer has changed, and behavior differences
  may surface in one environment but not the other.
  :::
