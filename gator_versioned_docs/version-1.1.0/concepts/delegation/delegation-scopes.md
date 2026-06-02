---
description: Learn about delegation scopes and how they define the initial authority of a delegation.
keywords:
  [delegation scopes, delegation, authority, spending limit, function call, ownership transfer]
---

# Delegation scopes

When creating a delegation, you must configure a scope to define the delegation's initial authority and help prevent delegation misuse.

Scopes are not part of the [Delegation Framework](overview.md#delegation-framework) itself, but an abstraction introduced in the Smart Accounts Kit that builds on top of [caveat enforcers](caveat-enforcers.md) to provide pre-configured restriction patterns for common use cases.

## Scopes vs. caveats

Scopes and caveats work together to define and restrict a delegation's authority:

- **Scopes** define the _initial authority_ of a delegation. They determine the broad category of actions the delegate is permitted to perform, such as transferring tokens or calling specific contract functions.
- **Caveats** further _constrain_ the authority granted by the scope. They add additional restrictions on top of the scope, such as time limits or execution frequency.

For example, a spending limit scope might allow a delegate to transfer up to 100 USDC, while an additional caveat could restrict the transfers to only occur within a specific time window.

See [how to constrain a delegation's scope by adding caveats](../../guides/delegation/use-delegation-scopes/constrain-scope.md).

## Categories

The Smart Accounts Kit supports three categories of scopes:

| Scope type                                                                                      | Description                                                                                                                         |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [Spending limit scopes](../../guides/delegation/use-delegation-scopes/spending-limit.md)        | Restricts the spending of native, ERC-20, and ERC-721 tokens based on defined conditions.                                           |
| [Function call scope](../../guides/delegation/use-delegation-scopes/function-call.md)           | Restricts the delegation to specific contract methods, contract addresses, or calldata.                                             |
| [Ownership transfer scope](../../guides/delegation/use-delegation-scopes/ownership-transfer.md) | Restricts the delegation to only allow ownership transfers, specifically the `transferOwnership` function for a specified contract. |
