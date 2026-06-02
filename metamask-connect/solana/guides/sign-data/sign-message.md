---
title: 'Sign Messages on Solana - MetaMask Connect'
sidebar_label: Sign messages
description: Request offchain cryptographic signatures from users on Solana using MetaMask Connect's signMessage Wallet Standard feature.
keywords:
  [
    solana sign message,
    signMessage,
    wallet-standard,
    offchain signature,
    message verification,
    metamask,
    solana,
  ]
---

# Sign messages

Your dapp can ask users to sign a message with their Solana account; for example, to verify ownership or authorize an action.

## Prerequisites

Follow the [quickstart](../../quickstart/javascript.md) to install, initialize, and connect the Solana client.

## Use `solana:signMessage`

Use the [`solana:signMessage`](../../reference/methods.md#supported-wallet-standard-features) feature to request a human-readable signature that doesn't need to be verified onchain.

The following example requests a signed message using MetaMask:

```javascript
import { createSolanaClient } from '@metamask/connect-solana'

const solanaClient = await createSolanaClient({
  dapp: {
    name: 'My Solana Dapp',
    url: window.location.origin,
  },
})

const wallet = solanaClient.getWallet()

// Connect and get the user's account
const { accounts } = await wallet.features['standard:connect'].connect()

async function signMessage() {
  const message = new TextEncoder().encode('Only good humans allowed. Paw-thorize yourself.')

  const [{ signature }] = await wallet.features['solana:signMessage'].signMessage({
    account: accounts[0],
    message,
  })

  return signature
}
```

## Next steps

- [Sign in with Solana (SIWS)](siws.md) to authenticate users with domain-bound, phishing-resistant sign-in messages.
- [Send a legacy transaction](../send-transactions/legacy.md) to transfer SOL or interact with Solana programs.
- [Send a versioned transaction](../send-transactions/versioned.md) to use Address Lookup Tables for complex operations.
- [MetaMask Connect Solana methods](../../reference/methods.md) for the full list of Wallet Standard features.
