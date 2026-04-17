---
title: Troubleshooting - MetaMask Connect
description: Diagnose and fix common MetaMask Connect issues including connection failures, error codes, React Native polyfills, and session management.
sidebar_label: Overview
keywords:
  [
    MetaMask,
    Connect,
    troubleshooting,
    error codes,
    connection,
    polyfill,
    React Native,
    QR code,
    headless,
    session,
  ]
---

# Troubleshooting

MetaMask Connect packages (`@metamask/connect-multichain`, `@metamask/connect-evm`,
`@metamask/connect-solana`) work out of the box in modern browsers and Vite/Webpack-based setups
without polyfills.
The SDK handles its transport and crypto needs internally using browser-native APIs.

**React Native** is the exception.
The React Native runtime lacks certain Web and Node.js APIs (`Buffer`, `crypto.getRandomValues`,
`stream`, `Event`, `CustomEvent`), so polyfills and Metro configuration are required.
See the [React Native Metro polyfill guide](metro-polyfill-issues.md) for step-by-step setup
instructions.

## Error codes

The following error codes appear in `err.code` on rejected promises from `connect`,
`invokeMethod`, and `provider.request` calls.
Always check `err.code` before `err.message` for reliable error categorization.

| Code     | Meaning                           | Recommended handling                                                                       |
| -------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| `4001`   | User rejected the request         | Show a retry button. Do not log this to error-tracking services.                           |
| `-32002` | Request already pending           | Show "Check MetaMask to approve the pending request." Do **not** call `connect()` again.   |
| `-32602` | Invalid parameters                | Verify that parameters match the expected types (for example, hex chain IDs, not decimal). |
| `-32603` | Internal error                    | Unexpected server-side error. Retry with exponential backoff.                              |
| `-32000` | Execution reverted / server error | Transaction would fail onchain. Check contract inputs and sender balance.                 |
| `1013`   | Internal transport disconnect     | The SDK handles reconnection internally. Do not treat this as a user-facing disconnect.    |

