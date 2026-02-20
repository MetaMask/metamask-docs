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

const solanaClient = createSolanaClient()
const provider = solanaClient.getProvider()

async function signMessage() {
  const message = 'Only good humans allowed. Paw-thorize yourself.'
  const encodedMessage = new TextEncoder().encode(message)

  const signature = await provider.request({
    method: 'signMessage',
    params: {
      message: encodedMessage,
      display: 'hex',
    },
  })

  return signature
}
```
