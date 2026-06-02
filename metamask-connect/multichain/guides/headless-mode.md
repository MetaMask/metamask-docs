---
title: 'Use Headless Mode - MetaMask Connect Multichain'
sidebar_label: Use headless mode
description: Render a custom QR code or connection UI by using headless mode with MetaMask Connect Multichain.
keywords:
  [
    headless,
    QR code,
    custom UI,
    display_uri,
    multichain,
    MetaMask,
    Connect,
    connection,
    modal,
    deeplink,
  ]
---

# Use headless mode

By default, MetaMask Connect renders its own QR code modal when connecting to MetaMask Mobile
via MetaMask Wallet Protocol (MWP).
Headless mode suppresses this built-in modal so you can render your own connection UI.

Use headless mode when you want to:

- Display a custom-styled QR code that matches your dapp's design.
- Show the connection URI in a different format (for example, a deeplink button instead of a QR code).
- Integrate the connection flow into an existing modal or onboarding wizard.

## Prerequisites

Follow Step 1 of the [quickstart](../quickstart/javascript.md) to install the multichain client.

## Steps

### 1. Initialize the client with headless mode

Initialize a multichain client using [`createMultichainClient`](../reference/methods.md#createmultichainclient), and set `ui.headless` to `true`:

```javascript
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: {
    name: 'My Dapp',
    url: window.location.href,
  },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls({ infuraApiKey: '<YOUR_INFURA_API_KEY>' }),
    },
  },
  ui: { headless: true },
})
```

### 2. Register a `display_uri` listener before connecting

The `display_uri` event fires during the connecting phase with a one-time-use pairing URI.
You **must** register the listener before calling `connect`, or you may miss the event:

```javascript
client.on('display_uri', uri => {
  showCustomQrModal(uri)
})
```

### 3. Connect and handle the result

Call [`connect`](../reference/methods.md#connect) to connect to MetaMask, and handle the result:

```javascript
try {
  await client.connect(['eip155:1', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])
  hideCustomQrModal()
} catch (err) {
  hideCustomQrModal()
  if (err.code === 4001) {
    // User rejected — show retry UI
  } else {
    console.error('Connection failed:', err)
  }
}
```

## Important considerations

### URI is one-time-use

The pairing URI delivered by `display_uri` is a one-time-use token.
Once used or expired, it cannot be reused.
If the connection fails, call `connect` again to generate a fresh URI.

### `display_uri` only fires during connecting

The event fires only while the client status is `'connecting'`.
After the connection resolves (success or error), `display_uri` stops firing.

### Extension connections skip QR

When the MetaMask browser extension is installed and `ui.preferExtension` is `true` (the default),
the SDK connects directly through the extension.
No `display_uri` event fires because no QR code is needed.

To display the QR connection option even when the extension is available, set `ui.preferExtension` to `false`:

```javascript
const client = await createMultichainClient({
  dapp: { name: 'My Dapp', url: window.location.href },
  ui: {
    headless: true,
    preferExtension: false,
  },
})
```

### Monitor connection status

Use the [`stateChanged`](../reference/methods.md#events) event to track the connection lifecycle and update your UI accordingly:

```javascript
client.on('stateChanged', status => {
  // status: 'loaded' | 'pending' | 'connecting' | 'connected' | 'disconnected'
  switch (status) {
    case 'connecting':
      showLoadingIndicator()
      break
    case 'connected':
      hideCustomQrModal()
      showConnectedUI()
      break
    case 'disconnected':
      showDisconnectedUI()
      break
  }
})
```

## Next steps

- [Send transactions on EVM and Solana](send-transactions.md) using `invokeMethod`.
- [Sign messages on EVM and Solana](sign-transactions.md) using `invokeMethod`.
- See the [Multichain methods reference](../reference/methods.md) for the full API.
