---
description: Handle transactions with the SDK in your JavaScript dapp.
keywords: [SDK, JavaScript, send, transaction, transactions, status, estimate, gas, dapp]
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

<Tabs defaultValue="viem" values={[
{ label: "viem", value: "viem" },
{ label: "web3.js", value: "web3" },
{ label: "ethers.js", value: "ethers" },
{ label: "Ethereum API", value: "eth_api" },
]}>
<TabItem value="eth_api">

```javascript
import { MetaMaskSDK } from '@metamask/sdk'

// Initialize SDK
const MMSDK = new MetaMaskSDK()
const provider = MMSDK.getProvider()

// Get current account
const accounts = await provider.request({
  method: 'eth_requestAccounts',
})
const from = accounts[0]

// Convert ETH amount to wei (hex)
const value = `0x${(0.0001 * 1e18).toString(16)}`

// Prepare transaction
const transaction = {
  from,
  to: '0xRECIPIENT_ADDRESS',
  value,
  // Gas fields are optional - MetaMask will estimate
}

// Send transaction
const txHash = await provider.request({
  method: 'eth_sendTransaction',
  params: [transaction],
})

const tx = await provider.request({
  method: 'eth_getTransactionReceipt',
  params: [txHash],
})
```

</TabItem>
<TabItem value="viem">

```tsx
import { MetaMaskSDK } from '@metamask/sdk'
import { createPublicClient, createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

// Initialize SDK
const MMSDK = new MetaMaskSDK()
const provider = MMSDK.getProvider()

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
<TabItem value="ethers">

```tsx
import { MetaMaskSDK } from '@metamask/sdk'
import { ethers } from 'ethers'
import { BrowserProvider, parseUnits } from 'ethers'

// Initialize SDK
const MMSDK = new MetaMaskSDK()
const provider = MMSDK.getProvider()

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
<TabItem value="web3">

```tsx
import { MetaMaskSDK } from '@metamask/sdk'
import { Web3 } from 'web3'

// Initialize SDK
const MMSDK = new MetaMaskSDK()
const provider = MMSDK.getProvider()

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
</Tabs>

## Send an advanced transaction with gas estimation

To add gas estimation, use the [`eth_estimateGas`](../../../reference/json-rpc-api/index.md)
RPC method.

```javascript
async function estimateGas(transaction) {
  try {
    const gasEstimate = await ethereum.request({
      method: 'eth_estimateGas',
      params: [transaction],
    })

    // Add 20% buffer for safety
    return (BigInt(gasEstimate) * 120n) / 100n
  } catch (error) {
    console.error('Gas estimation failed:', error)
    throw error
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
