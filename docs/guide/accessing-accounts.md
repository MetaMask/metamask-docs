# Accessing Accounts

User accounts are used in a variety of contexts in Ethereum, including as identifiers and for signing transactions. In order to request a signature from the user or have the user approve a transaction, one must be able to access the user's accounts. The `wallet methods` below involve a signature or transaction approval and all require the sending account as a function parameter.

- `eth_sendTransaction`
- `eth_sign` (insecure and unadvised to use)
- `eth_personalSign`
- `eth_signTypedData`

Once you've [connected to a user](./getting-started.html), you can always re-check the current account by checking `ethereum.selectedAddress`.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="js,result" data-user="BboyAkers" data-slug-hash="MWwQzeB" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Selected Address Example">
  <span>See the Pen <a href="https://codepen.io/BboyAkers/pen/MWwQzeB">
  Selected Address Example</a> by Austin Akers (<a href="https://codepen.io/BboyAkers">@BboyAkers</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

If you'd like to be notified when the address changes, we have an event you can subscribe to:

```javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
})
```

If the first account in the returned array isn't the account you expected, you should notify the user!
In the future, the accounts array may contain more than one account.
However, the first account in the array will continue to be considered as the user's "selected" account.
