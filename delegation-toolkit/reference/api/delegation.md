---
description: Delegation-related API methods reference.
sidebar_label: Delegation
sidebar_position: 1
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Delegation API reference

The following API methods are related to creating and managing [delegations](../../concepts/delegation.md).

## `createCaveatBuilder`

Builds an array of caveats.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `environment` | `DeleGatorEnvironment` | Yes | Environment to resolve the smart contracts for the current chain. |
| `config` | `CaveatBuilderConfig` | No | Configuration for `CaveatBuilder`. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { createCaveatBuilder } from "@metamask/delegation-toolkit";
import { delegatorSmartAccount } from "./config.ts";

const caveats = createCaveatBuilder(delegatorSmartAccount.environment)
```

</TabItem>
<TabItem value ="config.ts">

```ts
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";
import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
 
const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const delegatorAccount = privateKeyToAccount("0x...");

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegatorAccount.address, [], [], []],
  deploySalt: "0x",
  signatory: { account: delegatorAccount },
});
```

</TabItem>
</Tabs>

### Allow empty caveats

To create an empty caveat collection, set the `CaveatBuilderConfig.allowEmptyCaveats` to `true`.

```ts title="example.ts"
import { createCaveatBuilder } from "@metamask/delegation-toolkit";
// The config.ts is the same as in the previous example.
import { delegatorSmartAccount } from "./config.ts";

const caveats = createCaveatBuilder(delegatorSmartAccount.environment, {
  // add-next-line 
  allowEmptyCaveats: true
})
```

## `createExecution`

Creates an `ExecutionStruct` instance.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `target` | `Hex` | No | Address of the contract or recipient that the call is directed to. |
| `value` | `bigint` | No | Value of native tokens to send along with the call in wei. |
| `callData` | `Hex` | No | Encoded function data or payload to be executed on the target address. |

### Example

```ts
import { createExecution } from "@metamask/delegation-toolkit";

// Creates an ExecutionStruct to transfer 0.01 ETH to 
// 0xe3C818389583fDD5cAC32f548140fE26BcEaE907 address.
const caveats = createExecution(
  "0xe3C818389583fDD5cAC32f548140fE26BcEaE907",
  // 0.01 ETH in wei
  10000000000000000n,
  "0x",
);
```

## `deployDeleGatorEnvironment`

Deploys the Delegation Framework contracts to an EVM chain.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `walletClient` | `WalletClient` | Yes | [Viem Wallet Client](https://viem.sh/docs/clients/wallet#wallet-client) to deploy the contracts. |
| `publicClient` | `PublicClient` | Yes | [Viem Public Client](https://viem.sh/docs/clients/public) to interact with the given chain. |
| `chain` | `Chain` | Yes | [Viem Chain](https://viem.sh/docs/chains/introduction) where you wish to deploy the Delegation Framework contracts. |
| `deployedContracts` | `{ [contract: string]: Hex }` | No | Allows overriding specific contract addresses when calling the function. For example, if certain contracts have already been deployed on the target chain, their addresses can be provided directly to the function. |

### Example

<Tabs>
<TabItem value="example.ts">

```ts
import { deployDeleGatorEnvironment } from "@metamask/delegation-toolkit";
import { walletClient, publicClient } from "./config.ts";
import { lineaSepolia as chain } from "viem/chains";

