---
description: Learn about the MetaMask Multichain API.
sidebar_position: 4
---

# About the Multichain API

:::warning Developer preview
This is a developer preview of the Multichain API.
It is only available in [MetaMask Flask](/snaps/get-started/install-flask).
:::

The Multichain API is a scalable, generalized web3 wallet API that supports simultaneous
interactions across multiple blockchain networks.
When integrated with [MetaMask Snaps](/snaps), it enables developers to interact with both popular
and emerging networks.
Key benefits include:

- **Seamless network interactions** - The Multichain API allows dapps to interact directly with
  multiple networks, without having to switch between single active networks.
  This enables smooth, integrated multichain user experience flows.

- **Scaling usage of non-EVM networks** - The Multichain API integrates with
  [interoperability Snaps](https://snaps.metamask.io/explore/), providing a standardized interface
  to encourage broader adoption of non-EVM networks.

- **Simplified integrations** - The Multichain API reduces the complexity associated with navigating
  different wallet APIs and SDKs, making it easier for dapps to integrate with wallets, discover
  capabilities, and negotiate interfaces.

## Technical overview

The Multichain API follows the [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md)
standard for dapps to interface with multichain wallets.
The API includes a method [`wallet_createSession`](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md)
that dapps can call to create a multichain session with a wallet, with specified properties and
authorization scopes.
The session can be created with or without a `sessionId`, and can be updated using the same method
`wallet_createSession`.

Dapps can use the method [`wallet_invokeMethod`](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-27.md)
to call a subset of the [Wallet JSON-RPC API methods](/wallet/reference/json-rpc-api) on a specified chain.
Dapps can use [`wallet_getSession`](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-312.md)
to get the scope of the current session, and
[`wallet_revokeSession`](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-285.md) to
revoke the current session.
The API also supports [events](../reference/multichain-api-events.md), allowing wallets to notify
dapps of changes to a session.

The following sequence diagrams illustrate the multichain session lifecycle without and with a `sessionId`.

### Lifecycle without a `sessionId`

```mermaid
%%{
  init: {
    'sequence': {
      'actorMargin': 100,
      'width': 275
    }
  }
}%%

sequenceDiagram
  participant Dapp
  participant Wallet
  participant WalletDataStore as Wallet data store
  
  opt Create session
  Dapp->>Wallet: wallet_createSession
  Wallet->>WalletDataStore: Persist session data
  Wallet-->>Dapp: {"sessionScopes": {...}}
  end
  
  opt Update session
  Dapp->>Wallet: wallet_createSession (update auth)
  Wallet->>WalletDataStore: Update session data
  Wallet-->>Dapp: {"sessionScopes": {updatedScopes...}}
  end
  
  opt Connection interrupted with wallet-side session modification
  Dapp-->>Wallet: Connection interrupted
  Wallet->>WalletDataStore: User initiated session change
  Wallet-->>Dapp: wallet_sessionChanged (attempt fails)
  Dapp-->>Wallet: Connection re-established
  end
  
  opt Get session
  Dapp->>Wallet: wallet_getSession
  Wallet-->>Dapp: {"sessionScopes": {...}}
  end

  opt Revoke session
  Dapp->>Wallet: wallet_revokeSession
  Wallet->>WalletDataStore: Update session data
  Wallet-->>Dapp: {"result": "true"}
  end
```

### Lifecycle with a `sessionId`

```mermaid
%%{
  init: {
    'sequence': {
      'actorMargin': 75,
      'width': 200
    }
  }
}%%

sequenceDiagram
  participant DappDataStore as Dapp data store
  participant Dapp
  participant Wallet
  participant WalletDataStore as Wallet data store
  
  opt Create session
  Dapp->>Wallet: wallet_createSession
  Wallet->>WalletDataStore: Persist session data
  Wallet-->>Dapp: {"sessionId": "0xdeadbeef", "sessionScopes": {...}}
  Dapp->>DappDataStore: Persist session data
  end
  
  opt Update session
  Dapp->>Wallet: wallet_createSession (sessionId: 0xdeadbeef, {updatedScopes...})
  Wallet->>WalletDataStore: Update session data
  Wallet-->>Dapp: {"sessionId": "0xdeadbeef", "sessionScopes": {(updated)sessionScopes...}}
  Dapp->>DappDataStore: Persist session data
  end
  
  opt User initiated session change
  Wallet->>WalletDataStore: User initiated session change
  Wallet-->>Dapp: wallet_sessionChanged (sessionId: 0xdeadbeef)
  Dapp->>DappDataStore: Update session data
  end
  
  opt Revoke session
  Dapp->>Wallet: wallet_createSession (sessionId: 0xnewbeef, no scopes)
  Wallet->>WalletDataStore: Create new, empty session 0xnewbeef, clear all older sessions with the same dapp
  Wallet-->>Dapp: {"result": "true"} (session is revoked)
  Dapp->>DappDataStore: Clear session data
  end
  
  alt Revoke session (alternate)
  Dapp->>Wallet: wallet_revokeSession (sessionId: 0xdeadbeef)
  Wallet->>WalletDataStore: Update session data
  Wallet-->>Dapp: {"result": "true"} (session is revoked)
  Dapp->>DappDataStore: Update session data
  end
```
