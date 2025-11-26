---
description: Interact with contracts with MM Connect in your Wagmi dapp.
keywords: [SDK, Wagmi, JavaScript, batch, read, write, smart, contract, contracts, dapp]
sidebar_label: Interact with contracts
---

# Interact with smart contracts

Interact with smart contracts in your Wagmi dapp.
With MM Connect, you can:

- **Read data** from smart contracts.
- **Batch contract reads**.
- **Write data** to smart contracts.
- **Handle contract events**.
- **Manage transaction states**.
- **Handle contract errors**.

## Read contracts

Wagmi provides dedicated hooks for smart contract interactions.
The following example reads contract data using the [`useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) hook:

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

### Batch contract reads

You can perform multiple contract read operations using the [`useReadContracts`](https://wagmi.sh/react/api/hooks/useReadContracts) hook.
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
"Batching" can also refer to [batching JSON-RPC requests](../batch-requests.md) using MM Connect's `metamask_batch` method, or [sending atomic batch transactions](../send-transactions/batch-transactions.md) in MetaMask.
:::

## Write to contracts

The following example writes to contracts using the [`useWriteContract`](https://wagmi.sh/react/api/hooks/useWriteContract) hook:

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

- [Manage user accounts](../../guides/manage-user-accounts.md)
- [Manage networks](../../guides/manage-networks.md)
- [Send transactions](../../guides/send-transactions/index.md)
