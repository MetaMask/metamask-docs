---
sidebar_position: 2
description: Learn about the contract factory in Unity.
---

# Contract factory

When [interacting with smart contracts in Unity](index.md), the contract factory is responsible for
creating the [contract proxy class](contract-proxy-class.md) with the given
[contract interface](contract-interface.md) type `T`.

## Contract factory types

### Impromptu contract factory

The impromptu contract factory uses the `Impromptu` library to return a new instance of `Contract`
that behaves likes the given interface type `T`.
Since the contract is a dynamic object, all method invocations to the returned object of type `T`
are automatically routed to the `Contract` class.

:::note
The impromptu contract factory is only supported on Mono or in a runtime that has the CLR.
The IL2CPP runtime does not support this factory.
Use the backed type contract factory if you need a more concrete type.
:::

### Backed type contract factory

The backed type contract factory uses a concrete `class` type that inherits the `Contract` class and
the given interface type `T`.
To use this factory, the given interface must declare the class attribute `BackedType`
that specifies which concrete `class` type must be used when creating a new `Contract` instance.
The declared `class` must inherit from the given interface type `T`.

```csharp
[BackedType(typeof(ERC20Backing))]
public interface ERC20 : IContract
{
  [EvmMethodInfo(Name = "decimals", View = true)]
  [return: EvmParameterInfo(Type = "uint8")]
  Task<BigInteger> Decimals();

  // Define other interface methods.
}
```

Inside the backed `class`, you must override all interface methods and either invoke custom logic or
use the `Contract` class to automatically perform the correct logic based on the method data.
You can use `var method = System.Reflection.MethodBase.GetCurrentMethod();` to get the current
method being invoked, and then you can use `base.InvokeMethod(MethodInfo method, object[] args)` to
invoke the correct logic for the given `method` and `args`.

```csharp
public class ERC20Backing : Contract, ERC20
{
  public string Address
  {
    get => base.Address;
  }

  [EvmMethodInfo(Name = "decimals", View = true)]
  [return: EvmParameterInfo(Type = "uint8")]
  public Task<BigInteger> Decimals()
  {
    var method = System.Reflection.MethodBase.GetCurrentMethod();
    return (Task<BigInteger>) InvokeMethod(method, new object[] {  });
  }

  // Define other interface methods.
}
```

The [contract code generator](index.md#generate-contract-code) automatically generates a backing
`class` for each contract interface generated.

This contract factory is useful for when you need more concrete definitions of the contract
interface type `T`.
This can be useful in runtimes where `dynamic` or `DynamicObject` are not available (IL2CPP).

## Set the contract factory

To set the current contract factory, you can use `Contract.ContractFactory`:

```csharp
Contract.ContractFactory = new BackedTypeContractFactory();
```

You don't need to do this, unless you create a custom contract factory.
We recommend just using the default contract factories for each runtime:

- Mono runtime - [Impromptu contract factory](#impromptu-contract-factory)
- IL2CPP runtime - [Backed typed contract factory](#backed-type-contract-factory)
