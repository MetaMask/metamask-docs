# Accessing Accounts

Once you've [connected to a user](./Getting_Started), you can always re-check the current account by checking `ethereum.selectedAddress`.

If you'd like to be notified when the address changes, we have an event you can subscribe to:

```javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
})
```

If this isn't the account you expected, you should notify the user!
