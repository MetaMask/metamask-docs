---
description: Reference for types used across the Smart Accounts Kit.
sidebar_label: Types
keywords: [types, delegation, smart accounts, reference, enums]
---

import GlossaryTerm from '@theme/GlossaryTerm';

# Types

This page documents the TypeScript [enums](#enums) and [types](#types-1) used in Smart Accounts Kit APIs.

## Enums

### `CaveatType`

Enum representing the [caveat](delegation/caveats.md) type.

| Value                                         | String                               |
| --------------------------------------------- | ------------------------------------ |
| `CaveatType.AllowedCalldata`                  | `"allowedCalldata"`                  |
| `CaveatType.AllowedMethods`                   | `"allowedMethods"`                   |
| `CaveatType.AllowedTargets`                   | `"allowedTargets"`                   |
| `CaveatType.ArgsEqualityCheck`                | `"argsEqualityCheck"`                |
| `CaveatType.BlockNumber`                      | `"blockNumber"`                      |
| `CaveatType.Deployed`                         | `"deployed"`                         |
| `CaveatType.Erc1155BalanceChange`             | `"erc1155BalanceChange"`             |
| `CaveatType.Erc20BalanceChange`               | `"erc20BalanceChange"`               |
| `CaveatType.Erc20PeriodTransfer`              | `"erc20PeriodTransfer"`              |
| `CaveatType.Erc20Streaming`                   | `"erc20Streaming"`                   |
| `CaveatType.Erc20TransferAmount`              | `"erc20TransferAmount"`              |
| `CaveatType.Erc721BalanceChange`              | `"erc721BalanceChange"`              |
| `CaveatType.Erc721Transfer`                   | `"erc721Transfer"`                   |
| `CaveatType.ExactCalldata`                    | `"exactCalldata"`                    |
| `CaveatType.ExactCalldataBatch`               | `"exactCalldataBatch"`               |
| `CaveatType.ExactExecution`                   | `"exactExecution"`                   |
| `CaveatType.ExactExecutionBatch`              | `"exactExecutionBatch"`              |
| `CaveatType.Id`                               | `"id"`                               |
| `CaveatType.LimitedCalls`                     | `"limitedCalls"`                     |
| `CaveatType.MultiTokenPeriod`                 | `"multiTokenPeriod"`                 |
| `CaveatType.NativeBalanceChange`              | `"nativeBalanceChange"`              |
| `CaveatType.NativeTokenPayment`               | `"nativeTokenPayment"`               |
| `CaveatType.NativeTokenPeriodTransfer`        | `"nativeTokenPeriodTransfer"`        |
| `CaveatType.NativeTokenStreaming`             | `"nativeTokenStreaming"`             |
| `CaveatType.NativeTokenTransferAmount`        | `"nativeTokenTransferAmount"`        |
| `CaveatType.Nonce`                            | `"nonce"`                            |
| `CaveatType.OwnershipTransfer`                | `"ownershipTransfer"`                |
| `CaveatType.Redeemer`                         | `"redeemer"`                         |
| `CaveatType.SpecificActionERC20TransferBatch` | `"specificActionERC20TransferBatch"` |
| `CaveatType.Timestamp`                        | `"timestamp"`                        |
| `CaveatType.ValueLte`                         | `"valueLte"`                         |

### `ExecutionMode`

Enum specifying how delegated executions are processed when [redeeming delegations](delegation/index.md#redeemdelegations).

| Value                         | Description                                                     |
| ----------------------------- | --------------------------------------------------------------- |
| `ExecutionMode.SingleDefault` | Executes a single call and reverts on failure.                  |
| `ExecutionMode.SingleTry`     | Executes a single call and silently continues on failure.       |
| `ExecutionMode.BatchDefault`  | Executes a batch of calls and reverts if any call fails.        |
| `ExecutionMode.BatchTry`      | Executes a batch of calls and silently continues past failures. |

### `Implementation`

Enum representing the [MetaMask smart account](../concepts/smart-accounts.md) implementation type.

| Value                          | Description                                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `Implementation.Hybrid`        | Supports both ECDSA and WebAuthn (passkey) signers.                                                               |
| `Implementation.MultiSig`      | Supports multiple ECDSA signers with threshold-based signing.                                                     |
| `Implementation.Stateless7702` | Uses [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) to upgrade an EOA to a smart account without deployment. |

### `ScopeType`

Enum representing [delegation scope types](delegation/delegation-scopes.md).

| Value                                 | String                        |
| ------------------------------------- | ----------------------------- |
| `ScopeType.Erc20TransferAmount`       | `"erc20TransferAmount"`       |
| `ScopeType.Erc20Streaming`            | `"erc20Streaming"`            |
| `ScopeType.Erc20PeriodTransfer`       | `"erc20PeriodTransfer"`       |
| `ScopeType.NativeTokenTransferAmount` | `"nativeTokenTransferAmount"` |
| `ScopeType.NativeTokenStreaming`      | `"nativeTokenStreaming"`      |
| `ScopeType.NativeTokenPeriodTransfer` | `"nativeTokenPeriodTransfer"` |
| `ScopeType.Erc721Transfer`            | `"erc721Transfer"`            |
| `ScopeType.OwnershipTransfer`         | `"ownershipTransfer"`         |
| `ScopeType.FunctionCall`              | `"functionCall"`              |

### `TransferWindow`

Enum representing predefined time intervals in seconds for transfer period durations.

| Value                      | Seconds    |
| -------------------------- | ---------- |
| `TransferWindow.Hourly`    | `3600`     |
| `TransferWindow.Daily`     | `86400`    |
| `TransferWindow.Weekly`    | `604800`   |
| `TransferWindow.BiWeekly`  | `1209600`  |
| `TransferWindow.Monthly`   | `2592000`  |
| `TransferWindow.Quarterly` | `7776000`  |
| `TransferWindow.Yearly`    | `31536000` |

## Types

### `AllowedCalldataBuilderConfig`

Defines an expected calldata segment for a single function signature.

| Name         | Type     | Required | Description                                                                                      |
| ------------ | -------- | -------- | ------------------------------------------------------------------------------------------------ |
| `startIndex` | `number` | Yes      | The byte offset in the calldata (including the 4-byte selector) where the expected value starts. |
| `value`      | `Hex`    | Yes      | The expected hex-encoded calldata at that offset.                                                |

### `Caveat`

Represents a restriction or condition applied to a delegation.

| Name       | Type  | Required | Description                                                                                      |
| ---------- | ----- | -------- | ------------------------------------------------------------------------------------------------ |
| `enforcer` | `Hex` | Yes      | The contract address of the <GlossaryTerm term="Caveat enforcer">caveat enforcer</GlossaryTerm>. |
| `terms`    | `Hex` | Yes      | The terms of the <GlossaryTerm term="Caveat">caveat</GlossaryTerm> encoded as hex data.          |
| `args`     | `Hex` | Yes      | Additional arguments required by the caveat enforcer, encoded as hex data.                       |

### `CaveatBuilderConfig`

Optional configuration for [`createCaveatBuilder`](delegation/index.md#createcaveatbuilder).

| Name                                  | Type      | Required | Description                                                                                                                   |
| ------------------------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `allowInsecureUnrestrictedDelegation` | `boolean` | No       | Whether to allow unrestricted delegations with no <GlossaryTerm term="Caveat">caveats</GlossaryTerm>. The default is `false`. |

### `Delegation`

Represents a delegation that grants permissions from a <GlossaryTerm term="Delegator account">delegator</GlossaryTerm> to a <GlossaryTerm term="Delegate account">delegate</GlossaryTerm>.

| Name        | Type                    | Required | Description                                                                                                                        |
| ----------- | ----------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `delegate`  | `Hex`                   | Yes      | The address to which the delegation is being granted.                                                                              |
| `delegator` | `Hex`                   | Yes      | The address that is granting the delegation.                                                                                       |
| `authority` | `Hex`                   | Yes      | The parent delegation hash, or `ROOT_AUTHORITY` for creating <GlossaryTerm term="Root delegation">root delegations</GlossaryTerm>. |
| `caveats`   | [`Caveat`](#caveat)`[]` | Yes      | An array of [caveats](delegation/caveats.md) that constrain the delegation.                                                        |
| `salt`      | `Hex`                   | Yes      | The salt for generating the delegation hash. This helps prevent hash collisions when creating identical delegations.               |
| `signature` | `Hex`                   | Yes      | The signature to validate the delegation.                                                                                          |

### `ExactCalldataBuilderConfig`

Defines the exact calldata the <GlossaryTerm term="Delegate account">delegate</GlossaryTerm> is allowed to call.

| Name       | Type  | Required | Description                                         |
| ---------- | ----- | -------- | --------------------------------------------------- |
| `calldata` | `Hex` | Yes      | The exact calldata the delegate is allowed to call. |

### `ExecutionStruct`

Represents a single execution to perform on behalf of a <GlossaryTerm term="Delegator account">delegator</GlossaryTerm>.

| Name       | Type      | Required | Description                                                        |
| ---------- | --------- | -------- | ------------------------------------------------------------------ |
| `target`   | `Address` | Yes      | Address of the contract or recipient that the call is directed to. |
| `value`    | `bigint`  | Yes      | Value of native tokens to send along with the call in wei format.  |
| `callData` | `Hex`     | Yes      | Encoded function data to be executed on the target address.        |

### `GetGrantedExecutionPermissionsResult`

The return type of [`getGrantedExecutionPermissions`](advanced-permissions/wallet-client.md#getgrantedexecutionpermissions). An array of [`PermissionResponse`](#permissionresponse) objects.

### `GetSupportedExecutionPermissionsResult`

The return type of [`getSupportedExecutionPermissions`](advanced-permissions/wallet-client.md#getsupportedexecutionpermissions). A `Record<string,` [`SupportedPermissionInfo`](#supportedpermissioninfo)`>` keyed by permission type.

### `PartialSignature`

Represents a single <GlossaryTerm term="Signer">signer</GlossaryTerm>'s contribution to a multisig aggregated signature.

| Name        | Type            | Required | Description                                                                           |
| ----------- | --------------- | -------- | ------------------------------------------------------------------------------------- |
| `signer`    | `Address`       | Yes      | The address of the signer.                                                            |
| `signature` | `Hex`           | Yes      | The signer's signature over the user operation.                                       |
| `type`      | `SignatureType` | Yes      | The signature type to represent signature algorithm. Only supported value is `ECDSA`. |

### `PermissionResponse`

Represents a granted <GlossaryTerm term="Advanced Permissions">Advanced Permission</GlossaryTerm>.

| Name                | Type                                       | Required | Description                                                                                |
| ------------------- | ------------------------------------------ | -------- | ------------------------------------------------------------------------------------------ |
| `chainId`           | `number`                                   | Yes      | The chain ID for which the permission was granted.                                         |
| `from`              | `Address`                                  | Yes      | The account address that granted the permission.                                           |
| `to`                | `Hex`                                      | Yes      | The account address that received the permission.                                          |
| `permission`        | `PermissionTypes`                          | Yes      | The granted [permission](advanced-permissions/permissions.md) details.                     |
| `rules`             | `Record<string, unknown>[]`                | No       | The rules applied to the permission. For example, permission expiry.                       |
| `context`           | `Hex`                                      | Yes      | The permission context (encoded delegation list) used when redeeming the permission.       |
| `dependencies`      | `{ factory: Address, factoryData: Hex }[]` | Yes      | Factory dependencies for account deployment.                                               |
| `delegationManager` | `Address`                                  | Yes      | The address of the <GlossaryTerm term="Delegation Manager" /> contract for the permission. |

### `RequestExecutionPermissionsReturnType`

The return type of [`requestExecutionPermissions`](advanced-permissions/wallet-client.md#requestexecutionpermissions). An array of [`PermissionResponse`](#permissionresponse) objects.

### `SmartAccountsEnvironment`

An object containing the contract addresses required to interact with the <GlossaryTerm term="Delegation Framework" /> on a specific chain.

| Name                | Type                  | Required | Description                                                                                                                           |
| ------------------- | --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `DelegationManager` | `Hex`                 | Yes      | The address of the <GlossaryTerm term="Delegation Manager" /> contract.                                                               |
| `EntryPoint`        | `Hex`                 | Yes      | The address of the ERC-4337 EntryPoint contract.                                                                                      |
| `SimpleFactory`     | `Hex`                 | Yes      | The address of the factory contract for deploying <GlossaryTerm term="MetaMask smart account">MetaMask Smart Accounts</GlossaryTerm>. |
| `implementations`   | `Record<string, Hex>` | Yes      | A map of MetaMask smart account implementation types to their deployed addresses.                                                     |
| `caveatEnforcers`   | `Record<string, Hex>` | Yes      | A map of caveat enforcer types to their deployed addresses.                                                                           |

### `SupportedPermissionInfo`

Describes a supported <GlossaryTerm term="Advanced Permissions">Advanced Permission</GlossaryTerm> type. Used in [`GetSupportedExecutionPermissionsResult`](#getsupportedexecutionpermissionsresult).

| Name        | Type       | Required | Description                                                                 |
| ----------- | ---------- | -------- | --------------------------------------------------------------------------- |
| `chainIds`  | `number[]` | Yes      | The chain IDs on which the permission type is supported.                    |
| `ruleTypes` | `string[]` | Yes      | The rule types supported for the permission type (for example, `"expiry"`). |

### `ValueLteBuilderConfig`

| Name       | Type     | Required | Description                                                                                                              |
| ---------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `maxValue` | `bigint` | Yes      | The maximum native token amount the <GlossaryTerm term="Delegate account">delegate</GlossaryTerm> can transfer per call. |
