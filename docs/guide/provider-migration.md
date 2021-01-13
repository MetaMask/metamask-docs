# Provider Migration Guide

::: tip Attention MetaMask Users
This documentation is for Ethereum application developers.
As a MetaMask user, you don't need to do anything.
:::

As noted in the [Ethereum Provider documentation](./ethereum-provider.html#upcoming-breaking-changes), breaking changes went live for the Firefox extension on January 12, 2020.
Chrome, Brave, and Edge will go live in the coming days.
MetaMask Mobile will receive these changes as soon as possible.

The breaking changes include modifications to the `window.ethereum` API and the removal of `window.web3`.
This guide describes how to migrate to the new provider API, and how to replace our `window.web3`.

## Table of Contents

[[toc]]

## Replacing `window.web3`

::: warning Pages Will No Longer Reload on Chain Changes
With the removal of `window.web3`, MetaMask will no longer automatically reload the page on chain/network changes.

Please see [Handling the Removal of `ethereum.autoRefreshOnNetworkChange`](#handling-the-removal-of-ethereum-autorefreshonnetworkchange) for details.
:::

For historical reasons, MetaMask has injected [`web3@0.20.7`](https://github.com/ethereum/web3.js/tree/0.20.7) into all web pages.
This version of `web3` is deprecated, [has known security issues](https://github.com/ethereum/web3.js/issues/3065), and is no longer maintained by the [web3.js](https://github.com/ethereum/web3.js/) team.
Therefore, we decided to remove this library.

If your website relied on our `window.web3` object, you will have to migrate.
Please continue reading to understand your options.
Some are as simple as a one-line change.

::: tip Tip
Regardless of how you choose to migrate, you may want to read the `web3@0.20.7` documentation, which you can find [here](https://github.com/ethereum/web3.js/blob/0.20.7/DOCUMENTATION.md).
:::

### Using `window.ethereum` Directly

For many web3 sites, the API provided by `window.ethereum` is more than sufficient.
Much of the `web3` API simply maps to RPC methods, all of which can be requested using [`ethereum.request()`](./ethereum-provider.html#ethereum-request-args).
For example, here are a couple of actions performed using first `window.web3`, and then their equivalents using `window.ethereum`.

<<< @/docs/snippets/web3ToProvider.js

### Using an Updated Convenience library

If you decide that you need a convenience library, you will have to convert your usage of `window.web3` to an updated convenience library.
We recommend [`ethers`](https://npmjs.com/package/ethers) ([documentation](https://docs.ethers.io/)).

### Using `@metamask/legacy-web3`

::: warning
We strongly recommend that you consider one of the other two migration paths before resorting to this one.
It is not future-proof, we will not add new features to it.
:::

Finally, if you just want your web3 site to continue to work, we created [`@metamask/legacy-web3`](https://npmjs.com/package/@metamask/legacy-web3).
This package is a drop-in replacement for our `window.web3` that you can add to your website even before remove `window.web3` on all platforms.

`@metamask/legacy-web3` should work exactly like our injected `window.web3`, including by refreshing the page on chain/network changes, but _we cannot guarantee that it works perfectly_.
We will not fix any future incompatibilities between `web3@0.20.7` and MetaMask itself, nor will we fix any bugs in `web3@0.20.7` itself.

For installation and usage instructions, please see [npm](https://npmjs.com/package/@metamask/legacy-web3).

### Using the MetaMask Legacy Web3 Extension

We have created the [**MetaMask Legacy Web3 Extension**](https://github.com/MetaMask/legacy-web3-extension) for any users of web sites that still expect `window.web3` to be injected. If you install this extension alongside the regular MetaMask wallet extension, websites that rely on our old window.web3 API should start working again.

As with the regular extension, it’s critical that you only install from the official browser extension stores. Please follow the relevant link below to install the Legacy Web3 extension in your browser:

* [Chrome, Brave](https://chrome.google.com/webstore/detail/metamask-legacy-web3/dgoegggfhkapjphahmgihfgemkgecdgl)
* [Edge](https://microsoftedge.microsoft.com/addons/detail/metamask-legacy-web3/obkfjbjkiofoponpkmphnpaaadebfloh?hl=en-US)
* [Firefox](https://addons.mozilla.org/en-US/firefox/addon/metamask-legacy-web3/) (Will be published soon)

## Migrating to the New Provider API

### Handling `eth_chainId` Return Values

The `eth_chainId` RPC method now returns correctly formatted values, e.g. `0x1` and `0x2`, instead of _incorrectly_ formatted values, e.g. `0x01` and `0x02`.
MetaMask's implementation of `eth_chainId` used to return 0-padded values for the [default Ethereum chains](./ethereum-provider.html#chain-ids) _except_ Kovan.
If you expect 0-padded chain ID values from `eth_chainId`, make sure to update your code to expect the correct format instead.

For more details on chain IDs and how to handle them, see the [`chainChanged` event](./ethereum-provider.html#chainchanged).

### Handling the Removal of `chainIdChanged`

`chainIdChanged` is a typo of `chainChanged`.
To migrate, simply listen for `chainChanged` instead:

```javascript
// Instead of this:
ethereum.on('chainIdChanged', (chainId) => {
  /* handle the chainId */
});

// Do this:
ethereum.on('chainChanged', (chainId) => {
  /* handle the chainId */
});
```

### Handling the Removal of `isEnabled()` and `isApproved()`

Before the new provider API shipped, we added the `_metamask.isEnabled` and `_metamask.isApproved` methods
to enable web3 sites to check if they have [access to the user's accounts](./rpc-api.html#eth-requestaccounts).
`isEnabled` and `isApproved` functioned identically, except that `isApproved` was `async`.
These methods were arguably never that useful, and they became completely redundant with the introduction of MetaMask's [permission system](./rpc-api.html#permissions).

We recommend that you check for account access in the following ways:

1. You can call the [`wallet_getPermissions` RPC method](./rpc-api.html#wallet-getpermissions) and check for the `eth_accounts` permission.

2. You can call the `eth_accounts` RPC method and the [`ethereum._metamask.isUnlocked()` method](./ethereum-provider.html#ethereum-metamask-isunlocked).

   - MetaMask has to be unlocked before you can access the user's accounts.
     If the array returned by `eth_accounts` is empty, check if MetaMask is locked using `isUnlocked()`.

   - If MetaMask is unlocked and you still aren't receiving any accounts, it's time to request accounts using the [`eth_requestAccounts` RPC method](./rpc-api.html#eth-requestaccounts).

### Handling the Removal of `ethereum.publicConfigStore`

How to handle this change depends on if and how you use the `publicConfigStore`.
We have seen examples of listening for provider state changes the `publicConfigStore` `data` event, and accessing the `publicConfigStore` internal state directly.

We recommend that you search your code and its dependencies for references to `publicConfigStore`.
If you find any references, you should understand what it's being used for, and migrate to [one of the recommended provider APIs](./ethereum-provider.html#using-the-provider) instead.
If you don't find any references, you should not be affected by this change.

Although it is possible that your dependencies use the `publicConfigStore`, we have confirmed that the latest versions of the following common libraries will not be affected by this change:

- `ethers`
- `web3` (web3.js)

### Handling the Removal of `ethereum.autoRefreshOnNetworkChange`

The `ethereum.autoRefreshOnNetworkChange` is a mutable boolean property used to control whether MetaMask reloaded the page on chain/network changes.
However, it only causes the page to be reloaded if the a script access a property on `window.web3`.
Therefore, this property will be removed along with `window.web3`.

Despite this, we still recommend reloading the page on chain changes.
Some convenience libraries, such as [ethers](https://www.npmjs.com/package/ethers), will continue to reload the page by default.
If you don't use such a convenience library, you'll have to reload the page manually.
Please see the [`chainChanged` event](./ethereum-provider.html#chainchanged) for details.
