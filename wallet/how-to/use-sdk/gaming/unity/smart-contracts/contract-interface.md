---
sidebar_position: 1
description: Learn about the contract interface in Unity.
tags:
  - Unity SDK
---

# Contract interface

When [interacting with smart contracts in Unity](index.md), the `IContract` interface defines an
interface of a given contract.
This interface includes all the functions of the contract, and an optional constructor function and
`Bytecode` field.

You can use the [contract code generator](index.md#generate-contract-code) to generate a contract
interface given a contract ABI or Hardhat artifact JSON file.

To manually create a new contract interface, define a new interface that inherits from `IContract`.
Optionally, declare the [`BackedType` attribute](contract-factory.md#backed-type-contract-factory).

```csharp
#if UNITY_EDITOR || !ENABLE_MONO  
[BackedType(typeof(ERC20Backing))]  
#endif  
public interface ERC20 : IContract  
{
  // Declare functions.
}
```

## Declare contract functions

To declare a `view` or `pure` function of the contract, first set the return type, the function name
(may differ from the actual name), and all parameters the function takes in a Task:

```csharp
#if UNITY_EDITOR || !ENABLE_MONO  
[BackedType(typeof(ERC20Backing))]  
#endif  
public interface ERC20 : IContract  
{
  Task<BigInteger> BalanceOf(EvmAddress account);
}
```

Once you have the function written, simply add the `EvmMethodInfo` at the top of the function to
declare the metadata about the contract function.
This includes the `Name` and whether it's a `View` function:

```csharp
#if UNITY_EDITOR || !ENABLE_MONO  
[BackedType(typeof(ERC20Backing))]  
#endif  
public interface ERC20 : IContract  
{
  [EvmMethodInfo(Name = "balanceOf", View = true)]
  Task<BigInteger> BalanceOf(EvmAddress account);
}
```

To define the EVM type for a parameter, you can use the `EvmParameterInfo` attribute.
However, this usually isn't needed, because the `Contract` class automatically infers most common
types, such as `EvmAddress` to be `address` and `string` to be `string`.

```csharp
#if UNITY_EDITOR || !ENABLE_MONO  
[BackedType(typeof(ERC20Backing))]  
#endif  
public interface ERC20 : IContract  
{
  [EvmMethodInfo(Name = "balanceOf", View = true)]
  Task<BigInteger> BalanceOf([EvmParameterInfo(Type = "address")] string account);
}
```

To define the EVM return type for the function, you can use `EvmParamterInfo` on the return type:

```csharp
#if UNITY_EDITOR || !ENABLE_MONO  
[BackedType(typeof(ERC20Backing))]  
#endif  
public interface ERC20 : IContract  
{
  [EvmMethodInfo(Name = "balanceOf", View = true)]
  Task<BigInteger> BalanceOf(EvmAddress account);
  
  [EvmMethodInfo(Name = "decimals", View = true)]  
  [return: EvmParameterInfo(Type = "uint8")]  
  Task<BigInteger> Decimals();
}
```

### Use the `Task` return type

We recommend always using `Task` as the return type when declaring contract functions, even if
the given [provider](contract-provider.md) does not use `Task`.
When you don't use `Task`, the `Contract` class is blocked until a response from the given
`Provider` is received.
This means if the `Provider` returns a Task of the request, the `Contract` class is blocked until
that Task completes, which may lead to a deadlock.

### Define a contract constructor

To define a constructor function, use the `EvmConstructorMethod` attribute at the top of the
function declaring the constructor.
The return type of the function must be the type of the interface, since a new instance of the
interface is returned by the `Contract` class.

Also, do one of the following:

- Declare a `static readonly string Bytecode` in the interface that has the bytecode.

    ```csharp
    #if UNITY_EDITOR || !ENABLE_MONO  
    [BackedType(typeof(ERC20Backing))]  
    #endif  
    public interface ERC20 : IContract  
    {
      public static readonly string Bytecode = "0x6080604052348015620000115760008....";  
        
      [EvmConstructorMethod]  
      Task<ERC20> DeployNew(String name_, String symbol_);
  
      [EvmMethodInfo(Name = "balanceOf", View = true)]
      Task<BigInteger> BalanceOf(EvmAddress account);
      
      [EvmMethodInfo(Name = "decimals", View = true)]  
      [return: EvmParameterInfo(Type = "uint8")]  
      Task<BigInteger> Decimals();
    }
    ```

- Set the `Bytecode` field in the `EvmConstructorMethod` attribute.

    ```csharp
    #if UNITY_EDITOR || !ENABLE_MONO  
    [BackedType(typeof(ERC20Backing))]  
    #endif  
    public interface ERC20 : IContract  
    {
      [EvmConstructorMethod(Bytecode = "0x608060405238....")]  
      Task<ERC20> DeployNew(String name_, String symbol_);
  
      [EvmMethodInfo(Name = "balanceOf", View = true)]
      Task<BigInteger> BalanceOf(EvmAddress account);
      
      [EvmMethodInfo(Name = "decimals", View = true)]  
      [return: EvmParameterInfo(Type = "uint8")]  
      Task<BigInteger> Decimals();
    }
    ```

By default, the [contract code generator](index.md#generate-contract-code) uses the second option.
