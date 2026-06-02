---
title: 'Use Headless Mode - MetaMask Connect EVM'
sidebar_label: Use headless mode
description: Render a custom QR code or connection UI by using headless mode with MetaMask Connect EVM.
keywords:
  [headless, QR code, custom UI, display_uri, evm, MetaMask, Connect, connection, modal, deeplink]
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

Follow Step 1 of the [quickstart](../quickstart/javascript.md) to install the EVM client.

## Steps

### 1. Initialize the client with headless mode

Initialize an EVM client using [`createEVMClient`](../reference/methods.md#createevmclient), and set `ui.headless` to `true`:

```javascript
import { createEVMClient, getInfuraRpcUrls } from '@metamask/connect-evm'

const evmClient = await createEVMClient({
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

The `display_uri` event fires on the EIP-1193 [provider](../reference/provider-api.md) during the connecting phase with a one-time-use pairing URI.
You **must** register the listener before calling `connect`, or you may miss the event:

```javascript
const provider = evmClient.getProvider()

provider.on('display_uri', uri => {
  showCustomQrModal(uri)
})
```

As an alternative to `provider.on`, you can pass a `displayUri` callback when initializing the client via [`eventHandlers`](../reference/methods.md#createevmclient) (see the [migration guide](migrate-from-sdk.md#6-update-event-handling)).

### 3. Connect and handle the result

Call [`connect`](../reference/methods.md#connect) to connect to MetaMask, and handle the result:

```javascript
try {
  await evmClient.connect({ chainIds: ['0x1'] })
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
const evmClient = await createEVMClient({
  dapp: { name: 'My Dapp', url: window.location.href },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls({ infuraApiKey: '<YOUR_INFURA_API_KEY>' }),
    },
  },
  ui: {
    headless: true,
    preferExtension: false,
  },
})
```

### Monitor connection status

The EVM client exposes a [`status`](../reference/methods.md#properties) property
(`'loaded' | 'pending' | 'connecting' | 'connected' | 'disconnected'`) you can read when updating UI.

## Next steps

- [Send transactions](send-transactions/index.md) in your JavaScript or Wagmi dapp.
- [Sign data](sign-data/index.md) with the connected session.
- See the [EVM methods reference](../reference/methods.md) for the full API.
