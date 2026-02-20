---
description: Wallet Client actions reference.
sidebar_label: Wallet Client actions
toc_max_heading_level: 2
keywords: [ERC-7710, Viem, wallet client, actions, reference, advanced permissions, redeem delegation]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Wallet Client actions reference

These actions extend the [Viem Wallet Client](https://viem.sh/docs/clients/wallet) to support [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) utilities.

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
| `permissionsContext` | `Hex` | Yes | Encoded calldata for redeeming delegations. If you're not using Advanced Permissions (ERC-7715), you can use the [`redeemDelegations`](../delegation/index.md#redeemdelegations) utility function to generate the calldata manually. |

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
import { erc7710WalletActions } from "@metamask/smart-accounts-kit/actions";

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
