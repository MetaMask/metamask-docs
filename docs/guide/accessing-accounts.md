# Accessing Accounts
User accounts are used in a variety of contexts in Ethereum, they serve as neat identifiers, but no use as as important as calling *wallet methods*, methods that involve a signature or transaction approval. All of those methods require the sending account as a function parameter:
* `eth_sendTransaction`
* `eth_sign` (insecure and unadvised to use)
* `eth_personalSign`
* `eth_signTypedData`
Once you’ve [connected to a user](/guide/getting-started.html), you can always re-check the current account by checking `ethereum.selectedAddress`.

If you’d like to be notified when the address changes, we have an event you can subscribe to:
``` javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
})
```
If this isn’t the account you expected, you should notify the user!