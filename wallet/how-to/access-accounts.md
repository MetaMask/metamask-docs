---
description: Access a user's accounts and handle changed accounts.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Access a user's accounts

User accounts are used in a variety of contexts in Ethereum, including as identifiers and for
[signing transactions](sign-data/index.md).
To request a signature from a user or have a user approve a transaction, your dapp can
access the user's accounts using the
[`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) RPC method.

:::info note
`eth_requestAccounts` internally calls [`wallet_requestPermissions`](/wallet/reference/wallet_requestPermissions)
to [request permission](manage-permissions.md) to call the restricted
[`eth_accounts`](/wallet/reference/eth_accounts) method.
:::

When accessing a user's accounts:

- **Only** initiate a connection request in response to direct user action, such as
  selecting a [connect button](#create-a-connect-button).
- **Always** disable the connect button while the connection request is pending.
- **Never** initiate a connection request on page load.

## Create a connect button

We recommend providing a button to allow users to connect MetaMask to your dapp.
Selecting this button should call `eth_requestAccounts` to access the user's accounts.

For example, the following JavaScript code accesses the user's accounts when they select a connect
button, and the following HTML code displays the button and the current account:

<Tabs>
<TabItem value="JavaScript">

```javascript title="index.js"
// You should only attempt to request the user's account in response to user
// interaction, such as selecting a button.
// Otherwise, you popup-spam the user like it's 1999.
// If you fail to retrieve the user's account, you should encourage the user
// to initiate the attempt.
const ethereumButton = document.querySelector(".enableEthereumButton");
const showAccount = document.querySelector(".showAccount");

ethereumButton.addEventListener("click", () => {
    getAccount();
});

// While awaiting the call to eth_requestAccounts, you should disable
// any buttons the user can select to initiate the request.
// MetaMask rejects any additional requests while the first is still
// pending.
async function getAccount() {
    const accounts = await window.ethereum
        .request({ method: "eth_requestAccounts" })
        .catch((err) => {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log("Please connect to MetaMask.");
            } else {
                console.error(err);
            }
        });
    const account = accounts[0];
    showAccount.innerHTML = account;
}
```

</TabItem>
<TabItem value="HTML">

```html title="index.html"
<!-- Display a connect button and the current account -->
<button class="enableEthereumButton">Enable Ethereum</button>
<h2>Account: <span class="showAccount"></span></h2>
```

</TabItem>
</Tabs>

## Handle accounts

Use the [`eth_accounts`](/wallet/reference/eth_accounts)
RPC method to handle user accounts.
Listen to the [`accountsChanged`](../reference/provider-api.md#accountschanged) provider event to
be notified when the user changes accounts.

The following code handles user accounts and detects when the user changes accounts:

```javascript title="index.js"
let currentAccount = null;
window.ethereum
    .request({ method: "eth_accounts" })
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
window.ethereum.on("accountsChanged", handleAccountsChanged);

// eth_accounts always returns an array.
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts.
        console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== currentAccount) {
        // Reload your interface with accounts[0].
        currentAccount = accounts[0];
        // Update the account displayed (see the HTML for the connect button)
        showAccount.innerHTML = currentAccount;
    }
}
```

:::note
`eth_accounts` now returns the full list of accounts for which the user has permitted access to.
Previously, `eth_accounts` returned at most one account in the `accounts` array.
The first account in the array will always be considered the user's "selected" account.
:::

## Disconnect a user's accounts

Since `eth_requestAccounts` internally calls `wallet_requestPermissions` for permission to call
`eth_accounts`, you can use [`wallet_revokePermissions`](/wallet/reference/wallet_revokePermissions)
to revoke this permission, revoking your dapp's access to the user's accounts.

This is useful as a method for users to log out (or disconnect) from your dapp.
You can then use [`wallet_getPermissions`](/wallet/reference/wallet_getPermissions) to determine
whether the user is connected or disconnected to your dapp.

See [how to revoke permissions](manage-permissions.md#revoke-permissions-example) for an example.
