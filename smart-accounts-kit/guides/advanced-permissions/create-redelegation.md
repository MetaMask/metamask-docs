---
description: Learn how to create a redelegation for Advanced Permissions.
sidebar_label: Create a redelegation
keywords: [advanced permissions, caveat, delegation scope, redelegation, delegation]
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Create a redelegation

Redelegation is a core feature that sets Advanced Permissions apart from other permission sharing frameworks.
It allows a session account (delegate) to create a delegation chain, passing on the same or reduced level of authority 
from the MetaMask account (delegator).

For example, if a dapp is granted permission to spend 10 USDC on a user’s behalf, it can 
further delegate that permission to specific agents, such as allowing a Swap agent to spend 
up to 5 USDC. This creates a permission sharing chain in which the root permissions are 
shared with additional parties.

## Prerequisites

- [Install and set up the Smart Accounts Kit](../../get-started/install.md)
- [Learn about Advanced Permissions](../../concepts/advanced-permissions.md)
- [Learn how to request Advanced Permissions](execute-on-metamask-users-behalf.md)


## Request Advanced Permissions

Request Advanced Permissions from the user with the Wallet Client's [`requestExecutionPermissions`](../../reference/advanced-permissions/wallet-client.md#requestexecutionpermissions) action.

This example uses the [ERC-20 periodic permission](./use-permissions/erc20-token.md#erc-20-periodic-permission), allowing the
user to grant dapp the ability to spend 10 USDC on their behalf. 

<Tabs>
<TabItem value="example.ts">

```typescript
import { sepolia as chain } from "viem/chains";
import { sessionAccount, walletClient, tokenAddress } from "./config.ts";
import { parseUnits } from "viem";

// Since current time is in seconds, we need to convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000);
// 1 week from now.
const expiry = currentTime + 604800;

const grantedPermissions = await walletClient.requestExecutionPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      // The requested permissions will be granted to the
      // session account.
      address: sessionAccount.address,
    },
  },
  permission: {
    type: "erc20-token-periodic",
    data: {
      tokenAddress,
      // 10 USDC in wei format. Since USDC has 6 decimals, 10 * 10^6
      periodAmount: parseUnits("10", 6),
      // 1 day in seconds
      periodDuration: 86400,
      justification: "Permission to transfer 10 USDC every day",
    },
  },
  isAdjustmentAllowed: true,
}]);
```

</TabItem>

<TabItem value="config.ts">

```ts
import { createWalletClient, custom, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { toMetaMaskSmartAccount, Implementation } from "@metamask/smart-accounts-kit";
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/actions";
import { sepolia as chain } from "viem/chains";

// USDC address on Ethereum Sepolia.
export const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const privateKey = "0x...";
const account = privateKeyToAccount(privateKey);

export const sessionAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signer: { account },
});

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
 
```
</TabItem>
</Tabs>

## Decode delegations

The granted permissions object includes a `context` property that represents the encoded delegations. 

To create a redelegation, you must first decode these delegations to access the 
underlying delegations. To decode the delegations, use the [decodeDelegations](../../reference/delegation/index.md#decodedelegations) utility function.

```ts
import { decodeDelegations } from "@metamask/smart-accounts-kit/utils";

const permissionsContext = grantedPermissions[0].context;

const delegations = decodeDelegations(permissionsContext);
const rootDelegation = delegations[0];
```

## Create a redelegation

Create a [redelegation](../../concepts/delegation/index.md#delegation-types) from dapp to a Swap agent.

To create a redelegation, provide the signed delegation as the `parentDelegation` argument when calling [createDelegation](../../reference/delegation/index.md#createdelegation).

This example uses the [`erc20TransferAmount`](../delegation/use-delegation-scopes/spending-limit.md#erc-20-transfer-scope) scope, allowing 
dapp to delegate to a Swap agent the ability to spend 5 USDC on user's behalf.

:::note
When creating a redelegation, you can only narrow the scope of the original authority, not expand it. 
:::

<Tabs>
<TabItem value="redelegation.ts">

```typescript
import { sessionAccount, agentSmartAccount, tokenAddress } from "./config.ts";
import { createDelegation } from "@metamask/smart-accounts-kit";
import { parseUnits } from "viem";

const redelegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress,
    // USDC has 6 decimal places.
    maxAmount: parseUnits("5", 6),
  },
  to: agentSmartAccount.address,
  from: sessionAccount.address,
  // Signed root delegation extracted from Advanced Permissions.
  parentDelegation: rootDelegation,
  environment: sessionAccount.environment,
})

const signedRedelegation = await sessionAccount.signDelegation({ delegation: redelegation })
```

</TabItem>
<TabItem value="config.ts">

```typescript
// Update the existing config to create a smart account for a Swap agent.

const agentAccount = privateKeyToAccount("0x...")

export const agentSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [agentAccount.address, [], [], []],
  deploySalt: "0x",
  signer: { account: agentAccount },
})
```

</TabItem>
</Tabs>

### Limit redelegation using caveats

When creating a redelegation, you can also use the [caveats](../../reference/delegation/caveats.md) provided by the toolkit to narrow the authority for the swap agent. For example, you can further limit the authority so that the swap agent can only use the delegation once.

To apply caveats, create the `Delegation` object and use [`createCaveatBuilder`](../../reference/delegation/index.md#createcaveatbuilder). Use [`getDelegationHashOffchain`](../../reference/delegation/index.md#getdelegationhashoffchain) to get the delegation hash, then provide it as the `authority` field. 

```ts
// Use the config from previous step.
import { sessionAccount, agentSmartAccount, tokenAddress } from './config.ts';
import { createCaveatBuilder, getDelegationHashOffchain } from '@metamask/smart-accounts-kit/utils'

const caveatBuilder = createCaveatBuilder(sessionAccount.environment)

const caveats = caveatBuilder.addCaveat('limitedCalls', { limit: 1 })

const redelegation: Delegation =  {
  delegate: sessionAccount.address,
  delegator: agentSmartAccount.address,
  authority: getDelegationHashOffchain(rootDelegation),
  caveats: caveats.build(),
  salt: '0x',
};

const signedRedelegation = await sessionAccount.signDelegation({ delegation: redelegation })
```


