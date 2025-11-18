import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Send a legacy transaction

Solana supports [legacy transactions and versioned transactions](https://solana.com/developers/guides/advanced/versions).
Unlike versioned transactions, legacy transactions cannot include Address Lookup Tables, so they are capped at 32 addresses per transaction.

After connecting to MetaMask, your dapp can prompt a user to sign and send one or more Solana legacy transactions.
See the [Solana documentation](https://solana.com/docs/core/transactions) for more information about Solana transactions and how to create them.

## Sign and send a transaction

After creating an unsigned legacy transaction, you can ask the user's MetaMask wallet to sign and send the transaction.
Use the `signAndSendTransaction` method on the provider, or use `signAndSendTransaction` with the provider's `request` method.
You can specify an optional [`SendOptions`](https://solana-foundation.github.io/solana-web3.js/types/SendOptions.html) object as a second parameter for `signAndSendTransaction`, or as an `options` parameter when using `request`.

The method returns a promise for an object containing the `signature`.

<Tabs>
<TabItem value='signAndSendTransaction'>

```javascript
const provider = getProvider(); // TO DO: replace with provider snippet
const network = '<NETWORK_URL>';
const connection = new Connection(network);
const transaction = new Transaction();
const { signature } = await provider.signAndSendTransaction(transaction);
await connection.getSignatureStatus(signature);
```

</TabItem>
<TabItem value='request'>

```javascript
const provider = getProvider(); // TO DO: replace with provider snippet
const network = '<NETWORK_URL>';
const connection = new Connection(network);
const transaction = new Transaction();
const { signature } = await provider.request({
  method: 'signAndSendTransaction',
  params: {
    message: bs58.encode(transaction.serializeMessage()),
  },
});
await connection.getSignatureStatus(signature);
```

</TabItem>
</Tabs>

## Sign and send multiple transactions

After creating multiple unsigned legacy transactions, you can ask the user's MetaMask wallet to sign and send all the transactions at once.
Use the `signAndSendAllTransactions` method on the provider.
This method accepts an array of Solana transactions, and an optional [`SendOptions`](https://solana-foundation.github.io/solana-web3.js/types/SendOptions.html) object as a second parameter.

The method returns a promise for an object containing an array of `signatures` and the `publicKey` of the signer.

```typescript
const provider = getProvider(); // TO DO: replace with provider snippet
const network = '<NETWORK_URL>';
const connection = new Connection(network);
const transactions = [new Transaction(), new Transaction()];
const { signatures, publicKey } = await provider.signAndSendAllTransactions(transactions);
await connection.getSignatureStatuses(signatures);
```

## Next steps

To efficiently load more addresses in a single transaction, learn how to [send a versioned transaction](send-versioned-transaction.md) with Address Lookup Tables.
