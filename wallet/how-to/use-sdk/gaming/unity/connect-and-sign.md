---
sidebar_position: 1
sidebar_label: Connect and sign
tags:
  - Unity SDK
---

# Connect and sign in Unity

You can [connect and sign](../../javascript/connect-and-sign.md) in a single interaction from your Unity game.

## Prerequisites

- [MetaMask SDK set up](index.md) in your Unity game.

- MetaMask Mobile version 7.10 or later.
  Your users must have an updated version of MetaMask Mobile for this feature to work correctly.
  For older versions of MetaMask, this function may not work as expected.

## Steps

1. Open your Unity project with the SDK installed.

2. In your script, create a new function named `ConnectAndSign`:

    ```csharp
    public void ConnectAndSign()
    {
      MetaMaskUnity.Instance.ConnectAndSign("This is a test message");
    }
    ```

    Replace the test message with any string message you want to sign.

    :::caution important
    Make sure you initialize [`MetaMaskUnity.Instance`](../../../../reference/sdk-unity-api.md#instance)
    before using this function.
    To do so, enable **Initialize On Awake** in the **MetaMask Unity** script inspector, or run
    [`MetaMask.Instance.Initialize()`](../../../../reference/sdk-unity-api.md#initialize).
    :::

3. Call the `ConnectAndSign` function whenever you want to establish a connection and sign a message.
    For example, you can call this function when a button is clicked:

    ```csharp
    public void OnButtonClick()
    {
      ConnectAndSign();
    }
    ```
