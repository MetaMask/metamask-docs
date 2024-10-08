---
description: Batch multiple JSON-RPC requests using MetaMask SDK.
sidebar_position: 9
tags:
  - JavaScript SDK
---

# Batch JSON-RPC requests

You can batch multiple JSON-RPC requests in a single RPC call using MetaMask SDK.
This feature enables dapps to interact with EVM networks in a streamlined way, and enables complex
sequences of actions.
It enhances performance, usability, and efficiency by reducing the number of network calls made to MetaMask.

Use cases for batching requests include:

- **Batching multiple signatures** - Send multiple signing requests in one batch.
- **Switching networks** - Switch the EVM network, perform an action such as sending a transaction,
  and switch back, all in one batch.
- **Mixed transactions and signatures** - Combine transaction sending and signing requests in one batch.

This feature opens up additional possibilities for sophisticated transaction flows in dapps,
enhancing the user experience and operational efficiency.

## Prerequisites

[Set up MetaMask SDK](index.md) in your JavaScript dapp.

## Use the `metamask_batch` method

The SDK provides the `metamask_batch` method, which takes an array of JSON-RPC requests (`ChainRPC[]`) as its parameter.

Each request in the batch is independent.
The user receives a prompt for each action within the batch, allowing them to approve or reject
individual requests.
If any request is rejected, the entire batch fails and an error is returned, ensuring integrity in
transactional operations.

The method returns an array of results corresponding to each request.

### React / Next.js / React Native example

The following is an example of using `metamask_batch` to batch
[`personal_sign`](/wallet/reference/personal_sign) and
[`eth_sendTransaction`](/wallet/reference/eth_sendtransaction) in React, Next.js, or React Native/Expo:

```javascript title="index.js"
import { MetaMaskSDK } from "@metamask/sdk";

function MyComponent() {
  const handleBatchRequest = async () => {
    const batchRequests = [
      { method: "personal_sign", params: ["message", "address"] },
      {
        method: "eth_sendTransaction",
        params: [
          {
            /* Transaction parameters */
          },
        ],
      },
    ]

    try {
      const results = await provider.request({ 
        method: "metamask_batch", 
        params: batchRequests 
      });
      console.log(results) // Process results.
    } catch (error) {
      console.error("Batch request failed", error)
    }
  }

  return <button onClick={handleBatchRequest}>Send Batch Request</button>
}
```

### Vue.js example

The following is an example of using `metamask_batch` to batch
[`personal_sign`](/wallet/reference/personal_sign) and
[`eth_sendTransaction`](/wallet/reference/eth_sendtransaction) in Vue.js:

```javascript title="index.vue"
<script>
import { MetaMaskSDK } from "@metamask/sdk";

export default {
  methods: {
    async sendBatchRequest() {
      const batchRequests = [
        { method: "personal_sign", params: ["message", "address"] },
        {
          method: "eth_sendTransaction",
          params: [
            {
              /* Transaction parameters */
            },
          ],
        },
      ];

      try {
        const results = await provider.request({ 
          method: "metamask_batch", 
          params: batchRequests 
        });
        console.log(results);
      } catch (error) {
        console.error("Error in batch request", error);
      }
    }
  }
}
</script>
```

### Best practices

Follow these guidelines when using `metamask_batch`:

- **Ensure each request in the batch is properly formatted** according to the JSON-RPC specifications.

- **Handle errors gracefully**, especially when a batch request is partially approved.

- **Test batch operations thoroughly** to ensure consistent behavior across different networks and accounts.

- **Be aware of the dependencies between chained requests.**
  Avoid creating a dependency where the outcome of one request directly influences the context or
  validity of a subsequent request within the same batch.
  For example, avoid chaining a [`wallet_switchEthereumChain`](/wallet/reference/wallet_switchethereumchain)
  request with [`eth_signTypedData_v4`](/wallet/reference/eth_signtypeddata_v4), because
  `eth_signTypedData_v4` relies on the current chain ID, which would be altered by `wallet_switchEthereumChain`.
  This approach ensures that each request in the batch operates independently and maintains its
  integrity, regardless of changes introduced by preceding requests in the batch.
