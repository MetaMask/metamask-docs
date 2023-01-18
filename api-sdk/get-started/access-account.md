import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Access an account

"Connecting" or "logging in" to MetaMask effectively means "to access the user's Ethereum account(s)".

User accounts are used in a variety of contexts in Ethereum, including as identifiers and for
signing transactions.
In order to request a signature from the user or have the user approve a transaction, one must be
able to access the user's accounts.
The `wallet methods` below involve a signature or transaction approval and all require the sending
account as a function parameter.

- `eth_sendTransaction`
- `eth_sign` (insecure and unadvised to use)
- `personal_sign`
- `eth_signTypedData`

## Create a connect button

You should **only** initiate a connection request in response to direct user action, such as
clicking a button.
You should **always** disable the "connect" button while the connection request is pending.
You should **never** initiate a connection request on page load.

We recommend that you provide a button to allow the user to connect MetaMask to your dapp.
Clicking this button should call the following method:

```javascript
ethereum.request({ method: 'eth_requestAccounts' });
```

**Example:**

<Tabs>
<TabItem value="html" label="HTML" default>

```html
<button class="enableEthereumButton">Enable Ethereum</button>
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
});
```

</TabItem>
</Tabs>

This promise-returning function resolves with an array of hex-prefixed Ethereum addresses, which can
be used as general account references when sending transactions.

Over time, this method is intended to grow to include various additional parameters to help your
site request everything it needs from the user during setup.

Since it returns a promise, if you're in an `async` function, you may log in like this:

```javascript
const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
const account = accounts[0];
// We currently only ever provide a single account,
// but the array gives us some room to grow.
```

**Example:**

<Tabs>
<TabItem value="html" label="HTML" default>

```html
<button class="enableEthereumButton">Enable Ethereum</button>
<h2>Account: <span class="showAccount"></span></h2>
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}
```

</TabItem>
</Tabs>

## Re-check an account

Once you've connected to a user, you can always re-check the current account by checking
`ethereum.selectedAddress`.

If you'd like to be notified when the address changes, we have an event you can subscribe to:

```javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
});
```

If the first account in the returned array isn't the account you expected, you should notify the user!
In the future, the accounts array may contain more than one account.
This functionality isn't available yet.
The first account in the array will always be considered the user's "selected" account.
