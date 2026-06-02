---
title: 'Send Cross-Chain Transactions - MetaMask Connect Multichain'
sidebar_label: Send transactions
description: Send EVM and Solana transactions from a single MetaMask Connect Multichain session using invokeMethod, with no network switching required.
keywords:
  [
    multichain,
    evm,
    solana,
    transaction,
    send,
    invokeMethod,
    signAndSendTransaction,
    multichain transaction,
    eth_sendTransaction,
    RPC routing,
  ]
---

# Send EVM and Solana transactions

This guide shows you how to send transactions on both EVM networks and Solana from a single multichain session.
No network switching is required.

## Prerequisites

- Follow Step 1 of the [quickstart](../quickstart/javascript.md) to install the multichain client.
- To build Solana transactions, install `@solana/web3.js`:

```bash npm2yarn
npm install @solana/web3.js
```

## Initialize and connect

Initialize a multichain client using [`createMultichainClient`](../reference/methods.md#createmultichainclient),
and connect to both ecosystems using [`connect`](../reference/methods.md#connect):

```javascript
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: {
    name: 'Multichain Demo',
    url: window.location.href,
  },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls({ infuraApiKey: 'YOUR_INFURA_API_KEY' }),
    },
  },
})

await client.connect(
  ['eip155:1', 'eip155:137', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], // Ethereum, Polygon, Solana
  []
)
```

## Understand RPC routing

The multichain client routes EVM methods based on type:

| Route        | Methods                                                                                                                       | Transport                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **RPC node** | `eth_call`, `eth_getBalance`, `eth_blockNumber`, `eth_getTransactionReceipt`, `eth_estimateGas`, `eth_getCode`, `eth_getLogs` | Infura / custom RPC URL from `supportedNetworks` |
| **Wallet**   | `eth_sendTransaction`, `personal_sign`, `eth_signTypedData_v4`, `wallet_switchEthereumChain`, `wallet_addEthereumChain`       | MetaMask (extension or mobile)                   |

All Solana methods route through the MetaMask wallet. There is no RPC node fallback for Solana.

## Send an EVM transaction

Use [`invokeMethod`](../reference/methods.md#invokemethod) with [`eth_sendTransaction`](../../evm/reference/json-rpc-api/eth_sendTransaction.mdx) to send a transaction on any EVM chain in the session:

```javascript
const txHash = await client.invokeMethod({
  scope: 'eip155:1', // Ethereum Mainnet
  request: {
    method: 'eth_sendTransaction',
    params: [
      {
        from: '0xYourAddress',
        to: '0xRecipientAddress',
        value: '0x2386F26FC10000', // 0.01 ETH in hex wei
        gas: '0x5208', // 21000 gas (optional)
      },
    ],
  },
})
console.log('ETH tx hash:', txHash)
```

Target a different chain by changing the `scope`; for example, `eip155:137` for Polygon:

```javascript
const txHash = await client.invokeMethod({
  scope: 'eip155:137',
  request: {
    method: 'eth_sendTransaction',
    params: [
      {
        from: '0xYourAddress',
        to: '0xRecipientAddress',
        value: '0x2386F26FC10000', // 0.01 POL in hex wei
      },
    ],
  },
})
console.log('POL tx hash:', txHash)
```

## Estimate gas

Use [`invokeMethod`](../reference/methods.md#invokemethod) with [`eth_estimateGas`](../../evm/reference/json-rpc-api/eth_estimateGas.mdx) to estimate the gas cost before sending.
This routes to the RPC node and does not prompt the user:

```javascript
const gasEstimate = await client.invokeMethod({
  scope: 'eip155:1',
  request: {
    method: 'eth_estimateGas',
    params: [
      {
        from: '0xYourAddress',
        to: '0xRecipientAddress',
        value: '0x2386F26FC10000',
      },
    ],
  },
})
console.log('Estimated gas:', gasEstimate)
```

## Build and send a Solana transaction

Build a transaction with `@solana/web3.js`, serialize it to base64, then send it with `solana_signAndSendTransaction`.
This signs and broadcasts the transaction in one step:

```javascript
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

const connection = new Connection('https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY')
const fromPubkey = new PublicKey('YourSolanaPublicKey')
const toPubkey = new PublicKey('RecipientSolanaPublicKey')

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey,
    toPubkey,
    lamports: 1_000_000, // 0.001 SOL
  })
)

transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
transaction.feePayer = fromPubkey

const serialized = transaction.serialize({
  requireAllSignatures: false,
  verifySignatures: false,
})
const base64Transaction = Buffer.from(serialized).toString('base64')

const result = await client.invokeMethod({
  scope: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  request: {
    method: 'solana_signAndSendTransaction',
    params: {
      transaction: base64Transaction,
    },
  },
})
console.log('SOL tx signature:', result.signature)
```

## Sign a Solana transaction without sending

Use `solana_signTransaction` to get the signed transaction back without broadcasting it.
This is useful when you need to inspect or modify the signed output before submitting:

```javascript
const signResult = await client.invokeMethod({
  scope: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  request: {
    method: 'solana_signTransaction',
    params: {
      transaction: base64Transaction,
    },
  },
})

// Broadcast the signed transaction yourself
const signedBuffer = Buffer.from(signResult.transaction, 'base64')
const txId = await connection.sendRawTransaction(signedBuffer)
console.log('Transaction ID:', txId)
```

## Error handling

| Error code | Description               | Action                                                     |
| ---------- | ------------------------- | ---------------------------------------------------------- |
| `4001`     | User rejected the request | Show a retry option. Do not treat as an application error. |
| `-32002`   | Request already pending   | Wait for the user to respond in MetaMask before retrying.  |

<br/>

```javascript
try {
  const txHash = await client.invokeMethod({
    scope: 'eip155:1',
    request: {
      method: 'eth_sendTransaction',
      params: [
        {
          from: '0xYourAddress',
          to: '0xRecipientAddress',
          value: '0x2386F26FC10000',
        },
      ],
    },
  })
} catch (err) {
  if (err.code === 4001) {
    console.log('User rejected the transaction')
    return
  }
  if (err.code === -32002) {
    console.log('A transaction request is already pending')
    return
  }
  throw err
}
```

## Next steps

- [Sign messages on EVM and Solana.](sign-transactions.md)
- See the [Multichain SDK methods reference](../reference/methods.md).
