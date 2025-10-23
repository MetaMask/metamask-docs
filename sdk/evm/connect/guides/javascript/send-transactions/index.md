---
description: Handle transactions with the SDK in your JavaScript dapp.
keywords: [SDK, JavaScript, send, transaction, transactions, status, estimate, gas, dapp]
toc_max_heading_level: 2
---

# Send transactions

Handle EVM transactions in your JavaScript dapp.
With the SDK, you can:

- **Send transactions**.
- **Track transaction status** in real time.
- **Estimate gas costs** accurately.
- **Handle transaction errors** gracefully.
- **Manage complex transaction patterns**.

You can implement transaction handling directly in JavaScript.
The following are examples of sending a [basic transaction](#send-a-basic-transaction) and an
[advanced transaction with gas estimation](#send-an-advanced-transaction-with-gas-estimation).

## Send a basic transaction

The basic transaction uses the [`eth_requestAccounts`](../../../reference/json-rpc-api/index.md),
[`eth_sendTransaction`](../../../reference/json-rpc-api/index.md), and
[`eth_getTransactionReceipt`](../../../reference/json-rpc-api/index.md)
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

## Send an advanced transaction with gas estimation

To add gas estimation, use the [`eth_estimateGas`](../../../reference/json-rpc-api/index.md)
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

- [Manage user accounts](../manage-user-accounts.md)
- [Manage networks](../manage-networks.md)
- [Interact with smart contracts](../interact-with-contracts.md)
