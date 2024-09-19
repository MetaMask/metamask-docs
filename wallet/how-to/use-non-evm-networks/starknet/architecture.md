---
description: How does `get-starknet` interact with MetaMask.
sidebar_position: 2
---

# About `get-starknet`

`get-starknet` is a library that simplifies Starknet network interactions.
It works with the Starknet Snap to extend the functionality of MetaMask and enable dapps to interact with users' Starknet accounts in MetaMask.

When you integrate `get-starknet` into your dapp, it creates a `WalletAccount` object. `WalletAccount` acts as a connection between dapps and MetaMask and provides a way to manage Starknet interactions.

This allows users to send Starknet transactions, sign Starknet messages, and manage Starknet accounts within MetaMask, and this functionality can be extended to multiple wallets.

## How `get-starknet` and MetaMask interact

A dapp with `get-starknet` installed interacts with MetaMask as follows:

1. The dapp uses `get-starknet` to request the user connect to MetaMask. If the user doesn't have the Starknet Snap installed, MetaMask automatically prompts the user to connect and approve the addition.

1. After the dapp is connected to MetaMask and the Starknet Snap, `get-starknet` receives a Starknet Windows Object (SWO), which represents the MetaMask wallet with Starknet functionality.

1. `get-starknet` creates a [`WalletAccount`](http://starknetjs.com/docs/guides/walletAccount/) instance. This instance manages the Starknet account within MetaMask.

```mermaid
sequenceDiagram
    participant dapp as dapp
    participant get as get-starknet
    participant mm as MetaMask
    participant Snap as Starknet Snap
    participant network as Starknet network
    
    dapp->>get: Initialize connection
    get->>mm: Request connection
    mm->>Snap: Activate
    Snap-->>mm: Activated
    mm-->>get: Return SWO
    get->>get: Create WalletAccount
    get-->>dapp: Connection established
    
    dapp->>get: Read blockchain data
    get->>network: Query data
    network-->>get: Return data
    get-->>dapp: Processed data
    
    dapp->>get: Write transaction
    get->>mm: Request signature
    mm->>Snap: Sign transaction
    Snap-->>mm: Signed transaction
    mm-->>get: Return signature
    get->>network: Submit transaction
    network-->>get: Transaction result
    get-->>dapp: Transaction confirmation
    
    mm->>get: Account/Network changed
    get->>dapp: Notify change
```

The `get-starknet` library offers several key features that improve how dapps interact with the Starknet network through MetaMask:

- The `WalletAccount` uses a specified provider to access data from the Starknet network.
- For transactions, `get-starknet` prepares the data and sends it to MetaMask for signing through the Starknet Snap.
- `get-starknet` enables the dapp to create contract instances connected to the `WalletAccount`, allowing smart contract functions to be invoked, with MetaMask handling the signatures.
- `get-starknet` sets up listeners for account and network changes in MetaMask, so the dapp can subscribe and update its state accordingly.
- `get-starknet` can request network changes through MetaMask, allowing users to switch between Starknet networks, such as Mainnet or Sepolia testnet.
- `get-starknet` can also request MetaMask to display specific tokens, improving the user experience.