---
description: Learn about the MetaMask Multichain API.
sidebar_position: 4
---

# About the Multichain API

The Multichain API offers a scalable, generalized web3 wallet API that supports simultaneous interactions across multiple chains.
When integrated with [MetaMask Snaps](/snaps), it enables developers to interact with both popular and emerging networks.
By adhering to open standards, the Multichain API encourages broad adoption and development of tooling higher up in the dev stack.

The Multichain API supports simultaneous multichain interactions, enabling dapps to create smoother, more integrated user experiences.
It addresses key issues, such as:

- **Network switching** - Current Ethereum wallet APIs are modeled around a single active network.
  Developers must switch between networks in order to make multichain calls, which can be unnecessarily complicated.
  The Multichain API eliminates switching by allowing direct interactions with different networks.
  Dapps can re-imagine their interfaces to optimize multichain UX flows.

- **Scaling usage of non-EVM networks** - Developers building protocol Snaps struggle to scale developer usage.
  The Multichain API integrates with Snaps and offers a more standardized interface to encourage broad adoption.

- **Error-prone integrations** - Developers are burdened with navigating different wallet APIs and SDKs.
  The Multichain API standardizes the interface, making it easier for dapps to integrate with wallets,
  discover their capabilities, and negotiate interfaces.

See the [Multichain API reference](../reference/multichain-api.md).

## Technical overview

The Multichain API follows the [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md)
standard for dapps to interface with multichain wallets.

## Multichain session lifecycle

The following is a lifecycle overview of a multichain session without a `sessionId`:

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
  actor Caller
  participant Wallet
  participant WalletDataStore as Data store (Wallet)
  
  opt Create session
  Caller->>Wallet: wallet_createSession
  Wallet->>WalletDataStore: Persist session data
  Wallet-->>Caller: {"sessionScopes": {...}}
  end
  
  opt Update session
  Caller->>Wallet: wallet_createSession (update auth)
  Wallet->>WalletDataStore: Update session data
  Wallet-->>Caller: {"sessionScopes": {updatedScopes...}}
  end
  
  opt Connection interrupted with wallet-side session modification
  Caller-->Wallet: Connection interrupted
  Wallet->>WalletDataStore: User initiated session change
  Wallet-->Caller: wallet_sessionChanged (attempt fails)
  Caller-->Wallet: Connection re-established
  end
  
  opt Get session
  Caller->>Wallet: wallet_getSession
  Wallet-->>Caller: {"sessionScopes": {...}}
  end

  opt Revoke session
  Caller->>Wallet: wallet_revokeSession
  Wallet->>WalletDataStore: Update session data
  Wallet-->>Caller: {"result": "true"}
  end
```

The following is a lifecycle overview of a multichain session with a `sessionId`:

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
  participant CallerDataStore as Data store (Caller)
  actor Caller
  participant Wallet
  participant WalletDataStore as Data store (Wallet)
  
  opt Create session
  Caller->>Wallet: wallet_createSession
  Wallet->>WalletDataStore: Persist session data
  Wallet-->>Caller: {"sessionId": "0xdeadbeef", "sessionScopes": {...}}
  Caller->>CallerDataStore: Persist session data
  end
  
  opt Update session
  Caller->>Wallet: wallet_createSession (sessionId: 0xdeadbeef, {updatedScopes...})
  Wallet->>WalletDataStore: Update session data
  Wallet-->>Caller: {"sessionId": "0xdeadbeef", "sessionScopes": {(updated)sessionScopes...}}
  Caller->>CallerDataStore: Persist session data
  end
  
  opt User initiated session change
  Wallet->>WalletDataStore: User initiated session change
  Wallet->>Caller: wallet_sessionChanged (sessionId: 0xdeadbeef)
  Caller->>CallerDataStore: Update session data
  end
  
  opt Revoke session
  Caller->>Wallet: wallet_createSession (sessionId: 0xnewbeef, no scopes)
  Wallet->>WalletDataStore: Create new, empty session 0xnewbeef, clear all older sessions with the same dapp
  Wallet-->>Caller: {"result": "true"} (session is revoked)
  Caller->>CallerDataStore: Clear session data
  end
  
  alt Revoke session (alternate)
  Caller->>Wallet: wallet_revokeSession (sessionId: 0xdeadbeef)
  Wallet->>WalletDataStore: Update session data
  Wallet-->>Caller: {"result": "true"} (session is revoked)
  Caller->>CallerDataStore: Update session data
  end
```
