---
description: Learn how to use the delegation scopes.
---

# Use delegation scopes

When [creating a delegation](../execute-on-smart-accounts-behalf.md), you can configure a scope to define the delegation's initial authority and help prevent delegation misuse.
You can further refine this initial authority by [adding caveats to a delegation](refine-scope.md).

The Delegation Toolkit currently supports three categories of scopes:

| Scope type | Description |
|------------|-------------|
| [Spending limit scopes](spending-limit.md) | Restricts the spending of native, ERC-20, and ERC-721 tokens based on defined conditions. |
| [Function call scope](function-call.md) | Restricts the delegation to specific contract methods, contract addresses, or calldata. |
| [Ownership transfer scope](owernship-transfer.md) | Restricts the delegation to only allow ownership transfers, specifically the `transferOwnership` function for a specified contract. |
