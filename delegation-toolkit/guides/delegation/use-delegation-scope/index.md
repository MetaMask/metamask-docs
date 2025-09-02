---
description: Learn how to use the delegation scopes
sidebar_position: 1
---

# Use delegation scopes

You can set a scope configuration when creating a delegation to define its permissions. Scopes help define the initial 
authority for the delegation and prevent misuse. This initial authority can then be further refined by adding caveats. 
When creating a delegation, you can use one of the supported scopes. 

The Delegation Toolkit currently supports three categories of scopes:

| Scope Type | Description |
|------------|-------------|
| [Spending limit scopes](./spending-limit-scope) | Restricts the spending of native tokens, ERC-20, and ERC-721 assets based on defined conditions. |
| [Function call scope](./function-call-scope) | Restricts the delegation to specific contract methods, contract addresses, or even precise calldata. |
| [Ownership transfer scope](./owernship-transfer-scope) | Restricts the delegation to only allow ownership transfers, specifically the `transferOwnership` function for a specified contract. |