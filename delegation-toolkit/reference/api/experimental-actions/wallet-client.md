---
description: Wallet Client API methods reference.
sidebar_label: Wallet Client
sidebar_position: 2
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Wallet Client API reference

The following API methods are related to the [Viem Wallet Client](https://viem.sh/docs/clients/wallet).

## `grantPermissions`

Requests permissions from the MetaMask extension account according to the [ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) specifications.

:::info
To use `grantPermissions`, the Viem Wallet Client must be extended with `erc7715ProviderActions`.
:::

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `chainId` | `number` | Yes | The chain ID on which the permission is being requested. |
| `address` | `Address` | No | Address of the wallet to which the permission is being requested. |
| `expiry` | `number` | Yes | The timestamp (in seconds) by which the permission must expire. |
| `permission` | `Permission` | Yes | The permission to grant to the user. |
| `signer` | `Signer` | Yes | The account to which the permission will be assigned. |
| `isAdjustmentAllowed` | `boolean` | No | Whether the user is allowed to modify the requested permission. The default is `true`. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { sepolia as chain } from "viem/chains";
import { walletClient } from "./config.ts";

const expiry = Math.floor(Date.now() / 1000 + 604_800); // 1 week from now.
const currentTime = Math.floor(Date.now() / 1000); // now

// Address of the wallet that will manage the session. It can 
// be either a smart account or an externally owned account (EOA)
const sessionAccount = "0x1431..";

const grantedPermissions = await walletClient.grantPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      address: sessionAccount,
    },
  },
  permission: {
    type: "native-token-stream",
    data: {
      initialAmount: 1n, // 1 wei
      amountPerSecond: 1n, // 1 wei per second
      maxAmount: 10n, // 10 wei
      startTime: currentTime,
      justification: "Payment for a week long subscription",
    },
  },
}]);
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/delegation-toolkit/experimental";

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
| `delegationManager` | `0x${string}` | Yes | The address of the Delegation Manager.                                                                                                                                                                    |
| `permissionsContext` | `0x${string}` | Yes | Encoded calldata for redeeming delegations. If you're not using ERC-7715, you can use the [`redeemDelegation`](../delegation.md#redeemdelegation) utility function to generate the calldata manually. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { walletClient, publicClient } from "./config.ts";

// These properties must be extracted from the permission response. See
// `grantPermissions` action to learn how to request permissions.
const permissionsContext = permissionsResponse[0].context;
const delegationManager = permissionsResponse[0].signerMeta.delegationManager;
const accountMetadata = permissionsResponse[0].accountMeta;

if (accountMetadata?.length !== 0) {
  // If the granted permission contains accountMetadata, this must be executed before attempting to 
  // redeem the delegation.

  // This transaction will deploy the delegator account.
  const hash = walletClient.sendTransaction({
    to: accountMetadata[0].factory,
    data: accountMetadata[0].factoryData,
  });
  
  // You should wait for the transaction to be successfully executed.
  // You can use the TransactionReceipt.status to verify the state.
  await publicClient.waitForTransactionReceipt( { hash });
}

const hash = walletClient.sendTransactionWithDelegation({
  chain,
  to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  value: 1n,
  permissionsContext,
  delegationManager
});
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { http, createPublicClient, createWalletClient } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { erc7710WalletActions } from "@metamask/delegation-toolkit/experimental";

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
