---
description: Access a user's MetaMask provider using metamask-extension-provider.
sidebar_position: 8
---

# Access a user's MetaMask provider

Use the [`@metamask/providers`](https://github.com/MetaMask/providers) module to access a user's
MetaMask provider from other sources, such as external extension providers and inpage providers.

The account provided by this provider is the user's MetaMask account.
When sending signing requests to this provider, MetaMask prompts the user to sign with their accounts.

This module works in Chrome and Firefox.

## Use @metamask/providers

Install `@metamask/providers` using the following command:

```bash
npm install @metamask/providers
```

Initialize the provider using the following code:

```javascript
import { initializeProvider } from '@metamask/providers';

// Create a stream to a remote provider
const metamaskStream = new LocalMessageDuplexStream({
  name: 'inpage',
  target: 'contentscript',
});

// Initialize the provider and set it as window.ethereum
initializeProvider({
  connectionStream: metamaskStream,
});
```

Create an external extension provider using the following code:

```javascript
import { createExternalExtensionProvider } from '@metamask/providers';

let provider = createExternalExtensionProvider();
const accounts = await provider.request({ method: 'eth_requestAccounts' });
```
