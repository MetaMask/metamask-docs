---
description: Interact with contracts with MM Connect in your JavaScript dapp.
keywords: [SDK, JavaScript, read, write, smart, contract, contracts, dapp]
sidebar_label: Interact with contracts
toc_max_heading_level: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Interact with smart contracts

Interact with smart contracts in your JavaScript dapp.
With MM Connect, you can:

- **Read data** from smart contracts.
- **Write data** to smart contracts.
- **Handle contract events**.
- **Manage transaction states**.
- **Handle contract errors**.

## Solidity smart contract

In this example, we'll be demonstrating how to use MetaMask Connect SDK with viem, web3.js, ethers.js or with ETH APIs to interact with Solidity smart contracts.

The simple Hello World contract allows anyone to read and write a message to it.

```tsx
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {

  string public message;

  constructor(string memory initMessage) {
    message = initMessage;
  }

  function update(string memory newMessage) public {
    message = newMessage;
  }
}
```

## Read from contracts

<Tabs
defaultValue="viem"
values={[
{ label: "viem", value: "viem" },
{ label: "web3.js", value: "web3" },
{ label: "ethers.js", value: "ethers" },
{ label: "ETH APIs", value: "eth_api" },
]}>

<TabItem value="ethers">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { ethers } from 'ethers'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const ethersProvider = new ethers.BrowserProvider(provider)
const signer = await ethersProvider.getSigner()

