---
description: Integrate your JavaScript dapp with MetaMask.
sidebar_position: 1
---

# JavaScript quickstart

This page provides a code sample to quickly connect to your users' MetaMask accounts from a
JavaScript dapp.

Connect to the MetaMask browser extension directly using the [Wallet API](../concepts/wallet-api.md).
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
