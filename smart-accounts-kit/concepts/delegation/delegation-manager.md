---
description: Learn about the Delegation Manager and execution modes.
keywords: [delegation manager, delegation, execution modes, delegation framework]
---

# Delegation Manager

The Delegation Manager is a core component of the [Delegation Framework](./overview.md#delegation-framework).
It validates delegations and triggers executions on behalf of the delegator, ensuring tasks are executed accurately,
and securely.

See the [delegation flow](./overview.md#delegation-flow) for a full overview of how delegations are created, validated, and redeemed.

## Execution modes

The Delegation Manager processes delegations based on a specified execution mode. When redeeming a delegation using [`redeemDelegations`](../../reference/delegation/index.md#redeemdelegations), you must
pass an execution mode for each delegation chain you pass to the method. The Smart Accounts Kit supports the following
execution modes, based on [ERC-7579](https://erc7579.com/):

| Execution mode | Number of delegation chains passed to `redeemDelegations` | Processing method | Does user operation continue execution if redemption reverts? |
|--|--|--|--|
| `SingleDefault` | One      | Sequential  | No  |
| `SingleTry`     | One      | Sequential  | Yes |
| `BatchDefault`  | Multiple | Interleaved | No  |
| `BatchTry`      | Multiple | Interleaved | Yes |

### Sequential processing

In `Single` modes, the Delegation Manager processes delegations sequentially:

1. For each delegation in the chain, all caveats' `before` hooks are called.
2. The single redeemed action is executed.
3. For each delegation in the chain, all caveats' `after` hooks are called.

### Interleaved processing

In `Batch` modes, the Delegation Manager processes delegations in an interleaved manner:

1. For each chain in the batch, and each delegation in the chain, all caveats' `before` hooks are called.
2. Each redeemed action is executed.
3. For each chain in the batch, and each delegation in the chain, all caveats' `after` hooks are called.

`Batch` mode allows for powerful use cases, but the Delegation Framework currently does not include any `Batch` compatible caveat enforcers.
