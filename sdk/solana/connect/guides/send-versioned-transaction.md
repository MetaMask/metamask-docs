# Send a versioned transaction

The Solana runtime supports two types of transactions: `legacy` (see [Send a legacy transaction](/solana/sending-a-transaction)) and `v0` (transactions that can include Address Lookup Tables or LUTs).

The goal of `v0` is to increase the maximum size of a transaction, and hence the number of accounts that can fit in a single atomic transaction. With LUTs, developers can now build transactions with a maximum of 256 accounts, as compared to the limit of 35 accounts in legacy transactions that do not utilize LUTs.

:::info
For a dive deep on versioned transactions, LUTs, and how the above changes affect the anatomy of a transaction, see [Versioned Transactions - Anvit Mangal's Blog](https://anvit.hashnode.dev/versioned-transactions).
:::

On this page, we'll go over the following:

1. Building a versioned tansaction.
2. Signing and sending a versioned transaction.
3. Building an Address LUT.
4. Extending an Address LUT.
5. Signing and sending a versioned transaction using a LUT.

## Build a versioned transaction

Versioned transactions are built in a very similar fashion to [legacy transactions](sending-a-transaction). The only difference is that developers should use the `VersionedTransaction` class rather than the `Transaction` class.

The following example shows how to build a simple transfer instruction. Once the transfer instruction is made, a `MessageV0` formatted transaction message is constructed with the transfer instruction. Finally, a new `VersionedTransaction` is created, parsing in the `v0` compatible message.

### createTransactionV0()

```typescript  theme={null}
// create array of instructions
const instructions = [
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: publicKey,
    lamports: 10,
  }),
];

// create v0 compatible message
const messageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message();

// make a versioned transaction
const transactionV0 = new VersionedTransaction(messageV0);
```

For a live example of creating a versioned transaction, refer to [createTransferTransactionV0](https://github.com/phantom-labs/sandbox/blob/main/src/utils/createTransferTransactionV0.ts) in our sandbox.

## Sign and send a versioned transaction

Once a Versioned transaction is created, it can be signed and sent via Phantom using the `signAndSendTransaction` method on the provider. The call will return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for an object containing the `signature`. This is the same way a legacy transaction is sent via the Phantom provider.

### signAndSendTransaction()

```javascript  theme={null}
const provider = getProvider(); // see "Detecting the Provider"
const network = "<NETWORK_URL>";
const connection = new Connection(network);
const versionedTransaction = new VersionedTransaction();
const { signature } = await provider.signAndSendTransaction(versionedTransaction);
await connection.getSignatureStatus(signature);
```

You can also specify a `SendOptions` [object](https://solana-foundation.github.io/solana-web3.js/modules.html#SendOptions) as a second argument into `signAndSendTransaction()` or as an `options` parameter when using `request`.

For a live demo of signing and sending a versioned transaction, refer to [handleSignAndSendTransactionV0](https://github.com/phantom-labs/sandbox/blob/78dc35fe140140a961345a6af30a058e1e19a7aa/src/App.tsx#L191) in our sandbox.

## Build an Address LUT

Address LUTs can be used to load accounts into table-like data structures. These structures can then be referenced to significantly increase the number of accounts that can be loaded in a single transaction.

This lookup method effectively "*compresses*" a 32-byte address into a 1-byte index value. This "*compression*" enables storing up to 256 address in a single LUT for use inside any given transaction.

With the `@solana/web3.js` [createLookupTable](https://solana-foundation.github.io/solana-web3.js/classes/AddressLookupTableProgram.html#createLookupTable) method, developers can construct the instruction needed to create a new LUT, as well as determine its address. Once we have the LUT instruction, we can construct a transaction, sign it, and send it to create a LUT on-chain. Address LUTs can be created with either a `v0` transaction or a `legacy` transaction. However, the Solana runtime can only retrieve and handle the additional addresses within a LUT while using `v0` transactions.

The following is a code snippet that creates a LUT.

### createAddressLookupTable()

```typescript  theme={null}
// create an Address Lookup Table
const [lookupTableInst, lookupTableAddress] = AddressLookupTableProgram.createLookupTable({
  authority: publicKey,
  payer: publicKey,
  recentSlot: slot,
});

// To create the Address Lookup Table on chain:
// send the `lookupTableInst` instruction in a transaction
const lookupMessage = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions: [lookupTableInst],
}).compileToV0Message();

const lookupTransaction = new VersionedTransaction(lookupMessage);
const lookupSignature = await signAndSendTransaction(provider, lookupTransaction);
```

For a live demo of creating a LUT, refer to [handleSignAndSendTransactionV0WithLookupTable](https://github.com/phantom-labs/sandbox/blob/78dc35fe140140a961345a6af30a058e1e19a7aa/src/App.tsx#L218) in our sandbox.

## Extend an Address LUT

Once an Address LUT is created, it can then be extended, which means that accounts can be appended to the table. Using the `@solana/web3.js` library, you can create a new `extend` instruction using the [extendLookupTable](https://solana-labs.github.io/solana-web3.js/classes/AddressLookupTableProgram.html#extendLookupTable) method. Once the extend instruction is created, it can be sent in a transaction.

### extendAddressLookupTable()

```typescript  theme={null}
// add addresses to the `lookupTableAddress` table via an `extend` instruction
const extendInstruction = AddressLookupTableProgram.extendLookupTable({
  payer: publicKey,
  authority: publicKey,
  lookupTable: lookupTableAddress,
  addresses: [
    publicKey,
    SystemProgram.programId,
    // more `publicKey` addresses can be listed here
  ],
});

// Send this `extendInstruction` in a transaction to the cluster
// to insert the listing of `addresses` into your lookup table with address `lookupTableAddress`
const extensionMessageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions: [extendInstruction],
}).compileToV0Message();

const extensionTransactionV0 = new VersionedTransaction(extensionMessageV0);
const extensionSignature = await signAndSendTransaction(provider, extensionTransactionV0);
```

For a live demo of extending a LUT, refer to the [handleSignAndSendTransactionV0WithLookupTable](https://github.com/phantom-labs/sandbox/blob/78dc35fe140140a961345a6af30a058e1e19a7aa/src/App.tsx#L218) function in our sandbox.

## Sign and send a versioned transaction using a LUT

Up until now, we have:

1. Learned how to create a `VersionedTransaction`.
2. Created an Address LUT.
3. Extended the Address LUT.

At this point, we are now ready to sign and send a `VersionedTransaction` using an Address LUT.

First, we need to fetch the account of the created Address LUT.

### getAddressLookupTable()

```typescript  theme={null}
// get the table from the cluster
const lookupTableAccount = await connection.getAddressLookupTable(lookupTableAddress).then((res) => res.value);
// `lookupTableAccount` will now be a `AddressLookupTableAccount` object
console.log('Table address from cluster:', lookupTableAccount.key.toBase58());
```

We can also parse and read all the addresses currently stores in the fetched Address LUT.

## Parse and read addresses

```typescript  theme={null}
// Loop through and parse all the address stored in the table
for (let i = 0; i < lookupTableAccount.state.addresses.length; i++) {
  const address = lookupTableAccount.state.addresses[i];
  console.log(i, address.toBase58());
}
```

We can now create the instructions array with an arbitrary transfer instruction, just the way we did while creating the `VersionedTransaction` earlier. This `VersionedTransaction` can then be sent using the `signAndSendTransaction()` provider function.

```typescript  theme={null}
// create an array with your desired `instructions`
// in this case, just a transfer instruction
const instructions = [
  SystemProgram.transfer({
    fromPubkey: publicKey,
    toPubkey: publicKey,
    lamports: minRent,
  }),
];

// create v0 compatible message
const messageV0 = new TransactionMessage({
  payerKey: publicKey,
  recentBlockhash: blockhash,
  instructions,
}).compileToV0Message([lookupTableAccount]);

// make a versioned transaction
const transactionV0 = new VersionedTransaction(messageV0);
const signature = await signAndSendTransaction(provider, transactionV0);
```

For a live demo of of signing and sending a versioned transaction using an Address LUT, refer to the [handleSignAndSendTransactionV0WithLookupTable](https://github.com/phantom-labs/sandbox/blob/78dc35fe140140a961345a6af30a058e1e19a7aa/src/App.tsx#L218) in our sandbox.
