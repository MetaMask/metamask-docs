# Provider Migration Guide

::: danger Deadline
All of these changes are shipping on **November 16, 2020**.

If your web3 site relies on any of these features, it may break when these changes are made unless you migrate.
:::

As noted in the [Ethereum Provider documentation](./ethereum-provider.html#upcoming-breaking-changes), on **November 16, 2020**, we are shipping breaking changes to our provider API and removing our injected `window.web3`.
This guide describes how to migrate to the new provider API, and how to replace our `window.web3` object.

All replacement APIs are live, and you can migrate at any time.
If you will be affected by the breaking changes, we recommend that you migrate as soon as possible.

You can follow [this GitHub issue](https://github.com/MetaMask/metamask-extension/issues/8077) to be notified of the dates of the breaking changes once we announce them.

## Table of Contents

[[toc]]

## Migrating to the New Provider API

### Handling `eth_chainId` Return Values

Due to a long-standing bug, MetaMask's implementation of the `eth_chainId` RPC method has returned 0-padded values for the [default Ethereum chains](./ethereum-provider.html#chain-ids) _except_ Kovan.
For example, instead of `0x1` and `0x2`, we currently return `0x01` and `0x02`.

For the time being, instead of calling the `eth_chainId` RPC method, you should use the [`ethereum.chainId` property](./ethereum-provider.html#ethereum-chainid) and the [`chainChanged` event](./ethereum-provider.html#chainchanged).

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

Before the new provider API shipped, we added
[`_metamask.isEnabled`](./ethereum-provider.html#ethereum-metamask-isenabled-to-be-removed) and
[`_metamask.isApproved`](./ethereum-provider.html#ethereum-metamask-isapproved-to-be-removed)
to enable web3 sites to check if they have [access to the user's accounts](./rpc-api.html#eth-requestaccounts).
`isEnabled` and `isApproved` are identical, except that `isApproved` is `async`.
These methods were arguably never that useful, but they are completely redundant since the introduction of MetaMask's [permission system](./rpc-api.html#permissions).

We recommend that you check for account access in the following ways:

1. You can call the [`wallet_getPermissions` RPC method](./rpc-api.html#wallet-getpermissions) and check for the `eth_accounts` permission.

2. You can call the `eth_accounts` RPC method and the [`ethereum._metamask.isUnlocked()` function](./ethereum-provider.html#ethereum-metamask-isunlocked).

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

## Replacing `window.web3`

For historical reasons, MetaMask has injected [`web3@0.20.7`](https://github.com/ethereum/web3.js/tree/0.20.7) into all web pages.
This version of `web3` is deprecated, [has known security issues](https://github.com/ethereum/web3.js/issues/3065), and is no longer maintained by the [web3.js](https://github.com/ethereum/web3.js/) team, so the only way we can continue providing a secure experience to our developers is by removing this library.

If your website relies on our `window.web3` object, your Ethereum-related functionality will break when we stop injecting `window.web3`.
Continue reading to learn more about the migration options. Some are as simple as a one-line change.

::: tip
Regardless of how you choose to migrate, you will probably want to read the `web3@0.20.7` documentation, which you can find [here](https://github.com/ethereum/web3.js/blob/0.20.7/DOCUMENTATION.md).
:::

### Using `window.ethereum` Directly

For many web3 sites, the API provided by `window.ethereum` is more than sufficient.
Much of the `web3` API simply maps to RPC methods, all of which can be requested using [`ethereum.request()`](./ethereum-provider.html#ethereum-request-args).
For example, here are a couple of actions performed using first `window.web3`, and then their equivalents using `window.ethereum`.

<<< @/docs/snippets/web3ToProvider.js

### Using an Updated Convenience library

If you decide that you need a convenience library, you will have to convert your usage of `window.web3` to an updated convenience library.
We recommend one of the following options.

- [`ethers`](https://npmjs.com/package/ethers)
  - [Documentation](https://docs.ethers.io/)
- [`web3`](https://npmjs.com/package/web3)
  - [Documentation](https://web3js.readthedocs.io)

### Using `@metamask/legacy-web3`

::: warning
We strongly recommend that you consider one of the other two migration paths before resorting to this one.
It is not future-proof, and it is not guaranteed to work.
:::

Finally, if you just want your web3 site to continue to work, we created [`@metamask/legacy-web3`](https://npmjs.com/package/@metamask/legacy-web3).
This package is a drop-in replacement for our `window.web3` that you can add to your web3 site even before MetaMask stops injecting `window.web3`.

`@metamask/legacy-web3` should work exactly like our injected `window.web3`, but _we cannot guarantee that it works perfectly_.
We will not fix any future incompatibilities between `web3@0.20.7` and MetaMask itself, nor will we fix any bugs in `web3@0.20.7` itself.

For installation and usage instructions, please see [npm](https://npmjs.com/package/@metamask/legacy-web3).
