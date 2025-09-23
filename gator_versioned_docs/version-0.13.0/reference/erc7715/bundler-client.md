---
description: Bundler Client API methods reference.
sidebar_label: Bundler Client
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Bundler Client API reference

The following API methods are related to the [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler).

## `sendUserOperationWithDelegation`

Sends a user operation to redeem delegated permissions according to the [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) specifications.

:::info
To use `sendUserOperationWithDelegation`, the Viem Bundler Client must be
extended with `erc7710BundlerActions`.
:::

### Parameters

See the [Viem `sendUserOperation` parameters](https://viem.sh/account-abstraction/actions/bundler/sendUserOperation).
This function has the same parameters, except it does not accept `callData`.

Objects in the `calls` array also require the following parameters:

| Name | Type | Required | Description                                                                                                                                                                                        |
| ---- | ---- | -------- |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `delegationManager` | `0x${string}` | Yes | The address of Delegation Manager.                                                                                                                                                                 |
| `permissionsContext` | `0x${string}` | Yes | Encoded calldata for redeeming delegations. If you're not using ERC-7715, you can use the [`redeemDelegations`](../delegation/index.md#redeemdelegations) utility function to generate the calldata manually. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { sessionAccount, bundlerClient, publicClient } from "./config.ts";

// These properties must be extracted from the permission response.
const permissionsContext = permissionsResponse[0].context;
const delegationManager = permissionsResponse[0].signerMeta.delegationManager;
const accountMetadata = permissionsResponse[0].accountMeta;

// Calls without permissionsContext and delegationManager will be executed 
// as a normal user operation.
const userOperationHash = await bundlerClient.sendUserOperationWithDelegation({
  publicClient,
  account: sessionAccount,
  calls: [
    {
      to: sessionAccount.address,
      data: "0x",
      value: 1n,
      permissionsContext,
      delegationManager,
    },
  ],
  // Appropriate values must be used for fee-per-gas. 
  maxFeePerGas: 1n,
  maxPriorityFeePerGas: 1n
  accountMetadata,
});
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http, createBundlerClient } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { createBundlerClient } from "viem/account-abstraction";
import { erc7710BundlerActions } from "@metamask/delegation-toolkit/experimental";
import { toMetaMaskSmartAccount, Implementation } from "@metamask/delegation-toolkit";

export const publicClient = createPublicClient({
  chain: chain,
  transport: http(),
});

// Your session account for requesting and redeeming should be the same.
const privateKey = "0x...";
const account = privateKeyToAccount(privateKey);

export const sessionAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signer: { account },
});

export const bundlerClient = createBundlerClient({
  transport: http(
    `https://your-bundler-url`
  ),
  // Allows you to use the same Bundler Client as paymaster.
  paymaster: true
}).extend(erc7710BundlerActions());
```

</TabItem>
</Tabs>
