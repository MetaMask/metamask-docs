---
description: Unity SDK API reference
sidebar_position: 2
---

# Unity SDK API

The following is an overview of the API methods used in the [Unity SDK](../how-to/connect/set-up-sdk/gaming/unity.md).

## MetaMaskUnity

This is a singleton class that you can use to access the `MetaMaskWallet` instance, which is
specific to Unity.

### Instance

This is the singleton instance of the `MetaMaskUnity` class that is lazy-loaded when you access it
for the first time.

### Initialize

This method initializes the `MetaMaskWallet` instance and makes it accessible via the `Wallet` property.
You can also pass extra options and parameters to it to customize the wallet instance:

```csharp
// Initialize using default settings
MetaMaskUnity.Instance.Initialize();

// Initialize using custom transport and socket provider
var transport = new MyCustomTransport();
var socketProvider = new MyCustomSocketProvider();
MetaMaskUnity.Instance.Initialize(transport, socketProvider);

// Initialize using custom config, transport and socket provider
var config = myMetaMaskConfig;
var transport = new MyCustomTransport();
var socketProvider = new MyCustomSocketProvider();
MetaMaskUnity.Instance.Initialize(config, transport, socketProvider);
```

### SaveSession

This method saves the current session to the persistent storage.
This is useful when you want to save the session and restore it later.
This is automatically called when the application quits, but you can also manually call it.

### LoadSession

This method loads the session from the persistent storage.
This is useful when you want to restore the session after the application quits.
This is automatically called when the application starts, but you can also manually call it.

## MetaMaskWallet

### Connect

This method connects to the MetaMask app.
It renders a generated QR code in the user interface for your users to scan with MetaMask Mobile.
After the user scans this QR code, a connect screen appears in MetaMask Mobile where the user can
approve the connection with your game application.

### Disconnect

This method disconnects the user that is connected from the MetaMask app session.

### Request

This method sends a request to MetaMask.
You can use it to call any [provider API method](../../../../reference/provider-api.md).