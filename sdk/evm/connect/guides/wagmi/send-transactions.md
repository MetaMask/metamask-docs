---
description: Handle transactions with MM Connect in your Wagmi dapp.
keywords: [SDK, Wagmi, JavaScript, send, transaction, transactions, status, estimate, gas, dapp]
toc_max_heading_level: 2
---

# Send transactions

Handle EVM transactions in your Wagmi dapp.
With MM Connect, you can:

- **Send transactions**.
- **Track transaction status** in real time.
- **Estimate gas costs** accurately.
- **Handle transaction errors** gracefully.
- **Manage complex transaction patterns**.

Wagmi provides hooks for sending transactions and tracking their status.
The following are examples of sending a [basic transaction](#send-a-basic-transaction) and an
[advanced transaction with gas estimation](#send-an-advanced-transaction-with-gas-estimation).

:::info Send batch transactions
This page describes how to send one transaction at a time using Wagmi.
You can also follow [this tutorial to send atomic batch transactions](/tutorials/upgrade-eoa-to-smart-account) with Wagmi and MM Connect, upgrading an externally owned account to a smart account (specified by [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) and [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)).
:::

## Send a basic transaction

```tsx
import { parseEther } from "viem"
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi"

function SendTransaction() {
  const { 
    data: hash,
    error,
    isPending,
    sendTransaction
  } = useSendTransaction()

  const { 
    isLoading: isConfirming,
    isSuccess: isConfirmed 
  } = useWaitForTransactionReceipt({
    hash
  })

  async function handleSend() {
    sendTransaction({
      to: "0x...", 
      value: parseEther("0.1")  // 0.1 ETH
    })
  }

  return (
    <div>
      <button 
        onClick={handleSend}
        disabled={isPending}
      >
        {isPending ? "Confirming..." : "Send 0.1 ETH"}
      </button>

      {hash && (
        <div>
          Transaction Hash: {hash}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed!</div>}
        </div>
      )}

      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
```

## Send an advanced transaction with gas estimation

```tsx
import { parseEther } from "viem"
import { 
  useSendTransaction, 
  useWaitForTransactionReceipt,
  useEstimateGas
} from "wagmi"

function AdvancedTransaction() {
  const transaction = {
    to: "0x...",
    value: parseEther("0.1"),
    data: "0x..." // Optional contract interaction data
  }

  // Estimate gas
  const { data: gasEstimate } = useEstimateGas(transaction)

  const { sendTransaction } = useSendTransaction({
    ...transaction,
    gas: gasEstimate,
    onSuccess: (hash) => {
      console.log("Transaction sent:", hash)
    }
  })

  return <button onClick={() => sendTransaction()}>Send with Gas Estimate</button>
}
```

## Best practices

Follow these best practices when handling transactions.

#### Transaction security

- Always **validate inputs** before sending transactions.
- Check wallet balances to **ensure sufficient** funds.
- **Verify addresses** are valid.

#### Error handling

- Handle [common errors](#common-errors) like **user rejection** and **insufficient funds**.
- Provide **clear error messages** to users.
- Implement proper **error recovery** flows.
- Consider **network congestion** in gas estimates.

#### User experience

- Display **clear loading states** during transactions.
- Show **transaction progress** in real time.
- Provide **detailed transaction information**.
## Common errors

| Error code | Description | Solution |
|------------|-------------|----------|
| `4001`   | User rejected transaction | Show a retry option and a clear error message.  |
| `-32603` | Insufficient funds        | Check the balance before sending a transaction. |
| `-32000` | Gas too low               | Increase the gas limit or add a buffer to the estimation. |
| `-32002` | Request already pending   | Prevent multiple concurrent transactions.       |

## Next steps

See the following guides to add more functionality to your dapp:

- [Manage user accounts](manage-user-accounts.md)
- [Manage networks](manage-networks.md)
- [Interact with smart contracts](interact-with-contracts.md)
