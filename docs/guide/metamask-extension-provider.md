# MetaMask Extension Provider

A module for accessing the user's MetaMask [provider](https://github.com/ethereum/wiki/wiki/JavaScript-API#web3currentprovider) from other WebExtensions.

The account provided by this provider will be the user's MetaMask account.

When sending signing requests to this provider, MetaMask will prompt the user to sign with their accounts.

Works in:

- Chrome
- Firefox

## Installation

Using npm as a package manager:

```bash
npm install metamask-extension-provider -s
```

## Usage

Using a bundler like browserify:

```javascript
const createMetaMaskProvider = require('metamask-extension-provider');

const provider = createMetaMaskProvider();

provider.on('error', (error) => {
  // Failed to connect to MetaMask, fallback logic.
});

// Enjoy!
```

## Adding additional browser support

Add MetaMask's extension ID for that browser's store to the config file.

```javascript
{
  "CHROME_ID": "nkbihfbeogaeaoehlefnkodbefgpgknn",
  "FIREFOX_ID": "webextension@metamask.io"
}
```

## Running the example

Use the `./sample-extension` folder as an WebExtension. You can easily add it to Chrome or Firefox Developer Edition.

## Editing the example

You must have `browserify` installed (`npm i -g browserify`).

You can edit the sample file `sample-extension/index.js` and then rebuild the file with `npm run buildSample`.

## Using with a local Development copy of MetaMask

You'll need to edit the method `getMetaMaskId()` to return your local development MetaMask's id. You can get that from your MetaMask console with `chrome.runtime.id`.

## Current Limitations

In order to identify when there is a problem (like MetaMask was not connected), some kind of proper error handling must be added to [metamask-inpage-provider](https://github.com/MetaMask/metamask-inpage-provider) that exposes the errors to the consumer of the provider. Maybe making it an event-emitter, so it can emit its errors, instead of just logging them.
