---
sidebar_position: 4
description: Learn about the contract provider in Unity.
tags:
  - Unity SDK
---

# Contract provider

When [interacting with smart contracts in Unity](index.md), the provider is similar to a JavaScript
provider.
The provider is responsible for sending the request formed inside the
[contract proxy class](contract-proxy-class.md) to the blockchain RPC node and optionally decoding
the response.
If the provider doesn't decode the response, then it's considered an [`ILegacyProvider`](#ilegacyprovider).

## `IProvider`

The `IProvider` interface defines the following function:

```csharp
Task<TR> Request<TR>(string method, object[] parameters = null);
```

This function must send a JSON-RPC request with the given method and parameters.
It must decode the JSON-RPC result response into the type `TR`.

The `IProvider` must also define two additional properties:

```csharp
// The current chain ID the provider is connected to.
long ChainId { get; }

// The current address connected to the provider.
string ConnectedAddress { get; }
```

For backwards compatibility, the `ILegacyProvider` function is also defined:

```csharp
object Request(string method, object[] parameters = null);
```

To easily support this function, use `Request<object>`:

```csharp
public object Request(string method, object[] parameters = null)
{
  return this.Request<object>(method, parameters);
}
```

## `ILegacyProvider`

The `ILegacyProvider` is an interface that declares an interface that does not support response decoding.
The `ILegacyProvider` interface defines the following function:

```csharp
object Request(string method, object[] parameters = null);
```

This function must send a JSON-RPC request with the given method and parameters.
It should decode the response, but it's not required.
It may return any of the following:

- The response as a JSON string
- The response as a JSON string, wrapped in a Task
- The response decoded into some object
- The response decoded into some object, wrapped in a Task

If the function returns a JSON string, then the `Contract` class attempts to deserialize the JSON
string into the desired type.
If it returns any other object type, the `Contract` class attempts to convert to the desired type by
first serializing the object into JSON, then deserializing the JSON back into the desired type.
The desired type is defined in the [contract interface](contract-interface.md) used.

The `ILegacyProvider` must also define two additional properties:

```csharp
// The current chain ID the provider is connected to.
long ChainId { get; }

// The current address connected to the provider.
string ConnectedAddress { get; }
```
