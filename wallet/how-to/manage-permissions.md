---
description: Request and revoke permissions to call restricted methods.
sidebar_position: 6
---

# Manage permissions

To call a restricted RPC method, your dapp must request permission from the user using
the [`wallet_requestPermissions`](/wallet/reference/wallet_requestPermissions) RPC method.
You can get the user's current permissions using [`wallet_getPermissions`](/wallet/reference/wallet_getPermissions),
and revoke permissions previously granted to your dapp using
[`wallet_revokePermissions`](/wallet/reference/wallet_revokePermissions).
These methods are specified by [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255) and
[MIP-2](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-2.md).

`wallet_requestPermissions` creates a confirmation asking the user to connect to an account and
allow the dapp to call the requested method.
The confirmation screen describes the functions and data the requested method can access.
For example, something like the following confirmation displays when you request permission to call
the restricted method [`eth_accounts`](/wallet/reference/eth_accounts):

<div class="row margin-bottom--md">
    <div class="column">
        <img src={require("../assets/request-permissions.png").default} alt="Request permissions confirmation 1" style={{border: '1px solid #DCDCDC'}} />
    </div>
    <div class="column">
        <img src={require("../assets/request-permissions-2.png").default} alt="Request permissions confirmation 2" style={{border: '1px solid #DCDCDC'}} />
    </div>
</div>

:::info note
To access accounts, we recommend using [`eth_requestAccounts`](/wallet/reference/eth_requestAccounts),
which automatically asks for permission to use `eth_accounts` by calling `wallet_requestPermissions`
internally. 
See [how to access a user's accounts](../connect/access-accounts) for more information.
Granting permission for `eth_accounts` also grants access to [`eth_sendTransaction`](/wallet/reference/eth_sendTransaction), [`personal_sign`](/wallet/reference/personal_sign), and [`eth_signTypedData_v4`](/wallet/reference/eth_signTypedData_v4). 
:::

## Request permissions example

The following example uses `wallet_requestPermissions` to request permission from the user to call `eth_accounts`:

```javascript
document.getElementById("requestPermissionsButton", requestPermissions);

function requestPermissions() {
  provider // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    })
    .then((permissions) => {
      const accountsPermission = permissions.find(
        (permission) => permission.parentCapability === "eth_accounts"
      );
      if (accountsPermission) {
        console.log("eth_accounts permission successfully requested!");
      }
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("Permissions needed to continue.");
      } else {
        console.error(error);
      }
    });
}
```

## Revoke permissions example

The following example uses `wallet_revokePermissions` to revoke the dapp's permission to call `eth_accounts`:

```javascript
await provider // Or window.ethereum if you don't support EIP-6963.
  .request({
    method: "wallet_revokePermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
```