For the complete list of provider errors, see
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193#provider-errors) and
[EIP-1474](https://eips.ethereum.org/EIPS/eip-1474#error-codes).

MetaMask Connect Multichain also exports typed error classes for granular `instanceof` checks:

```typescript
import { ProtocolError, RpcError, StorageError } from '@metamask/connect-multichain'

try {
  await client.connect(['eip155:1'], [])
} catch (err) {
  if (err instanceof RpcError) {
    console.log('RPC error code:', err.code)
  } else if (err instanceof ProtocolError) {
    console.log('Protocol failure:', err.message)
  } else if (err instanceof StorageError) {
    console.log('Session persistence issue:', err.message)
  }
}
```

## Common issues

### Connection hangs after `connect()`

**Cause A:** The MetaMask extension is not detected, `preferExtension` is `true` (the default), and
headless mode is on without a `display_uri` listener.
The SDK falls through to MetaMask Wallet Protocol (MWP) but has nowhere to render the QR code.

**Fix:** Register a `display_uri` event listener before calling `connect()`, or set
`ui.preferExtension: false` to force the QR/MWP flow:

```javascript
const client = await createEVMClient({
  dapp: { name: 'My Dapp' },
  ui: { preferExtension: false },
})
```

**Cause B:** A concurrent `connect` call is already in progress over MWP.

**Fix:** Guard against double-clicks with a loading state.
Look for error code `-32002` and show a "check MetaMask" message instead of retrying.

### User rejected request (code `4001`)

The user selected **Reject** in MetaMask. This is normal behavior.

Handle gracefully by showing a retry button.
Do not treat this as an application error:

```javascript
try {
  await client.connect({ chainIds: ['0x1'] })
} catch (err) {
  if (err.code === 4001) {
    // User rejected — show retry UI
    return
  }
  throw err
}
```

### Connection already pending (code `-32002`)

A previous `connect` call has not yet resolved.
The user may still have the MetaMask approval dialog open on mobile.

Show a message like "Check MetaMask to approve the connection."
Do **not** call `connect` again; the original promise resolves once the user acts.

### Chain not configured in `supportedNetworks`

The chain ID passed to `connect` or `wallet_switchEthereumChain` is not listed in the
`api.supportedNetworks` configuration.

Add every chain the dapp needs to `supportedNetworks` with a valid RPC URL:

```javascript
const client = await createEVMClient({
  dapp: { name: 'My DApp' },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls({
        infuraApiKey: '<YOUR_INFURA_API_KEY>',
        chainIds: ['0x1', '0x89', '0xaa36a7'],
      }),
      '0xa4b1': 'https://arb1.arbitrum.io/rpc',
    },
  },
})
```

### QR code not appearing

**Cause A:** Headless mode is enabled but no `display_uri` listener is registered.
The SDK generates the URI but has nowhere to render it.

**Fix:** Register a `display_uri` listener **before** calling `connect`:

```javascript
const client = await createEVMClient({
  dapp: { name: 'My Dapp' },
  ui: { headless: true },
})

const provider = client.getProvider()
provider.on('display_uri', uri => {
  renderQrCode(uri) // your QR rendering logic
})

await client.connect({ chainIds: ['0x1'] })
```

**Cause B:** The MetaMask extension is detected and the SDK uses the extension transport.
No QR is generated because none is needed.

**Fix:** Force the MWP/QR flow by disabling extension preference:

```javascript
const client = await createEVMClient({
  dapp: { name: 'My DApp' },
  ui: { preferExtension: false },
})
```

### MetaMask wallet not appearing in Solana wallet adapter

**Cause A:** `createSolanaClient` has not resolved before the `WalletProvider` renders.
MetaMask uses the wallet-standard auto-discovery protocol, but the wallet must be registered before
discovery runs.

**Fix:** Await client creation before rendering your app:

```javascript
import { createSolanaClient } from '@metamask/connect-solana'

async function bootstrap() {
  await createSolanaClient({
    dapp: { name: 'My DApp', url: window.location.href },
  })
  const root = createRoot(document.getElementById('root'))
  root.render(<App />)
}
bootstrap()
```

**Cause B:** The `wallets` prop on `WalletProvider` is not an empty array.
MetaMask uses the wallet-standard auto-discovery protocol and must **not** be listed manually.

**Fix:** Always pass `wallets={[]}`:

```jsx
<WalletProvider wallets={[]} autoConnect>
  <WalletModalProvider>
    <App />
  </WalletModalProvider>
</WalletProvider>
```

### Solana devnet or testnet not working

Solana devnet and testnet are only supported in the **MetaMask browser extension**, not in the
MetaMask mobile wallet.
Ensure the user is connecting via the browser extension.

### Session lost after page reload

The app is not waiting for the `wallet_sessionChanged` event on initialization.
The SDK restores sessions asynchronously.

Listen for `wallet_sessionChanged` before assuming the client is ready:

```javascript
const provider = client.getProvider()
provider.on('wallet_sessionChanged', session => {
  if (session.accounts.length > 0) {
    // Session restored — update UI
  }
})
```

Do not call `connect()` again immediately on page load if a session already exists.

### `disconnect()` doesn't fully disconnect

Calling `disconnect(scopes)` with specific CAIP scopes only revokes those scopes, not the entire
session.

Call `disconnect()` with **no arguments** to revoke all scopes and fully terminate the session:

```javascript
// Partial — only revokes the specified scope
await client.disconnect(['eip155:1'])

// Full disconnect
await client.disconnect()
```

### Extension transport used but want mobile QR

`preferExtension` defaults to `true`.
When the MetaMask browser extension is installed, the SDK always prefers it.

Set `ui.preferExtension` to `false`:

```javascript
const client = await createEVMClient({
  dapp: { name: 'My DApp' },
  ui: { preferExtension: false },
})
```

### Chrome Android Solana wallet-adapter issue {#chrome-android}

There is a known issue with `@solana/wallet-adapter-react` on Chrome Android when used with the
Wallet Standard provider from `@metamask/connect-solana`.
Treat Solana Wallet Adapter flows on mobile Chrome as fragile until verified explicitly.

Test Solana flows on desktop Chrome and the MetaMask browser extension before targeting mobile.

## React Native issues

The following issues are specific to React Native.
For full setup instructions, see the
[React Native Metro polyfill guide](metro-polyfill-issues.md).

### `Buffer is not defined`

A dependency loaded before `@metamask/connect-multichain` uses `Buffer`.
The Connect package self-polyfills `Buffer` via its React Native entry point, but peer dependencies
like `eciesjs` may execute first.

Add this to `polyfills.ts` and import it early (after `react-native-get-random-values`, before other
imports):

```typescript
import { Buffer } from 'buffer'
global.Buffer = Buffer
```

### `crypto.getRandomValues is not a function`

`react-native-get-random-values` is either not installed or not imported as the very first import.

Import it as the **first line** of your entry file, before any other import:

```typescript
import 'react-native-get-random-values'
// all other imports follow
```

### `Event is not defined` / `CustomEvent is not defined`

React Native does not provide `Event` or `CustomEvent` globals.
These polyfills are **only required when using wagmi** — the Connect packages themselves use
`eventemitter3` internally and do not need DOM events.

If you use wagmi, add `Event` and `CustomEvent` polyfills in your polyfills file.
See [React Native Metro polyfill issues](metro-polyfill-issues.md) for the full polyfill code.

### Deeplinks not opening MetaMask app

The `mobile.preferredOpenLink` callback is not configured.

Pass a function that calls `Linking.openURL`:

```typescript
import { Linking } from 'react-native'

const client = await createEVMClient({
  dapp: { name: 'My DApp', url: 'https://mydapp.com' },
  mobile: {
    preferredOpenLink: deeplink => Linking.openURL(deeplink),
  },
})
```

### App crashes on import of SDK

Metro cannot resolve Node.js built-in modules (`stream`, `crypto`, `http`, etc.) that SDK
dependencies reference.

Add `extraNodeModules` shims in `metro.config.js`.
See [React Native Metro polyfill issues](metro-polyfill-issues.md) for the full Metro configuration.

## Diagnostic checklist

When any MetaMask Connect integration is misbehaving, ensure the following are true:

- `supportedNetworks` has valid RPC URLs for every chain the dapp uses.
- Chain IDs are hex strings for EVM (`'0x1'`, not `1` or `'1'`).
- In React Native dapps:
  - Polyfills are loaded: `react-native-get-random-values` is the first entry-file
      import; `window` shim is present; `Event`/`CustomEvent` shims are present **only if using Wagmi**;
      `Buffer` is set as a safety net for peer dependencies.
  - `preferredOpenLink` is set for deeplinks to open MetaMask Mobile.
  - Import order is correct: polyfills before SDK imports; `react-native-get-random-values` is the
      very first import.
- Error codes are handled in catch blocks: at minimum handle `4001` (user rejected) and `-32002`
      (pending).
- A singleton client is not recreated: `createEVMClient` / `createMultichainClient` is called once;
      subsequent calls merge into the existing instance.
- `display_uri` listener is registered before calling `connect` in headless mode for QR codes.
- Solana `wallets` prop is `[]`: MetaMask uses Wallet Standard discovery, not manual registration.
- Solana devnet/testnet is used only with the browser extension.
- `debug: true` is set for verbose console output when debugging.

## Next steps

- [React Native Metro polyfill issues](metro-polyfill-issues.md)
- [EVM quickstart](../evm/quickstart/javascript.md)
- [Solana quickstart](../solana/quickstart/javascript.md)
- [Production readiness checklist](../evm/guides/best-practices/production-readiness.md)
