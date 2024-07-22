---
sidebar_position: 3
description: Learn about the contract proxy class in Unity.
tags:
  - Unity SDK
---

# Contract proxy class

When [interacting with smart contracts in Unity](index.md), the contract proxy class is responsible
for performing:

- Transaction serialization
- Transaction execution
- Transaction result deserialization

The contract proxy class is also responsible for invoking the [provider](contract-provider.md) and attempts
to support both asynchronous and synchronous provider objects.

Since the proxy class is responsible for a lot, some parts of the class may be decoupled into their
own components.
For example, transaction serialization and deserialization is not very customizable and will likely
be moved into its own component to allow more extendability.

:::caution important
The contract proxy class should be considered an internal and unstable API.
You should never need to inherit the `Contract` class, unless you're using the
[backed type contract factory](contract-factory.md#backed-type-contract-factory).
However, the [contract code generator](index.md#generate-contract-code) already generates these
classes for you.

You only need to use `Contract.Attach<T>(string address, IProvider provider)`.
:::
