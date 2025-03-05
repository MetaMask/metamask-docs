---
description: Interact with contracts
sidebar_label: Interact with contracts
toc_max_heading_level: 2
---

# Interact with smart contracts 

Interact with smart contracts in your [Wagmi](#use-wagmi) or [Vanilla JavaScript](#use-vanilla-javascript) dapp.
With the SDK, you can:

- **Read data** from smart contracts.
- **Write data** to smart contracts.
- **Handle contract events**.
- **Manage transaction states**.
- **Handle contract errors**.

## Use Wagmi

Wagmi provides dedicated hooks for smart contract interactions.
The following are examples of using these hooks.

Read contract data:

```tsx
import { useReadContract } from "wagmi"

function TokenBalance() {
  const { 
    data: balance,
    isError,
    isLoading 
  } = useReadContract({
    address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
    abi: [
      {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "owner", type: "address" }],
        outputs: [{ name: "balance", type: "uint256" }],
      },
    ],
    functionName: "balanceOf",
    args: ["0x03A71968491d55603FFe1b11A9e23eF013f75bCF"],
  })

  if (isLoading) return <div>Loading balance...</div>
  if (isError) return <div>Error fetching balance</div>
  
  return <div>Balance: {balance?.toString()}</div>
}
```

Write to contracts:

```tsx
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi"

function MintNFT() {
  const { 
    writeContract,
    data: hash,
    error,
    isPending 
  } = useWriteContract()

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed
  } = useWaitForTransactionReceipt({
    hash
  })
  
  function mint() {
    writeContract({
      address: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
      abi: [
        {
          name: "mint",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [],
        },
      ],
      functionName: "mint",
      args: [123n], // Token ID
    })
  }
  
  return (
    <div>
      <button 
        onClick={mint}
        disabled={isPending || isConfirming}
      >
        {isPending ? "Confirming..." : "Mint NFT"}
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

## Use Vanilla JavaScript

You can implement smart contract interactions directly in Vanilla JavaScript.

For example, read contract data:

```javascript
async function getBalance(contractAddress, userAddress) {
  try {
    // Create function signature for balanceOf(address)
    const functionSignature = "0x70a08231";
    // Pad address to 32 bytes
    const encodedAddress = userAddress.slice(2).padStart(64, "0");
    
    const result = await ethereum.request({
      method: "eth_call",
      params: [{
        to: contractAddress,
        data: functionSignature + encodedAddress,
      }],
    });
    
    return BigInt(result);
  } catch (error) {
    console.error("Error reading balance:", error);
    throw error;
  }
}

// Example usage
async function displayBalance() {
  const status = document.getElementById("status");
  try {
    const balance = await getBalance(
      "0xContractAddress",
      "0xUserAddress"
    );
    status.textContent = `Balance: ${balance.toString()}`;
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
  }
}
```

Write to contracts:

```javascript
async function mintNFT(contractAddress, tokenId) {
  try {
    // Get user's account
    const accounts = await ethereum.request({ 
      method: "eth_requestAccounts" 
    });
    
    // Create function signature for mint(uint256)
    const functionSignature = "0x6a627842";
    // Pad tokenId to 32 bytes
    const encodedTokenId = tokenId.toString(16).padStart(64, "0");
    
    // Send transaction
    const txHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [{
        from: accounts[0],
        to: contractAddress,
        data: functionSignature + encodedTokenId,
      }],
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
async function watchTransaction(txHash) {
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
          setTimeout(checkTransaction, 2000);
        }
      } catch (error) {
        reject(error);
      }
    };

    checkTransaction();
  });
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
  const status = document.getElementById("status");
  
  try {
    status.textContent = "Sending transaction...";
    const txHash = await mintNFT("0xContractAddress", 123);
    status.textContent = `Transaction sent: ${txHash}`;

    status.textContent = "Waiting for confirmation...";
    await watchTransaction(txHash);
    status.textContent = "NFT Minted Successfully!";
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
  }
}
</script>
```

:::info
See the [Provider API](/wallet/reference/provider-api) reference and [JSON-RPC API](/wallet/reference/json-rpc-methods) reference for more information.
:::

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

| Error code | Description | Solution |
|------------|-------------|----------|
| `4001`   | User rejected transaction   | Show a retry option and a clear error message. |
| `-32000` | Invalid input               | Validate the input data before sending.        |
| `-32603` | Contract execution reverted | Check the contract conditions and handle the error gracefully. |
| `-32002` | Request already pending     | Prevent multiple concurrent transactions.      |

## Next steps

See the following guides to add more functionality to your dapp:

- [Authenticate users](authenticate-users.md)
- [Manage networks](manage-networks.md)
- [Handle transactions](handle-transactions.md)
