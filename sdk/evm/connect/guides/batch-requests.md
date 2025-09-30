---
description: Batch multiple JSON-RPC requests using MetaMask Wallet SDK or Wagmi.
keywords: [SDK, Wagmi, batch, JSON-RPC, RPC, requests, methods, dapp]
---

# Batch requests

MetaMask Wallet SDK provides mechanisms to send multiple JSON-RPC requests in a single call.
However, "batching" can be used in a few different contexts:

- [**Wagmi batching for contract reads**](#use-wagmi-usereadcontracts) - Wagmi does not support MetaMask's generic batching mechanism.
   Instead, it provides the [`useReadContracts`](https://wagmi.sh/react/api/hooks/useReadContracts) hook to perform multiple contract read operations in a single hook call.
   This is specialized for retrieving data from smart contracts and returns an array of results corresponding to each read call.
   `useReadContracts` does not support batching JSON-RPC methods.

- [**Vanilla JavaScript batching with `metamask_batch`**](#use-vanilla-javascript-metamask_batch) -
   This approach uses MetaMask Wallet SDK's `metamask_batch` method to group any JSON-RPC requests together, whether they are contract calls or other JSON-RPC methods (for example, signing messages or sending transactions).
   Despite being batched into one HTTP request, each call still requires individual user approval, and if any request is rejected, the entire batch fails.

:::info
"Batching" can also refer to [sending atomic batch transactions](send-transactions/batch-transactions.md) in MetaMask.
Use the methods introduced by EIP-5792 to send atomic batches.
:::

## Use Wagmi (`useReadContracts`)

When using Wagmi, you can perform multiple contract read operations in a single hook call using `useReadContracts`.
This method is designed specifically for contract calls and batches them together internally, returning the results as an array.
It is not a generic JSON-RPC batching tool but rather a specialized solution for reading from smart contracts.

For more information, see the [Wagmi documentation](https://wagmi.sh/react/api/hooks/useReadContracts).

The following is an example of batching read operations using `useReadContracts`:

```js
import { useReadContracts } from "wagmi";

// Example contract definitions with their address and ABI
const contractA = {
  address: "0xContractAddress1",
  abi: contractABI1,
} as const;

const contractB = {
  address: "0xContractAddress2",
  abi: contractABI2,
} as const;

function MyBatchReadComponent() {
  const { data, isError, isLoading } = useReadContracts({
    contracts: [
      {
        ...contractA,
        functionName: "getValueA",
      },
      {
        ...contractA,
        functionName: "getValueB",
      },
      {
        ...contractB,
        functionName: "getValueX",
        args: [42],
      },
      {
        ...contractB,
        functionName: "getValueY",
        args: [42],
      },
    ],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;

  return (
    <div>
      <p>getValueA: {data?.[0]?.toString()}</p>
      <p>getValueB: {data?.[1]?.toString()}</p>
      <p>getValueX: {data?.[2]?.toString()}</p>
      <p>getValueY: {data?.[3]?.toString()}</p>
    </div>
  );
}
```

In this example, four contract read calls are batched together.
The results are returned as an array in the same order as the calls, allowing you to process each result accordingly.

:::tip
For a better user experience, it's important to use reliable RPC providers instead of public nodes.
We recommend using services like [MetaMask Developer](https://developer.metamask.io/) to ensure better reliability and performance.
:::

## Use Vanilla JavaScript (`metamask_batch`)

If you're not using Wagmi, you can directly use MetaMask Wallet SDK's `metamask_batch` method to group multiple JSON-RPC requests into a single HTTP call.

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
import { MetaMaskSDK } from "@metamask/sdk";

const MMSDK = new MetaMaskSDK();
const provider = MMSDK.getProvider();

async function handleBatchRequests() {
  // Example batch: one personal_sign call and one eth_sendTransaction call.
  const requests = [
    { method: "personal_sign", params: ["Hello from batch!", "0x1234..."] },
    {
      method: "eth_sendTransaction",
      params: [
        {
          from: "0x1234...",
          to: "0xABCD...",
          // Additional transaction parameters.
        },
      ],
    },
  ];

  try {
    const results = await provider.request({
      method: "metamask_batch",
      params: [requests],
    });
    console.log("Batch Results:", results);
  } catch (err) {
    console.error("Batch request failed:", err);
  }
}

document.getElementById("batchBtn").addEventListener("click", handleBatchRequests);
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
