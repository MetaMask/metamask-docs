---
description: Use the Multichain API.
toc_max_heading_level: 4
sidebar_custom_props:
  flask_only: true
---

# Interact with multiple networks

:::flaskOnly
:::

You can use the Multichain API to interact with multiple blockchain networks in MetaMask simultaneously.
The API allows you to target specific chains as part of each method call, eliminating the need to
detect and switch networks before executing signatures and transactions.

:::note See also
- [About the Multichain API](../../concepts/multichain-api.md)
- [Multichain API reference](../../reference/multichain-api.md)
:::

## Prerequisites

[Install MetaMask Flask.](/snaps/get-started/install-flask)

## Steps

### 1. Set up your project

Establish a connection to MetaMask Flask and set up basic message handling using the
[`wallet_notify`](../../reference/multichain-api.md#wallet_notify) event:

```javascript
// Initialize the connection to Flask.
const EXTENSION_ID = "ljfoeinjpaedjfecbmggjgodbgkmjkjk"; // Flask extension ID
const extensionPort = chrome.runtime.connect(EXTENSION_ID)

// Set up message listener for events.
extensionPort.onMessage.addListener((msg) => {
  // Format wallet_notify events to be able to read them later.
  if (msg.data.method === "wallet_notify") {
    console.log("wallet_notify:", {
      scope: msg.data.params.scope,
      method: msg.data.params.notification.method,
      subscription: msg.data.params.notification.params.subscription,
      number: msg.data.params.notification.params.result.number
    })
    return;
  }
  console.log(msg.data)
})
```


### 2. Manage sessions

To interact with multiple networks simultaneously, you'll create and manage
[CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) multichain sessions
with MetaMask.

#### 2.1. Check existing sessions

Before creating a new session, check if one already exists using the
[`wallet_getSession`](../../reference/multichain-api.md#wallet_getsession) method.
For example:

```javascript
extensionPort.postMessage({
  type: "caip-x",
  data: {
    jsonrpc: "2.0",
      method: "wallet_getSession",
      params: {}
  }
});
```

If the result returns an empty `sessionScopes` parameter, then a multichain session is not active
and you must create a new session.

#### 2.2. Create a new session

Create a new session using the [`wallet_createSession`](../../reference/multichain-api.md#wallet_createsession) method.
Specify which chains and methods your dapp needs access to, using the `optionalScopes` parameter.
For example:

```javascript
extensionPort.postMessage({
  type: "caip-x",
  data: {
    jsonrpc: "2.0",
    method: "wallet_createSession",
    params: {
      optionalScopes: {
        "wallet:eip155": { // General Ethereum wallet functions
          methods: ["wallet_addEthereumChain"],
          notifications: [],
          accounts: []
        },
        "eip155:1": { // Ethereum Mainnet
          methods: [
            "personal_sign",
            "eth_blockNumber",
            "eth_gasPrice",
            "eth_getBalance",
            "eth_getTransactionCount",
            "eth_sendTransaction",
            "eth_subscribe"
          ],
          notifications: ["eth_subscription"],
          accounts: []
        },
        "eip155:59141": { // Linea Sepolia
          methods: [
            "personal_sign",
            "eth_blockNumber",
            "eth_gasPrice",
            "eth_getBalance",
            "eth_getTransactionCount",
            "eth_sendTransaction", 
            "eth_subscribe"
          ],
          notifications: ["eth_subscription"],
          accounts: []
        }
      }
    }
  }
});
```

In `optionalScopes`:

- Request access to networks that your dapp intends to interact with.
  If a requested network is not configured by the MetaMask user, you might need to
  [add the network](add-network.md).
- For each network, request access to [Wallet API methods](../../reference/json-rpc-methods/index.md)
  that your dapp expects to call at any time.
  The methods listed in the `sessionScope` of each Multichain API response indicate which wallet
  capabilities your dapp can use during the session.

#### 2.3. Check for session changes

To ensure your dapp responds appropriately to changes in the wallet session, such as network or
account updates, check for session changes using the
[`wallet_sessionChanged`](../../reference/multichain-api.md#wallet_sessionchanged) event.
Based on the event data, you can determine whether your dapp needs to request additional permissions
using [`wallet_createSession`](../../reference/multichain-api.md#wallet_createsession).

```javascript
extensionPort.onMessage.addListener((msg) => {
  // Check for wallet_sessionChanged events.
  if (msg.data.method === "wallet_sessionChanged") {
    // Update permissions if required.
  }
});
```

### 3. Invoke Wallet API methods

You can invoke a subset of the [Wallet JSON-RPC API methods](../../reference/json-rpc-methods/index.md)
on a specified chain using the [`wallet_invokeMethod`](../../reference/multichain-api.md#wallet_invokemethod)
Multichain API method.
The following are example Wallet API functionalities that are compatible with the Multichain API.

#### 3.1. Sign in with Ethereum

You can implement Sign-In with Ethereum (SIWE) by invoking
[`personal_sign`](/wallet/reference/json-rpc-methods/personal_sign).
For example:

```javascript
// Specify an account that the signature will be requested for.
const address = "0xAddress";
const message = `Sign-in request for ${address} at ${new Date().toLocaleString()}`;

// Invoke the personal_sign Wallet API method.
const sign = await extensionPort.postMessage({
  type: "caip-x",
  data: {
    "jsonrpc": "2.0",
    method: "wallet_invokeMethod",
    params: {
      scope: "eip155:1",
      request: {
        method: "personal_sign",
        params: [message, address],
      }
    }
  }
})
```

#### 3.2. Check balances

You can read gas token balances by invoking
[`eth_getBalance`](/wallet/reference/json-rpc-methods/personal_sign).
For example:

```javascript
extensionPort.postMessage({
  type: "caip-x",
  data: {
    jsonrpc: "2.0",
    method: "wallet_invokeMethod",
    params: {
      scope: "eip155:1",
      request: {
        method: "eth_getBalance",
        params: ["0xAddress", "latest"],
      }
    }
  }
});
```

#### 3.3. Send transactions

You can send transactions on a specific network, by invoking
[`eth_sendTransaction`](/wallet/reference/json-rpc-methods/eth_sendtransaction).
For example:

```javascript
return extensionPort.postMessage({
  type: "caip-x",
  data: {
    jsonrpc: "2.0",
    method: "wallet_invokeMethod",
    params: {
      // Specify a chain ID where the user has sufficient gas.
      scope: "eip155:1",
      request: {
        method: "eth_sendTransaction",
        params: [{
          from: "0xFromAccount",
          to: "0xToAccount",
          value: "0x0",
          gasLimit: "0x5028",
          maxPriorityFeePerGas: "0x3b9aca00",
          maxFeePerGas: "0x2540be400",
        }]
      }
    }
  }
});
```
