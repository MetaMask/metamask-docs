---
description: Learn about the delegator environment object `DeleGatorEnvironment` and how to use it.
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Delegator environment

The `DeleGatorEnvironment` object is a component of the MetaMask Delegation Toolkit that defines the contract addresses necessary for interacting with the [Delegation Framework](delegation.md#delegation-framework) on a specific network.

The delegator environment serves several key purposes:

- It provides a centralized configuration for all the contract addresses required by the Delegation Framework.
- It enables easy switching between different networks (for example, Mainnet and testnet) or custom deployments.
- It ensures consistency across different parts of the application that interact with the Delegation Framework.

## Resolve the delegator environment

When you create a [MetaMask smart account](smart-accounts.md), the Delegation Toolkit automatically
resolves the environment based on the version it requires and the chain configured.
If no environment is found for the specified chain, it throws an error.

<Tabs>
<TabItem value="example.ts">

```typescript
import { DeleGatorEnvironment } from "@metamask/delegation-toolkit";
import { delegatorSmartAccount } from "./config.ts";

const environment: DeleGatorEnvironment = delegatorSmartAccount.environment; 
```

</TabItem>
<TabItem value="config.ts">

```typescript
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";
import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";
 
const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const delegatorAccount = privateKeyToAccount("0x...");

const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegatorAccount.address, [], [], []],
  deploySalt: "0x",
  signatory: { account: delegatorAccount },
});

export delegatorSmartAccount;
```

</TabItem>
</Tabs>

:::note
See the changelog of the toolkit version you are using (in the left sidebar) for supported chains.
:::

Alternatively, you can use the [`getDelegatorEnvironment`](../reference/api/delegation.md#getdelegatorenvironment) function to resolve the environment.
This function is especially useful if your delegator is not a smart account when
[creating a redelegation](../how-to/create-delegation/index.md#create-a-redelegation).

```typescript
import { 
  getDeleGatorEnvironment, 
  DeleGatorEnvironment, 
} from "@metamask/delegation-toolkit"; 

// Resolves the DeleGatorEnvironment for Sepolia
const environment: DeleGatorEnvironment = getDelegatorEnvironment(11155111);
```

## Deploy custom delegator environment

You can deploy the contracts using any method, but the toolkit provides a convenient [`deployDelegatorEnvironment`](../reference/api/delegation.md#deploydelegatorenvironment) function. This function simplifies deploying the Delegation Framework contracts to your desired EVM chain.

This function requires a Viem [Public Client](https://viem.sh/docs/clients/public), [Wallet Client](https://viem.sh/docs/clients/wallet.html), and [Chain](https://viem.sh/docs/glossary/types#chain)
to deploy the contracts and resolve the `DeleGatorEnvironment`. 

Your wallet must have sufficient native token balance to deploy the contracts.

<Tabs>
<TabItem value="example.ts">

```typescript
import { walletClient, publicClient } from "./config.ts";
import { sepolia as chain } from "viem/chains";
import { deployDeleGatorEnvironment } from "@metamask/delegation-toolkit/utils";

const environment = await deployDeleGatorEnvironment(
  walletClient, 
  publicClient, 
  chain
);
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { http, createWalletClient, createPublicClient } from "viem";

// Your deployer wallet private key.
const privateKey = "0x123.."; 
const account = privateKeyToAccount(privateKey);

export const walletClient = createWalletClient({
  account,
  chain,
  transport: http()
});
 
export const publicClient = createPublicClient({ 
  transport: http(), 
  chain, 
});
```

</TabItem>
</Tabs>

You can also override specific contracts when calling `deployDelegatorEnvironment`.
For example, if you've already deployed the `EntryPoint` contract on the target chain, you can pass the contract address to the function.

```typescript
// The config.ts is the same as in the previous example.
import { walletClient, publicClient } from "./config.ts";
import { sepolia as chain } from "viem/chains";
import { deployDeleGatorEnvironment } from "@metamask/delegation-toolkit/utils";

const environment = await deployDeleGatorEnvironment(
  walletClient, 
  publicClient, 
  chain,
  // add-start
+ {
+   EntryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032"
+ }
  // add-end
);
```

Once the contracts are deployed, you can use them to override the delegator environment.

## Override delegator environment

To override the delegator environment, the toolkit provides an [`overrideDeployedEnvironment`](../reference/api/delegation.md#overridedeployedenvironment) function to resolve
`DeleGatorEnvironment` with specified contracts for the given chain and contract version. 

```typescript
// The config.ts is the same as in the previous example.
import { walletClient, publicClient } from "./config.ts";
import { sepolia as chain } from "viem/chains";
import { DeleGatorEnvironment } from "@metamask/delegation-toolkit";
import { 
  overrideDeployedEnvironment,
  deployDeleGatorEnvironment 
} from "@metamask/delegation-toolkit/utils";

const environment: DeleGatorEnvironment = await deployDeleGatorEnvironment(
  walletClient, 
  publicClient, 
  chain
);

overrideDeployedEnvironment(
  chain.id,
  "1.3.0",
  environment,
);
```

If you've already deployed the contracts using a different method, you can create a `DelegatorEnvironment` instance with the required contract addresses, and pass it to the function.

```typescript
// remove-start
- import { walletClient, publicClient } from "./config.ts";
- import { sepolia as chain } from "viem/chains";
// remove-end
import { DeleGatorEnvironment } from "@metamask/delegation-toolkit";
import { 
  overrideDeployedEnvironment,
  // remove-next-line
- deployDeleGatorEnvironment
} from "@metamask/delegation-toolkit/utils";

// remove-start
- const environment: DeleGatorEnvironment = await deployDeleGatorEnvironment(
-  walletClient, 
-  publicClient, 
-  chain
- );
// remove-end

// add-start
+ const environment: DeleGatorEnvironment = {
+  SimpleFactory: "0x124..",
+  // ...
+  implementations: {
+    // ...
+  },
+ };
// add-end

overrideDeployedEnvironment(
  chain.id,
  "1.3.0",
  environment
);
```

:::note
Make sure to specify the Delegation Framework version required by the toolkit.
See the changelog of the toolkit version you are using (in the left sidebar) for its required Framework version.
:::
