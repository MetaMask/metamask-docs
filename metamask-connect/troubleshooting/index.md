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
    Content Security Policy,
    CSP,
    Flask,
  ]
---

# Troubleshooting

MetaMask Connect packages (`@metamask/connect-multichain`, `@metamask/connect-evm`,
`@metamask/connect-solana`) work out of the box in modern browsers and Vite/Webpack-based setups
without polyfills.
The SDK handles its transport and crypto needs internally using browser-native APIs.

**React Native** is the exception.
The React Native runtime lacks certain Web and Node.js APIs (`Buffer`, `crypto.getRandomValues`,
`stream`, `window`), so polyfills and Metro configuration are required.
The `Event` and `CustomEvent` globals aren't needed by the `@metamask/connect-*` packages (which use
`eventemitter3` internally); polyfill them only if you also use Wagmi.
See the [React Native Metro polyfill guide](metro-polyfill-issues.md) for step-by-step setup
instructions.

## Error codes

The following error codes appear in `err.code` on rejected promises from `connect`,
`invokeMethod`, and `provider.request` calls.
Always check `err.code` before `err.message` for reliable error categorization.

| Code     | Meaning                           | Recommended handling                                                                                                                                                                               |
| -------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `4001`   | User rejected the request         | Show a retry button. Do not log this to error-tracking services.                                                                                                                                   |
| `-32002` | Request already pending           | Show "Check MetaMask to approve the pending request." Do **not** call `connect()` again.                                                                                                           |
| `-32602` | Invalid parameters                | Verify that parameters match the expected types (for example, hex chain IDs, not decimal).                                                                                                         |
| `-32603` | Internal error                    | Unexpected server-side error. Retry with exponential backoff.                                                                                                                                      |
| `4902`   | Unrecognized chain ID             | The chain isn't added to the wallet. Add it with `wallet_addEthereumChain`, or pass `chainConfiguration` to `switchChain`. See [Chain not configured](#chain-not-configured-in-supportednetworks). |
| `-32000` | Execution reverted / server error | Transaction would fail onchain. Check contract inputs and sender balance.                                                                                                                          |

