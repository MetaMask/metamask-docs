---
description: Connect to custom EVM accounts using the Keyring API.
sidebar_position: 4
sidebar_custom_props:
  flask_only: true
tags:
  - Keyring API
---

# Custom EVM accounts

The Keyring API integrates custom EVM accounts inside MetaMask.
You can use the Keyring API to display custom accounts, such as multi-party computation (MPC)
accounts, alongside regular MetaMask accounts in the user interface:

<p align="center">
<img src={require('../../assets/keyring/accounts-ui.png').default} alt="Account management Snap accounts in Metamask UI" width="360" style={{border: '1px solid gray'}} />
</p>

To use the Keyring API, you first [implement the API in an account management Snap](create-account-snap.md)
(also known as an "account Snap").
You can then [call Keyring API methods from a companion dapp](create-companion-dapp.md)
to enable users to create and interact with the custom accounts.

:::flaskOnly
:::

:::tip see also
- [Create an account management Snap](create-account-snap.md)
- [Create an account management companion dapp](create-companion-dapp.md)
- [Account management Snap security guidelines](security.md)
- [Keyring API reference](../../reference/keyring-api/index.md)
:::

## System context diagram

The following diagram shows the system context when interacting with accounts managed by an account
management Snap:

<p align="center">

```mermaid
graph TD
  User -->|Use to submit requests<br/>and manage accounts| MetaMask
  User -->|Start requests| Dapp
  User -->|Use to manage<br/>requests and accounts| Site
  Dapp -->|Submit requests| MetaMask
  Site[Snap companion dapp] -->|Manage requests<br/>and accounts| MetaMask
  MetaMask -->|Submit requests and<br/>manage accounts| Snap
  Snap -->|Notify about account<br/>and request events| MetaMask
```

</p>

The diagram contains the following components:

- **User** - The user interacting with the dapp, the Snap companion dapp, and MetaMask.
- **Dapp** - The dapp requesting an action to be performed on an account.
- **MetaMask** - The wallet the dapp connects to.
  MetaMask routes requests to the account management Snap and lets the user perform some level of
  account management.
- **Snap** - The account management Snap that implements the Keyring API to manage the user's
  accounts and handle requests that use these accounts.
- **Snap companion dapp** - The Snap's user interface component that allows the user to interact with
  the Snap to manage accounts and requests.

## Account management Snap installation flow

The first process a user encounters when using an account management Snap is the Snap installation flow.
This process can be initiated through MetaMask's or the Snap companion dapp.
The flow looks like the following:

```mermaid
%%{
  init: {
    'sequence': {
      'actorMargin': 25,
      'width': 225
    }
  }
}%%

sequenceDiagram
autonumber

actor User
participant MetaMask
participant Snap
participant Site as Snap companion dapp

alt Optional
  User ->>+ MetaMask: Add account Snap
  MetaMask ->> MetaMask: Display suggested Snaps
  User ->> MetaMask: Select Snap
  MetaMask ->> Site: Open in a new tab
  deactivate MetaMask
end

Site ->>+ MetaMask: Install Snap?
MetaMask ->> MetaMask: Display permissions dialog
User ->> MetaMask: Approve permissions
MetaMask -->>- Site: OK
```

The MetaMask account selection modal has an option called **Add account Snap**.
This option shows a list of account management Snaps.
Each Snap redirects the user to the companion dapp that contains the user interface to configure and
manage the Snap.

## Custom account creation flow

Once the account management Snap is installed, the user can use the Snap companion dapp to create or
import custom accounts.
The flow looks like the following:

```mermaid
%%{
  init: {
    'sequence': {
      'actorMargin': 15,
      'width': 245
    }
  }
}%%

sequenceDiagram
autonumber

actor User
participant MetaMask
participant Snap
participant Site as Snap companion dapp

User ->>+ Site: Create new account
Site ->> Site: Custom logic to create account
Site ->>+ Snap: keyring_createAccount(options)
Snap ->> Snap: Custom logic to create account
Snap ->>+ MetaMask: snap_manageAccounts(<br/>"notify:accountCreated", account)
User ->> MetaMask: Approve account creation
MetaMask -->>- Snap: OK
Snap -->>- Site: OK
Site -->>- User: Done
```

