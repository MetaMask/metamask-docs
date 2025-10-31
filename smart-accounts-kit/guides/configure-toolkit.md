---
description: Learn how to configure the bundler client, paymaster client, and toolkit environment.
sidebar_label: Configure the toolkit
keywords: [configure, smart accounts kit, bundler, paymaster, delegator environment]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Configure the MetaMask Smart Accounts Kit

The MetaMask Smart Accounts kit is highly configurable, providing support for custom [bundlers and paymasters](#configure-the-bundler).
You can also configure the [toolkit environment](#optional-configure-the-toolkit-environment) to interact with the [Delegation Framework](../concepts/delegation/index.md#delegation-framework).

## Prerequisites

[Install and set up the Smart Accounts Kit.](../get-started/install.md)

## Configure the bundler

The toolkit uses Viem's Account Abstraction API to configure custom bundlers and paymasters.
This provides a robust and flexible foundation for creating and managing [MetaMask Smart Accounts](../concepts/smart-accounts.md).
See Viem's [account abstraction documentation](https://viem.sh/account-abstraction) for more information on the API's features, methods, and best practices.

To use the bundler and paymaster clients with the toolkit, create instances of these clients and configure them as follows:

```typescript
import {
  createPaymasterClient,
  createBundlerClient,
} from "viem/account-abstraction";
import { http } from "viem";
import { sepolia as chain } from "viem/chains"; 

// Replace these URLs with your actual bundler and paymaster endpoints.
const bundlerUrl = "https://your-bundler-url.com";
const paymasterUrl = "https://your-paymaster-url.com";

// The paymaster is optional.
const paymasterClient = createPaymasterClient({
  transport: http(paymasterUrl),
});

const bundlerClient = createBundlerClient({
  transport: http(bundlerUrl),
  paymaster: paymasterClient,
  chain,
});
```

Replace the bundler and paymaster URLs with your bundler and paymaster endpoints.
For example, you can use endpoints from [Pimlico](https://docs.pimlico.io/references/bundler), [Infura](/services), or [ZeroDev](https://docs.zerodev.app/meta-infra/intro).

:::note
Providing a paymaster is optional when configuring your bundler client. However, if you choose not to use a paymaster, the smart contract account must have enough funds to pay gas fees.
:::

## (Optional) Configure the toolkit environment

The toolkit environment (`SmartAccountsEnvironment`) defines the contract addresses necessary for interacting with the [Delegation Framework](../concepts/delegation/index.md#delegation-framework) on a specific network.
It serves several key purposes:

- It provides a centralized configuration for all the contract addresses required by the Delegation Framework.
- It enables easy switching between different networks (for example, Mainnet and testnet) or custom deployments.
- It ensures consistency across different parts of the application that interact with the Delegation Framework.

### Resolve the environment

When you create a [MetaMask smart account](../concepts/smart-accounts.md), the toolkit automatically
resolves the environment based on the version it requires and the chain configured.
If no environment is found for the specified chain, it throws an error.

<Tabs>
<TabItem value="example.ts">

```typescript
import { SmartAccountsEnvironment } from "@metamask/smart-accounts-kit";
import { delegatorSmartAccount } from "./config.ts";

const environment: SmartAccountsEnvironment = delegatorSmartAccount.environment; 
```

</TabItem>
<TabItem value="config.ts">

```typescript
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";
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
  signer: { account: delegatorAccount },
});

export delegatorSmartAccount;
```

</TabItem>
</Tabs>

:::note
See the changelog of the toolkit version you are using (in the left sidebar) for supported chains.
:::

Alternatively, you can use the [`getSmartAccountsEnvironment`](../reference/delegation/index.md#getdelegatorenvironment) function to resolve the environment.
This function is especially useful if your delegator is not a smart account when
creating a [redelegation](../concepts/delegation/index.md#delegation-types).

```typescript
import { 
  getSmartAccountsEnvironment, 
  SmartAccountsEnvironment, 
} from "@metamask/smart-accounts-kit"; 

// Resolves the SmartAccountsEnvironment for Sepolia
const environment: SmartAccountsEnvironment = getSmartAccountsEnvironment(11155111);
```

### Deploy a custom environment

You can deploy the contracts using any method, but the toolkit provides a convenient [`deployDelegatorEnvironment`](../reference/delegation/index.md#deploydelegatorenvironment) function. This function simplifies deploying the Delegation Framework contracts to your desired EVM chain.

This function requires a Viem [Public Client](https://viem.sh/docs/clients/public), [Wallet Client](https://viem.sh/docs/clients/wallet), and [Chain](https://viem.sh/docs/glossary/types#chain)
to deploy the contracts and resolve the `SmartAccountsEnvironment`. 

Your wallet must have a sufficient native token balance to deploy the contracts.

<Tabs>
<TabItem value="example.ts">

```typescript
import { walletClient, publicClient } from "./config.ts";
import { sepolia as chain } from "viem/chains";
import { deployDeleGatorEnvironment } from "@metamask/smart-accounts-kit/utils";

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
import { deployDeleGatorEnvironment } from "@metamask/smart-accounts-kit/utils";

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

Once the contracts are deployed, you can use them to override the environment.

### Override the environment

To override the environment, the toolkit provides an [`overrideDeployedEnvironment`](../reference/delegation/index.md#overridedeployedenvironment) function to resolve
`SmartAccountsEnvironment` with specified contracts for the given chain and contract version. 

```typescript
// The config.ts is the same as in the previous example.
import { walletClient, publicClient } from "./config.ts";
import { sepolia as chain } from "viem/chains";
import { SmartAccountsEnvironment } from "@metamask/smart-accounts-kit";
import { 
  overrideDeployedEnvironment,
  deployDeleGatorEnvironment 
} from "@metamask/smart-accounts-kit";

const environment: SmartAccountsEnvironment = await deployDeleGatorEnvironment(
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
import { SmartAccountsEnvironment } from "@metamask/smart-accounts-kit";
import { 
  overrideDeployedEnvironment,
  // remove-next-line
- deployDeleGatorEnvironment
} from "@metamask/smart-accounts-kit";

// remove-start
- const environment: SmartAccountsEnvironment = await deployDeleGatorEnvironment(
-  walletClient, 
-  publicClient, 
-  chain
- );
// remove-end

// add-start
+ const environment: SmartAccountsEnvironment = {
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
