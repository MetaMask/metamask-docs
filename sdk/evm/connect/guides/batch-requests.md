---
description: Batch multiple JSON-RPC requests using MM Connect.
keywords: [SDK, batch, JSON-RPC, RPC, requests, methods, dapp]
---

# Batch requests

MM Connect provides a `metamask_batch` method to send multiple JSON-RPC requests in a single call.
These requests can be contract calls or other JSON-RPC methods (for example, signing messages or sending transactions).
Despite being batched into one HTTP request, each call still requires individual user approval, and if any request is rejected, the entire batch fails.

:::info
"Batching" can also refer to [Wagmi contract read batching](./wagmi/interact-with-contracts.md#batch-contract-reads) or
[sending atomic batch transactions](send-transactions/batch-transactions.md) in MetaMask.
:::

## Batch JSON-RPC requests

You can directly use MM Connect's `metamask_batch` method to group multiple JSON-RPC requests into a single HTTP call.

Use cases include:

- **Batching multiple signatures** - Send multiple signing requests in one batch.
- **Switching networks** - Switch the EVM network, perform an action such as sending a transaction, and switch back, all in one batch.
- **Mixed transactions and signatures** - Combine transaction sending and signing requests in one batch.

:::note
When using `metamask_batch`, keep in mind the following:

- Even though the requests are batched, each individual request still requires user approval.
- If any request in the batch is rejected, the entire batch will fail.
  :::

The following is an example of batching JSON-RPC requests using `metamask_batch`:

```js
import { createEVMClient } from '@metamask/connect/evm'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

async function handleBatchRequests() {
  // Example batch: one personal_sign call and one eth_sendTransaction call.
  const requests = [
    { method: 'personal_sign', params: ['Hello from batch!', '0x1234...'] },
    {
      method: 'eth_sendTransaction',
      params: [
        {
          from: '0x1234...',
          to: '0xABCD...',
          // Additional transaction parameters.
        },
      ],
    },
  ]

  try {
    const results = await provider.request({
      method: 'metamask_batch',
      params: [requests],
    })
    console.log('Batch Results:', results)
  } catch (err) {
    console.error('Batch request failed:', err)
  }
}

document.getElementById('batchBtn').addEventListener('click', handleBatchRequests)
```

The following HTML displays a **Send Batch** button:

```html
<button id="batchBtn">Send Batch</button>
```

:::tip Tips

- For a better user experience, it's important to use reliable RPC providers instead of public nodes.
  We recommend using services like [MetaMask Developer](https://developer.metamask.io/) to ensure better reliability and performance.
- Ensure that requests in a batch do not depend on one another's chain context, as mid-batch state changes can affect outcomes.
  :::
