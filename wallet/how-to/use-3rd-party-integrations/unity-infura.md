---
description: Set up MetaMask SDK with Infura in your Unity game.
sidebar_position: 3
---

# Set up Infura in Unity

You can set up [MetaMask SDK](../../concepts/sdk/index.md) with [Infura](https://docs.infura.io/) in
your Unity game.

## Prerequisites

- An Infura API key.
  Create one by following the first two steps in the
  [Infura getting started guide](https://docs.infura.io/getting-started).
- [MetaMask SDK set up](../connect/set-up-sdk/gaming/unity.md) in your Unity game.

## Steps

1. Open your Unity project with the SDK installed.

2. Navigate to the game object in your scene (or the Prefab instance) that currently stores the
    `MetaMask Unity` script.
    In the `Demo` scene, this is the `MetaMaskUnitySDK` game object.

3. Select the `MetaMaskUnitySDK` Prefab to view its properties in the **Inspector** window. 

4. In the **MetaMask Unity (Script)** section, enter your Infura API key into the **Infura Project
    Id** field.

<p align="center">

![MetaMask Unity script](../../assets/unity-infura.png)

</p>

5. Save your changes.
    This automatically configures all RPC URLs that Infura supports.
