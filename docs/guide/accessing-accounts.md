# Accessing Accounts

User accounts are used in a variety of contexts in Ethereum, they serve as neat identifiers,
but no use is as important as calling _wallet methods_.
These methods involve a signature or transaction approval.
All of those methods require the sending account as a function parameter:

- `eth_sendTransaction`
- `eth_sign` (insecure and unadvised to use)
- `eth_personalSign`
- `eth_signTypedData`

Once you've [connected to a user](./getting-started.html), you can always re-check the current account by checking `ethereum.selectedAddress`.

If you'd like to be notified when the address changes, we have an event you can subscribe to:

```javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
})
```

If the first account in the returned array isn't the account you expected, you should notify the user!
In the future, the accounts array may contain more than one account.
However, the first account in the array will continue to be considered as the user's "selected" account.
