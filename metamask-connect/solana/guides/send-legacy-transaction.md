---
title: 'Send Solana Legacy Transactions - MetaMask Connect'
sidebar_label: Send a legacy transaction
description: Sign and send Solana legacy transactions through MetaMask Connect using the wallet-standard signAndSendTransaction feature with @solana/web3.js.
keywords:
  [
    solana,
    legacy transaction,
    send transaction,
    metamask,
    signAndSendTransaction,
    wallet-standard,
    solana web3.js,
    SPL token transfer,
  ]
---

# Send a legacy transaction

Solana [legacy transactions](https://solana.com/developers/guides/advanced/versions) are the simpler of Solana's two transaction formats.
They don't support Address Lookup Tables and are capped at 32 addresses per transaction, but they work well for straightforward operations like transfers.

This guide shows you how to sign and send legacy transactions through MetaMask.
See the [Solana documentation](https://solana.com/docs/core/transactions) for more background on Solana transactions.

## Prerequisites

Set up a Solana client and connect to the user's wallet:

```javascript
import { createSolanaClient } from '@metamask/connect-solana'
import { Connection, Transaction, SystemProgram, PublicKey } from '@solana/web3.js'

const solanaClient = await createSolanaClient({
  dapp: {
    name: 'My Solana DApp',
    url: window.location.origin,
  },
})

const wallet = solanaClient.getWallet()
const { accounts } = await wallet.features['standard:connect'].connect()
const account = accounts[0]
```

## Sign and send a transaction

After creating an unsigned legacy transaction, use the wallet's `solana:signAndSendTransaction` feature to ask the user's MetaMask wallet to sign and send it.

The method accepts a serialized transaction as a `Uint8Array` and returns an object containing the `signature`.

```javascript
const connection = new Connection('https://solana-devnet.infura.io/v3/YOUR_INFURA_API_KEY')
const publicKey = new PublicKey(account.address)

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: publicKey,
    lamports: 10,
  })
)

transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
transaction.feePayer = publicKey

const [{ signature }] = await wallet.features[
  'solana:signAndSendTransaction'
].signAndSendTransaction({
  account,
  transaction: transaction.serialize({ verifySignatures: false }),
  chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
})

await connection.getSignatureStatus(signature)
```

## Sign and send multiple transactions

To sign and send multiple legacy transactions, call `signAndSendTransaction` for each transaction:

```javascript
const transactions = [new Transaction(), new Transaction()]

for (const transaction of transactions) {
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  transaction.feePayer = publicKey

  const [{ signature }] = await wallet.features[
    'solana:signAndSendTransaction'
  ].signAndSendTransaction({
    account,
    transaction: transaction.serialize({ verifySignatures: false }),
    chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
  })

  await connection.getSignatureStatus(signature)
}
```

## Sign a transaction without sending

Use `solana:signTransaction` when you need a signed transaction but want to submit it yourself; for
example, for offline signing or multi-sig workflows.

```javascript
const [{ signedTransaction }] = await wallet.features['solana:signTransaction'].signTransaction({
  account,
  transaction: transaction.serialize({ verifySignatures: false }),
  chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
})

const txSignature = await connection.sendRawTransaction(signedTransaction)
await connection.getSignatureStatus(txSignature)
```

## Next steps

To efficiently load more addresses in a single transaction, learn how to [send a versioned transaction](send-versioned-transaction.md) with Address Lookup Tables.
