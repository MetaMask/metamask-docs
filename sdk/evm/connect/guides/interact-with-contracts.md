---
description: Interact with contracts with MM Connect in your JavaScript dapp.
keywords: [SDK, JavaScript, wagmi, read, write, smart, contract, contracts, dapp]
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

The following examples demonstrate how to use MM Connect with viem, web3.js, ethers.js, Ethereum APIs, or Wagmi to interact with Solidity smart contracts.

This simple Hello World contract allows anyone to read and write a message to it.

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

<Tabs>
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
<TabItem value="web3.js">

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
<TabItem value="ethers.js">

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
<TabItem value="Ethereum API">

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
<TabItem value="Wagmi">

```tsx
import { useReadContract } from 'wagmi'

function TokenBalance() {
  const {
    data: balance,
    isError,
    isLoading,
  } = useReadContract({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        stateMutability: 'view',
        inputs: [{ name: 'owner', type: 'address' }],
        outputs: [{ name: 'balance', type: 'uint256' }],
      },
    ],
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  if (isLoading) return <div>Loading balance...</div>
  if (isError) return <div>Error fetching balance</div>

  return <div>Balance: {balance?.toString()}</div>
}
```

</TabItem>
</Tabs>

### Batch contract reads

With Wagmi, you can perform multiple contract read operations using the [`useReadContracts`](https://wagmi.sh/react/api/hooks/useReadContracts) hook.
This hook batches contract calls internally, returning the results as an array.
For example:

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

:::info
"Batching" can also refer to [batching JSON-RPC requests](metamask-exclusive/batch-requests.md) using MM Connect's `metamask_batch` method, or [sending atomic batch transactions](send-transactions/batch-transactions.md) in MetaMask.
:::

## Write to contracts

<Tabs>
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
<TabItem value="web3.js">

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
<TabItem value="ethers.js">

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
<TabItem value="Ethereum API">

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
<TabItem value="Wagmi">

```tsx
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

function MintNFT() {
  const { writeContract, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  function mint() {
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: [
        {
          name: 'mint',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [{ name: 'tokenId', type: 'uint256' }],
          outputs: [],
        },
      ],
      functionName: 'mint',
      args: [123n], // Token ID
    })
  }

  return (
    <div>
      <button onClick={mint} disabled={isPending || isConfirming}>
        {isPending ? 'Confirming...' : 'Mint NFT'}
      </button>

      {hash && (
        <div>
          Transaction Hash: {hash}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>NFT Minted Successfully!</div>}
        </div>
      )}

      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
```

</TabItem>
</Tabs>

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
