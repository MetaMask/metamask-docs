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
| `-32000` | Execution reverted / server error | Transaction would fail onchain. Check contract inputs and sender balance.                  |
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
  dapp: { name: 'My Dapp' },
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
`preferExtension` defaults to `true`, so when the extension is installed the client prefers it and does not generate a QR code, because none is needed for that path.
The same situation applies if you want a mobile QR flow while the extension is present.

**Fix:** Force the MetaMask Wallet Protocol (MWP) / QR flow by setting `preferExtension` to `false` when creating the client:

```javascript
const client = await createEVMClient({
  dapp: { name: 'My Dapp' },
  ui: { preferExtension: false },
})
```

**Cause C:** A strict Content Security Policy (CSP) is blocking the QR code from rendering.
The QR code embeds the MetaMask fox SVG as a `data:` URI.

**Fix:** Allow the `data:` scheme in `img-src` and the MetaMask relay and analytics origins in
`connect-src`.
A minimal working policy looks like:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
    connect-src 'self' https://*.infura.io wss://mm-sdk-relay.api.cx.metamask.io https://mm-sdk-analytics.api.cx.metamask.io;
    img-src 'self' data:;
    style-src 'self' 'unsafe-inline';
  " />
```

- `img-src 'self' data:` - Required for the fox SVG embedded in the QR code.
- `wss://mm-sdk-relay.api.cx.metamask.io` - The relay used for remote (no-extension and mobile)
  connections.
- `https://mm-sdk-analytics.api.cx.metamask.io` - The default analytics endpoint emitted during the
  connection lifecycle.
- `style-src 'unsafe-inline'` - `@metamask/multichain-ui` injects component styles at runtime
  inside Shadow DOM (Stencil).

:::note Older versions
In earlier package versions, the QR-code modal materialized the fox icon via an `XMLHttpRequest` on
a `blob:` / `data:` URI, requiring `blob:` (and in some setups `data:`) in `connect-src`.
Upgrade to `@metamask/connect-evm` 1.0.0, `@metamask/connect-solana` 1.0.0, or
`@metamask/connect-multichain` 0.12.1 or later to remove this requirement — the fox SVG is now
embedded directly as a `data:` URI without an extra request.
A symptom on older versions looked like:

`Refused to connect to 'data:image/svg+xml;base64,...' because it violates the following Content Security Policy directive: "connect-src 'self' https: wss:".`

If you cannot upgrade, add `data: blob:` to `connect-src` as a fallback.
:::

For the full reference, see
[Content Security Policy](https://github.com/MetaMask/connect-monorepo#content-security-policy) in `metamask/connect-monorepo`.

### MetaMask wallet not appearing in Solana Wallet Adapter

**Cause A:** `createSolanaClient` has not resolved before the `WalletProvider` renders.
MetaMask uses the Wallet Standard auto-discovery protocol, but the wallet must be registered before
discovery runs.

**Fix:** Await client creation before rendering your app:

```javascript
import { createSolanaClient } from '@metamask/connect-solana'

async function bootstrap() {
  await createSolanaClient({
    dapp: { name: 'My Dapp', url: window.location.href },
  })
  const root = createRoot(document.getElementById('root'))
  root.render(<App />)
}
bootstrap()
```

**Cause B:** The `wallets` prop on `WalletProvider` is not an empty array.
MetaMask uses the Wallet Standard auto-discovery protocol and must **not** be listed manually.

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

Do not call `connect` again immediately on page load if a session already exists.

### `disconnect` doesn't fully disconnect

Calling `disconnect(scopes)` with specific CAIP scopes only revokes those scopes, not the entire
session.

Call `disconnect()` with **no arguments** to revoke all scopes and fully terminate the session:

```javascript
// Partial — only revokes the specified scope
await client.disconnect(['eip155:1'])

// Full disconnect
await client.disconnect()
```

### Chrome Android Solana wallet-adapter issue {#chrome-android}

There is a known issue with `@solana/wallet-adapter-react` on Chrome Android when used with the
Wallet Standard provider from `@metamask/connect-solana`.
Treat Solana Wallet Adapter flows on mobile Chrome as fragile until verified explicitly.

Test Solana flows on desktop Chrome and the MetaMask browser extension before targeting mobile.

## React Native issues

Polyfill setup, Metro `extraNodeModules`, entry-file import order, common bundler errors, and deeplinks to MetaMask Mobile are documented in [React Native Metro polyfill issues](metro-polyfill-issues.md).

## Diagnostic checklist

When any MetaMask Connect integration is misbehaving, ensure the following are true:

- `supportedNetworks` has valid RPC URLs for every chain the dapp uses.
- Chain IDs are hex strings for EVM (`'0x1'`, not `1` or `'1'`).
- In React Native dapps:
  - Polyfills are loaded: `react-native-get-random-values` is the first entry-file
    import; `window` shim is present; `Event`/`CustomEvent` shims are present **only if using wagmi**;
    `Buffer` is set as a safety net for peer dependencies.
  - `preferredOpenLink` is set for deeplinks to open MetaMask Mobile (see [Deeplinks not opening MetaMask app](metro-polyfill-issues.md#deeplinks-not-opening-metamask-app)).
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
