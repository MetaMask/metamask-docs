---
description: Get started with the MetaMask Flask Multichain API
sidebar_position: 1
---

# Get started with MetaMask Multichain

The [Multichain API](link-to-concepts-doc) allows your dapp to interact with multiple blockchain networks through a single interface.
This includes managing network permissions through sessions, executing network-specific tasks, monitoring wallet and blockchain events, and conducting transactions across different networks.

This guide will help you integrate MetaMask's Multichain API into your dapp development process. 

## Prerequisites

- You have installed [MetaMask Flask](../../../../snaps/get-started/install-flask/)

:::note
Install Flask in a new browser profile or disable existing MetaMask versions.
Do not import production wallets into Flask - use test accounts only.
Running multiple MetaMask instances in the same profile can cause conflicts.
:::

:::warning
We do not recommend importing your "Secret Recovery Phrase" from MetaMask stable to MetaMask Flask. 
Importing accounts with funds into Flask is not advised.
:::

## Use the Multichain API

### 1. Configure you development environment

You'll need to establish a connection to MetaMask Flask and set up basic message handling:

```javascript
// Initialize the connection to Flask.
const FLASK_ID = "<your_id>";
const extensionPort = chrome.runtime.connect(FLASK_ID);

// Set up message listener for various events.
extensionPort.onMessage.addListener((msg) => {
  if (msg.data.method === "wallet_notify") {
    console.log("wallet_notify:", {
      scope: msg.data.params.scope,
      method: msg.data.params.notification.method,
      subscription: msg.data.params.notification.params.subscription,
      number: msg.data.params.notification.params.result.number
    });
    return;
  }
  console.log(msg.data);
});
```

### 2. Managing sessions

Sessions in the Multichain API control what your dapp can do across different networks. There are two key operations:

#### 2.1 Check existing sessions

Before creating a new session, check if one already exists:

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

If the result returns an empty `sessionScopes` parameter, then a multichain session is not active. 
You must initiate a new one by calling `wallet_createSession` with `optionalScopes` specified.

#### 2.2 Create a new session

When creating a session, specify which chains and methods your dapp needs access to:

```javascript
extensionPort.postMessage({
  type: "caip-x",
  data: {
    jsonrpc: "2.0",
    method: "wallet_createSession",
    params: {
      optionalScopes: {
        "wallet:eip155": {
          methods: ["wallet_addEthereumChain"],
          notifications: [],
          accounts: []
        },
        "eip155:1": {
          methods: [
            "personal_sign",
            "eth_blockNumber",
            "eth_getBalance",
            "eth_sendTransaction"
          ],
          notifications: ["eth_subscription"],
          accounts: []
        }
      }
    }
  }
});
```

The `optionalScope` you request should align with the chains your dapp intends to interact with initially. 
If the EVM chain you’ve requested is not configured with an RPC network by the user, you might need to use the `wallet_addEthereumChain` method to add it.

The requested methods should correspond to the methods your dapp expects to call at any time. 
The methods listed in each `sessionScope` of the response indicate which wallet capabilities your dapp can use during the session.

:::note
Request only the chains your dapp needs.
Ensure you specify required methods for each chain.
:::

#### 2.3 Create a new session

To ensure your dapp responds appropriately to changes in the wallet session, such as network or account updates, you can listen for the `wallet_sessionChanged` event. Based on the event data, you can determine whether your dapp needs to request additional permissions:

```javascript
extensionPort.onMessage.addListener((msg) => {
  if (msg.data.method === 'wallet_sessionChanged') {
  }
});
```

### 3. Implement network operations using the Multichain API 

The Multichain API allows your dapp to perform transactions across various networks, automatically managing gas fees and network-specific parameters.
It supports tracking transaction status, addressing unique network requirements, and handling user approvals through MetaMask,
making it easier to manage operations across multiple networks.

#### 3.1. Sign messages

Enable secure authentication and digital signatures across networks in your dapp. 
Use this method to sign arbitrary messages, implement user authentication, and create secure verifiable messages: 

```javascript
const signMessage = async (address, message) => {
  return extensionPort.postMessage({
    type: "caip-x",
    data: {
      jsonrpc: "2.0",
      method: "wallet_invokeMethod",
      params: {
        scope: "eip155:1",
        request: {
          method: "personal_sign",
          params: [message, address]
        }
      }
    }
  });
};
```

#### 3.2. Check balances

Monitor user balances across different networks:

```javascript
const getBalance = async (address, chainId = "eip155:1") => {
  return extensionPort.postMessage({
    type: 'caip-x',
    data: {
      jsonrpc: "2.0",
      method: "wallet_invokeMethod",
      params: {
        scope: chainId,
        request: {
          method: "eth_getBalance",
          params: [address, "latest"]
        }
      }
    }
  });
};
```

#### 3.3. Send transactions

Enable your dapp to send transactions between supported networks while managing gas parameters specific to each network:

```javascript
const sendTransaction = async (params) => {
  return extensionPort.postMessage({
    type: "caip-x",
    data: {
      jsonrpc: "2.0",
      method: "wallet_invokeMethod",
      params: {
        scope: "eip155:1",
        request: {
          method: "eth_sendTransaction",
          params: [{
            from: params.from,
            to: params.to,
            value: params.value,
            gasLimit: params.gasLimit,
            maxPriorityFeePerGas: params.maxPriorityFeePerGas,
            maxFeePerGas: params.maxFeePerGas
          }]
        }
      }
    }
  });
};
```

For more information on implementing MetaMask Multichain, see our [best practices documentation](./best-practices.md). 