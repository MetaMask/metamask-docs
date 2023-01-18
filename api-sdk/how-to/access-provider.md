# Access a user's MetaMask provider

You the [`metamask-extension-provider`](https://www.npmjs.com/package/metamask-extension-provider)
package to access a user's MetaMask provider from other web extensions.

The account provided by this provider is the user's MetaMask account.

When sending signing requests to this provider, MetaMask prompts the user to sign with their accounts.

This module works in Chrome and Firefox.

## Installation

```bash
npm install metamask-extension-provider -s
```

## Usage

You can use a bundler such as [Browserify](https://browserify.org/) with `metamask-extension-provider`.

```javascript
const createMetaMaskProvider = require('metamask-extension-provider');

const provider = createMetaMaskProvider();

provider.on('error', (error) => {
  // Failed to connect to MetaMask, fallback logic.
});

// Enjoy!
```

## Add additional browser support

Add MetaMask's extension ID for that browser's store to the configuration file:

```javascript
{
  "CHROME_ID": "nkbihfbeogaeaoehlefnkodbefgpgknn",
  "FIREFOX_ID": "webextension@metamask.io"
}
```

## Run the example

Use the `./sample-extension` folder as a web extension.
You can easily add it to Chrome or Firefox Developer Edition.

## Edit the example

You must have Browserify installed (`npm i -g browserify`) to edit the example.

You can edit the sample file `sample-extension/index.js` and rebuild the file with `npm run buildSample`.

## Use with a local development copy of MetaMask

You must edit the method `getMetaMaskId()` to return your local development MetaMask instance's ID.
You can get that from your MetaMask console using `chrome.runtime.id`.

## Current limitations

In order to identify problems (such as MetaMask not connecting), proper error handling must be added
to [metamask-inpage-provider](https://github.com/MetaMask/metamask-inpage-provider) that exposes the
errors to the consumer of the provider.
Maybe making it an event-emitter, so it can emit its errors, instead of just logging them.
