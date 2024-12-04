---
description: Transaction Handling
---

# Transaction Handling

This guide covers how to send, track, and manage Ethereum transactions in your dApp. We'll cover both approaches using Wagmi (recommended) and vanilla JavaScript.

### Using Wagmi

Wagmi provides hooks for sending transactions and tracking their status, making it easy to implement a complete transaction flow.

#### Basic Transaction

```tsx
import { parseEther } from 'viem'
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'

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
      to: '0x...', 
      value: parseEther('0.1')  // 0.1 ETH
    })
  }

  return (
    <div>
      <button 
        onClick={handleSend}
        disabled={isPending}
      >
        {isPending ? 'Confirming...' : 'Send 0.1 ETH'}
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

#### Advanced Transaction with Gas Estimation

```tsx
import { parseEther } from 'viem'
import { 
  useSendTransaction, 
  useWaitForTransactionReceipt,
  useEstimateGas
} from 'wagmi'

function AdvancedTransaction() {
  const transaction = {
    to: '0x...',
    value: parseEther('0.1'),
    data: '0x...' // Optional contract interaction data
  }

  // Estimate gas
  const { data: gasEstimate } = useEstimateGas(transaction)

  const { sendTransaction } = useSendTransaction({
    ...transaction,
    gas: gasEstimate,
    onSuccess: (hash) => {
      console.log('Transaction sent:', hash)
    }
  })

  return <button onClick={() => sendTransaction()}>Send with Gas Estimate</button>
}
```

#### Handling Contract Transactions

```tsx
import { useContractWrite } from 'wagmi'

function ContractTransaction() {
  const { 
    write: mint,
    data: hash,
    isLoading,
    isSuccess 
  } = useContractWrite({
    address: '0x...',
    abi: [...],
    functionName: 'mint'
  })

  return (
    <div>
      <button onClick={() => mint({ args: [1] })}>
        {isLoading ? 'Minting...' : 'Mint NFT'}
      </button>
      {isSuccess && <div>Successfully minted!</div>}
    </div>
  )
}
```

### Using Vanilla JavaScript

For applications not using React, here's how to implement transaction handling with vanilla JavaScript.

#### Basic Transaction

```javascript
const provider = window.ethereum;

async function sendTransaction(recipientAddress, amount) {
  try {
    // Get current account
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    const from = accounts[0];

    // Prepare transaction
    const transaction = {
      from,
      to: recipientAddress,
      value: `0x${(amount * 1e18).toString(16)}`, // Convert ETH to Wei
      // Gas fields are optional - MetaMask will estimate
      gasLimit: '0x5028',
      maxPriorityFeePerGas: '0x3b9aca00',
      maxFeePerGas: '0x2540be400',
    };

    // Send transaction
    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [transaction],
    });

    // Return transaction hash
    return txHash;
  } catch (error) {
    if (error.code === 4001) {
      throw new Error('Transaction rejected by user');
    }
    throw error;
  }
}

// Transaction status tracking
function watchTransaction(txHash) {
  return new Promise((resolve, reject) => {
    const checkTransaction = async () => {
      try {
        const tx = await provider.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        });

        if (tx) {
          if (tx.status === '0x1') {
            resolve(tx);
          } else {
            reject(new Error('Transaction failed'));
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

#### Using with HTML

```html
<div class="transaction-form">
  <input type="text" id="recipient" placeholder="Recipient Address">
  <input type="number" id="amount" placeholder="Amount in ETH">
  <button onclick="handleSend()">Send ETH</button>
  <div id="status"></div>
</div>

<script>
async function handleSend() {
  const recipient = document.getElementById('recipient').value;
  const amount = document.getElementById('amount').value;
  const status = document.getElementById('status');
  
  try {
    status.textContent = 'Sending transaction...';
    const txHash = await sendTransaction(recipient, amount);
    status.textContent = `Transaction sent: ${txHash}`;

    // Watch for confirmation
    status.textContent = 'Waiting for confirmation...';
    await watchTransaction(txHash);
    status.textContent = 'Transaction confirmed!';
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
  }
}
</script>
```

### Advanced Examples

#### Batch Transactions

```typescript
// Using Wagmi
function BatchTransactions() {
  const { sendTransactionBatch } = useSendTransactionBatch()
  
  const transactions = [
    { to: '0x1...', value: parseEther('0.1') },
    { to: '0x2...', value: parseEther('0.2') }
  ]
  
  return (
    <button onClick={() => sendTransactionBatch({ transactions })}>
      Send Batch
    </button>
  )
}

// Using Vanilla JS
async function sendBatchTransactions(transactions) {
  const results = [];
  for (const tx of transactions) {
    const hash = await sendTransaction(tx.to, tx.value);
    results.push(await watchTransaction(hash));
  }
  return results;
}
```

#### Gas Estimation

```typescript
// Using Wagmi
function GasEstimatedTransaction() {
  const { data: gasLimit } = useEstimateGas({
    to: '0x...',
    value: parseEther('0.1')
  })

  const { sendTransaction } = useSendTransaction({
    gas: gasLimit ? gasLimit * 1.2n : undefined // Add 20% buffer
  })

  return <button onClick={() => sendTransaction()}>Send</button>
}

// Using Vanilla JS
async function estimateGas(transaction) {
  const gasEstimate = await provider.request({
    method: 'eth_estimateGas',
    params: [transaction]
  });
  
  // Add 20% buffer
  return BigInt(gasEstimate) * 120n / 100n;
}
```

### Best Practices

1. **Transaction Validation**
   - Always validate inputs before sending
   - Check wallet balance
   - Verify addresses are valid
   - Estimate gas costs

2. **Error Handling**
   - Handle common errors (rejection, insufficient funds)
   - Provide clear user feedback
   - Implement proper error recovery

3. **User Experience**
   - Show clear loading states
   - Display transaction progress
   - Provide transaction details
   - Allow transaction cancellation when possible

4. **Gas Management**
   - Use appropriate gas settings
   - Consider network congestion
   - Implement gas estimation
   - Allow user customization

### Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| 4001 | User rejected | Show retry option |
| -32603 | Insufficient funds | Check balance before sending |
| -32000 | Gas too low | Increase gas limit |
| -32002 | Pending request | Prevent multiple sends |

### Next Steps

- [Interact with Contracts](/sdk/guides/interact-with-contracts)
- [Advanced Transaction Patterns](/sdk/guides/advanced-transaction-patterns)
- [Production Checklist](/sdk/guides/production-checklist)