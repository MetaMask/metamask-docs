---
description: Use RPC methods to request cryptographic signatures from users.
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
