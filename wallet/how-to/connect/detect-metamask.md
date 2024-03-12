---
description: Detect the MetaMask Ethereum provider object.
sidebar_position: 1
---

# Detect MetaMask

:::caution Important
MetaMask supports [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which introduces an
alternative discovery mechanism to the `window.ethereum` injected provider.
This alternative mechanism enables dapps to [detect multiple wallets](index.md) in
the user's browser.
We recommend detecting multiple wallets to improve the user experience.
:::

The presence of the MetaMask Ethereum provider object, `window.ethereum`, in a user's browser
indicates an Ethereum user.

To demonstrate this, verify whether your browser is running MetaMask by copying and pasting the following
code snippet into your browser's developer console:

```javascript
if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
}
```

You can use the [`@metamask/detect-provider`](https://github.com/MetaMask/detect-provider) module to
detect the MetaMask Ethereum provider.

## Steps

### 1. Install `@metamask/detect-provider`

Use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install
`@metamask/detect-provider` in your project directory:

```bash
npm i @metamask/detect-provider
```

### 2. Detect the provider

For example, the following code detects the provider using `@metamask/detect-provider`:

```javascript
// This function detects most providers injected at window.ethereum.
import detectEthereumProvider from "@metamask/detect-provider";

// This returns the provider, or null if it wasn't detected.
const provider = await detectEthereumProvider();

if (provider) {
    // From now on, this should always be true:
    // provider === window.ethereum
    startApp(provider); // initialize your app
} else {
    console.log("Please install MetaMask!");
}

function startApp(provider) {
    // If the provider returned by detectEthereumProvider isn't the same as
    // window.ethereum, something is overwriting it – perhaps another wallet.
    if (provider !== window.ethereum) {
        console.error("Do you have multiple wallets installed?");
    }
    // Access the decentralized web!
}