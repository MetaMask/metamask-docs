---
description: Wallet Client actions reference.
sidebar_label: Wallet Client actions
toc_max_heading_level: 2
keywords: [ERC-7715, Viem, wallet client, actions, reference]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Wallet Client actions reference

The following actions are related to the [Viem Wallet Client](https://viem.sh/docs/clients/wallet) used to [execute on a MetaMask user's behalf](../../guides/erc7715/execute-on-metamask-users-behalf.md).

## `requestExecutionPermissions`

Requests permissions from the MetaMask extension account according to the [ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) specifications.

:::info
To use `requestExecutionPermissions`, the Viem Wallet Client must be extended with `erc7715ProviderActions`.
:::

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `chainId` | `number` | Yes | The chain ID on which the permission is being requested. |
| `address` | `Address` | No | Address of the wallet to which the permission is being requested. |
| `expiry` | `number` | Yes | The timestamp (in seconds) by which the permission must expire. |
| `permission` | `SupportedPermissionParams` | Yes | The permission to be requested. The toolkit supports multiple [ERC-7715 permissions](permissions.md). |
| `signer` | `SignerParam` | Yes | The account to which the permission will be assigned. |
| `isAdjustmentAllowed` | `boolean` | Yes | Defines whether the user is allowed to modify the requested permission. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { sepolia as chain } from "viem/chains";
import { parseUnits } from "viem";
import { walletClient } from "./client.ts";

const currentTime = Math.floor(Date.now() / 1000);
const expiry = currentTime + 604800;

const grantedPermissions = await walletClient.requestExecutionPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      address: "0x0955fFD7b83e5493a8c1FD5dC87e2CF37Eacc44a",
    },
  },
  permission: {
    type: "erc20-token-periodic",
    data: {
      tokenAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      periodAmount: parseUnits("10", 6),
      periodDuration: 86400,
      justification?: "Permission to transfer 1 USDC every day",
    },
  },
  isAdjustmentAllowed: true,
}]);
```

</TabItem>
<TabItem value ="client.ts">

```ts
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/experimental";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>

## `sendTransactionWithDelegation`

Sends a transaction to redeem delegated permissions according to the [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) specifications.

:::info
To use `sendTransactionWithDelegation`, the Viem Wallet Client must be
extended with `erc7710WalletActions`.
:::

### Parameters

See the [Viem `sendTransaction` parameters](https://viem.sh/docs/actions/wallet/sendTransaction#parameters).
This function has the same parameters, and it also requires the following parameters:

| Name | Type | Required | Description                                                                                                                                                                                               |
| ---- | ---- | -------- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `delegationManager` | `Address` | Yes | The address of the Delegation Manager.                                                                                                                                                                    |
| `permissionsContext` | `Hex` | Yes | Encoded calldata for redeeming delegations. If you're not using ERC-7715, you can use the [`redeemDelegations`](../delegation/index.md#redeemdelegations) utility function to generate the calldata manually. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { walletClient, publicClient } from "./client.ts";

// These properties must be extracted from the permission response. See
// `grantPermissions` action to learn how to request permissions.
const permissionsContext = permissionsResponse[0].context;
const delegationManager = permissionsResponse[0].signerMeta.delegationManager;

const hash = walletClient.sendTransactionWithDelegation({
  chain,
  to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  value: 1n,
  permissionsContext,
  delegationManager
});
```

</TabItem>
<TabItem value ="client.ts">

```ts
import { http, createPublicClient, createWalletClient } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { erc7710WalletActions } from "@metamask/smart-accounts-kit/experimental";

export const publicClient = createPublicClient({
  chain,
  transport: http()
});

// Your session account for requesting and redeeming should be the same.
const privateKey = "0x...";
const account = privateKeyToAccount(privateKey);

const walletClient = createWalletClient({
  account,
  transport: http(),
  chain,
}).extend(erc7710WalletActions());
```

</TabItem>
</Tabs>
