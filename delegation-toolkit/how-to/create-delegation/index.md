---
description: Learn how to create different types of delegations, and how to sign a delegation.
sidebar_position: 6
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Create a delegation

The MetaMask Delegation Toolkit enables you to create [delegations](../../concepts/delegation.md)
from a delegator account to a delegate account.

:::note 
Delegations are compatible with [ERC-7710](https://eip.tools/eip/7710) and [ERC-7715](https://ethereum-magicians.org/t/erc-7715-grant-permissions-from-wallets/20100), to support a standardized minimal interface.
[Requesting ERC-7715 permissions](../../experimental/erc-7715-request-permissions.md) and [redeeming ERC-7710 delegations](../../experimental/erc-7710-redeem-delegations.md)
are experimental features.
:::

:::warning
The examples on this page demonstrate delegations without any restrictions.
Unrestricted delegations grant complete control over the account to the delegate, which can pose significant security risks.
It is crucial to add caveats to limit the delegated authority.
Learn how to [restrict a delegation](./restrict-delegation.md) using caveat enforcers.
:::

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install.md)
- [Configure the Delegation Toolkit.](../configure.md)
- [Create a MetaMask smart account.](../create-smart-account/index.md)

## Create a root delegation

A *root delegation* is a delegation that doesn't derive its authority from another delegation.
It is when a delegator delegates its own authority away, as opposed to a [redelegation](#create-a-redelegation).
Create a root delegation as follows:

<Tabs>
<TabItem value="example.ts">

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";
import { delegatorSmartAccount } from "./config.ts";

// The address to which the delegation is granted. It can be an EOA address, or 
// smart account address.
const delegate = "0x2FcB88EC2359fA635566E66415D31dD381CF5585";

const delegation = createDelegation({
  to: delegate,
  from: delegatorSmartAccount.address,
  caveats: [] // Empty caveats array - we recommend adding appropriate restrictions.
});
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http()
});

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

</TabItem>
</Tabs>

## Create an open root delegation

An *open root delegation* is a root delegation that doesn't specify a delegate.
This means that any account can redeem the delegation.
You must create open root delegations carefully, to ensure that they are not misused.
Create an open root delegation by setting the delegate property to the special address
`0x0000000000000000000000000000000000000a11` (available via the constant `ANY_BENEFICIARY`).

<Tabs>
<TabItem value="example.ts">

```typescript
import { createOpenDelegation } from "@metamask/delegation-toolkit";
import { delegatorSmartAccount } from "./config.ts";

const openRootDelegation = createOpenDelegation({
  from: delegatorSmartAccount.address,
  caveats: [] // Empty caveats array - we recommend adding appropriate restrictions.
});
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http()
});

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

</TabItem>
</Tabs>

## Create a redelegation

A recipient of a delegation (the delegate), can *redelegate* that authority to a third party, potentially applying additional [restrictions](restrict-delegation.md).
Create a redelegation as follows:

<Tabs>
<TabItem value="example.ts">

```typescript
import { 
  createDelegation,
  getDelegationHashOffchain
 } from "@metamask/delegation-toolkit";
import { delegatorSmartAccount } from "./config.ts";

// The address is used as the root delegator. While creating the redelegation,
// the root delegate address will be the delegator address. 
const delegate = "0x2FcB88EC2359fA635566E66415D31dD381CF5585";

const delegation = createDelegation({
  to: delegate,
  from: delegatorSmartAccount.address,
  caveats: [] // Empty caveats array - we recommend adding appropriate restrictions.
});

// The authority is the (typed data) hash of the delegation from which the authority is derived.
const parentDelegationHash = getDelegationHashOffchain(delegation);

// The address is used as the delegate address while creating the redelegation.
const leafDelegate = "0xb4821Ab7d5942Bd2533387592068a12608B4a52C"

const leafDelegation = createDelegation({
  to: leafDelegate,
  from: delegate,
  // You can also choose to pass the parent delegation object, and let function
  // handle the rest.
  parentDelegation: parentDelegationHash,
  caveats: [] // Empty caveats array - we recommend adding appropriate restrictions.
});
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http()
});

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

</TabItem>
</Tabs>

## Create an open redelegation

An *open redelegation* is a [redelegation](#create-a-redelegation) that doesn't specify a delegate.
This means that any account can redeem the redelegation.
As with [open root delegations](#create-an-open-root-delegation), you must create open redelegations carefully,
to ensure that they are not misused.
Create an open redelegation as follows:

<Tabs>
<TabItem value="example.ts">

```typescript
import { 
  createDelegation,
  createOpenDelegation,
  getDelegationHashOffchain
 } from "@metamask/delegation-toolkit";
import { delegatorSmartAccount } from "./config.ts";

// The address is used as the root delegator. While creating the redelegation,
// the root delegate address will be the delegator address. 
const delegate = "0x2FcB88EC2359fA635566E66415D31dD381CF5585";

const delegation = createDelegation({
  to: delegate,
  from: delegatorSmartAccount.address,
  caveats: [] // Empty caveats array - we recommend adding appropriate restrictions.
});

// The authority is the (typed data) hash of the delegation from which the authority is derived.
const parentDelegationHash = getDelegationHashOffchain(delegation);

const leafDelegation = createOpenDelegation({
  from: delegate,
  // You can also choose to pass the parent delegation object, and let the function
  // handle the rest.
  parentDelegation: parentDelegationHash,
  caveats: [] // Empty caveats array - we recommend adding appropriate restrictions.
});
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http()
});

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

</TabItem>
</Tabs>

## Sign a delegation

A delegation must be signed by the delegator to be valid for redemption. The `MetaMaskSmartAccount` supports signing the delegation using [EIP-712 Typed Data](https://eips.ethereum.org/EIPS/eip-712) via the `signDelegation` method.
Sign a delegation as follows:

<Tabs>
<TabItem value="example.ts">

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";
import { delegatorSmartAccount } from "./config.ts";

// The address to which the delegation is granted. It can be an EOA address, or 
// smart account address.
const delegate = "0x2FcB88EC2359fA635566E66415D31dD381CF5585";

const delegation = createDelegation({
  to: delegate,
  from: delegatorSmartAccount.address,
  caveats: [] // Empty caveats array - we recommend adding appropriate restrictions.
});

const signature = await delegatorSmartAccount.signDelegation({ delegation });

const signedDelegation = {
  ...delegation,
  signature
};
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http()
});

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});

```

</TabItem>
</Tabs>