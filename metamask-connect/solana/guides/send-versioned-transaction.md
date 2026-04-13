---
title: 'Send Solana Versioned Transactions - MetaMask Connect'
sidebar_label: Send a versioned transaction
description: Create, sign, and send Solana versioned (v0) transactions with Address Lookup Tables through MetaMask Connect using @solana/web3.js.
keywords:
  [
    solana,
    versioned transaction,
    v0 transaction,
    address lookup table,
    metamask,
    signAndSendTransaction,
    wallet-standard,
    solana web3.js,
  ]
---

# Send a versioned transaction

Solana [versioned transactions](https://solana.com/developers/guides/advanced/versions) (`v0`) support [Address Lookup Tables](https://solana.com/developers/guides/advanced/lookup-tables), which let you reference up to 256 addresses in a single transaction. This is useful for complex operations that would exceed the limits of legacy transactions.

This guide shows you how to create, sign, and send versioned transactions through MetaMask.

## Prerequisites

Set up a Solana client and connect to the user's wallet:

```javascript
import { createSolanaClient } from '@metamask/connect-solana'
import {
  Connection,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  AddressLookupTableProgram,
} from '@solana/web3.js'

const solanaClient = await createSolanaClient({
  dapp: {
    name: 'My Solana DApp',
    url: window.location.origin,
  },
})

const wallet = solanaClient.getWallet()
const { accounts } = await wallet.features['standard:connect'].connect()
const account = accounts[0]
const publicKey = new PublicKey(account.address)
const connection = new Connection('https://solana-devnet.infura.io/v3/YOUR_INFURA_API_KEY')
```

## Create a versioned transaction

Solana versioned transactions are created in a similar way to [legacy transactions](https://solana.com/docs/core/transactions).
The only difference is to use the `VersionedTransaction` class instead of the `Transaction` class.

The following example shows how to create a simple transfer instruction, format the instruction into a `v0`-compatible transaction message, and create a versioned transaction that parses the message:

```typescript
const { blockhash } = await connection.getLatestBlockhash()

const instructions = [
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: publicKey,
    lamports: 10,
  }),
]

const messageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message()

const transactionV0 = new VersionedTransaction(messageV0)
```

## Sign and send a versioned transaction

After creating an unsigned versioned transaction, use the wallet's `solana:signAndSendTransaction` feature to ask the user's MetaMask wallet to sign and send it.

The method returns a promise for an object containing the `signature`.

```javascript
const [{ signature }] = await wallet.features[
  'solana:signAndSendTransaction'
].signAndSendTransaction({
  account,
  transaction: transactionV0.serialize(),
  chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
})

await connection.getSignatureStatus(signature)
```

### Sign without sending

Use `solana:signTransaction` when you need a signed versioned transaction without broadcasting it:

```javascript
const [{ signedTransaction }] = await wallet.features['solana:signTransaction'].signTransaction({
  account,
  transaction: transactionV0.serialize(),
  chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
})

const txSignature = await connection.sendRawTransaction(signedTransaction)
```

## Create an Address Lookup Table

Create an [Address Lookup Table (ALT)](https://solana.com/developers/guides/advanced/lookup-tables) to efficiently load addresses into tables, significantly increasing the number of addresses that can be used in a single transaction.

Use the [`createLookupTable`](https://solana-foundation.github.io/solana-web3.js/classes/AddressLookupTableProgram.html#createlookuptable) method to create the instruction needed to create a new ALT and determine its address.
With this instruction, create a transaction, sign it, and send it to create an ALT onchain.
For example:

```typescript
const slot = await connection.getSlot()
const { blockhash } = await connection.getLatestBlockhash()

const [lookupTableInst, lookupTableAddress] = AddressLookupTableProgram.createLookupTable({
  authority: publicKey,
  payer: publicKey,
  recentSlot: slot,
})

const lookupMessage = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions: [lookupTableInst],
}).compileToV0Message()

const lookupTransaction = new VersionedTransaction(lookupMessage)

const [{ signature: lookupSignature }] = await wallet.features[
  'solana:signAndSendTransaction'
].signAndSendTransaction({
  account,
  transaction: lookupTransaction.serialize(),
  chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
})
```

## Extend an Address Lookup Table

After creating an ALT, extend it by appending addresses to the table.
Use the [`extendLookupTable`](https://solana-foundation.github.io/solana-web3.js/classes/AddressLookupTableProgram.html#extendlookuptable) method to create a new extend instruction, and send it in a transaction.
For example:

```typescript
const extendInstruction = AddressLookupTableProgram.extendLookupTable({
  payer: publicKey,
  authority: publicKey,
  lookupTable: lookupTableAddress,
  addresses: [publicKey, SystemProgram.programId],
})

const { blockhash: extensionBlockhash } = await connection.getLatestBlockhash()

const extensionMessageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: extensionBlockhash,
  instructions: [extendInstruction],
}).compileToV0Message()

const extensionTransactionV0 = new VersionedTransaction(extensionMessageV0)

const [{ signature: extensionSignature }] = await wallet.features[
  'solana:signAndSendTransaction'
].signAndSendTransaction({
  account,
  transaction: extensionTransactionV0.serialize(),
  chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
})
```

## Create, sign, and send a versioned transaction with an ALT

After creating an ALT, create a versioned transaction with the ALT and ask the user's MetaMask wallet to sign and send it.

First, use the [`getAddressLookupTable`](https://solana-foundation.github.io/solana-web3.js/classes/Connection.html#getaddresslookuptable) method to fetch the account of the created ALT:

```typescript
const lookupTableAccount = await connection
  .getAddressLookupTable(lookupTableAddress)
  .then(res => res.value)
console.log('Table address from cluster:', lookupTableAccount.key.toBase58())
```

Then, parse and read all the addresses currently stored in the fetched ALT:

```typescript
for (let i = 0; i < lookupTableAccount.state.addresses.length; i++) {
  const address = lookupTableAccount.state.addresses[i]
  console.log(i, address.toBase58())
}
```

The following example creates a simple transfer instruction, formats the instruction into a `v0`-compatible transaction message using the ALT's account, and creates a versioned transaction that parses the message.
Sign and send the transaction using the wallet's `solana:signAndSendTransaction` feature.

```typescript
const { blockhash: altBlockhash } = await connection.getLatestBlockhash()

const instructions = [
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: publicKey,
    lamports: minRent,
  }),
]

const messageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: altBlockhash,
  instructions,
}).compileToV0Message([lookupTableAccount])

const transactionV0 = new VersionedTransaction(messageV0)

const [{ signature }] = await wallet.features[
  'solana:signAndSendTransaction'
].signAndSendTransaction({
  account,
  transaction: transactionV0.serialize(),
  chain: 'solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1',
})
```

## Next steps

- [Send a legacy transaction](send-legacy-transaction.md) for simpler transactions that don't require Address Lookup Tables.
- [Sign messages](sign-data/sign-message.md) to verify wallet ownership or authorize offchain actions.
- [MetaMask Connect Solana methods](../reference/methods.md) for the full API reference.
- [Use the Multichain SDK](../../multichain/quickstart/javascript.md) to send transactions on both EVM and Solana from a single session.
