---
description: MetaMask Ethereum JSON-RPC API reference
---

# JSON-RPC API

MetaMask uses the [`window.ethereum.request(args)`](provider-api.md#windowethereumrequestargs)
provider method to wrap a JSON-RPC API.
The API contains standard Ethereum JSON-RPC API methods and MetaMask-specific methods.

:::tip MetaMask API playground
The RPC methods are documented in the interactive
[MetaMask JSON-RPC API Playground](https://metamask.github.io/api-playground/api-documentation/).
:::

Methods in the API playground may have the following tags:

- **MetaMask** - These methods behave in ways specific to MetaMask, and may or may not be supported
  by other wallets.
  Some of these methods are documented in more detail on this page.
- **Restricted** - These methods are [restricted](#restricted-methods), which require requesting
  permission using [`wallet_requestPermissions`](#wallet_requestpermissions).
- **Mobile** - These methods are only available on MetaMask Mobile.

For more information on the standard Ethereum RPC methods, see the
[Ethereum wiki](https://eth.wiki/json-rpc/API#json-rpc-methods).

:::note
All RPC method requests can return errors.
Make sure to handle errors for every call to
[`window.ethereum.request(args)`](provider-api.md#windowethereumrequestargs).
:::

## Restricted methods

MetaMask introduced web3 wallet permissions in [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255).
In this permissions system, each RPC method is restricted or unrestricted.
If a method is restricted, a dapp must request permission to call it using
[`wallet_requestPermssions`](#wallet_requestpermissions).
Under the hood, permissions are plain, JSON-compatible objects, with fields that are mostly used
internally by MetaMask.

Outside of [Snaps restricted methods](../../snaps/reference/rpc-api#restricted-methods), the only
restricted method is
[`eth_accounts`](https://metamask.github.io/api-playground/api-documentation/#eth_accounts), which
allows you to access the user's Ethereum accounts.
More restricted methods will be added in the future.

## Unrestricted methods

Unrestricted methods have no corresponding permission, but they might still rely on permissions to
succeed (for example, the signing methods require calling the restricted
[`eth_accounts`](https://metamask.github.io/api-playground/api-documentation/#eth_accounts) method),
or they might require confirmation by the user (for example,
[`wallet_addEthereumChain`](#wallet_addethereumchain)).

The following are some MetaMask-specific unrestricted methods.
For the full list of MetaMask JSON-RPC API methods, see the
[API playground](https://metamask.github.io/api-playground/api-documentation/).

### eth_requestAccounts

Requests that the user provide an Ethereum address to be identified by.
Use this method to [access a user's accounts](../get-started/access-accounts.md).

This method is specified by [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).

:::info
Internally, this method calls [`wallet_requestPermissions`](#wallet_requestpermissions) for
permission to call [`eth_accounts`](https://metamask.github.io/api-playground/api-documentation/#eth_accounts).
:::

#### Returns

If the user accepts the request, this method returns an array of a single, hexadecimal Ethereum
address string.
If they reject the request, this method rejects with a `4001` error.

#### Example

```javascript
document.getElementById('connectButton', connect);

function connect() {
  ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    });
}
```

### wallet_getPermissions

Gets the caller's current [permissions](#restricted-methods).

:::note
This method is not yet available on MetaMask Mobile.
:::

#### Returns

An array of the caller's permission objects.
If the caller has no permissions, the array is empty.

### wallet_requestPermissions

Requests [permissions](#restricted-methods) from the user.

The request causes a MetaMask popup to appear.
You should only request permissions in response to a direct user action, such as a button click.

:::note
This method is not yet available on MetaMask Mobile.
:::

#### Parameters

An array containing the requested permission objects.

#### Returns

An array of the caller's permission objects.
If the user denies the request, a `4001` error is returned.

#### Example

```javascript
document.getElementById('requestPermissionsButton', requestPermissions);

function requestPermissions() {
  ethereum
    .request({
      method: 'wallet_requestPermissions',
      params: [{ eth_accounts: {} }],
    })
    .then((permissions) => {
      const accountsPermission = permissions.find(
        (permission) => permission.parentCapability === 'eth_accounts'
      );
      if (accountsPermission) {
        console.log('eth_accounts permission successfully requested!');
      }
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Permissions needed to continue.');
      } else {
        console.error(error);
      }
    });
}
```

### wallet_addEthereumChain

Creates a confirmation asking the user to add the specified chain to MetaMask.
The user may choose to switch to the chain once it has been added.

You should only call this method in response to a direct user action, such as a button click.

MetaMask validates the parameters for this method, and rejects the request if any parameter is
incorrectly formatted.
MetaMask also rejects the request if any of the following occurs:

- The RPC endpoint doesn't respond to RPC calls.
  :::note
  Calls are made from the extension's background page, not the foreground page.
  If you use an origin allowlist, they're blocked.
  :::
- The RPC endpoint returns a different chain ID when
  [`eth_chainId`](https://metamask.github.io/api-playground/api-documentation/#eth_chainId) is called.
- The chain ID corresponds to any default MetaMask chains.

This method is specified by [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085).

#### Parameters

An array containing an object containing the following metadata about the chain to be added to MetaMask:

- `chainId` - The chain ID as a `0x`-prefixed hexadecimal string.
- `chainName` - The name of the chain.
- `nativeCurrency` - An object containing:
  - `name` - The name of the currency.
  - `symbol` - The symbol of the currency, as a 2-6 character string.
  - `decimals` - The number of decimals of the currency.
    Currently only accepts `18`.
- `rpcUrls` - An array of RPC URL strings.
  At least one item is required, and only the first item is used.
- `blockExplorerUrls` (optional) - An array of block explorer URL strings.
  At least one item is required, and only the first item is used.
- `iconUrls` (optional, currently ignored) - An array of icon URL strings.

#### Returns

`null` if the request was successful, and an error otherwise.

#### Example

We recommend using this method with [`wallet_addEthereumChain`](#wallet_addethereumchain):

```javascript
try {
  await ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0xf00' }],
  });
} catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
    try {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0xf00',
            chainName: '...',
            rpcUrls: ['https://...'] /* ... */,
          },
        ],
      });
    } catch (addError) {
      // handle "add" error
    }
  }
  // handle other "switch" errors
}
```

### wallet_switchEthereumChain

Creates a confirmation asking the user to switch to the chain with the specified chain ID.

You should only call this method in response to a direct user action, such as a button click.

MetaMask rejects the request if any of the following occurs:

- The chain ID is malformed.
- The chain with the specified chain ID hasn't been added to MetaMask.

This method is specified by [EIP-3326](https://ethereum-magicians.org/t/eip-3326-wallet-switchethereumchain).

#### Parameters

An array containing an object containing `chainId`, the chain ID as a `0x`-prefixed hexadecimal string.

#### Returns

`null` if the request was successful, and an error otherwise.

If the error code is `4902`, the requested chain hasn't been added by MetaMask, and you must request
to add it using [`wallet_addEthereumChain`](#wallet_addethereumchain).

#### Example

See the [`wallet_addEthereumChain`](#wallet_addethereumchain) example.

### wallet_registerOnboarding

Registers the requesting site with MetaMask as the initiator of onboarding, enabling MetaMask to
redirect the user back to the site after onboarding has completed.

This method is intended to be called after MetaMask has been installed, but before the MetaMask
onboarding has completed.

Instead of calling this method directly, you should
[use the MetaMask onboarding library](../how-to/use-onboarding-library.md).

#### Returns

`true` if the request was successful, `false` otherwise.

### wallet_watchAsset

Requests that the user track the specified token in MetaMask.

Most Ethereum wallets support some set of tokens, usually from a centrally curated registry of tokens.
This method enables dapp developers to ask their users to track tokens in their wallets, at runtime.
Once added, the token is indistinguishable from those added using legacy methods, such as a
centralized registry.

This method is specified by [EIP-747](https://eips.ethereum.org/EIPS/eip-747).

#### Parameters

An object containing the following metadata of the token to watch:

- `type` - Currently only supports `ERC20`.
- `options` - An object containing:
  - `address` - The address of the token contract.
  - `symbol` - The symbol of the token, up to 11 characters.
  - `decimals` - The number of token decimals.
  - `image` - A URL string of the token logo.

#### Returns

`true` if the token was added, `false` otherwise.

#### Example

```javascript
ethereum
  .request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
        symbol: 'FOO',
        decimals: 18,
        image: 'https://foo.io/token-image.svg',
      },
    },
  })
  .then((success) => {
    if (success) {
      console.log('FOO successfully added to wallet!');
    } else {
      throw new Error('Something went wrong.');
    }
  })
  .catch(console.error);
```

### wallet_scanQRCode

Requests that the user scan a QR code using their device camera.

MetaMask previously introduced this feature in [EIP-945](https://github.com/ethereum/EIPs/issues/945).
The functionality was temporarily removed before being re-introduced as this RPC method.

:::note
This method is only available on MetaMask Mobile.
:::

#### Parameters

An array containing an optional regular expression (regex) string for matching arbitrary QR code strings.

#### Returns

A string corresponding to the scanned QR code.
If a regex string is provided, the resulting string matches it.
If no regex string is provided, the resulting string matches an Ethereum address.
If neither condition is met, the method returns an error.

#### Example

```javascript
ethereum
  .request({
    method: 'wallet_scanQRCode',
    // The regex string must be valid input to the RegExp constructor, if provided
    params: ['\\D'],
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```
