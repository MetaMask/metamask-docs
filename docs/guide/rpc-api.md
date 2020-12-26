# RPC API

MetaMask uses the [`ethereum.request(args)` method](./ethereum-provider.html#ethereum-request-args) to wrap an RPC API.

The API is based on an interface exposed by all Ethereum clients, along with a growing number of methods that may or may not be supported by other wallets.

::: tip Tip
All RPC method requests can return errors.
Make sure to handle errors for every call to `ethereum.request(args)`.
:::

## Table of Contents

[[toc]]

## Ethereum JSON-RPC Methods

For the Ethereum JSON-RPC API, please see [the Ethereum wiki](https://eth.wiki/json-rpc/API#json-rpc-methods).

Important methods from this API include:

- [`eth_accounts`](https://eth.wiki/json-rpc/API#eth_accounts)
- [`eth_call`](https://eth.wiki/json-rpc/API#eth_call)
- [`eth_getBalance`](https://eth.wiki/json-rpc/API#eth_getBalance)
- [`eth_sendTransaction`](https://eth.wiki/json-rpc/API#eth_sendTransaction)
- [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign)

## Permissions

MetaMask introduced Web3 Wallet Permissions via [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255).
In this permissions system, each RPC method is either _restricted_ or _open_.
If a method is restricted, an external _domain_ (like a web3 site) must have the corresponding permission in order to call it.
Open methods, meanwhile, do not require permissions to call, but may require confirmation by the user in order to succeed (e.g. `eth_sendTransaction`).

Currently, the only permission is `eth_accounts`, which allows you to access the user's Ethereum address(es).
More permissions will be added in the future.

Under the hood, permissions are plain, JSON-compatible objects, with a number of fields that are mostly used internally by MetaMask.
The following interface lists the fields that may be of interest to consumers:

```typescript
interface Web3WalletPermission {
  // The name of the method corresponding to the permission
  parentCapability: string;

  // The date the permission was granted, in UNIX epoch time
  date?: number;
}
```

The permissions system is implemented in the [`rpc-cap` package](https://github.com/MetaMask/rpc-cap).
If you're interested in learning more about the theory behind this _capability_-inspired permissions system, we encourage you to take a look at [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255).

### eth_requestAccounts

::: tip Tip EIP-1102
This method is specified by [EIP-1102](https://eips.ethereum.org/EIPS/eip-1102).
It is equivalent to the deprecated [`ethereum.enable()`](./ethereum-provider.html#ethereum-enable) provider API method.

Under the hood, it calls [`wallet_requestPermissions`](#wallet-requestpermissions) for the `eth_accounts` permission.
Since `eth_accounts` is currently the only permission, this method is all you need for now.
:::

#### Returns

`string[]` - An array of a single, hexadecimal Ethereum address string.

#### Description

Requests that the user provides an Ethereum address to be identified by.
Returns a Promise that resolves to an array of a single Ethereum address string.
If the user denies the request, the Promise will reject with a `4001` error.

The request causes a MetaMask popup to appear.
You should only request the user's accounts in response to user action, such as a button click.

If you can't retrieve the user's account(s), you should encourage the user to initiate an account request.

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

### wallet_requestPermissions

::: tip Tip Platform Availability
This RPC method is not yet available in MetaMask Mobile.
:::

#### Parameters

- `Array`

  0. `RequestedPermissions` - The requested permissions.

```typescript
interface RequestedPermissions {
  [methodName: string]: {}; // an empty object, for future extensibility
}
```

#### Returns

`Web3WalletPermission[]` - An array of the caller's permissions.

#### Description

Requests the given permissions from the user.
Returns a Promise that resolves to a non-empty array of `Web3WalletPermission` objects, corresponding to the caller's current permissions.
If the user denies the request, the Promise will reject with a `4001` error.

The request causes a MetaMask popup to appear.
You should only request permissions in response to user action, such as a button click.

#### Example

```javascript
document.getElementById('requestPermissionsButton', requestPermissions);

function requestPermissions() {
  ethereum
    .request({
      method: 'eth_requestAccounts',
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

### wallet_getPermissions

::: tip Tip Platform Availability
This RPC method is not yet available in MetaMask Mobile.
:::

#### Returns

`Web3WalletPermission[]` - An array of the caller's permissions.

#### Description

Gets the caller's current permissions.
Returns a Promise that resolves to an array of `Web3WalletPermission` objects.
If the caller has no permissions, the array will be empty.

## Other RPC Methods

### wallet_registerOnboarding

::: tip Tip
As an API consumer, you are unlikely to have to call this method yourself.
Please see the [Onboarding Library documentation](/onboarding-library.html) for more information.
:::

#### Returns

`boolean` - `true` if the request was successful, `false` otherwise.

#### Description

Registers the requesting site with MetaMask as the initiator of onboarding.
Returns a Promise that resolves to `true`, or rejects if there's an error.

This method is intended to be called after MetaMask has been installed, but before the MetaMask onboarding has completed.
You can use this method to inform MetaMask that you were the one that suggested installing MetaMask.
This lets MetaMask redirect the user back to your site after onboarding as completed.

Instead of calling this method directly, you should use the [`@metamask/onboarding` library](https://github.com/MetaMask/metamask-onboarding).

### wallet_watchAsset

::: tip Tip EIP-747
This method is specified by [EIP-747](https://eips.ethereum.org/EIPS/eip-747).
:::

#### Parameters

- `WatchAssetParams` - The metadata of the asset to watch.

<<< @/docs/snippets/WatchAssetParams.ts

#### Returns

`boolean` - `true` if the the token was added, `false` otherwise.

#### Description

Requests that the user tracks the token in MetaMask.
Returns a `boolean` indicating if the token was successfully added.

Most Ethereum wallets support some set of tokens, usually from a centrally curated registry of tokens.
`wallet_watchAsset` enables web3 application developers to ask their users to track tokens in their wallets, at runtime.
Once added, the token is indistinguishable from those added via legacy methods, such as a centralized registry.

#### Example

```javascript
ethereum.request({
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
});
  .then((success) => {
    if (success) {
      console.log('FOO successfully added to wallet!')
    } else {
      throw new Error('Something went wrong.')
    }
  })
  .catch(console.error)
```

### eth_getEncryptionPublicKey

::: tip Tip Platform Availability
This RPC method is not yet available in MetaMask Mobile.
:::

#### Parameters

- `Array`

  0. `string` - The address of the Ethereum account whose encryption key should be retrieved.

#### Returns

`string` - The public encryption key of the specified Ethereum account.

#### Description

Requests that the user shares their public encryption key.
Returns a Promise that resolve to the public encryption key, or rejects if the user denied the request.

The public key is computed from entropy associated with the specified user account, using the [`nacl`](https://github.com/dchest/tweetnacl-js) implementation of the `X25519_XSalsa20_Poly1305` algorithm.

#### Example

```javascript
let encryptionPublicKey;

ethereum
  .request({
    method: 'eth_getEncryptionPublicKey',
    params: [accounts[0]], // you must have access to the specified account
  })
  .then((result) => {
    encryptionPublicKey = result;
  })
  .catch((error) => {
    if (error.code === 4001) {
      // EIP-1193 userRejectedRequest error
      console.log('We can encrypt anything without the key.');
    } else {
      console.error(error);
    }
  });
```

#### Encrypting

The point of the encryption key is of course to encrypt things.
Here's an example of how to encrypt a message using [`eth-sig-util`](https://github.com/MetaMask/eth-sig-util):

```javascript
const ethUtil = require('ethereumjs-util');

const encryptedMessage = ethUtil.bufferToHex(
  Buffer.from(
    JSON.stringify(
      sigUtil.encrypt(
        encryptionPublicKey,
        { data: 'Hello world!' },
        'x25519-xsalsa20-poly1305'
      )
    ),
    'utf8'
  )
);
```

### eth_decrypt

::: tip Tip Platform Availability
This RPC method is not yet available in MetaMask Mobile.
:::

#### Parameters

- `Array`

  0. `string` - An encrypted message.
  1. `string` - The address of the Ethereum account that can decrypt the message.

#### Returns

`string` - The decrypted message.

#### Description

Requests that MetaMask decrypts the given encrypted message.
The message must have been encrypted using the public encryption key of the given Ethereum address.
Returns a Promise that resolves to the decrypted message, or rejects if the decryption attempt fails.

See [`eth_getEncryptionPublicKey`](#eth-getencryptionpublickey) for more information.

#### Example

```javascript
ethereum
  .request({
    method: 'eth_decrypt',
    params: [encryptedMessage, accounts[0]],
  })
  .then((decryptedMessage) =>
    console.log('The decrypted message is:', decryptedMessage)
  )
  .catch((error) => console.log(error.message));
```

## Mobile Specific RPC Methods

### wallet_scanQRCode

#### Parameters

- `Array`

  0. `string` - (optional) A regular expression for matching arbitrary QR code strings

#### Returns

`string` - The string corresponding to the scanned QR code.

#### Description

Requests that the user scans a QR code using their device camera.
Returns a Promise that resolves to a string, matching either:

1. The regex parameter, if provided
2. An ethereum address, if no regex parameter was provided

If neither condition is met, the Promise will reject with an error.

MetaMask previously introduced this feature per the proposed [EIP-945](https://github.com/ethereum/EIPs/issues/945).
The functionality was temporarily removed before being reintroduced as this RPC method.

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