const contractABI = [
  {
    inputs: [{ internalType: 'string', name: 'initMessage', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'newMessage', type: 'string' }],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
const contractAddress = '0x04cA407965D60C2B39d892a1DFB1d1d9C30d0334'
const contract = new ethers.Contract(
  contractAddress,
  JSON.parse(JSON.stringify(contractABI)),
  signer
)

// Read message from smart contract
const message = await contract.message()
```

</TabItem>
<TabItem value="web3">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { Web3 } from 'web3'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const web3 = new Web3(provider)

const contractABI = [
  {
    inputs: [{ internalType: 'string', name: 'initMessage', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'newMessage', type: 'string' }],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
const contractAddress = '0x04cA407965D60C2B39d892a1DFB1d1d9C30d0334'
const contract = new web3.eth.Contract(contractABI, contractAddress)

// Read message from smart contract
const message = await contract.methods.message().call()
```

</TabItem>
<TabItem value="viem">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { createPublicClient, custom } from 'viem'
import { sepolia } from 'viem/chains'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const publicClient = createPublicClient({
  chain: sepolia,
  transport: custom(provider),
})

const contractABI = [
  {
    inputs: [{ internalType: 'string', name: 'initMessage', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'newMessage', type: 'string' }],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const contractAddress = '0x8AA6820B3F197384874fAdb355361758258cb981' // On Sepolia testnet, replace with your contract address

// Read message from smart contract
const message = await publicClient.readContract({
  address: contractAddress,
  abi: contractABI,
  functionName: 'message',
})
```

</TabItem>
<TabItem value="eth_api">

```tsx
import { createEVMClient } from '@metamask/connect/evm'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

async function getMessage(contractAddress, userAddress) {
  try {
    // Create function signature for balanceOf(address)
    const functionSignature = '0x06fdde03'
    // Pad address to 32 bytes
    const encodedAddress = userAddress.slice(2).padStart(64, '0')
    const result = await provider.request({
      method: 'eth_call',
      params: [
        {
          to: contractAddress,
          data: functionSignature + encodedAddress,
        },
      ],
    })
    return result
  } catch (error) {
    console.error('Error reading message:', error)
    throw error
  }
}

// Example usage
async function displayMessage() {
  const status = document.getElementById('status')
  try {
    const message = await getMessage('0xContractAddress', '0xUserAddress')
    status.textContent = `Message: ${message}`
  } catch (error) {
    status.textContent = `Error: ${error.message}`
  }
}
```

</TabItem>
</Tabs>

## Write to contracts

<Tabs
defaultValue="viem"
values={[
{ label: "viem", value: "viem" },
{ label: "web3.js", value: "web3" },
{ label: "ethers.js", value: "ethers" },
{ label: "ETH APIs", value: "eth_api" },
]}>

<TabItem value="ethers">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { ethers } from 'ethers'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const ethersProvider = new ethers.BrowserProvider(provider)
const signer = await ethersProvider.getSigner()

const contractABI = [
  {
    inputs: [{ internalType: 'string', name: 'initMessage', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'newMessage', type: 'string' }],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
const contractAddress = '0x04cA407965D60C2B39d892a1DFB1d1d9C30d0334'
const contract = new ethers.Contract(
  contractAddress,
  JSON.parse(JSON.stringify(contractABI)),
  signer
)

// Send transaction to smart contract to update message
const tx = await contract.update('NEW_MESSAGE')

// Wait for transaction to finish
const receipt = await tx.wait()
```

</TabItem>
<TabItem value="web3">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { Web3 } from 'web3'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const web3 = new Web3(provider)

const contractABI = [
  {
    inputs: [{ internalType: 'string', name: 'initMessage', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
]
const contractAddress = '0x04cA407965D60C2B39d892a1DFB1d1d9C30d0334'
const contract = new web3.eth.Contract(contractABI, contractAddress)

// Send transaction to smart contract to update message
const tx = await contract.methods.update('NEW_MESSAGE').send({ from: signer.getAddress() })

// Wait for transaction to finish
const receipt = await tx.wait()
```

</TabItem>
<TabItem value="viem">

```tsx
import { createEVMClient } from '@metamask/connect/evm'
import { createPublicClient, custom } from 'viem'
import { sepolia } from 'viem/chains'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

const contractABI = [
  {
    inputs: [{ internalType: 'string', name: 'initMessage', type: 'string' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'message',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'newMessage', type: 'string' }],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
const publicClient = createPublicClient({
  chain: sepolia,
  transport: custom(provider),
})

const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(provider),
})

const contractAddress = '0x8AA6820B3F197384874fAdb355361758258cb981' // On Sepolia, replace with your contract address
const address = await walletClient.getAddresses()

// Submit transaction to the blockchain
const hash = await walletClient.writeContract({
  account: address[0],
  address: contractAddress,
  abi: JSON.parse(JSON.stringify(contractABI)),
  functionName: 'update',
  args: ['NEW_MESSAGE'],
})

// Send transaction to smart contract to update message
const receipt = await publicClient.waitForTransactionReceipt({ hash })
```

</TabItem>
<TabItem value="eth_api">

```tsx
import { createEVMClient } from '@metamask/connect/evm'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

async function updateMessage(contractAddress, userAddress, newMessage) {
  try {
    const tx = await provider.request({
      method: 'update',
      params: [contractAddress, newMessage],
    })
    return tx
  } catch (error) {
    console.error('Error updating message:', error)
    throw error
  }
}

// Example usage
async function updateMessageExample() {
  const status = document.getElementById('status')
  try {
    const tx = await updateMessage('0xContractAddress', '0xUserAddress', 'NEW_MESSAGE')
    status.textContent = `Transaction: ${tx}`
  } catch (error) {
    status.textContent = `Error: ${error.message}`
  }
}
```

</TabItem>

</Tabs>

## Read and write to contracts

You can implement smart contract interactions directly in JavaScript.

The following example reads contract data using the [`eth_call`](../../reference/json-rpc-api/index.md) RPC method:

```javascript
import { createEVMClient } from '@metamask/connect/evm'

const evmClient = createEVMClient()
const provider = evmClient.getProvider()

async function getBalance(contractAddress, userAddress) {
  try {
    // Create function signature for balanceOf(address)
    const functionSignature = '0x70a08231'
    // Pad address to 32 bytes
    const encodedAddress = userAddress.slice(2).padStart(64, '0')

    const result = await provider.request({
      method: 'eth_call',
      params: [
        {
          to: contractAddress,
          data: functionSignature + encodedAddress,
        },
      ],
    })

    return BigInt(result)
  } catch (error) {
    console.error('Error reading balance:', error)
    throw error
  }
}

// Example usage
async function displayBalance() {
  const status = document.getElementById('status')
  try {
    const balance = await getBalance('0xContractAddress', '0xUserAddress')
    status.textContent = `Balance: ${balance.toString()}`
  } catch (error) {
    status.textContent = `Error: ${error.message}`
  }
}
```

The following example writes to contracts using the [`eth_requestAccounts`](../../reference/json-rpc-api/index.md),
[`eth_sendTransaction`](../../reference/json-rpc-api/index.md), and
[`eth_getTransactionReceipt`](../../reference/json-rpc-api/index.md)
RPC methods:

```javascript
async function mintNFT(contractAddress, tokenId) {
  try {
    // Get user's account
    const accounts = await provider.request({
      method: 'eth_requestAccounts',
    })

    // Create function signature for mint(uint256)
    const functionSignature = '0x6a627842'
    // Pad tokenId to 32 bytes
    const encodedTokenId = tokenId.toString(16).padStart(64, '0')

    // Send transaction
    const txHash = await provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: accounts[0],
          to: contractAddress,
          data: functionSignature + encodedTokenId,
        },
      ],
    })

    return txHash
  } catch (error) {
    if (error.code === 4001) {
      throw new Error('Transaction rejected by user')
    }
    throw error
  }
}

// Track transaction status
async function watchTransaction(txHash) {
  return new Promise((resolve, reject) => {
    const checkTransaction = async () => {
      try {
        const tx = await provider.request({
          method: 'eth_getTransactionReceipt',
          params: [txHash],
        })

        if (tx) {
          if (tx.status === '0x1') {
            resolve(tx)
          } else {
            reject(new Error('Transaction failed'))
          }
        } else {
          setTimeout(checkTransaction, 2000)
        }
      } catch (error) {
        reject(error)
      }
    }

    checkTransaction()
  })
}
```

The following is an example implementation of contract interaction:

```html
<div class="contract-interaction">
  <button onclick="handleMint()">Mint NFT</button>
  <div id="status"></div>
</div>

<script>
  async function handleMint() {
    const status = document.getElementById('status')

    try {
      status.textContent = 'Sending transaction...'
      const txHash = await mintNFT('0xContractAddress', 123)
      status.textContent = `Transaction sent: ${txHash}`

      status.textContent = 'Waiting for confirmation...'
      await watchTransaction(txHash)
      status.textContent = 'NFT Minted Successfully!'
    } catch (error) {
      status.textContent = `Error: ${error.message}`
    }
  }
</script>
```

## Best practices

Follow these best practices when interacting with smart contracts.

#### Contract validation

- Always **verify contract addresses**.
- Double check **ABI correctness**.
- **Validate input data** before sending.
- Use **typed data** when possible (for example, using [Viem](https://viem.sh/)).

#### Error handling

- Handle [common errors](#common-errors) like **user rejection** and **contract reverts**.
- Provide **clear error messages** to users.
- Implement proper **error recovery** flows.
- Consider **gas estimation failures**.

#### User experience

- Show **clear loading states**.
- Display **transaction progress**.
- Provide **confirmation feedback**.
- Enable proper **error recovery**.

## Common errors

| Error code | Description                 | Solution                                                       |
| ---------- | --------------------------- | -------------------------------------------------------------- |
| `4001`     | User rejected transaction   | Show a retry option and a clear error message.                 |
| `-32000`   | Invalid input               | Validate the input data before sending.                        |
| `-32603`   | Contract execution reverted | Check the contract conditions and handle the error gracefully. |
| `-32002`   | Request already pending     | Prevent multiple concurrent transactions.                      |

## Next steps

See the following guides to add more functionality to your dapp:

- [Manage user accounts](manage-user-accounts.md)
- [Manage networks](manage-networks.md)
- [Send transactions](send-transactions/index.md)
