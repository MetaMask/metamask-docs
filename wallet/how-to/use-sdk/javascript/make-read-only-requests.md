---
sidebar_position: 8
description: Use Infura and custom nodes to make direct, read-only requests in your JavaScript dapp.
tags:
  - JavaScript SDK
---

# Make read-only requests

You can use the [Infura API](https://docs.infura.io/) from your dapp with
[MetaMask SDK](../../../concepts/sdk/index.md) installed to make direct, read-only JSON-RPC requests.

Direct, read-only JSON-RPC requests are blockchain requests that do not require user wallet interaction.
Your dapp can directly call most [JSON-RPC API methods](/wallet/reference/json-rpc-api), bypassing
user wallet authentication for read-only operations.

:::note
Your dapp cannot directly call the following RPC methods, which require user wallet interaction:

- `eth_requestAccounts`
- `eth_sendTransaction`
- `eth_signTransaction`
- `eth_sign`
- `eth_accounts`
- `personal_sign`
- `eth_signTypedData_v4`
- `wallet_watchAsset`
- `wallet_addEthereumChain`
- `wallet_switchEthereumChain`
  :::

Configure your dapp to make read-only requests using the [Infura API](#use-the-infura-api),
[custom nodes](#use-custom-nodes), or [both](#use-the-infura-api-and-custom-nodes).

## Prerequisites

- An Infura API key.
  Create one by following the first two steps in the
  [Infura getting started guide](https://docs.infura.io/getting-started).

- [An allowlist configured for your API key.](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/use-an-allowlist)

  :::caution important
  Your API key, when used with the SDK, is vulnerable to exposure.
  If someone inspects your dapp's code, they can potentially retrieve your API key and submit
  requests to Infura, impersonating your account.

  Use [allowlists](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/use-an-allowlist)
  to protect against this vulnerability.
  You can restrict interactions with your API key to specific addresses, origins, user agents, and request methods.
  We recommend using all allowlist options to maximize the security of your API key and dapp.
  :::

- [MetaMask SDK set up](index.md) in your JavaScript dapp.

## Use the Infura API

To use the Infura API to make read-only requests, specify your Infura API key using the
[`infuraAPIKey`](../../../reference/sdk-js-options.md#infuraapikey) option when instantiating the SDK
in your dapp.

```javascript
infuraAPIKey: "YOUR-API-KEY"
```

## Use custom nodes

To use your own node (for example, with [Hardhat](https://hardhat.org/)) to make read-only requests,
specify your node's chain ID and RPC URL using the
[`readonlyRPCMap`](../../../reference/sdk-js-options.md#readonlyrpcmap) option when instantiating the
SDK in your dapp.

```javascript
readonlyRPCMap: {
  "0x539": "http://localhost:8545",
}
```

In this example, chain ID `0x539` maps to the custom node's RPC URL.

## Use the Infura API and custom nodes

You can use both the Infura API and custom nodes to make read-only requests by specifying both the
[`infuraAPIKey`](../../../reference/sdk-js-options.md#infuraapikey) and
[`readonlyRPCMap`](../../../reference/sdk-js-options.md#readonlyrpcmap) options when instantiating the
SDK in your dapp.

```javascript
sdkOptions={{
  infuraAPIKey: "YOUR-API-KEY",
  readonlyRPCMap: {
    "0x539": "http://localhost:8545",
  },
  // Other options.
}}
```

`infuraAPIKey` provides access to various networks supported by Infura, and `readonlyRPCMap`
provides access to custom nodes.
The `readonlyRPCMap` values override Infura networks in case of a conflict.

Refer to the SDK's
[default RPC URLs map](https://github.com/MetaMask/metamask-sdk/blob/dd9a3aaa1b5afa208cdb0d0768916d15b8638b25/packages/sdk/src/services/MetaMaskSDK/InitializerManager/setupInfuraProvider.ts#L12)
to see how Infura networks are configured by default.
By defining your own `readonlyRPCMap`, you can override these defaults or add support for other networks.

## Example

The following is an example of using both the Infura API and custom nodes with the SDK:

```javascript
sdkOptions={{
  infuraAPIKey: "YOUR-API-KEY",
  readonlyRPCMap: {
    // Custom node.
    "0x539": "http://localhost:8545",
    // Override Infura Mainnet.
    "0x1": "https://mainnet.infura.io/v3/YOUR-API-KEY",
  },
  defaultReadOnlyChainId: "0x1",
  // Other options.
}
```

In this example, read-only requests to Mainnet (chain ID `0x1`) use the Infura API, while read-only
requests to the local testnet (chain ID `0x539`) use the custom node.
[`defaultReadOnlyChainId`](../../../reference/sdk-js-options.md#defaultreadonlychainid) enables making
read-only requests before the user connects to MetaMask, and specifies to make those requests to Mainnet.
