---
description: See the Unity SDK API reference.
sidebar_position: 2
toc_max_heading_level: 4
---

# Unity SDK API

The following is an overview of the API methods used in the [Unity SDK](../how-to/use-sdk/gaming/unity/index.md).

### `MetaMaskUnity`

This is a singleton class that you can use to access the `MetaMaskWallet` instance, which is
specific to Unity.

#### `Instance`

This is the singleton instance of the `MetaMaskUnity` class that is lazy-loaded when you access it
for the first time.

#### `Initialize`

This method initializes the `MetaMaskWallet` instance and makes it accessible via the `Wallet` property.
You can also pass extra options and parameters to it to customize the wallet instance:

```csharp
// Initialize using default settings.
MetaMaskUnity.Instance.Initialize();

// Initialize using custom transport and socket provider.
var transport = new MyCustomTransport();
var socketProvider = new MyCustomSocketProvider();
MetaMaskUnity.Instance.Initialize(transport, socketProvider);

// Initialize using custom config, transport and socket provider.
var config = myMetaMaskConfig;
var transport = new MyCustomTransport();
var socketProvider = new MyCustomSocketProvider();
MetaMaskUnity.Instance.Initialize(config, transport, socketProvider);
```

#### `SaveSession`

This method saves the current session to persistent storage.
It is useful when you want to save the session and restore it later.
When the application starts, it automatically calls this method.
You can also manually call this method.

#### `LoadSession`

This method loads the session from persistent storage.
It is useful when you want to restore the session after the application quits.
When the application starts, it automatically calls this method.
You can also manually call this method.

### `MetaMaskWallet`

#### `Connect`

This method connects to MetaMask.
It renders a generated QR code in the user interface for your users to scan with MetaMask Mobile.
After the user scans this QR code, a connection screen appears in MetaMask Mobile where the user can
approve the connection with your Unity game.

#### `Disconnect`

This method disconnects the user from the MetaMask session.

#### `Request`

This method sends a request to MetaMask.
You can use it to call any [provider API method](provider-api.md).