For the complete list of provider errors, see
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193#provider-errors) and
[EIP-1474](https://eips.ethereum.org/EIPS/eip-1474#error-codes).

MetaMask Connect Multichain also exports typed error classes for granular `instanceof` checks. The
class most relevant to wallet calls is `RPCInvokeMethodErr`, which wraps the wallet's response and
exposes the wallet's original error code on `err.rpcCode`:

```typescript
import { RPCInvokeMethodErr } from '@metamask/connect-multichain'

try {
  await client.invokeMethod({
    scope: 'eip155:1',
    request: { method: 'personal_sign', params: [message, address] },
  })
} catch (err) {
  if (err instanceof RPCInvokeMethodErr) {
    // The wallet's original JSON-RPC / EIP-1193 code is on err.rpcCode (for example, 4001).
    console.log('Wallet error code:', err.rpcCode)
  }
}
```

The core also exports `RPCHttpErr`, `RPCReadonlyResponseErr`, and `RPCReadonlyRequestErr` for
read-only RPC failures.

Since `@metamask/connect-evm` 2.1.0, `provider.request` also preserves the wallet's JSON-RPC
`error.data`, so you can read revert reasons, custom-error bytes, and other wallet-provided metadata
alongside `error.code` and `error.message`.
On the multichain client, the same metadata is available as `err.rpcData` on `RPCInvokeMethodErr`.

## Content Security Policy

MetaMask Connect needs a few origins allowed in your dapp's Content Security Policy (CSP).
This applies to every integration (`@metamask/connect-evm`, `@metamask/connect-solana`, and
`@metamask/connect-multichain`) on all current package versions, not only to the QR code flow.
A strict policy that omits these directives breaks remote connections, the install and QR modal, or
both.

### Required directives

```text
connect-src wss://mm-sdk-relay.api.cx.metamask.io;
img-src data:;
```

- `connect-src wss://mm-sdk-relay.api.cx.metamask.io` allows the WebSocket connection to the
  MetaMask relay, which carries every remote connection, including mobile deeplinks and desktop
  browsers without the extension installed.
  The relay can't be proxied or deferred from within the library, so remote connections fail
  without it.
- `img-src data:` allows the MetaMask fox SVG that the install and QR modal in
  `@metamask/multichain-ui` embeds as a `data:` URI inside the generated QR code.
  Without it, the QR code doesn't render.

### Also consider

- `connect-src https://mm-sdk-analytics.api.cx.metamask.io` for the telemetry endpoint used by
  `@metamask/analytics`.
  Analytics are enabled by default.
  Set `analytics.enabled: false` when creating the client to disable the events and omit this
  origin.
- `style-src 'unsafe-inline'` for the modal styles.
  `@metamask/multichain-ui` is built with Stencil, which injects component styles at runtime inside
  the Shadow DOM.
  Strict policies without `'unsafe-inline'`, or an equivalent nonce or hash strategy, can break the
  modal styling.
- `connect-src` entries for the RPC endpoints your dapp supplies through `api.supportedNetworks`,
  `api.infuraProjectId`, or `api.readonlyRPCMap`.
  For example, `https://*.infura.io`, your own node provider, or a public RPC.
- `https://metamask.app.link` and `metamask://` for mobile deeplinks and universal links.
  These are top-level navigations that `connect-src` doesn't normally govern, but policies that set
  `navigate-to` or `form-action` may need to allow them.

### Example policy

For a dapp that uses the default analytics endpoint, Infura RPC URLs, and the install modal, set the
policy as a response header at your server or CDN:

```text
Content-Security-Policy: connect-src 'self' wss://mm-sdk-relay.api.cx.metamask.io https://mm-sdk-analytics.api.cx.metamask.io https://*.infura.io; img-src 'self' data:; style-src 'self' 'unsafe-inline';
```

The equivalent `<meta>` tag, which is useful for local development and static pages:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
    connect-src 'self' wss://mm-sdk-relay.api.cx.metamask.io https://mm-sdk-analytics.api.cx.metamask.io https://*.infura.io;
    img-src 'self' data:;
    style-src 'self' 'unsafe-inline';
  " />
```

### Symptoms of a missing directive

The exact wording varies by browser.
In Chromium-based browsers, the console reports messages similar to the following.

| Console message                                                                                     | Missing directive                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `Refused to connect to 'wss://mm-sdk-relay.api.cx.metamask.io/...'`                                 | `connect-src wss://mm-sdk-relay.api.cx.metamask.io`       |
| `Refused to load the image 'data:image/svg+xml;base64,...'`                                         | `img-src data:`                                           |
| `Refused to connect to 'https://mm-sdk-analytics.api.cx.metamask.io/...'`                           | `connect-src https://mm-sdk-analytics.api.cx.metamask.io` |
| `Refused to apply inline style because it violates the following Content Security Policy directive` | `style-src 'unsafe-inline'`                               |

:::note Older versions
Before `@metamask/connect-multichain` 0.12.1 (which pulls in `@metamask/multichain-ui` 0.4.1), the
QR code modal fetched the fox icon through an `XMLHttpRequest` on a `data:` URI, so it also needed
`data:` (and in some setups `blob:`) in `connect-src`. The symptom looked like:

`Refused to connect to 'data:image/svg+xml;base64,...' because it violates the following Content Security Policy directive: "connect-src 'self' https: wss:".`

Upgrading removes only that extra `connect-src` entry.
The required directives above still apply on the latest packages.
If you can't upgrade, add `data: blob:` to `connect-src` as a fallback.
:::

For the full reference, see
[Content Security Policy](https://github.com/MetaMask/connect-monorepo#content-security-policy) in
the `connect-monorepo` repository.

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

#### Normalize cancellations from `connect`

Rejections from [`connect`](../evm/reference/methods.md#connect),
[`connectAndSign`](../evm/reference/methods.md#connectandsign), and
[`connectWith`](../evm/reference/methods.md#connectwith) don't always surface as a top-level
`code: 4001`. Depending on the transport, a cancellation can arrive as a wrapped
[`RPCInvokeMethodErr`](#error-codes) with an outer `code: 53` and the wallet's real code on
`err.rpcCode` (for example, `4001`). Requests made through
[`provider.request`](../evm/reference/provider-api.md#request) are normalized to `err.code = rpcCode`,
but `connect` rejections are not.

Closing the QR code or install modal is also a cancellation.
Since `@metamask/connect-multichain` 1.2.0, that rejects with the canonical EIP-1193 `4001` error.
Earlier versions rejected with a plain `Error('User closed modal')` that carried no code.

Normalize defensively before branching on the error. This mirrors the SDK's own rejection heuristic,
which checks `code === 4001` or a message containing `reject`, `denied`, or `cancel`:

```javascript
function isUserRejection(err) {
  if (typeof err !== 'object' || err === null) {
    return false
  }
  if (err.code === 4001 || err.rpcCode === 4001) {
    return true
  }
  const message = String(err.message ?? '').toLowerCase()
  return message.includes('reject') || message.includes('denied') || message.includes('cancel')
}

try {
  await client.connect({ chainIds: ['0x1'] })
} catch (err) {
  if (isUserRejection(err)) {
    // User cancelled — show retry UI, don't log as an error
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

This appears in two situations.

**A request throws even though `connect` succeeded.**
After `connect` resolves, the provider's active chain follows the wallet's selected network.
If the user's active network isn't in `api.supportedNetworks`, any non-cached request, including
[`personal_sign`](../evm/reference/json-rpc-api/personal_sign.mdx) for Sign-In with Ethereum, throws:

```text
Chain eip155:<id> is not configured in supportedNetworks. Requests cannot be made to chains not explicitly configured in supportedNetworks.
```

This is a plain `Error` without an `err.code`. Through ethers v6 `BrowserProvider` it surfaces as
`could not coalesce error (... code=UNKNOWN_ERROR)`.

**A network switch is rejected.**
When `connect` or `wallet_switchEthereumChain` targets a chain that isn't added to the wallet, the
wallet rejects with `err.code === 4902` (unrecognized chain ID).

In both cases, add every chain the dapp needs to `supportedNetworks` with a valid RPC URL:

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

#### Sign-only dapps

If your dapp only signs (for example, SIWE login) and never sends transactions, users can be on any
network when they connect. To avoid the gating error:

- List every network your users are likely to be on in `supportedNetworks`. Ethereum Mainnet (`0x1`)
  is always included in the connection request as a bootstrap fallback.
- Alternatively, after `connect` resolves, pin the provider to a supported chain using the
  `selectedChainId` setter so signature requests always route to a configured chain:

```javascript
const provider = client.getProvider()
const { chainId } = await client.connect({ chainIds: ['0x1'] })

// Pin to a supported chain (falling back to mainnet) before signing.
provider.selectedChainId = client.selectedChainId ?? '0x1'

const signature = await provider.request({
  method: 'personal_sign',
  params: [messageHex, address],
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
The QR code embeds the MetaMask fox SVG as a `data:` URI, so the console reports a message like
`Refused to load the image 'data:image/svg+xml;base64,...'`.

**Fix:** Allow `data:` in `img-src` and the MetaMask relay origin in `connect-src`.
See [Content Security Policy](#content-security-policy) for the full set of directives.

### MetaMask Flask shows the QR code instead of using the extension

A browser with only MetaMask Flask installed gets the QR code flow instead of connecting directly
through the extension.

**Cause:** Before `@metamask/connect-multichain` 1.2.0, EIP-6963 extension detection didn't
recognize the Flask RDNS value (`io.metamask.flask`), so `hasExtension` returned `false` and
`connect` fell back to the MetaMask Wallet Protocol (MWP) transport.
On `@metamask/connect-evm`, this also produced a duplicate MetaMask entry in wallet pickers, because
the client announced its own provider alongside the one Flask had already announced.

**Fix:** Upgrade to `@metamask/connect-multichain` 1.2.0, `@metamask/connect-evm` 2.1.1, or
`@metamask/connect-solana` 2.1.1 or later.

### Mobile shows the QR modal instead of deeplinking to the app

On mobile web, tapping connect shows the QR/install modal instead of deeplinking into the MetaMask
mobile app.

**Cause:** `ui.showInstallModal` is set to `true`. Although the option reads as desktop-oriented,
setting it `true` forces the install modal on mobile web too, which suppresses the app deeplink.

**Fix:** Leave `ui.showInstallModal` at its default (`false`). Mobile then deeplinks to the MetaMask
app, and desktop still shows the QR modal when no extension is detected.

```javascript
const client = await createEVMClient({
  dapp: { name: 'My Dapp' },
  api: { supportedNetworks: { '0x1': '<RPC_URL>' } },
  // Omit ui.showInstallModal, or set it to false, so mobile deeplinks work.
})
```

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

### Unexpected account switch after reconnect

After a reconnect, an `accountsChanged` emission lists a previously used account first, and a dapp
that treats `accounts[0]` as the active account interprets this as a user switching accounts. This
can trigger unwanted side effects, such as a duplicate SIWE prompt or re-authentication.

**Cause:** Sessions merge across reconnections, so the permitted account set accumulates accounts
from earlier connections unless the dapp revokes them. The account order in an SDK session isn't a
selection-first guarantee, so a stale account can appear first, unlike the injected-provider
convention.

**Fix:** Don't assume `accounts[0]` is the active account for session-based connections. Track the
account you actually connected with, and compare against it before reacting:

```javascript
let activeAccount

const { accounts } = await evmClient.connect({ chainIds: ['0x1'], forceRequest: true })
activeAccount = accounts[0]

const provider = evmClient.getProvider()
provider.on('accountsChanged', accounts => {
  if (accounts.length === 0) {
    // Disconnected.
    return
  }
  // Only react if the connected account actually changed.
  if (!accounts.includes(activeAccount)) {
    activeAccount = accounts[0]
    // Handle a real account switch (for example, re-authenticate).
  }
})
```

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
- The [Content Security Policy](#content-security-policy) allows
  `wss://mm-sdk-relay.api.cx.metamask.io` in `connect-src` and `data:` in `img-src`.
- In React Native dapps:
  - Polyfills are loaded: `react-native-get-random-values` is the first entry-file
    import; `window` shim is present; `Event`/`CustomEvent` shims are present **only if using Wagmi**;
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
