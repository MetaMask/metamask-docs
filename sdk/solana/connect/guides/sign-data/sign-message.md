---
description: Use RPC methods to request cryptographic signatures from users.
---

# Sign messages

You can use the following RPC methods to request cryptographic signatures from users:

## Use `signMessage`

`signMessage` is used to request human-readable signatures that don't need to be efficiently processed onchain.

### Example

The following is an example of using `signMessage` with MetaMask:

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
