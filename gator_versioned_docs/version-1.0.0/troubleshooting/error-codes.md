---
description: Delegation Framework error codes
sidebar_label: Error codes
keywords: [error codes, errors, debug, error references, delegation framework]
---

# Error codes

The following tables describe error codes from the [MetaMask Delegation Framework contracts](https://github.com/metamask/delegation-framework). Use a decoder such as 
[calldata.swiss-knife.xyz](https://calldata.swiss-knife.xyz/decoder) to identify error signatures from raw revert data.

## Delegation Manager error codes

| Error code | Error name | Description |
| ---------- | ---------- | ----------- |
| `0xb5863604` | `InvalidDelegate()` | The caller is not the delegate specified in the delegation. [Troubleshoot an invalid delegate.](./invalid-delegate.md) |
| `0xb9f0f171` | `InvalidDelegator()` | The caller is not the delegator specificed in the delegation. [Troubleshoot an invalid delegator.](./invalid-delegator.md) |
| `0x05baa052` | `CannotUseADisabledDelegation()` | The delegation has been disabled by the delegator. |
| `0xded4370e` | `InvalidAuthority()` | The delegation chain authority validation failed. The authority hash of a child delegation does not match the hash of its parent delegation. |
| `0x1bcaf69f` | `BatchDataLengthMismatch()` | The array lengths do not match in a batch `redeemDelegations` contract call. |
| `0x005ecddb` | `AlreadyDisabled()` | The delegation has already been disabled. |
| `0xf2a5f75a` | `AlreadyEnabled()` | The delegation is already enabled. |
| `0xf645eedf` | `ECDSAInvalidSignature()` | Invalid ECDSA signature format. |
| `0xfce698f7` | `ECDSAInvalidSignatureLength(uint256)` | The ECDSA signature length is incorrect. |
| `0xac241e11` | `EmptySignature()` | The signature is empty. |
| `0xd93c0665` | `EnforcedPause()` | The Delegation Manager contract is paused by the owner. |
| `0x3db6791c` | `InvalidEOASignature()` | EOA signature verification failed. [Troubleshoot an invalid EOA signature.](./invalid-signature.md) |
| `0x155ff427` | `InvalidERC1271Signature()` | Smart contract signature (ERC-1271) verification failed. |
| `0x118cdaa7` | `OwnableUnauthorizedAccount(address)` | An unauthorized account attempted an owner only action. |
| `0x1e4fbdf7` | `OwnableInvalidOwner(address)` | Invalid owner address in an ownership transfer. |
| `0xf6b6ef5b` | `InvalidShortString()` | A string parameter is too short. |
| `0xaa0ea2d8` | `StringTooLong(string)` | A string parameter exceeds the maximum length. |

## Smart account error codes

| Error code | Error name | Description |
| ---------- | ---------- | ----------- |
| `0xd663742a` | `NotEntryPoint()` | The caller is not the EntryPoint contract. |
| `0x0796d945` | `NotEntryPointOrSelf()` | The caller is neither the EntryPoint contract nor the smart account itself. |
| `0x1a4b3a04` | `NotDelegationManager()` | The caller is not the DelegationManager contract. |
| `0xb96fcfe4` | `UnsupportedCallType(bytes1)` | The execution call type is not supported. |
| `0x1187dc06` | `UnsupportedExecType(bytes1)` | The execution type is not supported. |
| `0x29c3b7ee` | `NotSelf()` | The caller is not the smart account itself. |

## Caveat enforcer error codes

| Error string | Description |
| ------------ | ----------- |
| `AllowedTargetsEnforcer:target-address-not-allowed` | When redeeming a delegation with an `allowedTargets` caveat, the execution's target address is not in the allowed list. |
| `AllowedTargetsEnforcer:invalid-terms-length` | When creating a delegation with an `allowedTargets` caveat, the encoded terms length is not a multiple of 20 bytes (Ethereum address). |
| `ERC20TransferAmountEnforcer:invalid-terms-length` | When creating a delegation with an `erc20TransferAmount` caveat, the encoded terms are not exactly 52 bytes (20 byte Ethereum address + 32 byte amount). |
| `ERC20TransferAmountEnforcer:invalid-contract` | When redeeming a delegation with an `erc20TransferAmount` caveat, the execution targets a different contract than the allowed token address. |
| `ERC20TransferAmountEnforcer:invalid-method` | When redeeming a delegation with an `erc20TransferAmount` caveat, the execution calls a function other than `transfer(address,uint256)`. |
| `ERC20TransferAmountEnforcer:allowance-exceeded` | When redeeming a delegation with an `erc20TransferAmount` caveat, the cumulative transfer amount exceeds the allowed limit. |
| `CaveatEnforcer:invalid-call-type` | When redeeming a delegation, the execution uses a batch call type, but the caveat enforcer only supports single calls. |
| `CaveatEnforcer:invalid-execution-type` | When redeeming a delegation, the execution uses a non-default [execution mode](../reference/types.md#executionmode), but the caveat enforcer only supports the default mode. |
