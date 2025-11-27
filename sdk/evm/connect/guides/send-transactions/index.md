---
description: Handle transactions with MM Connect in your JavaScript dapp.
keywords: [SDK, JavaScript, wagmi, send, transaction, transactions, status, estimate, gas, dapp]
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Send transactions

Handle EVM transactions in your JavaScript dapp.
With MM Connect, you can:

- **Send transactions**.
- **Track transaction status** in real time.
- **Estimate gas costs** accurately.
- **Handle transaction errors** gracefully.
- **Manage complex transaction patterns**.

The following examples demonstrate how to use MM Connect with viem, web3.js, ethers.js, Ethereum APIs, or Wagmi to send a [basic transaction](#send-a-basic-transaction) and an
[advanced transaction with gas estimation](#send-an-advanced-transaction-with-gas-estimation).

## Send a basic transaction

<Tabs>
<TabItem value="viem">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { createPublicClient, createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const publicClient = createPublicClient({ chain: mainnet, transport: custom(provider) })
const walletClient = createWalletClient({ chain: mainnet, transport: custom(provider) })

// data for the transaction
const destination = '0xRECIPIENT_ADDRESS'
const amount = parseEther('0.0001')
const address = await walletClient.getAddresses()

// Submit transaction to the blockchain
const hash = await walletClient.sendTransaction({
  account: address[0],
  to: destination,
  value: amount,
})

const receipt = await publicClient.waitForTransactionReceipt({ hash })
```

</TabItem>
<TabItem value="web3.js">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { Web3 } from 'web3'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const web3 = new Web3(provider)

// Get user's Ethereum public address
const fromAddress = (await web3.eth.getAccounts())[0]

const destination = '0xRECIPIENT_ADDRESS'
const amount = web3.utils.toWei('0.0001') // Convert 0.0001 ether to wei

// Submit transaction to the blockchain and wait for it to be mined
const receipt = await web3.eth.sendTransaction({
  from: fromAddress,
  to: destination,
  value: amount,
})
```

</TabItem>
<TabItem value="ethers.js">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { ethers } from 'ethers'
import { BrowserProvider, parseUnits } from 'ethers'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const ethersProvider = new ethers.BrowserProvider(provider)
const signer = await ethersProvider.getSigner()

const destination = '0xRECIPIENT_ADDRESS'
const amount = parseUnits('0.0001', 'ether')

// Submit transaction to the blockchain
const tx = await signer.sendTransaction({
  to: destination,
  value: amount,
})

// Wait for the transaction to be mined
const receipt = await tx.wait()
```

</TabItem>
<TabItem value="Ethereum API">

```javascript
import { createEVMClient } from "@metamask/connect/evm";

const evmClient = createEVMClient();
const provider = evmClient.getProvider();

async function sendTransaction(recipientAddress, amount) {
  try {
    // Get current account
    const accounts = await provider.request({ 
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
    const txHash = await provider.request({
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
        const tx = await provider.request({
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

</TabItem>
<TabItem value="Wagmi">

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

</TabItem>
</Tabs>

## Send an advanced transaction with gas estimation

<Tabs>
<TabItem value="Ethereum API">

```javascript
import { createEVMClient } from "@metamask/connect/evm";

const evmClient = createEVMClient();
const provider = evmClient.getProvider();

async function estimateGas(transaction) {
  try {
    const gasEstimate = await provider.request({
      method: "eth_estimateGas",
      params: [transaction]
    });
    
    // Add 20% buffer for safety
    return (BigInt(gasEstimate) * 120n) / 100n
  } catch (error) {
    console.error('Gas estimation failed:', error)
    throw error
  }
}
```

</TabItem>
<TabItem value="Wagmi">

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

</TabItem>
</Tabs>

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

| Error code | Description               | Solution                                                  |
| ---------- | ------------------------- | --------------------------------------------------------- |
| `4001`     | User rejected transaction | Show a retry option and a clear error message.            |
| `-32603`   | Insufficient funds        | Check the balance before sending a transaction.           |
| `-32000`   | Gas too low               | Increase the gas limit or add a buffer to the estimation. |
| `-32002`   | Request already pending   | Prevent multiple concurrent transactions.                 |

## Next steps

See the following guides to add more functionality to your dapp:

- [Manage user accounts](../manage-user-accounts.md)
- [Manage networks](../manage-networks.md)
- [Interact with smart contracts](../interact-with-contracts.md)
