---
sidebar_label: Unity
sidebar_position: 1
description: Get started with MetaMask SDK using Unity.
---

import YoutubeEmbed from '@site/src/components/YoutubeEmbed';

# Get started using Unity

Import MetaMask SDK into your
[Unity](https://assetstore.unity.com/packages/decentralization/infrastructure/metamask-246786) game
to enable users to easily connect to their MetaMask Mobile wallet.
The MetaMask Unity SDK supports macOS, Windows, Linux, iOS, Android, and WebGL.

## Video demo

The following video demonstrates how to install and use the MetaMask Unity SDK.

<YoutubeEmbed url='https://www.youtube.com/embed/0D1cIH-PZtI' />

## Steps

### 1. Configure build settings

To build the SDK, configure the following settings in your Unity editor according to your
development platform:

- iOS:
  - Go to **Build Settings > Build Options** and set **Enable Bitcode** to **NO**.
- Android:
  - Go to the **Assets** dropdown menu and select **External Dependency Manager > Android
    Resolver > Resolve**.
  - Go to **Build Settings > Player Settings** and set **Minimum API level** to **Android 7.0
    'Nougat'** (API level 24).
- WebGL:
  - Go to **Build Settings > Player Settings**, switch to the **Resolution & Presentation Tab**, and
    select **MetaMask**.

For all platforms, also set the **Scripting Backend** in **Player Settings** to **IL2CPP**, and set
**IL2CPP Code Generation** in **Build Settings** to **Faster (smaller) builds**.

### 2. Install the Unity SDK

Download the
[MetaMask SDK for Unity](https://assetstore.unity.com/packages/decentralization/infrastructure/metamask-246786)
from the Unity Asset Store.

In your Unity editor, go to the menu > **Package Manager**.
Select **My Assets**, **MetaMask Unity SDK**, and **Install**.
You should see the MetaMask SDK package listed in the project packages and be able to interface
with it and its examples in the scene.

You also need to install [TextMeshPro](https://docs.unity3d.com/Manual/com.unity.textmeshpro.html).
If you don't have TextMeshPro installed, the Unity editor automatically prompts you to install it.

<details>

<summary>Unity SDK package structure</summary>
<p>

| File or directory        | Contents                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `Documentation`          | Documentation and link to online documentation                                                                                   |
| `Editor`                 | Editor-only code such as Setup GUI windows, data persistence for SDK settings                                                    |
| `Plugins`                | Plugins needed by the package (the ECIES Platform runtime libraries and core SDK Codebase)                                       |
| `Runtime`                | Main scripts for the SDK that are environment-agnostic, including the C# scripts that provide the base implementation of the SDK |
| `Samples`                | Test application scene that can be used as a referral for your project, including modal popups and dynamic UI scaling            |
| `LICENSE.md`             | Package license                                                                                                                  |
| `Third Party Notices.md` | Third party notices                                                                                                              |

</p>

</details>

When new versions of the Unity SDK are released, [update the Unity SDK in your project](#update-the-unity-sdk).

### 3. Initialize MetaMask

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
You can now make calls to the user's wallet using [provider API methods](/wallet/reference/provider-api).

### 4. Connect to MetaMask

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

:::info Connect and sign
You can also [use the `connectAndSign` method](../../how-to/gaming/unity/connect-and-sign.md) to
connect to MetaMask and sign data in a single interaction.
:::

### 5. Use MetaMask

Once the wallet is authorized, you can make requests to it.
The wallet is authorized when the buttons become interactable or the `WalletAuthorized` event is fired:

```csharp
var wallet = MetaMaskUnity.Instance.Wallet;
wallet.WalletAuthorized += OnWalletAuthorized;

void OnWalletAuthorized(object sender, EventArgs e) {
  Debug.Log("Wallet is authorized");
}
```

You can call any [JSON-RPC API method](/wallet/reference/json-rpc-api) using `wallet.Request(myRequest)`.
The following is a sample transaction request:

```csharp
var wallet = MetaMaskUnity.Instance.Wallet;
var transactionParams = new MetaMaskTransaction
{
  To = "0xd0059fB234f15dFA9371a7B45c09d451a2dd2B5a",
  From = MetaMaskUnity.Instance.Wallet.SelectedAddress,
  Value = "0x0"
};

var request = new MetaMaskEthereumRequest
{
  Method = "eth_sendTransaction",
  Parameters = new MetaMaskTransaction[] { transactionParams }
};
await wallet.Request(request);
```

:::note
See the [Unity SDK API reference](../../reference/unity-api.md) for an overview of the
API methods from the most important classes.
:::

### 6. Configure MetaMask

You can customize the default configuration or create your own configuration.

Edit the default configuration by doing one of the following:

- Navigate to the **Window > MetaMask > Setup** menu item.
- Open the `MetaMaskConfig` asset in the project window.

Edit the fields and save the changes.

Create a new configuration by right-clicking on the project window and navigating to
**MetaMask > Config**.
Name the new configuration and use it when initializing the `MetaMaskUnity` instance.

## Update the Unity SDK

Update your project's version of the MetaMask Unity SDK to ensure that your project uses the latest
SDK functionalities and improvements.
To update the SDK to the latest version available on the Unity Asset Store:

1. Update and import the latest package using the Unity Package Manager.
2. Go to **Tools > MetaMask > Install in Unity**.
3. Select the **Already Installed** button.
   This updates the SDK in your project.

Alternatively, you can delete the existing MetaMask folder in your project and re-import it from the
Package Manager or Asset Store.

## FAQS

<details>

<summary>I can't find the SDK installation option.</summary>

If you don't see the option to [install the SDK](#2-install-the-unity-sdk) in your Unity menu,
ensure you're on the latest Unity version and that you have no red errors printed in your console.
This option not appearing is typically due to incorrect editor initialization, which you can
usually resolve by restarting the editor or updating your Unity version.

</details>

<details>

<summary>On iOS, why does a popup appear when using a deeplink?</summary>

When deeplinking, a background service is created to facilitate the communication layer between the
Unity game and MetaMask.
On iOS, background services expire after a certain amount of time.
A notification pops up to let you know the socket connection has expired.

</details>

<details>

<summary>What does the external dependency manager do?</summary>

The Unity Jar Resolver is an external dependency manager specifically for Unity projects that use
external libraries.
It helps manage the dependencies between Unity and external libraries, which can sometimes be
complicated due to differences between the two environments.
This tool is particularly useful for MetaMask SDK, since Android and iOS need a variety of native
libraries to facilitate deeplinking and the persistent socket connection.

</details>

<details>

<summary>Does the SDK increase my compilation time?</summary>

No.
If you notice an increased compilation time, it might be related to the ILL2CP pipeline, which can
take longer to build at compile time.
The SDK is filled with precompiled libraries to save on runtime compilation.

</details>

## Next steps

Once you have the MetaMask Unity SDK set up, you can:

- [Connect and sign in Unity.](../../how-to/gaming/unity/connect-and-sign.md)
- [Set up Infura in Unity.](../../how-to/gaming/unity/infura.md)
- [Interact with smart contracts in Unity.](../../how-to/gaming/unity/smart-contracts/index.md)
- [Enable human-readable addresses in Unity using Decentraweb.](../../how-to/gaming/unity/dweb.md)
