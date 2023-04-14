---
description: Access a user's accounts and handle changed accounts.
---

# Access a user's accounts

User accounts are used in a variety of contexts in Ethereum, including as identifiers and for
[signing transactions](../how-to/sign-data.md).
To request a signature from a user or have a user approve a transaction, your dapp must
access the user's accounts using the
[`eth_requestAccounts`](../reference/rpc-api.md#eth_requestaccounts) RPC method.

When accessing a user's accounts:

- **Only** initiate a connection request in response to direct user action, such as
  selecting a [connect button](#create-a-connect-button).
- **Always** disable the connect button while the connection request is pending.
- **Never** initiate a connection request on page load.

:::tip
You can also [use MetaMask SDK](../how-to/use-sdk/index.md) to enable a reliable, secure, and
seamless connection from your dapp to a MetaMask wallet client.
:::

## Create a connect button

We recommend providing a button to allow users to connect MetaMask to your dapp.
Selecting this button should call `eth_requestAccounts` to access the user's account.

In the [example project code](set-up-dev-environment.md#example), the following JavaScript code
accesses the user's accounts when they select a connect button, and the following HTML code
displays the button and the current account:

<!--tabs-->

# JavaScript

```javascript title="index.js"
// You should only attempt to request the user's account in response to user
// interaction, such as selecting a button.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account, you should encourage the user
// to initiate the attempt.
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});

// While awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can select to initiate the request.
// MetaMask rejects any additional requests while the first is still
// pending.
async function getAccount() {
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log('Please connect to MetaMask.');
      } else {
        console.error(err);
      }
    });
  const account = accounts[0];
  showAccount.innerHTML = account;
}
```

# HTML

```html title="index.html"
<!-- Display a connect button and the current account -->
<button class="enableEthereumButton">Enable Ethereum</button>
<h2>Account: <span class="showAccount"></span></h2>
```

<!--/tabs-->

:::note
MetaMask currently returns at most one account in the `accounts` array.
The array may contain more than one account in the future.

To retrieve the full list of accounts for which the user has permitted access, use the
[`wallet_getPermissions`](../reference/rpc-api#wallet_getpermissions) RPC method.
:::

## Handle accounts

Use the [`eth_accounts`](https://metamask.github.io/api-playground/api-documentation/#eth_accounts)
RPC method to handle user accounts.
Listen to the [`accountsChanged`](../reference/provider-api.md#accountschanged) provider event to
be notified when the user changes accounts.

In the [example project script](set-up-dev-environment.md#example), the following code handles user
accounts and detects when the user changes accounts:

```javascript title="index.js"
let currentAccount = null;
window.ethereum.request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    // Some unexpected error.
    // For backwards compatibility reasons, if no accounts are available,
    // eth_accounts returns an empty array.
    console.error(err);
  });

// Note that this event is emitted on page load.
// If the array of accounts is non-empty, you're already
// connected.
window.ethereum.on('accountsChanged', handleAccountsChanged);

// eth_accounts always returns an array.
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts.
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    // Reload your interface with accounts[0].
    currentAccount = accounts[0];
    // Update the account displayed (see the HTML for the connect button)
    showAccount.innerHTML = currentAccount;
  }
}
```

:::note
MetaMask currently returns at most one account in the `accounts` array.
The array may contain more than one account in the future.
The first account in the array will always be considered the user's "selected" account.
:::