The companion dapp presents a user interface allowing the user to configure their custom account.
The dapp creates an account using [`keyring_createAccount`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md#createaccount).

The Snap keeps track of the accounts that it creates using [`snap_manageState`](../../reference/snaps-api.md#snap_managestate).
Once the Snap has created an account, it notifies MetaMask using
[`snap_manageAccounts`](../../reference/snaps-api.md#snap_manageaccounts).

Once the Snap has created an account, that account can be used to sign messages and transactions.

## Transaction flows

The Keyring API supports two flows for handling requests: [synchronous](#synchronous-transaction-flow)
and [asynchronous](#asynchronous-transaction-flow).

In general, you should use the asynchronous flow when the request requires user interaction (for
example, using a hardware key or a threshold signature scheme) or when the request takes a long time
to complete.
You should use the synchronous flow for any other use case.

### Synchronous transaction flow

The synchronous flow looks like the following:

```mermaid
%%{
  init: {
    'sequence': {
      'actorMargin': 25,
      'width': 225
    }
  }
}%%

sequenceDiagram
autonumber

actor User
participant Dapp
participant MetaMask
participant Snap

User ->>+ Dapp: Create new sign request
Dapp ->>+ MetaMask: ethereum.request(request)
MetaMask ->> MetaMask: Display request to user
User ->> MetaMask: Approve request

MetaMask ->>+ Snap: keyring_submitRequest(request)
Snap ->> Snap: Custom logic to handle request
Snap -->>- MetaMask: { pending: false, result }

MetaMask -->>- Dapp: result

Dapp -->>- User: Done
```

The flow starts when a user or dapp initiates a [sign request](#supported-signing-methods).
At that point, MetaMask detects that this interaction is requested for an account controlled by the
account management Snap.

After the user approves the transaction in MetaMask, MetaMask calls
[`keyring_submitRequest`](../../reference/keyring-api/type-aliases/Keyring.md#submitrequest), which
receives the original RPC request and returns a
[`SubmitRequestResponse`](../../reference/keyring-api/variables/SubmitRequestResponseStruct.md)
with `pending` set to `false`, and `result` set to the requested signature.

### Asynchronous transaction flow

The asynchronous flow looks like the following:

```mermaid
%%{
  init: {
    'sequence': {
      'actorMargin': 20,
      'width': 200
    }
  }
}%%

sequenceDiagram
autonumber

actor User
participant Dapp
participant MetaMask
participant Snap
participant Site as Snap companion dapp

User ->>+ Dapp: Create new sign request
Dapp ->>+ MetaMask: ethereum.request(request)
MetaMask ->> MetaMask: Display request to user
User ->> MetaMask: Approve request

MetaMask ->>+ Snap: keyring_submitRequest(request)
Snap ->> Snap: Save request to Snap's state
Snap -->>- MetaMask: { pending: true, redirect? }
alt There is a redirect URL
  User ->> MetaMask: Acknowledge redirection
  MetaMask ->>+ Site: Open redirect URL in a new tab
end
deactivate MetaMask

Site ->>+ Snap: keyring_getRequest(id)
Snap -->>- Site: request

Site ->> Site: Custom logic to handle request
Site ->>+ Snap: keyring_approveRequest(id, data?)
Snap ->> Snap: Custom logic to handle request
Snap ->>+ MetaMask: snap_manageAccounts(<br/>"notify:requestApproved", { id, result })

MetaMask -->> Dapp: result
MetaMask -->>- Snap: OK
Snap -->>- Site: OK
deactivate Site

Dapp -->>- User: Done
```

The flow starts the same way as the [synchronous flow](#synchronous-transaction-flow): a user or
dapp initiates a [sign request](#supported-signing-methods).
After approval, MetaMask calls [`keyring_submitRequest`](../../reference/keyring-api/type-aliases/Keyring.md#submitrequest).

Since the Snap doesn't answer the request directly, it stores the pending request in its internal
state using [`snap_manageState`](../../reference/snaps-api.md#snap_managestate).
The Snap sends a `{ pending: true, redirect? }` response to indicate that the request will be
handled asynchronously.
This response can optionally contain a redirect URL that MetaMask will open in a new tab to allow
the user to interact with the Snap companion dapp.

The companion dapp gets the Snap's pending request using
[`keyring_getRequest`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md#getrequest).
It resolves the request using
[`keyring_approveRequest`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md#approverequest),
and the Snap resolves the request using [`snap_manageAccounts`](../../reference/snaps-api.md#snap_manageaccounts),
notifying MetaMask of the result.

## Supported signing methods

An account management Snap can implement support for handling the [`personal_sign`](/wallet/reference/personal_sign),
[`eth_signTypedData_v4`](/wallet/reference/eth_signtypeddata_v4), and
[`eth_signTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_signtransaction)
Ethereum signing methods.

The Snap can also implement support for [deprecated signing
methods](/wallet/concepts/signing-methods/#deprecated-signing-methods) that some dapps still
might use.

## Example

See the [example account management Snap source code](https://github.com/MetaMask/snap-simple-keyring) for more information.
