---
description: Learn about MetaMask Advanced Permissions (ERC-7715).
keywords: [ERC-7715, 7715, permissions, wallet, smart account]
---

# Advanced Permissions (ERC-7715)

The Smart Accounts Kit supports Advanced Permissions ([ERC-7715](https://eips.ethereum.org/EIPS/eip-7715)), which lets you request fine-grained permissions from a MetaMask user to execute transactions on their behalf.
For example, a user can grant your dapp permission to spend 10 USDC per day to buy ETH over the course of a month.
Once the permission is granted, your dapp can use the allocated 10 USDC each day to purchase ETH directly from the MetaMask user's account.

Advanced Permissions eliminate the need for users to approve every transaction, which is useful for highly interactive dapps.
It also enables dapps to execute transactions for users without an active wallet connection.

:::note
This feature requires [MetaMask Flask 13.5.0](/snaps/get-started/install-flask) or later.
:::

## ERC-7715 technical overview

[ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) defines a JSON-RPC method `wallet_grantPermissions`. 
Dapps can use this method to request a wallet to grant the dapp permission to execute transactions on a user's behalf.
`wallet_grantPermissions` requires a `signer` parameter, which identifies the entity requesting or managing the permission.
Common signer implementations include wallet signers, single key and multisig signers, and account signers.

The Smart Accounts Kit supports multiple signer types. The documentation uses [an account signer](../guides/advanced-permissions/execute-on-metamask-users-behalf.md) as a common implementation example.
When you use an account signer, a session account is created solely to request and redeem Advanced Permissions, and doesn't contain tokens.
The session account can be granted with permissions and redeem them as specified in [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710).
The session account can be a smart account or an externally owned account (EOA).

The MetaMask user that the session account requests permissions from must be upgraded to a [MetaMask smart account](smart-accounts.md).

## Advanced Permissions vs. delegations

Advanced Permissions expand on regular [delegations](delegation/index.md) by enabling permission sharing *via the MetaMask browser extension*.

With regular delegations, the dapp constructs a delegation and requests the user to sign it.
These delegations are not human-readable, so it is the dapp's responsibility to provide context for the user.
Regular delegations cannot be signed through the MetaMask extension, because if a dapp requests a delegation without constraints, the whole wallet can be exposed to the dapp.

In contrast, Advanced Permissions enable dapps (and AI agents) to request permissions from a user directly via the MetaMask extension.
Advanced Permissions require a permission configuration which displays a human-readable confirmation for the MetaMask user.
The user can modify the permission parameters if the request is configured to allow adjustments.

For example, the following Advanced Permissions request displays a rich UI including the start time, amount, and period duration for an [ERC-20 token periodic transfer](../guides/advanced-permissions/use-permissions/erc20-token.md#erc-20-periodic-permission):

<p align="center">
<img src={require("../assets/erc7715-request.png").default} alt="ERC-7715 request" width="450px" class="appScreen" />
</p>

## Advanced Permissions lifecycle

The Advanced Permissions lifecycle is as follows:

1. **Set up a session account** - Set up a session account to execute transactions on behalf of the MetaMask user.
  It can be a [smart account](smart-accounts.md) or an externally owned account (EOA).

2. **Request permissions** - Request permissions from the user.
  The Smart Accounts Kit supports [ERC-20 token permissions](../guides/advanced-permissions/use-permissions/erc20-token.md) and
  [native token permissions](../guides/advanced-permissions/use-permissions/native-token.md).

4. **Redeem permissions** - Once the permission is granted, the session account can redeem the permission, executing on the user's behalf.

See [how to perform executions on a MetaMask user's behalf](../guides/advanced-permissions/execute-on-metamask-users-behalf.md) to get started with the Advanced Permissions lifecycle.
