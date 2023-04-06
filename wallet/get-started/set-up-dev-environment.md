---
description: Set up a new simple dapp to integrate with MetaMask.
---

# Set up your development environment

You can easily set up a simple dapp to integrate with MetaMask.

## Prerequisites

- [MetaMask](https://metamask.io/) installed in the browser of your choice on your development
  machine.
  We recommend [running a development network](run-development-network.md) on MetaMask when
  developing a dapp.

- A text editor of your choice, such as [VS Code](https://code.visualstudio.com/).
  You can install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  extension for VS Code to easily launch a local development server for your dapp.

- A module bundler, such as [Webpack](https://github.com/webpack/webpack).

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Set up a new project

Create a project directory with the following structure:

```text
simple-dapp/
├─ src/
│  ├─ index.js
├─ dist/
│  ├─ index.html
```

For any Ethereum dapp to work, your project script `index.js` must:

- [Detect the Ethereum provider.](detect-metamask.md)
- [Detect which Ethereum network the user is connected to.](detect-network.md)
- [Access the user's Ethereum accounts.](access-accounts.md)

:::caution important
If you import any modules into your project, such as
[`@metamask/detect-provider`](https://github.com/MetaMask/detect-provider), use a bundler such as
[Webpack](https://github.com/webpack/webpack) to compile the modules and create an output script
`dist/main.js`.
See [Webpack's Getting Started guide](https://webpack.js.org/guides/getting-started/) for more information.
:::

:::tip
We also recommend [importing MetaMask SDK](../how-to/use-sdk/index.md) to enable a reliable, secure,
and seamless connection from your dapp to a MetaMask wallet client.
:::

## Example

The following is an example simple dapp script and HTML file:

<!--tabs-->

# JavaScript

```javascript title="index.js"
/*****************************************/
/* Detect the MetaMask Ethereum provider */
/*****************************************/

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

/**********************************************************/
/* Handle chain (network) and chainChanged (per EIP-1193) */
/**********************************************************/

const chainId = await window.ethereum.request({ method: 'eth_chainId' });

window.ethereum.on('chainChanged', handleChainChanged);

function handleChainChanged(chainId) {
  window.location.reload();
}

/***********************************************************/
/* Handle user accounts and accountsChanged (per EIP-1193) */
/***********************************************************/

let currentAccount = null;
window.ethereum.request({ method: 'eth_accounts' })
  .then(handleAccountsChanged)
  .catch((err) => {
    console.error(err);
  });

window.ethereum.on('accountsChanged', handleAccountsChanged);

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    currentAccount = accounts[0];
    showAccount.innerHTML = currentAccount;
  }
}

/*********************************************/
/* Access the user's accounts (per EIP-1102) */
/*********************************************/

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

# HTML

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Simple dapp</title>
  <script type="module" src="main.js"></script>
</head>
<body>
  <!-- Display a connect button and the current account -->
  <button class="enableEthereumButton">Enable Ethereum</button>
  <h2>Account: <span class="showAccount"></span></h2>
</body>
</html>
```

<!--/tabs-->
