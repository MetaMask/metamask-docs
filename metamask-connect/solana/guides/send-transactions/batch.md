---
title: 'Send Batch Solana Transactions - MetaMask Connect'
sidebar_label: Send batch transactions
description: Sign and send multiple Solana transactions by passing several inputs to the variadic signAndSendTransaction Wallet Standard feature.
keywords:
  [
    solana,
    batch transactions,
    signAndSendTransaction,
    wallet-standard,
    MetaMask,
    Connect,
    multiple transactions,
  ]
---

# Send batch transactions

The [`solana:signAndSendTransaction`](../../reference/methods.md#supported-wallet-standard-features)
Wallet Standard feature is variadic: you can pass multiple transaction inputs to a single call to
sign and send them, and it resolves to one result per transaction.
This is useful for operations that span several transactions, such as initializing multiple accounts,
batch token transfers, or multi-step program interactions.

:::note
There is no separate `signAndSendAllTransactions` feature. Send a batch by passing several inputs to
`signAndSendTransaction`.
:::

## Prerequisites

Follow Step 1 of the [quickstart](../../quickstart/javascript.md) to install the Solana client.

## Steps

### 1. Initialize and connect

Initialize a Solana client using [`createSolanaClient`](../../reference/methods.md#createsolanaclient) and connect to the user's wallet using [`getWallet`](../../reference/methods.md#getwallet) and [`standard:connect`](../../reference/methods.md#supported-wallet-standard-features):

```javascript
import { createSolanaClient } from '@metamask/connect-solana'
import {
  Connection,
  Transaction,
  SystemProgram,
  PublicKey,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'

const solanaClient = await createSolanaClient({
  dapp: {
    name: 'My Solana Dapp',
    url: window.location.origin,
  },
})

const wallet = solanaClient.getWallet()
const { accounts } = await wallet.features['standard:connect'].connect()
const account = accounts[0]
const publicKey = new PublicKey(account.address)
const connection = new Connection('https://solana-devnet.infura.io/v3/<YOUR_INFURA_API_KEY>')
```

### 2. Build the transactions

Construct each transaction with a new block hash and fee payer.
Serialize each with `verifySignatures: false` since the wallet adds signatures:

```javascript
const { blockhash } = await connection.getLatestBlockhash()

const recipients = ['RECIPIENT_ADDRESS_1', 'RECIPIENT_ADDRESS_2', 'RECIPIENT_ADDRESS_3']

const serializedTransactions = recipients.map(recipient => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new PublicKey(recipient),
      lamports: 0.001 * LAMPORTS_PER_SOL,
    })
  )
  transaction.recentBlockhash = blockhash
  transaction.feePayer = publicKey

  return transaction.serialize({ verifySignatures: false })
})
```

### 3. Sign and send the transactions

Pass each serialized transaction as a separate input to
[`signAndSendTransaction`](../../reference/methods.md#supported-wallet-standard-features).
The feature accepts one or more inputs and resolves to an array with one result per transaction:

```javascript
const sendFeature = wallet.features['solana:signAndSendTransaction']

const results = await sendFeature.signAndSendTransaction(
  ...serializedTransactions.map(transaction => ({
    account,
    transaction,
    chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
  }))
)
```

Each result contains a `signature` as a `Uint8Array`, in the same order as the inputs.

### 4. Confirm each transaction

Always confirm transactions before updating the UI.
The Wallet Standard returns each signature as bytes, so encode it to base58 for
`confirmTransaction`:

```javascript
import bs58 from 'bs58'

for (const { signature } of results) {
  const signatureStr = bs58.encode(signature)
  const confirmation = await connection.confirmTransaction(
    {
      signature: signatureStr,
      blockhash,
      lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight,
    },
    'confirmed'
  )

  if (confirmation.value.err) {
    console.error('Transaction failed on-chain:', confirmation.value.err)
  } else {
    console.log('Transaction confirmed:', signatureStr)
  }
}
```

## Error handling

When sending batch transactions, handle common errors.
Wallet calls reject with an `RPCInvokeMethodErr`, which exposes the wallet's original code on
`rpcCode`:

```javascript
try {
  const results = await sendFeature.signAndSendTransaction(
    ...serializedTransactions.map(transaction => ({
      account,
      transaction,
      chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
    }))
  )
} catch (err) {
  const walletCode = err.rpcCode ?? err.code
  if (walletCode === 4001) {
    // User rejected — show retry UI
  } else if (walletCode === -32002) {
    // Request already pending — ask user to check MetaMask
  } else {
    console.error('Batch transaction error:', err)
  }
}
```

## Important considerations

- **New block hash:** Block hashes expire after ~60 seconds.
  Call `getLatestBlockhash` immediately before building the batch.
- **Transaction size:** Each individual transaction is limited to 1,232 bytes.
  If a single transaction exceeds this limit, split it into smaller transactions.
- **Sequential processing:** Inputs are processed in order, and the call resolves with one result per
  transaction once all are submitted.
- **Confirmation:** A submitted transaction is not finalized until `confirmTransaction` returns.
  Always confirm before reporting success to the user.
- **Devnet and testnet** are only supported in the MetaMask browser extension, not the mobile wallet.

## Next steps

- [Send a legacy transaction](legacy.md) for single transactions.
- [Send a versioned transaction](versioned.md) for transactions with Address
  Lookup Tables.
- [MetaMask Connect Solana methods](../../reference/methods.md) for the full API reference.
