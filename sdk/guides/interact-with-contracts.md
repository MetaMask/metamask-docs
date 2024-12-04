---
description: Interact with Contracts
---

# Contract Interactions

This guide covers the basics of interacting with smart contracts using the MetaMask SDK. We'll show how to read data from and write data to contracts using both Wagmi (recommended) and vanilla JavaScript.

### Using Wagmi

#### Reading Contract Data

```tsx
import { useReadContract } from 'wagmi'

function TokenBalance() {
  const { data: balance } = useReadContract({
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

  return <div>Balance: {balance?.toString()}</div>
}
```

#### Writing to Contracts

```tsx
import { useWriteContract } from 'wagmi'

function MintNFT() {
  const { writeContract } = useWriteContract()
  
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
  
  return <button onClick={mint}>Mint NFT</button>
}
```

### Using Vanilla JavaScript

#### Reading Contract Data

```javascript
const provider = window.ethereum;

async function getBalance(contractAddress, userAddress) {
  const result = await provider.request({
    method: 'eth_call',
    params: [{
      to: contractAddress,
      data: '0x70a08231000000000000000000000000' + userAddress.slice(2), // balanceOf(address)
    }],
  });
  return BigInt(result);
}
```

#### Writing to Contracts

```javascript
async function mintNFT(contractAddress, tokenId) {
  const accounts = await provider.request({ 
    method: 'eth_requestAccounts' 
  });
  
  return provider.request({
    method: 'eth_sendTransaction',
    params: [{
      from: accounts[0],
      to: contractAddress,
      data: '0x6a627842' + tokenId.toString(16).padStart(64, '0'), // mint(uint256)
    }],
  });
}
```

### Best Practices

1. Always check contract addresses and ABI correctness
2. Handle errors gracefully and show clear user feedback
3. Be mindful of gas costs for write operations
4. Consider transaction confirmations for important operations

### Next Steps

- [Advanced Reading Patterns](/sdk/guides/advanced-patterns/reading-contracts)
- [Advanced Writing Patterns](/sdk/guides/advanced-patterns/writing-contracts)
- [Production Readiness](/sdk/guides/production-readiness)
