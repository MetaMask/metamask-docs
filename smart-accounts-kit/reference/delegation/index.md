---
description: Delegation-related API methods reference.
toc_max_heading_level: 2
keywords: [delegation, API, methods, reference]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import GlossaryTerm from '@theme/GlossaryTerm';

# Delegation API reference

The following API methods are related to creating and managing [delegations](../../concepts/delegation/overview.md).

## `createCaveatBuilder`

Builds an array of <GlossaryTerm term="Caveat">caveats</GlossaryTerm>.

### Parameters

| Name          | Type                                                               | Required | Description                                                       |
| ------------- | ------------------------------------------------------------------ | -------- | ----------------------------------------------------------------- |
| `environment` | [`SmartAccountsEnvironment`](../types.md#smartaccountsenvironment) | Yes      | Environment to resolve the smart contracts for the current chain. |
| `config`      | [`CaveatBuilderConfig`](../types.md#caveatbuilderconfig)           | No       | Configuration for `CoreCaveatBuilder`.                            |

### Example

```ts
import { createCaveatBuilder } from '@metamask/smart-accounts-kit/utils'
import { getSmartAccountsEnvironment } from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'

const environment = getSmartAccountsEnvironment(sepolia.id)
const caveatBuilder = createCaveatBuilder(environment)
```

### Allow empty caveats

To create an empty caveat collection, set the `CaveatBuilderConfig.allowInsecureUnrestrictedDelegation` to `true`.

```ts title="example.ts"
import { createCaveatBuilder } from '@metamask/smart-accounts-kit/utils'
import { getSmartAccountsEnvironment } from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'

const environment = getSmartAccountsEnvironment(sepolia.id)
const caveatBuilder = createCaveatBuilder(environment, {
  // add-next-line
  allowInsecureUnrestrictedDelegation: true,
})
```

## `createDelegation`

Creates a delegation with a specific <GlossaryTerm term="Delegate account">delegate</GlossaryTerm>.

### Parameters

| Name               | Type                                                               | Required | Description                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`             | `Hex`                                                              | Yes      | The address that is granting the delegation.                                                                                                                           |
| `to`               | `Hex`                                                              | Yes      | The address to which the delegation is being granted.                                                                                                                  |
| `scope`            | `ScopeConfig`                                                      | Yes      | The scope of the delegation that defines the initial authority. See [delegation scopes](./delegation-scopes.md) for the full list of scope types and their parameters. |
| `environment`      | [`SmartAccountsEnvironment`](../types.md#smartaccountsenvironment) | Yes      | The environment used by the toolkit to define contract addresses for interacting with the <GlossaryTerm term="Delegation Framework" /> contracts.                      |
| `caveats`          | `Caveats`                                                          | No       | Caveats that further refine the authority granted by the `scope`. See [caveats reference](./caveats.md) for the full list of caveat types and their parameters.        |
| `parentDelegation` | [`Delegation`](../types.md#delegation) \| `Hex`                    | No       | The parent delegation or its corresponding hex to create a delegation chain.                                                                                           |
| `salt`             | `Hex`                                                              | No       | The salt for generating the delegation hash. This helps prevent hash collisions when creating identical delegations.                                                   |

### Example

```typescript
import {
  createDelegation,
  getSmartAccountsEnvironment,
  ScopeType,
} from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'
import { parseEther } from 'viem'

const delegation = createDelegation({
  // Address that is granting the delegation
  from: '0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1',
  // Address to which the delegation is being granted
  to: '0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488',
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getSmartAccountsEnvironment(sepolia.id),
  scope: {
    type: ScopeType.NativeTokenTransferAmount,
    // 0.001 ETH in wei format.
    maxAmount: parseEther('0.001'),
  },
})
```

## `createOpenDelegation`

Creates an <GlossaryTerm term="Open delegation">open delegation</GlossaryTerm> that can be redeemed by any delegate.

### Parameters

| Name               | Type                                                               | Required | Description                                                                                                                                                            |
| ------------------ | ------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`             | `Hex`                                                              | Yes      | The address that is granting the delegation.                                                                                                                           |
| `scope`            | `ScopeConfig`                                                      | Yes      | The scope of the delegation that defines the initial authority. See [delegation scopes](./delegation-scopes.md) for the full list of scope types and their parameters. |
| `environment`      | [`SmartAccountsEnvironment`](../types.md#smartaccountsenvironment) | Yes      | The environment used by the toolkit to define contract addresses for interacting with the <GlossaryTerm term="Delegation Framework" /> contracts.                      |
| `caveats`          | `Caveats`                                                          | No       | Caveats that further refine the authority granted by the `scope`. See [caveats reference](./caveats.md) for the full list of caveat types and their parameters.        |
| `parentDelegation` | [`Delegation`](../types.md#delegation) \| `Hex`                    | No       | The parent delegation or its corresponding hex to create a delegation chain.                                                                                           |
| `salt`             | `Hex`                                                              | No       | The salt for generating the delegation hash. This helps prevent hash collisions when creating identical delegations.                                                   |

### Example

```typescript
import {
  createOpenDelegation,
  getSmartAccountsEnvironment,
  ScopeType,
} from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'
import { parseEther } from 'viem'

const delegation = createOpenDelegation({
  // Address that is granting the delegation
  from: '0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1',
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getSmartAccountsEnvironment(sepolia.id),
  scope: {
    type: ScopeType.NativeTokenTransferAmount,
    // 0.001 ETH in wei format.
    maxAmount: parseEther('0.001'),
  },
})
```

## `createExecution`

Creates an `ExecutionStruct` instance.

### Parameters

| Name       | Type      | Required | Description                                                            |
| ---------- | --------- | -------- | ---------------------------------------------------------------------- |
| `target`   | `Address` | No       | Address of the contract or recipient that the call is directed to.     |
| `value`    | `bigint`  | No       | Value of native tokens to send along with the call in wei.             |
| `callData` | `Hex`     | No       | Encoded function data or payload to be executed on the target address. |

### Example

```ts
import { createExecution } from '@metamask/smart-accounts-kit'
import { parseEther } from 'viem'

// Creates an ExecutionStruct to transfer 0.01 ETH to
// 0xe3C818389583fDD5cAC32f548140fE26BcEaE907 address.
const execution = createExecution({
  target: '0xe3C818389583fDD5cAC32f548140fE26BcEaE907',
  // 0.01 ETH in wei
  value: parseEther('0.01'),
  callData: '0x',
})
```

## `decodeDelegations`

Decodes an ABI-encoded hex string to an array of delegations.

Use `decodeDelegations` when working with a permission context that contains a delegation
chain, such as the `context` property returned by [`requestExecutionPermissions`](../advanced-permissions/wallet-client.md#requestexecutionpermissions) response.

### Parameters

| Name      | Type  | Required | Description                           |
| --------- | ----- | -------- | ------------------------------------- |
| `encoded` | `Hex` | Yes      | The ABI encoded hex string to decode. |

### Example

```ts
import { decodeDelegations } from '@metamask/smart-accounts-kit/utils'

const delegations = decodeDelegations('0x7f0db33d..c06aeeac')
```

## `decodeDelegation`

Decodes an ABI-encoded hex string to a single delegation.

Use `decodeDelegation` when you have a single encoded delegation rather than an encoded delegation chain.

### Parameters

| Name      | Type  | Required | Description                           |
| --------- | ----- | -------- | ------------------------------------- |
| `encoded` | `Hex` | Yes      | The ABI-encoded hex string to decode. |

### Example

```ts
import { decodeDelegation } from '@metamask/smart-accounts-kit/utils'

const delegation = decodeDelegation('0x7f0db33d..c06aeeac')
```

## `decodeCaveat`

Decodes a caveat's encoded `terms`.

Throws an error if the caveat enforcer is not a known enforcer in [`SmartAccountsEnvironment`](../types.md#smartaccountsenvironment).

### Parameters

| Name          | Type                                                               | Required | Description                                                                                                            |
| ------------- | ------------------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `caveat`      | [`Caveat`](../types.md#caveat)                                     | Yes      | The <GlossaryTerm term="Caveat">caveat</GlossaryTerm> object containing an `enforcer` address and ABI-encoded `terms`. |
| `environment` | [`SmartAccountsEnvironment`](../types.md#smartaccountsenvironment) | Yes      | Environment to resolve the <GlossaryTerm term="Caveat enforcer">caveat enforcer</GlossaryTerm> addresses.              |

### Example

<Tabs>
<TabItem value="example.ts">

```ts
import { decodeCaveat } from '@metamask/smart-accounts-kit/utils'
import { delegation } from './config.ts'

const environment = delegation.environment

// Decode the first caveat from the delegation.
const decodedCaveat = decodeCaveat({
  caveat: delegation.caveats[0],
  environment,
})

// Output:
// {
//   type: 'erc20TransferAmount',
//   tokenAddress: '0x1c7D...7238',
//   maxAmount: 10000000n,
// }
```

</TabItem>
<TabItem value="config.ts">

```ts
import {
  createDelegation,
  getSmartAccountsEnvironment,
  ScopeType,
} from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'
import { parseUnits } from 'viem'

const environment = getSmartAccountsEnvironment(sepolia.id)

// USDC address on Ethereum Sepolia.
const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'

export const delegation = createDelegation({
  from: '0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1',
  to: '0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488',
  environment,
  scope: {
    type: ScopeType.Erc20TransferAmount,
    tokenAddress,
    // 10 USDC
    maxAmount: parseUnits('10', 6),
  },
})
```

</TabItem>
</Tabs>

## `deploySmartAccountsEnvironment`

Deploys the <GlossaryTerm term="Delegation Framework" /> contracts to an EVM chain.

### Parameters

| Name                | Type                          | Required | Description                                                                                                                                                                                                          |
| ------------------- | ----------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `walletClient`      | `WalletClient`                | Yes      | [Viem Wallet Client](https://viem.sh/docs/clients/wallet#wallet-client) to deploy the contracts.                                                                                                                     |
| `publicClient`      | `PublicClient`                | Yes      | [Viem Public Client](https://viem.sh/docs/clients/public) to interact with the given chain.                                                                                                                          |
| `chain`             | `Chain`                       | Yes      | [Viem Chain](https://viem.sh/docs/chains/introduction) where you wish to deploy the Delegation Framework contracts.                                                                                                  |
| `deployedContracts` | `{ [contract: string]: Hex }` | No       | Allows overriding specific contract addresses when calling the function. For example, if certain contracts have already been deployed on the target chain, their addresses can be provided directly to the function. |

### Example

<Tabs>
<TabItem value="example.ts">

```ts
import { deploySmartAccountsEnvironment } from '@metamask/smart-accounts-kit/utils'
import { walletClient, publicClient } from './config.ts'
import { sepolia as chain } from 'viem/chains'

const environment = await deploySmartAccountsEnvironment(walletClient, publicClient, chain)
```

</TabItem>
<TabItem value="config.ts">

```ts
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia as chain } from 'viem/chains'
import { http, createWalletClient, createPublicClient } from 'viem'

// Your deployer wallet private key.
const privateKey = '0x123..'
const account = privateKeyToAccount(privateKey)

export const walletClient = createWalletClient({
  account,
  chain,
  transport: http(),
})

export const publicClient = createPublicClient({
  transport: http(),
  chain,
})
```

</TabItem>
</Tabs>

### Inject deployed contracts

Once the contracts are deployed, you can use them to override the delegator
environment using `overrideDeployedEnvironment`.

```ts title="example.ts"
import { walletClient, publicClient } from './config.ts'
import { sepolia as chain } from 'viem/chains'
import { SmartAccountsEnvironment } from '@metamask/smart-accounts-kit'
import {
  overrideDeployedEnvironment,
  deploySmartAccountsEnvironment,
} from '@metamask/smart-accounts-kit/utils'

const environment: SmartAccountsEnvironment = await deploySmartAccountsEnvironment(
  walletClient,
  publicClient,
  chain
)

// add-start
overrideDeployedEnvironment(chain.id, '1.3.0', environment)
// add-end
```

## `disableDelegation`

Encodes the calldata for disabling a delegation.

### Parameters

| Name         | Type                                   | Required | Description                    |
| ------------ | -------------------------------------- | -------- | ------------------------------ |
| `delegation` | [`Delegation`](../types.md#delegation) | Yes      | The delegation to be disabled. |

### Example

<Tabs>
<TabItem value="example.ts">

```ts
import { DelegationManager } from '@metamask/smart-accounts-kit/contracts'
import { delegation } from './delegation.ts'

const disableDelegationData = DelegationManager.encode.disableDelegation({
  delegation,
})
```

</TabItem>
<TabItem value="delegation.ts">

```ts
import { createDelegation, ScopeType } from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'
import { parseEther } from 'viem'

export const delegation = createDelegation({
  from: '0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1',
  to: '0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488',
  environment: getSmartAccountsEnvironment(sepolia.id),
  scope: {
    type: ScopeType.NativeTokenTransferAmount,
    // 0.001 ETH in wei format.
    maxAmount: parseEther('0.001'),
  },
})
```

</TabItem>
</Tabs>

## `enableDelegation`

Encodes the calldata to enable a disabled delegation.

### Parameters

| Name         | Type                                   | Required | Description                   |
| ------------ | -------------------------------------- | -------- | ----------------------------- |
| `delegation` | [`Delegation`](../types.md#delegation) | Yes      | The delegation to be enabled. |

### Example

```ts
import { DelegationManager } from '@metamask/smart-accounts-kit/contracts'

const enableDelegationData = DelegationManager.encode.enableDelegation({
  delegation, // Already disabled delegation.
})
```

## `encodeDelegations`

Encodes an array of delegations to an ABI-encoded hex string.

### Parameters

| Name          | Type                                       | Required | Description                         |
| ------------- | ------------------------------------------ | -------- | ----------------------------------- |
| `delegations` | [`Delegation`](../types.md#delegation)`[]` | Yes      | The delegation array to be encoded. |

### Example

<Tabs>
<TabItem value="example.ts">

```ts
import { encodeDelegations } from '@metamask/smart-accounts-kit/utils'
import { delegation } from './delegation.ts'

const encodedDelegations = encodeDelegations([delegation])
```

</TabItem>
<TabItem value="delegation.ts">

```ts
import { createDelegation, ScopeType } from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'
import { parseEther } from 'viem'

export const delegation = createDelegation({
  from: '0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1',
  to: '0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488',
  environment: getSmartAccountsEnvironment(sepolia.id),
  scope: {
    type: ScopeType.NativeTokenTransferAmount,
    // 0.001 ETH in wei format.
    maxAmount: parseEther('0.001'),
  },
})
```

</TabItem>
</Tabs>

## `encodeDelegation`

Encodes a single delegation to an ABI-encoded hex string.

### Parameters

| Name         | Type                                   | Required | Description                   |
| ------------ | -------------------------------------- | -------- | ----------------------------- |
| `delegation` | [`Delegation`](../types.md#delegation) | Yes      | The delegation to be encoded. |

### Example

<Tabs>
<TabItem value="example.ts">

```ts
import { encodeDelegation } from '@metamask/smart-accounts-kit/utils'
import { delegation } from './delegation.ts'

const encodedDelegation = encodeDelegation(delegation)
```

</TabItem>
<TabItem value="delegation.ts">

```ts
import { createDelegation, ScopeType } from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'
import { parseEther } from 'viem'

export const delegation = createDelegation({
  from: '0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1',
  to: '0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488',
  environment: getSmartAccountsEnvironment(sepolia.id),
  scope: {
    type: ScopeType.NativeTokenTransferAmount,
    // 0.001 ETH in wei format.
    maxAmount: parseEther('0.001'),
  },
})
```

</TabItem>
</Tabs>

## `hashDelegation`

Returns the delegation hash.

### Parameters

| Name    | Type                                   | Required | Description                    |
| ------- | -------------------------------------- | -------- | ------------------------------ |
| `input` | [`Delegation`](../types.md#delegation) | Yes      | The delegation object to hash. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { hashDelegation } from '@metamask/smart-accounts-kit/utils'
import { delegation } from './config.ts'

const delegationHash = hashDelegation(delegation)
```

</TabItem>
<TabItem value ="config.ts">

```ts
import {
  getSmartAccountsEnvironment,
  createDelegation,
  ScopeType,
} from '@metamask/smart-accounts-kit'
import { parseEther } from 'viem'
import { sepolia } from 'viem/chains'

const environment = getSmartAccountsEnvironment(sepolia.id)

// The address to which the delegation is granted. It can be an EOA address, or
// smart account address.
const delegate = '0x2FcB88EC2359fA635566E66415D31dD381CF5585'

export const delegation = createDelegation({
  to: delegate,
  // Address that is granting the delegation.
  from: '0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1',
  environment,
  scope: {
    type: ScopeType.NativeTokenTransferAmount,
    // 0.001 ETH in wei format.
    maxAmount: parseEther('0.001'),
  },
})
```

</TabItem>
</Tabs>

## `getSmartAccountsEnvironment`

Resolves the `SmartAccountsEnvironment` for a chain.

### Parameters

| Name      | Type               | Required | Description                                                                                                                                                   |
| --------- | ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chainId` | `number`           | Yes      | The chain ID of the network for which the `SmartAccountsEnvironment` should be resolved.                                                                      |
| `version` | `SupportedVersion` | No       | Specifies the version of the <GlossaryTerm term="Delegation Framework" /> contracts to use. If omitted, the latest supported version will be used by default. |

### Example

```ts
import { getSmartAccountsEnvironment } from '@metamask/smart-accounts-kit'
import { sepolia } from 'viem/chains'

const environment = getSmartAccountsEnvironment(sepolia.id)
```

## `overrideDeployedEnvironment`

Overrides or adds the `SmartAccountsEnvironment` for a chain and supported version.

### Parameters

| Name          | Type                                                               | Required | Description                                                                                                    |
| ------------- | ------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| `chainId`     | `number`                                                           | Yes      | The chain ID of the network for which the `SmartAccountsEnvironment` should be overridden.                     |
| `version`     | `SupportedVersion`                                                 | Yes      | The version of the <GlossaryTerm term="Delegation Framework" /> contracts to override for the specified chain. |
| `environment` | [`SmartAccountsEnvironment`](../types.md#smartaccountsenvironment) | Yes      | The environment containing contract addresses to override for the given chain and version.                     |

### Example

<Tabs>
<TabItem value="example.ts">

```ts
import { environment } from './environment.ts'
import { overrideDeployedEnvironment } from '@metamask/smart-accounts-kit/utils'
import { sepolia } from 'viem/chains'

overrideDeployedEnvironment(sepolia.id, '1.3.0', environment)
```

</TabItem>
<TabItem value="environment.ts">

```ts
import { SmartAccountsEnvironment } from '@metamask/smart-accounts-kit'

export const environment: SmartAccountsEnvironment = {
  SimpleFactory: '0x124..',
  // ...
  implementations: {
    // ...
  },
}
```

</TabItem>
</Tabs>

## `redeemDelegations`

Encodes calldata for redeeming delegations.
This method supports batch redemption, allowing multiple delegations to be processed within a single transaction.

### Parameters

| Name          | Type                                                   | Required | Description                                                                                                                                            |
| ------------- | ------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `delegations` | [`Delegation`](../types.md#delegation)`[][]`           | Yes      | A nested collection representing chains of delegations. Each inner collection contains a chain of delegations to be redeemed.                          |
| `modes`       | [`ExecutionMode`](../types.md#executionmode)`[]`       | Yes      | A collection specifying the [execution mode](../../concepts/delegation/delegation-manager.md#execution-modes) for each corresponding delegation chain. |
| `executions`  | [`ExecutionStruct`](../types.md#executionstruct)`[][]` | Yes      | A nested collection where each inner collection contains a list of `ExecutionStruct` objects associated with a specific delegation chain.              |

### Example

This example assumes you have a delegation signed by the <GlossaryTerm term="Delegator account">delegator</GlossaryTerm>.

```ts
import { createExecution, ExecutionMode } from '@metamask/smart-accounts-kit'
import { DelegationManager } from '@metamask/smart-accounts-kit/contracts'
import { zeroAddress } from 'viem'

const data = DelegationManager.encode.redeemDelegations({
  delegations: [[signedDelegation]],
  modes: [ExecutionMode.SingleDefault],
  executions: [[execution]],
})
```

## `signDelegation`

Signs the delegation and returns the delegation signature.

### Parameters

| Name                                  | Type                                                          | Required | Description                                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `privateKey`                          | `Hex`                                                         | Yes      | The private key to use for signing the delegation.                                                                                    |
| `delegation`                          | `Omit<`[`Delegation`](../types.md#delegation)`, "signature">` | Yes      | The unsigned delegation object to sign.                                                                                               |
| `chainId`                             | `number`                                                      | Yes      | The chain ID on which the delegation manager is deployed.                                                                             |
| `delegationManager`                   | `0x${string}`                                                 | Yes      | The address of the Delegation Manager.                                                                                                |
| `name`                                | `string`                                                      | No       | The name of the domain of the Delegation Manager. The default is `DelegationManager`.                                                 |
| `version`                             | `string`                                                      | No       | The version of the domain of the Delegation Manager. The default is `1`.                                                              |
| `allowInsecureUnrestrictedDelegation` | `boolean`                                                     | No       | Whether to allow insecure unrestricted delegation with no <GlossaryTerm term="Caveat">caveats</GlossaryTerm>. The default is `false`. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { signDelegation } from '@metamask/smart-accounts-kit'
import { privateKey, delegation, delegationManager } from './config.ts'
import { sepolia } from 'viem/chains'

const signature = signDelegation({
  privateKey,
  delegation,
  chainId: sepolia.id,
  delegationManager,
})
```

</TabItem>
<TabItem value ="config.ts">

```ts
import {
  getSmartAccountsEnvironment,
  createDelegation,
  ScopeType,
} from '@metamask/smart-accounts-kit'
import { createWalletClient, parseEther } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'

const environment = getSmartAccountsEnvironment(sepolia.id)
export const delegationManager = environment.DelegationManager

export const privateKey = `0x12141..`
const account = privateKeyToAccount(privateKey)

// The address to which the delegation is granted. It can be an EOA address, or
// smart account address.
const delegate = '0x2FcB88EC2359fA635566E66415D31dD381CF5585'

export const delegation = createDelegation({
  to: delegate,
  from: account.address,
  environment,
  scope: {
    type: ScopeType.NativeTokenTransferAmount,
    // 0.001 ETH in wei format.
    maxAmount: parseEther('0.001'),
  },
})
```

</TabItem>
</Tabs>
