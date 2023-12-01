---
sidebar_position: 4
description: Integrate Decentraweb into your Unity game to enable human-readable addresses.
tags:
  - Unity SDK
---

# Enable human-readable addresses in Unity

You can integrate the [Decentraweb](https://decentraweb.org/) name resolver into your Unity game
with [MetaMask SDK](../connect/set-up-sdk/gaming/unity.md) installed.
Decentraweb maps human-readable names to machine-readable identifiers, such as Ethereum addresses.
Integrating Decentraweb into your game allows users to interact with addresses in a more user-friendly way.

## Prerequisites

[MetaMask SDK set up](../connect/set-up-sdk/gaming/unity.md) in your Unity game.

## Initialize the integration wrapper

Use the `newDWebAPIWrapper()` method to configure and initialize a C# integration wrapper, which
acts as a bridge between the MetaMask Unity SDK and the Decentraweb name resolver API.
This method initializes the wrapper with necessary configuration parameters, including
authentication details required to interact with the Decentraweb name resolver API.

```csharp
// Initialize the wrapper
var apiWrapper = newDWebAPIWrapper();
```

## Convert a name to an Ethereum address

Use the `ResolveNameAsync(name)` method to convert a human-readable name to the corresponding
Ethereum address.

The C# integration wrapper translates the request into a format that the Decentraweb name resolver
API can understand, and sends the translated request to the name resolver using a standard HTTP POST request.

The name resolver processes the request and responds with the Ethereum address.

<!--tabs-->

# Method

```csharp
// Initialize the wrapper
var apiWrapper = newDWebAPIWrapper();

// Get the user's human-readable name
var name = "user.dweb";

// Resolve the name to an Ethereum address
var address = await apiWrapper.ResolveNameAsync(name);
```

# JSON response

```json
{
  "success": true,
  "result": "0xcB3E45F337Dd3Beeba98F5F9F9A16e9cD152cC86"
}
```

<!--/tabs-->

## Convert an Ethereum address to a name

Use the `GetNameAsync(address)` method to convert an Ethereum address to the corresponding
human-readable name.

The C# integration wrapper translates the request into a format the Unity SDK can understand, and
sends the translated request to the SDK.

The SDK processes the request and responds with the human-readable name.

<!--tabs-->

# Method

```csharp
// Initialize the wrapper
var apiWrapper = newDWebAPIWrapper();

// Get the user's address
var address = "0xcB3E45F337Dd3Beeba98F5F9F9A16e9cD152cC86"

// Resolve the address to a human-readable name
var name = await apiWrapper.GetNameAsync(address)
```

# JSON response

```json
{
  "success": true,
  "result": {
    "name": "lordsats",
    "confirmed": true 
  } 
}
```

<!--/tabs-->

## Example

The following is an example of using the Unity SDK Decentraweb integration to create a transaction:

```csharp
public async Task FormTransactionAsync()
{
  // Initialize the wrapper
  var apiWrapper = new DWebAPIWrapper();
  
  // Get the user's human-readable name
  var name = "user.dweb";
  
  // Resolve the name to an Ethereum address
  var address = await apiWrapper.ResolveNameAsync(name);
  
  // Form the transaction
  var transaction = new Transaction
  {
    To = address,
    Value = 1.0m,
    Gas = 21000
  };
  
  // The rest of the transaction formation code...
}
```
