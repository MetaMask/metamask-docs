---
sidebar_position: 1
sidebar_label: Connect to MetaMask
description: Learn about how Starknet Snap connects to MetaMask using `get-starknet`.
tags:
  - Snaps
  - Starknet
---

# Overview

`get-starknet` simplifies Starknet network interactions by extending MetaMask functionality. It eliminates the need for custom wallet logic and allows you to easily connect to Starknet and perform transactions through the MetaMask interface.
The `get-starknet` toolkit works with the Starknet Snap to enable interaction between dapps and the Starknet network through MetaMask. 
Starknet Snap is a MetaMask extension designed specifically to allow users to manage Starknet accounts and perform transactions on the Starknet network. 
When you integrate `get-starknet` into your dapp, it creates a `WalletAccount` object. `WalletAccount` acts as a bridge between dapps and MetaMask and provides a structured way to manage Starknet-specific interactions. 
This allows users to send transactions, sign messages, and manage accounts within the MetaMask interface and it can be extended to multiple wallets, with Starknet capabilities added on.

## How it works

The dApp uses `get-starknet` to request a connection to MetaMask. If the Starknet Snap isn't installed, MetaMask prompts the user to connect and approve the installation. 
After it is approved, `get-starknet` receives a Starknet Windows Object (SWO), which represents the MetaMask wallet with Starknet functionality.
After receiving the SWO, `get-starknet` creates a WalletAccount instance. 
This instance manages the Starknet account within MetaMask. With this setup, `get-starknet` enables the dApp to use Starknet features through MetaMask with the following capabilities:

- `WalletAccount` uses a specified provider to read data from the Starknet network.
- For transactions, `get-starknet` prepares the transaction data and sends it to MetaMask for signing through the Starknet snap.
- `get-starknet` allows the dapp to create contract instances connected to the `WalletAccount`. These instances can invoke smart contract functions, with MetaMask handling the necessary signatures.
- `get-starknet` sets up listeners for account and network changes within MetaMask.
The dapp can subscribe to these events to update its state accordingly.
- `get-starknet` can request network changes through MetaMask, and allows users to switch between different StarkNet networks (for example Mainnet, testnet).
- `get-starknet` can request MetaMask to display specific tokens in its interface, enhancing user experience.


```mermaid
sequenceDiagram
    participant dapp as dApp
    participant get as get-starknet
    participant mm as MetaMask
    participant snap as Starknet Snap
    participant network as Starknet Network

    dapp->>get: Initialize connection
    get->>mm: Request connection
    mm->>snap: Activate (if needed)
    snap-->>mm: Activated
    mm-->>get: Return SWO
    get->>get: Create WalletAccount
    get-->>dapp: Connection established
    dapp->>get: Read blockchain data
    get->>network: Query data
    network-->>get: Return data
    get-->>dapp: Processed data
    dapp->>get: Write transaction
    get->>mm: Request signature
    mm->>snap: Sign transaction
    snap-->>mm: Signed transaction
    mm-->>get: Return signature
    get->>network: Submit transaction
    network-->>get: Transaction result
    get-->>dapp: Transaction confirmation
    mm->>get: Account/Network changed
    get->>dapp: Notify change
```


## Comparison

| Feature | `wallet_invokeSnap` | `get-starknet` |
|---------|---------------------|----------------|
| API Level | Low-level access to Starknet snap methods | High-level abstractions for Starknet operations |
| Wallet Support | MetaMask only | Multiple Starknet-compatible wallets |
| Functionality | Limited to snap-implemented methods | Comprehensive toolkit for Starknet dapp development |
| Multi-wallet Sync | No | Yes |
| Standardization | Might lead to non-standard implementations | Enforces standardized wallet interactions |
| Flexibility | High, with direct access to all snap features | Moderate, within implemented features |
| Code Portability | Low, tied to MetaMask | High, works across multiple wallet implementations |


### Using `wallet_invokeSnap` directly

When using `wallet_invokeSnap` directly to interact with the Starknet Snap, you typically follow the following steps:

1. Ensure the Starknet Snap is installed.
2. Construct the appropriate parameters for the Starknet operation you want to perform.
3. Call `wallet_invokeSnap` with the following parameters.

Example for sending a transaction:

```javascript
const snapId = 'npm:@starknet/snap';

async function sendTransaction() {
  try {
    const result = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: [snapId, {
        method: 'starknet_signAndSubmitTransaction',
        params: {
          type: 'INVOKE_FUNCTION',
          contract_address: '0x123...', // The contract address
          entry_point_selector: 'transfer',
          calldata: ['0x456...', '1000'], // Recipient and amount
        }
      }]
    });
    console.log('Transaction hash:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

With `wallet_invokeSnap`, you must know the exact method names and parameter structures for interacting with the Starknet Snap. Additionally, you must handle both MetaMask-specific and Starknet-specific errors. Since `wallet_invokeSnap` is designed specifically for MetaMask, it operates within the framework of MetaMask interactions.


### Using get-starknet

With `get-starknet`, the process is simplified:

1. Connect to a wallet using `get-starknet`.
2. Use the provided high-level methods to perform Starknet operations.

Example for sending the same transaction:

```javascript
import { connect } from 'get-starknet';

async function sendTransaction() {
  try {
    const starknet = await connect();
    if (!starknet) throw new Error('Failed to connect to wallet');

    const result = await starknet.account.execute({
      contractAddress: '0x123...',
      entrypoint: 'transfer',
      calldata: ['0x456...', '1000']
    });
    console.log('Transaction hash:', result.transaction_hash);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

`get-starknet` provides a high-level, intuitive API that abstracts complex operations and manages wallet connections. 
It offers multi-wallet support, standardized error handling, and more readable code compared to direct Snap invocation so you are not required to manage lower-level Starknet interactions.
