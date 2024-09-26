---
description: Learn about how `get-starknet` interacts with MetaMask.
sidebar_position: 8
---

# About `get-starknet`

[`get-starknet`](https://github.com/starknet-io/get-starknet) is a library that simplifies Starknet
network interactions.
It works with the [Starknet Snap](https://snaps.metamask.io/snap/npm/consensys/starknet-snap/) to
enable dapps to interact with users' Starknet accounts in MetaMask.

When you integrate `get-starknet` into your dapp, it creates a `WalletAccount` object, which acts as
the connection between the dapp and MetaMask, and manages Starknet interactions.
This allows users to send Starknet transactions, sign Starknet messages, and manage Starknet
accounts within MetaMask, and this functionality can be extended to multiple wallets in the Starknet
ecosystem.

## How `get-starknet` and MetaMask interact

A dapp with `get-starknet` installed interacts with MetaMask as follows:

1. The dapp uses `get-starknet` to request the user connect to MetaMask.
   MetaMask automatically requests the user to add the Starknet Snap, if it's not already present.

1. After the dapp is connected to MetaMask and the Starknet Snap, `get-starknet` receives a Starknet
   Windows Object (SWO), which represents the MetaMask wallet with Starknet functionality.

1. `get-starknet` creates a [`WalletAccount`](http://starknetjs.com/docs/guides/walletAccount/) instance.
   This instance manages the Starknet account within MetaMask.

```mermaid
sequenceDiagram
    participant dapp as Dapp
    participant get as get-starknet
    participant mm as MetaMask
    participant Snap as Starknet Snap
    participant network as Starknet network
    
    dapp->>get: Initialize connection
    get->>mm: Request connection
    mm->>Snap: Activate
    Snap-->>mm: Activated
    mm-->>get: Return SWO
    get->>network: Create WalletAccount
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
```

The `get-starknet` library offers several features that improve how dapps interact with the Starknet
network through MetaMask:

- The `WalletAccount` uses a specified provider to access data from the Starknet network.
- For transactions, `get-starknet` prepares the data and sends it to MetaMask for signing through
  the Starknet Snap.
- `get-starknet` enables the dapp to create contract instances connected to the `WalletAccount`,
  allowing smart contract functions to be invoked, with MetaMask handling the signatures.
- `get-starknet` sets up listeners for account and network changes in MetaMask, so the dapp can
  subscribe and update its state accordingly.
- `get-starknet` can request network changes through MetaMask, allowing users to switch between
  Starknet networks, such as Mainnet and Sepolia testnet.
- `get-starknet` can also request MetaMask to display specific tokens, improving the user experience.
