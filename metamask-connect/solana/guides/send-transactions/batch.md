---
title: 'Send Batch Solana Transactions - MetaMask Connect'
sidebar_label: Send batch transactions
description: Sign and send multiple Solana transactions in a single wallet interaction using the signAndSendAllTransactions Wallet Standard feature.
keywords:
  [
    solana,
    batch transactions,
    signAndSendAllTransactions,
    wallet-standard,
    MetaMask,
    Connect,
    multiple transactions,
  ]
---

# Send batch transactions

The `solana:signAndSendAllTransactions` Wallet Standard feature lets you sign and send multiple
Solana transactions in a single wallet interaction.
This is useful for operations that span several transactions, such as initializing multiple accounts,
batch token transfers, or multi-step program interactions.

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

### 3. Sign and send all transactions

Use the [`solana:signAndSendAllTransactions`](../../reference/methods.md#supported-wallet-standard-features) feature to submit the batch:

```javascript
const batchFeature = wallet.features['solana:signAndSendAllTransactions']

const results = await batchFeature.signAndSendAllTransactions({
  account,
  transactions: serializedTransactions,
  chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
})
```

### 4. Confirm each transaction

Always confirm transactions before updating the UI:

```javascript
for (const { signature } of results) {
  const confirmation = await connection.confirmTransaction(
    {
      signature,
      blockhash,
      lastValidBlockHeight: (await connection.getLatestBlockhash()).lastValidBlockHeight,
    },
    'confirmed'
  )

  if (confirmation.value.err) {
    console.error('Transaction failed on-chain:', confirmation.value.err)
  } else {
    console.log('Transaction confirmed:', signature)
  }
}
```

## Error handling

When sending batch transactions, handle common errors:

```javascript
try {
  const results = await batchFeature.signAndSendAllTransactions({
    account,
    transactions: serializedTransactions,
    chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
  })
} catch (err) {
  if (err.code === 4001) {
    // User rejected the batch — show retry UI
  } else if (err.code === -32002) {
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
- **Confirmation:** A submitted transaction is not finalized until `confirmTransaction` returns.
  Always confirm before reporting success to the user.
- **Devnet and testnet** are only supported in the MetaMask browser extension, not the mobile wallet.

## Next steps

- [Send a legacy transaction](legacy.md) for single transactions.
- [Send a versioned transaction](versioned.md) for transactions with Address
  Lookup Tables.
- [MetaMask Connect Solana methods](../../reference/methods.md) for the full API reference.
