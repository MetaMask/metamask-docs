---
description: Integrate your JavaScript dapp with MetaMask.
sidebar_position: 1
---

# JavaScript quickstart

## Connect to the MetaMask browser extension

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

ethereum.request({ method: 'eth_requestAccounts', params: [] });
```
