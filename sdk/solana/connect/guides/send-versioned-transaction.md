import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Send a versioned transaction

Solana supports [legacy transactions and versioned transactions](https://solana.com/developers/guides/advanced/versions).
Unlike legacy transactions, versioned transactions (`v0`) can include [Address Lookup Tables](https://solana.com/developers/guides/advanced/lookup-tables) (ALTs or Address LUTs), enabling you to efficiently load up to 256 addresses in a single transaction.

After connecting to MetaMask, your dapp can prompt a user to sign and send a Solana versioned transaction.

## Create a versioned transaction

Solana versioned transactions are created in a similar way to [legacy transactions](https://solana.com/docs/core/transactions).
The only difference is to use the `VersionedTransaction` class instead of the `Transaction` class.

The following example shows how to create a simple transfer instruction, format the instruction into a `v0`-compatible transaction message, and create a versioned transaction that parses the message:

```typescript
// Create an array of instructions.
// This example uses a simple transfer instruction.
const instructions = [
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: publicKey,
    lamports: 10,
  }),
];

// Create a v0-compatible message.
const messageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message();

// Create a versioned transaction.
const transactionV0 = new VersionedTransaction(messageV0);
```

## Sign and send a versioned transaction

After creating an unsigned versioned transaction, you can ask the user's MetaMask wallet to sign and send the transaction.
Use the `signAndSendTransaction` method on the provider, which accepts an optional [`SendOptions`](https://solana-foundation.github.io/solana-web3.js/types/SendOptions.html) object as a second parameter.

The method returns a promise for an object containing the `signature`.

```javascript
const provider = getProvider(); // TO DO: replace with provider snippet
const network = '<NETWORK_URL>';
const connection = new Connection(network);
const { signature } = await provider.signAndSendTransaction(transactionV0);
await connection.getSignatureStatus(signature);
```

## Create an Address Lookup Table

Create an [Address Lookup Table (ALT)](https://solana.com/developers/guides/advanced/lookup-tables) to efficiently load addresses into tables, significantly increasing the number of addresses that can be used in a single transaction.

Use the [createLookupTable](https://solana-foundation.github.io/solana-web3.js/classes/AddressLookupTableProgram.html#createlookuptable) method to create the instruction needed to create a new ALT and determine its address.
With this instruction, you can create a transaction, sign it, and send it to create an ALT onchain.
For example:

```typescript  theme={null}
// Create an Address Lookup Table.
const [lookupTableInst, lookupTableAddress] = AddressLookupTableProgram.createLookupTable({
  authority: publicKey,
  payer: publicKey,
  recentSlot: slot,
});

// To create the ALT onchain, send the lookupTableInst instruction in a transaction.
const lookupMessage = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions: [lookupTableInst],
}).compileToV0Message();

const lookupTransaction = new VersionedTransaction(lookupMessage);
const lookupSignature = await signAndSendTransaction(provider, lookupTransaction);
```

## Extend an Address Lookup Table

After creating an ALT, you can extend it by appending addresses to the table.
Use the [extendLookupTable](https://solana-foundation.github.io/solana-web3.js/classes/AddressLookupTableProgram.html#extendlookuptable) method to create a new extend instruction, and send it in a transaction.
For example:

```typescript
// Add addresses to the lookupTableAddress table via an extend instruction.
const extendInstruction = AddressLookupTableProgram.extendLookupTable({
  payer: publicKey,
  authority: publicKey,
  lookupTable: lookupTableAddress,
  addresses: [
    publicKey,
    SystemProgram.programId,
    // More publicKey addresses can be listed here.
  ],
});

// Send this extendInstruction in a transaction to the cluster to insert
// the listing of addresses into your ALT with address lookupTableAddress.
const extensionMessageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions: [extendInstruction],
}).compileToV0Message();

const extensionTransactionV0 = new VersionedTransaction(extensionMessageV0);
const extensionSignature = await signAndSendTransaction(provider, extensionTransactionV0);
```

## Create, sign, and send a versioned transaction with an ALT

After creating an ALT, you can create a versioned transaction with the ALT and ask the user's MetaMask wallet to sign and send it.

First, use the [`getAddressLookupTable`](https://solana-foundation.github.io/solana-web3.js/classes/Connection.html#getaddresslookuptable) method to fetch the account of the created ALT:

```typescript
// Get the table from the cluster.
const lookupTableAccount = await connection.getAddressLookupTable(lookupTableAddress).then((res) => res.value);
// lookupTableAccount will now be an AddressLookupTableAccount object.
console.log('Table address from cluster:', lookupTableAccount.key.toBase58());
```

Then, parse and read all the addresses currently stored in the fetched ALT:

```typescript
// Loop through and parse all the address stored in the table.
for (let i = 0; i < lookupTableAccount.state.addresses.length; i++) {
  const address = lookupTableAccount.state.addresses[i];
  console.log(i, address.toBase58());
}
```

The following example creates a simple transfer instruction, formats the instruction into a `v0`-compatible transaction message using the ALT's account, and creates a versioned transaction that parses the message.
Sign and send the transaction using the `signAndSendTransaction` method on the provider.

```typescript
// Create an array of instructions.
// This example uses a simple transfer instruction.
const instructions = [
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: publicKey,
    lamports: minRent,
  }),
];

// Create a v0-compatible message.
const messageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message([lookupTableAccount]);

// Create a versioned transaction.
const transactionV0 = new VersionedTransaction(messageV0);
const signature = await signAndSendTransaction(provider, transactionV0);
```
