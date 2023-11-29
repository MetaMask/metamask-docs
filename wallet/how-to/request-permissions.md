---
description: Request permissions to call restricted methods.
sidebar_position: 9
---

# Request permissions

To call a restricted RPC method, your dapp must request permission from the user to call it using
the [`wallet_requestPermissions`](/wallet/reference/wallet_requestPermissions) RPC method.
This method is specified by [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255).

`wallet_requestPermissions` creates a confirmation asking the user to connect to an account and
allow the dapp to call the requested method.
The confirmation screen describes the functions and data the requested method can access.
For example, something like the following confirmation displays when you request permission to call
the [`eth_accounts`](/wallet/reference/eth_accounts) restricted method:

<div class="row">
    <div class="column">
        <img src={require("../assets/request-permissions.png").default} alt="Request permissions confirmation 1" style={{border: '1px solid black'}} />
    </div>
    <div class="column">
        <img src={require("../assets/request-permissions-2.png").default} alt="Request permissions confirmation 2" style={{border: '1px solid black'}} />
    </div>
</div>

## Example

The following is an example of using `wallet_requestPermissions` to request permission from the user
to call `eth_accounts`.

```javascript
document.getElementById('requestPermissionsButton', requestPermissions);

function requestPermissions() {
  ethereum
    .request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    })
    .then((permissions) => {
      const accountsPermission = permissions.find(
        (permission) => permission.parentCapability === 'eth_accounts'
      );
      if (accountsPermission) {
        console.log('eth_accounts permission successfully requested!');
      }
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Permissions needed to continue.');
      } else {
        console.error(error);
      }
    });
}
```