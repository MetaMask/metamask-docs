# Send a legacy transaction

Once a web application is connected to Phantom, it can prompt the user for permission to send transactions on their behalf.

In order to send a transaction, a web application must:

1. Create an unsigned transaction.
2. Have the transaction be signed and submitted to the network by the user's Phantom wallet.
3. Optionally await network confirmation using a Solana JSON RPC connection.

:::info
For more information about the nature of Solana transactions, refer to the [solana-web3.js](https://solana-foundation.github.io/solana-web3.js/) documentation and the [Solana Cookbook](https://solanacookbook.com/core-concepts/transactions.html#transactions).
:::

For a sample Phantom transaction, check out our [sandbox](https://github.com/phantom-labs/sandbox/blob/b57fdd0e65ce4f01290141a01e33d17fd2f539b9/src/App.tsx#L160).

## Sign and send a transaction

Once a transaction is created, the web application may ask the user's Phantom wallet to sign and send the transaction. If accepted, Phantom will sign the transaction with the user's private key and submit it via a Solana JSON RPC connection. By far the **easiest** and most **recommended** way of doing this is by using the `signAndSendTransaction` method on the provider, but it is also possible to do with `request`. In both cases, the call will return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for an object containing the `signature`.

### signAndSendTransaction()

```javascript  theme={null}
const provider = getProvider(); // see "Detecting the Provider"
const network = "<NETWORK_URL>";
const connection = new Connection(network);
const transaction = new Transaction();
const { signature } = await provider.signAndSendTransaction(transaction);
await connection.getSignatureStatus(signature);
```

### request()

```javascript  theme={null}
const provider = getProvider(); // see "Detecting the Provider"
const network = "<NETWORK_URL>";
const connection = new Connection(network);
const transaction = new Transaction();
const { signature } = await provider.request({
    method: "signAndSendTransaction",
    params: {
         message: bs58.encode(transaction.serializeMessage()),
    },
});
await connection.getSignatureStatus(signature);
```

You can also specify a `SendOptions` [object](https://solana-foundation.github.io/solana-web3.js/modules.html#SendOptions) as a second argument into `signAndSendTransaction` or as an `options` parameter when using `request`.

For a live demo of `signAndSendTransaction`, refer to [handleSignAndSendTransaction](https://github.com/phantom-labs/sandbox/blob/b57fdd0e65ce4f01290141a01e33d17fd2f539b9/src/App.tsx#L160) in our sandbox.

## Sign and send multiple transactions

It is also possible to sign and send multiple transactions at once. This is exposed through the `signAndSendAllTransactions` method on the provider. This method accepts an array of Solana transactions, and will optionally accept a [SendOptions](https://solana-foundation.github.io/solana-web3.js/types/SendOptions.html) object as a second parameter. If successful, it will return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for an object containing the array of string `signatures` and the `publicKey` of the signer.

### signAndSendAllTransactions()

```typescript  theme={null}
const provider = getProvider(); // see "Detecting the Provider"
const network = "<NETWORK_URL>";
const connection = new Connection(network);
const transactions = [new Transaction(), new Transaction()];
const { signatures, publicKey } = await provider.signAndSendAllTransactions(transactions);
await connection.getSignatureStatuses(signatures);
```

## Other signing methods

The following methods are also supported, but are not recommended over `signAndSendTransaction`. It is safer for users, and a simpler API for developers, for Phantom to submit the transaction immediately after signing it instead of relying on the application to do so.

:::warning
The following methods are not supported in the [wallet standard](#) implementation and may be removed in a future release. These methods are only available via the [window.solana object].
:::

## Sign a transaction (without sending)

Once a transaction is created, a web application may ask the user's Phantom wallet to sign the transaction *without* also submitting it to the network. The easiest and most recommended way of doing this is via the `signTransaction` method on the provider, but it is also possible to do via `request`. In both cases, the call will return a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for the signed transaction. After the transaction has been signed, an application may submit the transaction itself using [sendRawTransaction](https://solana-foundation.github.io/solana-web3.js/classes/Connection.html#sendRawTransaction) in web3.js.

### signTransaction()

```javascript  theme={null}
const provider = getProvider();
const network = "<NETWORK_URL>";
const connection = new Connection(network);
const transaction = new Transaction();
const signedTransaction = await provider.signTransaction(transaction);
const signature = await connection.sendRawTransaction(signedTransaction.serialize());
```

### request()

```javascript  theme={null}
const provider = getProvider();
const network = "<NETWORK_URL>";
const connection = new Connection(network);
const transaction = new Transaction();
const signedTransaction = await provider.request({
    method: "signTransaction",
    params: {
         message: bs58.encode(transaction.serializeMessage()),
    },
});
const signature = await connection.sendRawTransaction(signedTransaction.serialize());
```

For an example of `signTransaction`, refer to [handleSignTransaction](https://github.com/phantom-labs/sandbox/blob/b57fdd0e65ce4f01290141a01e33d17fd2f539b9/src/App.tsx#L187) in our sandbox.

## Sign multiple transactions

For legacy integrations, Phantom supports signing multiple transactions at once without sending them. This is exposed through the `signAllTransactions` method on the provider. This method is **not recommended** for new integrations. Instead, developers should make use of `signAndSendAllTransactions`.

### signAllTransactions()

```javascript  theme={null}
const signedTransactions = await provider.signAllTransactions(transactions);
```

### request()

```javascript  theme={null}
const message = transactions.map(transaction => {
    return bs58.encode(transaction.serializeMessage());
});
const signedTransactions = await provider.request({
    method: "signAllTransactions",
    params: { message },
});
```

For an example of `signAllTransactions`, refer to [handleSignAllTransactions](https://github.com/phantom-labs/sandbox/blob/b57fdd0e65ce4f01290141a01e33d17fd2f539b9/src/App.tsx#L213) in our sandbox.
