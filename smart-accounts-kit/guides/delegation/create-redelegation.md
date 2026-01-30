---
description: Learn how to create a redelegation.
sidebar_label: Create a redelegation
toc_max_heading_level: 3
keywords: [delegation, state, caveat enforcer, delegation scope, redelegation]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a redelegation

Redelegation is a core feature that sets delegations apart from other permission sharing frameworks.
It allows a delegate to create a delegation chain, passing on the same or reduced level of authority 
from the root delegator.

For example, if Alice grants Bob permission to spend 10 USDC on her behalf, Bob can further grant Carol
permission to spend up to 5 USDC on Alice's behalf-that is, Bob can redelegate. This creates a delegation 
chain where the root permissions are reshared with additional parties.

## Prerequisites

- [Install and set up the Smart Accounts Kit](../../get-started/install.md)
- [Learn how to create a delegation](execute-on-smart-accounts-behalf.md)

## Create a delegation

Create a [root delegation](../../concepts/delegation/index.md#delegation-types) from Alice to Bob.

This example uses the [`erc20TransferAmount`](use-delegation-scopes/spending-limit.md#erc-20-transfer-scope) scope, allowing 
Alice to delegate to Bob the ability to spend 10 USDC on her behalf. 

<Tabs>
<TabItem value="delegation.ts">

```typescript
import { aliceSmartAccount, bobSmartAccount } from "./config.ts";
import { createDelegation } from '@metamask/smart-accounts-kit'
import { parseUnits } from 'viem'

const delegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    // USDC has 6 decimal places.
    maxAmount: parseUnits("10", 6),
  },
  to: bobSmartAccount.address,
  from: aliceSmartAccount.address,
  environment: aliceSmartAccount.environment,
})

const signedDelegation = aliceSmartAccount.signDelegation({ delegation })
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { Implementation, toMetaMaskSmartAccount } from "@metamask/smart-accounts-kit"
import { privateKeyToAccount } from "viem/accounts"
import { createPublicClient, http } from "viem"
import { sepolia as chain } from "viem/chains"

const publicClient = createPublicClient({
  chain,
  transport: http(),
})

const aliceAccount = privateKeyToAccount("0x...")
const bobAccount = privateKeyToAccount("0x...")

export const aliceSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [aliceAccount.address, [], [], []],
  deploySalt: "0x",
  signer: { account: aliceAccount },
})

export const bobSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [bobAccount.address, [], [], []],
  deploySalt: "0x",
  signer: { account: bobAccount },
})
```

</TabItem>
</Tabs>

## Create a redelegation

Create a [redelegation](../../concepts/delegation/index.md#delegation-types) from Bob to Carol. When creating a redelegation, you can only narrow the scope of the original authority, not expand it. 

To create a redelegation, provide the signed delegation as the `parentDelegation` argument when calling [createDelegation](../../reference/delegation/index.md#createdelegation).
This example uses the [`erc20TransferAmount`](use-delegation-scopes/spending-limit.md#erc-20-transfer-scope) scope, allowing 
Bob to delegate to Carol the ability to spend 5 USDC on Alice's behalf.

<Tabs>
<TabItem value="redelegation.ts">

```typescript
import { bobSmartAccount, carolSmartAccount } from "./config.ts"
import { createDelegation } from '@metamask/smart-accounts-kit'
import { parseUnits } from 'viem'

const redelegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    // USDC has 6 decimal places.
    maxAmount: parseUnits("5", 6),
  },
  to: carolSmartAccount.address,
  from: bobSmartAccount.address,
  // Signed root delegation from previous step.
  parentDelegation: signedDelegation,
  environment: bobSmartAccount.environment,
})

const signedRedelegation = bobSmartAccount.signDelegation({ delegation: redelegation })
```

</TabItem>
<TabItem value="config.ts">

```typescript
// Update the existing config to create a smart account for Carol.

const carolAccount = privateKeyToAccount("0x...")

export const carolSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [carolAccount.address, [], [], []],
  deploySalt: "0x",
  signer: { account: carolAccount },
})
```

</TabItem>
</Tabs>

### Limit redelegation using caveats

When creating a redelegation, you can also use the [caveats](../../reference/delegation/caveats.md) provided by the toolkit to narrow the authority for the Carol. For example, you can further limit the authority so that the Carol so she can only use the delegation once.

To apply caveats, create the `Delegation` object and use [`createCaveatBuilder`](../../reference/delegation/index.md#createcaveatbuilder). Use [`getDelegationHashOffchain`](../../reference/delegation/index.md#getdelegationhashoffchain) to get the delegation hash, then provide it as the `authority` field. 

```ts
// Use the config from previous step.
import { bobSmartAccount, carolSmartAccount } from "./config.ts"
import { createCaveatBuilder, getDelegationHashOffchain } from '@metamask/smart-accounts-kit/utils'

const caveatBuilder = createCaveatBuilder(bobSmartAccount.environment)

const caveats = caveatBuilder.addCaveat('limitedCalls', { limit: 1 })

const redelegation: Delegation =  {
  delegate: bobSmartAccount.address,
  delegator: carolSmartAccount.address,
  authority: getDelegationHashOffchain(rootDelegation),
  caveats: caveats.build(),
  salt: '0x',
};

const signedRedelegation = await bobSmartAccount.signDelegation({ delegation: redelegation })
```

## Next steps

- See [how to disable a delegation](disable-delegation.md) to revoke permissions.