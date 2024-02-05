---
description: Integrate your JavaScript dapp with MetaMask.
sidebar_position: 1
---

# JavaScript quickstart

This page provides code samples to quickly connect to your users' MetaMask accounts from a
JavaScript dapp.
You can:

- [Connect to the MetaMask browser extension](#connect-to-the-metamask-browser-extension) directly
  using the MetaMask APIs.
- [Connect to the MetaMask extension and MetaMask Mobile](#connect-to-the-metamask-extension-and-metamask-mobile)
  using the SDK.

## Connect to the MetaMask browser extension

Connect to the MetaMask browser extension directly using the
[MetaMask Ethereum provider API](../concepts/apis.md).
You must [detect MetaMask](/wallet/how-to/detect-wallet) in the user's browser, then
[access the user's accounts](../how-to/access-accounts.md) by prompting them to connect to MetaMask.

1. Install the [`@metamask/detect-provider`](https://github.com/MetaMask/detect-provider) module in
    your project directory:

    ```bash
    npm i @metamask/detect-provider
    ```

2. Add the following code to your project file:

    ```js title="index.js"
    // Detect the MetaMask Ethereum provider
    
    import detectEthereumProvider from '@metamask/detect-provider';
    
    const provider = await detectEthereumProvider();
    
    if (provider) {
      startApp(provider);
    } else {
      console.log('Please install MetaMask!');
    }
    
    function startApp(provider) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      }
    }
    
    // Prompt users to connect to MetaMask
    
    const ethereumButton = document.querySelector('.enableEthereumButton');
    const showAccount = document.querySelector('.showAccount');
    
    ethereumButton.addEventListener('click', () => {
      getAccount();
    });
    
    async function getAccount() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((err) => {
          if (err.code === 4001) {
            console.log('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
      const account = accounts[0];
      showAccount.innerHTML = account;
    }
    ```

## Connect to the MetaMask extension and MetaMask Mobile

Connect to the MetaMask browser extension and MetaMask Mobile using [MetaMask SDK](../concepts/sdk/index.md).
The SDK automatically detects MetaMask in the user's browsers, and enables them to seamlessly
connect to the extension or mobile wallet.
By integrating your dapp using the SDK, millions of MetaMask Mobile users can connect to their
preferred MetaMask client.

:::info note
The SDK uses the [Ethereum provider](../concepts/apis.md#ethereum-provider-api), so you can use the
SDK as a wrapper around an existing JavaScript dapp and call
[MetaMask Ethereum provider API methods](../reference/provider-api.md) from your dapp as normal.
:::

1. Install the [MetaMask JavaScript SDK](../how-to/use-sdk/javascript/index.md) in your project directory:

    ```bash
    npm i @metamask/sdk
    ```

2. Add the following code to your project file:

    ```js title="index.js"
    import { MetaMaskSDK } from '@metamask/sdk';
    
    // Initialize the SDK
    
    const MMSDK = new MetaMaskSDK(
      dappMetadata: {
        name: "Example JavaScript Dapp",
        url: window.location.host,
      }
    );
    
    const ethereum = MMSDK.getProvider();
    
    // Prompt users to connect to MetaMask
    
    const ethereumButton = document.querySelector('.enableEthereumButton');
    const showAccount = document.querySelector('.showAccount');
    
    ethereumButton.addEventListener('click', () => {
      getAccount();
    });
    
    async function getAccount() {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((err) => {
          if (err.code === 4001) {
            console.log('Please connect to MetaMask.');
          } else {
            console.error(err);
          }
        });
      const account = accounts[0];
      showAccount.innerHTML = account;
    }
    ```
