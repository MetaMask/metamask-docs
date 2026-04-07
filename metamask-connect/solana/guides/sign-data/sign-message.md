---
title: "Sign Messages on Solana - MetaMask Connect"
sidebar_label: Sign messages
description: Request off-chain cryptographic signatures from users on Solana using MetaMask Connect's signMessage wallet-standard feature.
keywords: [solana sign message, signMessage, wallet-standard, off-chain signature, message verification, metamask, solana]
---

# Sign messages

Your dapp can ask users to sign a message with their Solana account — for example, to verify ownership or authorize an action.

## Use `signMessage`

Use `signMessage` to request a human-readable signature that doesn't need to be verified onchain.

### Example

The following example requests a signed message using MetaMask:

```javascript
import { createSolanaClient } from '@metamask/connect-solana'

const solanaClient = await createSolanaClient({
  dapp: {
    name: 'My Solana DApp',
    url: window.location.origin,
  },
})

const wallet = solanaClient.getWallet()

// Connect and get the user's account
const { accounts } = await wallet.features['standard:connect'].connect()

async function signMessage() {
  const message = new TextEncoder().encode(
    'Only good humans allowed. Paw-thorize yourself.'
  )

  const [{ signature }] = await wallet.features['solana:signMessage'].signMessage({
    account: accounts[0],
    message,
  })

  return signature
}
```

## Next steps

- [Sign in with Solana (SIWS)](siws.md) to authenticate users with domain-bound, phishing-resistant sign-in messages.
- [Send a legacy transaction](../send-legacy-transaction.md) to transfer SOL or interact with Solana programs.
- [Send a versioned transaction](../send-versioned-transaction.md) to use Address Lookup Tables for complex operations.
- [MetaMask Connect Solana methods](../../reference/methods.md) for the full list of wallet-standard features.
