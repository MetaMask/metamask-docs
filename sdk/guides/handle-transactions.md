---
description: Handle transactions with the SDK in your Wagmi or Vanilla JavaScript dapp.
toc_max_heading_level: 2
---

# Handle transactions

Handle EVM transactions in your [Wagmi](#use-wagmi) or [Vanilla JavaScript](#use-vanilla-javascript) dapp.
With the SDK, you can:

- **Send transactions**.
- **Track transaction status** in real time.
- **Estimate gas costs** accurately.
- **Handle transaction errors** gracefully.
- **Manage complex transaction patterns**.

## Use Wagmi

Wagmi provides hooks for sending transactions and tracking their status.
The following are examples of sending a [basic transaction](#basic-transaction) and an
[advanced transaction with gas estimation](#advanced-transaction-with-gas-estimation).

### Basic transaction

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

### Advanced transaction with gas estimation

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

## Use Vanilla JavaScript

You can implement transaction handling directly in Vanilla JavaScript.
The following are examples of sending a [basic transaction](#basic-transaction-1) and an
[advanced transaction with gas estimation](#advanced-transaction-with-gas-estimation-1).

### Basic transaction

The basic transaction uses the [`eth_requestAccounts`](/wallet/reference/json-rpc-methods/eth_requestaccounts),
[`eth_sendTransaction`](/wallet/reference/json-rpc-methods/eth_sendtransaction), and
[`eth_getTransactionReceipt`](/wallet/reference/json-rpc-methods/eth_gettransactionreceipt)
RPC methods.

```javascript
async function sendTransaction(recipientAddress, amount) {
  try {
    // Get current account
    const accounts = await ethereum.request({ 
      method: "eth_requestAccounts" 
    });
    const from = accounts[0];

    // Convert ETH amount to wei (hex)
    const value = `0x${(amount * 1e18).toString(16)}`;

    // Prepare transaction
    const transaction = {
      from,
      to: recipientAddress,
      value,
      // Gas fields are optional - MetaMask will estimate
    };

    // Send transaction
    const txHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transaction],
    });

    return txHash;
  } catch (error) {
    if (error.code === 4001) {
      throw new Error("Transaction rejected by user");
    }
    throw error;
  }
}

// Track transaction status
function watchTransaction(txHash) {
  return new Promise((resolve, reject) => {
    const checkTransaction = async () => {
      try {
        const tx = await ethereum.request({
          method: "eth_getTransactionReceipt",
          params: [txHash],
        });

        if (tx) {
          if (tx.status === "0x1") {
            resolve(tx);
          } else {
            reject(new Error("Transaction failed"));
          }
        } else {
          setTimeout(checkTransaction, 2000); // Check every 2 seconds
        }
      } catch (error) {
        reject(error);
      }
    };

    checkTransaction();
  });
}
```

The following is an example implementation of the basic transaction:

```html
<div class="transaction-form">
  <input type="text" id="recipient" placeholder="Recipient Address">
  <input type="number" id="amount" placeholder="Amount in ETH">
  <button onclick="handleSend()">Send ETH</button>
  <div id="status"></div>
</div>

<script>
async function handleSend() {
  const recipient = document.getElementById("recipient").value;
  const amount = document.getElementById("amount").value;
  const status = document.getElementById("status");
  
  try {
    status.textContent = "Sending transaction...";
    const txHash = await sendTransaction(recipient, amount);
    status.textContent = `Transaction sent: ${txHash}`;

    // Watch for confirmation
    status.textContent = "Waiting for confirmation...";
    await watchTransaction(txHash);
    status.textContent = "Transaction confirmed!";
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
  }
}
</script>
```

### Advanced transaction with gas estimation

To add gas estimation, use the [`eth_estimateGas`](/wallet/reference/json-rpc-methods/eth_estimategas)
RPC method.

```javascript
async function estimateGas(transaction) {
  try {
    const gasEstimate = await ethereum.request({
      method: "eth_estimateGas",
      params: [transaction]
    });
    
    // Add 20% buffer for safety
    return BigInt(gasEstimate) * 120n / 100n;
  } catch (error) {
    console.error("Gas estimation failed:", error);
    throw error;
  }
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

- [Authenticate users](authenticate-users.md)
- [Manage networks](manage-networks.md)
- [Interact with smart contracts](interact-with-contracts.md)