const environment = await deployDeleGatorEnvironment(
  walletClient, 
  publicClient, 
  chain
);
```

</TabItem>
<TabItem value="config.ts">

```ts
import { privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
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

### Inject deployed contracts

Once the contracts are deployed, you can use them to override the delegator
environment using `overrideDeployedEnvironment`.

```ts title="example.ts"
import { walletClient, publicClient } from "./config.ts";
import { lineaSepolia as chain } from "viem/chains";
import { 
  DeleGatorEnvironment, 
  overrideDeployedEnvironment,
  deployDeleGatorEnvironment
} from "@metamask/delegation-toolkit";

const environment: DeleGatorEnvironment = await deployDeleGatorEnvironment(
  walletClient, 
  publicClient, 
  chain
);

// add-start
overrideDeployedEnvironment(
  chain.id,
  "1.3.0",
  environment,
);
// add-end
```

## `getDeleGatorEnvironment`

Resolves the `DeleGatorEnvironment` for a chain.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `chainId` | `number` | Yes | The chain ID of the network for which the `DeleGatorEnvironment` should be resolved. |
| `version` | `SupportedVersion` | No | Specifies the version of the Delegation Framework contracts to use. If omitted, the latest supported version will be used by default. |

### Example

```ts
import { getDeleGatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const environment = getDeleGatorEnvironment(sepolia.id)
```

## `overrideDeployedEnvironment`

Overrides or adds the `DeleGatorEnvironment` for a chain and supported version.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `chainId` | `number` | Yes | The chain ID of the network for which the `DeleGatorEnvironment` should be overridden. |
| `version` | `SupportedVersion` | Yes | The version of the Delegation Framework contracts to override for the specified chain. |
| `environment` | `DeleGatorEnvironment` | Yes | The environment containing contract addresses to override for the given chain and version. |

### Example

<Tabs>
<TabItem value="example.ts">

```ts
import { environment } from "./environment.ts";
import { getDeleGatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

overrideDeployedEnvironment(
  sepolia.id,
  "1.3.0",
  environment
);
```

</TabItem>
<TabItem value="environment.ts">

```ts
import { DeleGatorEnvironment } from "@metamask/delegation-toolkit";

export const environment: DeleGatorEnvironment = {
  SimpleFactory: "0x124..",
  // ...
  implementations: {
  // ...
  },
};
```

</TabItem>
</Tabs>

## `redeemDelegation`

Encodes calldata for redeeming delegations.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `delegations` | `Delegation[][]` | Yes | A nested collection representing chains of delegations. Each inner collection contains a chain of delegations to be redeemed. |
| `modes` | `ExecutionMode[]` | Yes | A collection specifying the execution mode for each corresponding delegation chain. |
| `executions` | `ExecutionStruct[][]` | Yes | A nested collection where each inner collection contains a list of `ExecutionStruct` objects associated with a specific delegation chain. |

### Example

This example assumes you have a delegation signed by the delegator.

```ts
import { 
  createExecution,
  DelegationFramework,
} from "@metamask/delegation-toolkit";

const execution = createExecution();
const data = DelegationFramework.encode.redeemDelegations({
  delegations: [[ signedDelegation ]],
  modes: [ SINGLE_DEFAULT_MODE ],
  executions: [[ execution ]],
});
```

## `signDelegation`

Signs the delegation and returns the delegation signature.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `signer` | `WalletClient` | Yes | [Viem Wallet Client](https://viem.sh/docs/clients/wallet#wallet-client) to sign the delegation. |
| `delegation` | `Omit<Delegation, "signature">` | Yes | The unsigned delegation object to sign. |
| `chainId` | `number` | Yes | The chain ID on which the delegation manager is deployed. |
| `delegationManager` | `0x${string}` | Yes | The address of the Delegation Manager. |
| `name` | `string` | No | The name of the domain of the Delegation Manager. The default is `DelegationManager`. |
| `version` | `string` | No | The version of the domain of the Delegation Manager. The default is `1`. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { signDelegation } from "@metamask/delegation-toolkit";
import { walletClient, delegation, delegationManager } from "./config.ts";
import { sepolia } from "viem/chains";

const signature = signDelegation({
  signer: walletClient,
  delegation,
  chainId: sepolia.id,
  delegationManager,
})
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { 
  getDeleGatorEnvironment,
  createDelegation,
} from "@metamask/delegation-toolkit";
import { createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

export const delegationManager = getDeleGatorEnvironment(
  sepolia.id
).DelegationManager;

const account = privateKeyToAccount(delegateWallet as `0x${string}`);

export const walletClient = createWalletClient({
  account,
  transport: http(),
  chain: sepolia,
});

// The address to which the delegation is granted. It can be an EOA address, or 
// smart account address.
const delegate = "0x2FcB88EC2359fA635566E66415D31dD381CF5585";

export const delegation = createDelegation({
  to: delegate,
  from: account.address,
  // Empty caveats array - we recommend adding appropriate restrictions.
  caveats: [],
});
```

</TabItem>
</Tabs>
