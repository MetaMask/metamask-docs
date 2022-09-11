# MetaMask Providers

A module for accessing the user's MetaMask [provider](https://www.npmjs.com/package/@metamask/providers) from other sources. Provider examples include..

- External extension provider
- Inpage provider

The account provided by this provider will be the user's MetaMask account.

When sending signing requests to this provider, MetaMask will prompt the user to sign with their accounts.

Works in:

- Chrome
- Firefox

MetamaskInpageProvider further extends StreamProvider to support legacy provider interfaces in addition to [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193), and is used to instantiate the object injected by MetaMask into web pages as window.ethereum.

## Installation

Using npm as a package manager:

```bash
npm install @metamask/providers
```

## Usage

```javascript
import { initializeProvider } from '@metamask/providers';

// Create a stream to a remote provider:
const metamaskStream = new LocalMessageDuplexStream({
  name: 'inpage',
  target: 'contentscript',
});

// this will initialize the provider and set it as window.ethereum
initializeProvider({
  connectionStream: metamaskStream,
});

const { ethereum } = window;
```

## External Extension Provider

```javascript
import { createExternalExtensionProvider } from '@metamask/providers';

let provider = createExternalExtensionProvider();
const accounts = await provider.request({ method: 'eth_requestAccounts' });
```
