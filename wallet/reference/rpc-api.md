---
description: MetaMask Ethereum JSON-RPC API reference
sidebar_position: 4
toc_max_heading_level: 2
---

# JSON-RPC API

MetaMask uses the [`window.ethereum.request(args)`](provider-api.md#windowethereumrequestargs)
provider method to wrap a [JSON-RPC API](../concepts/apis.md#json-rpc-api).
The API contains standard Ethereum JSON-RPC API methods and MetaMask-specific methods.

:::tip MetaMask API playground
The RPC methods are documented in the interactive
[MetaMask JSON-RPC API Playground](/wallet/reference/eth_subscribe).
:::

For more information on the standard Ethereum RPC methods, see the
[Ethereum wiki](https://eth.wiki/json-rpc/API#json-rpc-methods).

The following are some MetaMask-specific [unrestricted methods](../concepts/apis.md#unrestricted-methods).
For the full list of MetaMask JSON-RPC API methods, see the
[API playground](/wallet/reference/eth_subscribe).

## eth_requestAccounts

Requests the user to provide their Ethereum address.
Use this method to [access a user's accounts](../how-to/connect/access-accounts.md).

This method is specified by [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).

:::info
Internally, this method calls [`wallet_requestPermissions`](#wallet_requestpermissions) for
permission to call [`eth_accounts`](/wallet/reference/eth_accounts).
:::

### Returns

If the user accepts the request, this method returns an array of a single, hexadecimal Ethereum
address string.
If they reject the request, this method rejects with a `4001` error.

### Example

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

## wallet_getPermissions

Gets the caller's current [permissions](#restricted-methods).

:::note
This method is not yet available on MetaMask Mobile.
:::

### Returns

An array of the caller's permission objects.
If the caller has no permissions, the array is empty.

## wallet_requestPermissions

Requests [permissions](#restricted-methods) from the user.

The request causes a MetaMask popup to appear.
You should only request permissions in response to a direct user action, such as a button click.

:::note
This method is not yet available on MetaMask Mobile.
:::

### Parameters

An array containing the requested permission objects.

### Returns

An array of the caller's permission objects.
If the user denies the request, a `4001` error is returned.

### Example

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

## wallet_addEthereumChain

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
  [`eth_chainId`](/wallet/reference/eth_chainId) is called.
- The chain ID corresponds to any default MetaMask chains.

This method is specified by [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085).

### Parameters

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

### Returns

`null` if the request was successful, and an error otherwise.

### Example

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

## wallet_switchEthereumChain

Creates a confirmation asking the user to switch to the chain with the specified chain ID.

You should only call this method in response to a direct user action, such as a button click.

MetaMask rejects the request if any of the following occurs:

- The chain ID is malformed.
- The chain with the specified chain ID hasn't been added to MetaMask.

This method is specified by [EIP-3326](https://ethereum-magicians.org/t/eip-3326-wallet-switchethereumchain).

### Parameters

An array containing an object containing `chainId`, the chain ID as a `0x`-prefixed hexadecimal string.

### Returns

`null` if the request was successful, and an error otherwise.

If the error code is `4902`, the requested chain hasn't been added by MetaMask, and you must request
to add it using [`wallet_addEthereumChain`](#wallet_addethereumchain).

### Example

See the [`wallet_addEthereumChain`](#wallet_addethereumchain) example.

## wallet_registerOnboarding

Registers the requesting site with MetaMask as the initiator of onboarding, enabling MetaMask to
redirect the user back to the site after onboarding has completed.

This method is intended to be called after MetaMask has been installed, but before the MetaMask
onboarding has completed.

Instead of calling this method directly, you should
[use the MetaMask onboarding library](../how-to/onboard-users.md).

### Returns

`true` if the request was successful, `false` otherwise.

## wallet_watchAsset

Requests that the user track the specified ERC-20 token or NFT(s) in their MetaMask wallet.
Use this method to [display tokens](../how-to/display/tokens.md) in MetaMask.

:::caution Experimental feature
Support for NFTs (ERC-721 and ERC-1155 tokens) is experimental and currently only available on the
extension (not on mobile).
See [MIP-1](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-1.md)
and the [MIP proposal lifecycle](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/PROCESS-GUIDE.md#proposal-lifecycle)
for more information.
:::

:::tip Displaying NFTs
With `wallet_watchAsset`, you can prompt users to add their NFTs even when they have NFT
autodetection disabled.
Moreover, NFT autodetection only detects NFTs on Ethereum Mainnet.
With `wallet_watchAsset`, users can add NFTs from other networks.
:::

This method is specified by [EIP-747](https://eips.ethereum.org/EIPS/eip-747).

### Parameters

An object containing the following metadata of the token to watch:

- `type` - Supports ERC-20, ERC-721, and ERC-1155 tokens.
  Support for ERC-721 and ERC-1155 tokens is experimental and currently only available on the
  extension (not on mobile).
- `options` - An object containing:
  - `address` - The address of the token contract.
  - `symbol` - The symbol of the token, up to 11 characters (optional for ERC-20 tokens).
  - `decimals` - The number of token decimals (optional for ERC-20 tokens).
  - `image` - A URL string of the token logo (optional for ERC-20 tokens).
  - `tokenId` - The unique identifier of the NFT (required for ERC-721 and ERC-1155 tokens).

### Returns

`true` if the token was added, `false` otherwise.

### Example

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

## wallet_scanQRCode

Requests that the user scan a QR code using their device camera.

MetaMask previously introduced this feature in [EIP-945](https://github.com/ethereum/EIPs/issues/945).
The functionality was temporarily removed before being re-introduced as this RPC method.

:::note
This method is only available on MetaMask Mobile.
:::

### Parameters

An array containing an optional regular expression (regex) string for matching arbitrary QR code strings.

### Returns

A string corresponding to the scanned QR code.
If a regex string is provided, the resulting string matches it.
If no regex string is provided, the resulting string matches an Ethereum address.
If neither condition is met, the method returns an error.

### Example

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
