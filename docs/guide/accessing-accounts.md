# Accessing Accounts

User accounts are used in a variety of contexts in Ethereum, including as identifiers and for signing transactions. In order to request a signature from the user or have the user approve a transaction, one must be able to access the user's accounts. The `wallet methods` below involve a signature or transaction approval and all require the sending account as a function parameter.

- `eth_sendTransaction`
- `eth_sign` (insecure and unadvised to use)
- `personal_sign`
- `eth_signTypedData`

Once you've [connected to a user](./getting-started.html), you can always re-check the current account by checking `ethereum.selectedAddress`.

**Example:**
<ChangeAccount />

If you'd like to be notified when the address changes, we have an event you can subscribe to:

```javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
});
```

If the first account in the returned array isn't the account you expected, you should notify the user!
In the future, the accounts array may contain more than one account. This functionality isn't available yet. The first account in the array will always be considered the user's "selected" account.
