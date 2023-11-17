---
description: Detect the MetaMask Ethereum provider object.
sidebar_position: 2
---

# Detect MetaMask

The presence of the MetaMask Ethereum provider object, `window.ethereum`, in a user's browser
indicates an Ethereum user.

To demonstrate this, verify whether your browser is running MetaMask by copying and pasting the following 
code snippet into your browser's developer console:

```javascript
if (typeof window.ethereum !== 'undefined') {
  console.log('MetaMask is installed!');
}
```

:::tip
To differentiate MetaMask from other Ethereum-compatible browsers, you can detect MetaMask using the
[`window.ethereum.isMetaMask`](../../reference/provider-api.md#windowethereumismetamask) property.
:::

:::caution Important
MetaMask supports [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which introduces an
alternative discovery mechanism to the `window.ethereum` injected provider.
This alternative mechanism enables dapps to support [wallet interoperability](../../concepts/wallet-interoperabilty.md)
by discovering multiple injected wallet providers in a user's browser.
We recommend [setting up SDK](../connect/set-up-sdk/javascript/index.md), which supports EIP-6963 by default.
:::

## Use @metamask/detect-provider

You can use the [`@metamask/detect-provider`](https://github.com/MetaMask/detect-provider) module to
detect the MetaMask Ethereum provider on any platform or browser.

Use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install
`@metamask/detect-provider` in your project directory:

```bash
npm i @metamask/detect-provider
```

For example, the following code detects the provider using `@metamask/detect-provider`:

```javascript title="index.js"
// This function detects most providers injected at window.ethereum.
import detectEthereumProvider from '@metamask/detect-provider';

// This returns the provider, or null if it wasn't detected.
const provider = await detectEthereumProvider();

if (provider) {
  // From now on, this should always be true:
  // provider === window.ethereum
  startApp(provider); // initialize your app
} else {
  console.log('Please install MetaMask!');
}

function startApp(provider) {
  // If the provider returned by detectEthereumProvider isn't the same as
  // window.ethereum, something is overwriting it – perhaps another wallet.
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  }
  // Access the decentralized web!
}
```

### Compile the module

Use a bundler such as [Webpack](https://github.com/webpack/webpack) to compile the module and create
an output script.
Install Webpack in your project directory:

```bash
npm i --save-dev webpack
```

Install the Webpack CLI:

```bash
npm i --save-dev webpack-cli
```

Compile the module:

```bash
npx webpack
```

:::note
When compiling the module, you might need to pass CLI options such as
[`--experiments-top-level-await`](https://webpack.js.org/configuration/experiments/).
You can alternatively specify options in a configuration file as follows:

```javascript title="webpack.config.cjs"
module.exports = {
    experiments: {
        topLevelAwait: true,
    },
};
```
:::

Run `npx webpack` again upon any changes to `index.js`.
See [Webpack's Getting Started guide](https://webpack.js.org/guides/getting-started/) for more information.
