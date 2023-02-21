---
title: Unity gaming
---

# Use MetaMask SDK with Unity

You can import MetaMask SDK into your Unity game to enable users to easily connect to their MetaMask
Mobile wallet.
The MetaMask Unity SDK supports macOS, Windows, Linux, IOS, Android, and WebGL.

## How it works

The SDK renders a QR code in the UI using a dedicated prefab which players can scan with their
MetaMask Mobile app.
It also supports deeplinking on mobile platforms.
You can use all the [provider API methods](../../reference/provider-api.md) right from your game.

## Video demo

The following video demonstrates how to install and use the MetaMask Unity SDK.

<p align="center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/0D1cIH-PZtI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</p>

## Steps

### 1. Install the SDK for Unity

To install the module, first download the
[Unity SDK Package](https://drive.google.com/u/0/uc?id=1ArTJvKIZXK5vkUOM3cgr0t0NspenWRU9&export=download).

Then, go to the menu > **Package Manager**.
Select **My Assets**, **MetaMask Unity SDK**, and **Install**.
You should see the MetaMask SDK package listed in the project packages and be able to interface
with it and its examples in the scene.

You also need to install [TextMeshPro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html).
If you don't have TextMeshPro installed, the Unity editor automatically prompts you to install it.

### 2. Initialize MetaMask

The main class you interface with is called `MetaMaskWallet`.
It handles the connection to the user's wallet, as well as processing the requests to it using a
socket.io implementation.

To use it inside Unity, you must attach the component called `MetaMaskUnity` to a game object within
the editor.
This component is a singleton and you can use its `Instance` property to access the wallet instance.
You first must initialize by doing one of the following:

- Manually call `Initialize()`:

    ```csharp
    MetaMaskUnity.Instance.Initialize();
    ```

- Check **Initialize On Start** on the component within the editor.

This initializes the wallet instance, making it accessible from `MetaMaskUnity.Instance.Wallet`.
You can now make calls to the user's wallet using [provider API methods](../../reference/provider-api.md).

### 3. Connect to MetaMask

Once the wallet is prepared and initialized, you can connect to MetaMask.
Call the `Connect()` method on the wallet instance as follows:

```csharp
var wallet = MetaMaskUnity.Instance.Wallet;
wallet.Connect();
```

You can also subscribe to the `OnWalletConnected` callback on the wallet instance to be notified
once the wallet is connected:

```csharp
wallet.WalletConnected += OnWalletConnected;

void OnWalletConnected(object sender, EventArgs e) {
    Debug.Log("Wallet is connected");
}
```

You can also use the `Connect()` method from `MetaMaskUnity` that delegates the call to the wallet
instance:

```csharp
MetaMaskUnity.Instance.Connect();
```

There are a variety of sample buttons included inside the package that call this method when clicked.
These are provided as a convenience to get started quickly with your project.
Once the connection request is made, a QR code is generated, and based on the transport you're using
(`Unity UI` by default), either a new Canvas that contains the QR code is spawned or the
`MetaMaskUnityUIQRImage` generates the QR code when the connection is requested.

If you want to use the latter, add an instance of the `MetaMaskUnityUIQRImage` component to the
scene with its fields provided.
The transport field is also required if you want to use it isolated from the canvas that is spawned
by the transport, then it generates the QR code for you.

### 4. Use MetaMask

Once the wallet is authorized, you can make requests to it.
The wallet is authorized when the buttons become interactable or the `WalletAuthorized` event is fired:

```csharp
var wallet = MetaMaskUnity.Instance.Wallet;
wallet.WalletAuthorized += OnWalletAuthorized;

void OnWalletAuthorized(object sender, EventArgs e) {
    Deebug.Log("Wallet is authorized");
}
```

You can call any Ethereum request on the wallet using `wallet.Request(myRequest)`.
The following is a sample transaction request:

```csharp
var wallet = MetaMaskUnity.Instance.Wallet;
var transactionParams = new MetaMaskTranscation
{
    To = "0xd0059fB234f15dFA9371a7B45c09d451a2dd2B5a",
    From = MetaMaskUnity.Instance.Wallet.SelectedAddress,
    Value = "0x0"
};

var request = new MetaMaskEthereumRequest
{
    Method = "eth_sendTransaction",
    Parameters = new MetaMaskTranscation[] { transactionParams }
};
await wallet.Request(request);
```

### 5. Configure MetaMask

You can customize the default configuration or create your own configuration.

Edit the default configuration by doing one of the following:

- Navigate to the **Window > MetaMask > Setup** menu item.
- Open the `MetaMaskConfig` asset in the project window.

Edit the fields and save the changes.

Create a new configuration by right-clicking on the project window and navigating to
**MetaMask > Config**.
Name the new configuration and use it when initializing the `MetaMaskUnity` instance.

## API

The following is an overview of the APIs from the most important classes.

### MetaMaskUnity

This is a singleton class that you can use to access the `MetaMaskWallet` instance, which is
specific to Unity.

#### `Instance`

This is the singleton instance of the `MetaMaskUnity` class that is lazy-loaded when you access it
for the first time.

#### `Initialize`

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

#### `SaveSession`

This method saves the current session to the persistent storage.
This is useful when you want to save the session and restore it later.
This is automatically called when the application quits, but you can also manually call it.

#### `LoadSession`

This method loads the session from the persistent storage.
This is useful when you want to restore the session after the application quits.
This is automatically called when the application starts, but you can also manually call it.

### MetaMaskWallet

#### `Connect`

This method connects to the MetaMask app.
It renders a generated QR code in the user interface for your users to scan with MetaMask Mobile.
After the user scans this QR code, a connect screen appears in MetaMask Mobile where the user can
approve the connection with your game application.

#### `Disconnect`

This method disconnects the user that is connected from the MetaMask app session.

#### `Request`

This method sends a request to MetaMask.
You can use it to call any [provider API method](../../reference/provider-api.md).

## Package structure

| File or directory        | Contents                                       |
| ------------------------ | ---------------------------------------------- |
| `Documentation`          | Documentation and link to online documentation |
| `Editor`                 | Editor-only code such as Setup GUI windows, data persistence for SDK settings |
| `Plugins`                | Plugins needed by the package (the ECIES Platform runtime libraries and core SDK Codebase) |
| `Runtime`                | Main scripts for the SDK that are environment-agnostic, including the C# scripts that provide the base implementation of the SDK |
| `Samples`                | Test application scene that can be used as a referral for your project, including modal popups and dynamic UI scaling |
| `LICENSE.md`             | Package license                                |
| `Third Party Notices.md` | Third party notices                            |
