---
description: Infura API endpoints
sidebar_position: 2
toc_max_heading_level: 3
---

import GasApiNetworks from "@site/src/components/GasApiNetworks.tsx";

# All endpoints

The following lists all the network endpoints supported by Infura.

Ensure that you replace `<YOUR-API-KEY>` with an API key from your [MetaMask Developer dashboard](/developer-tools/dashboard).

## Arbitrum

| Network           | Description             | URL                                                     |
|-------------------|-------------------------|---------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://arbitrum-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://arbitrum-mainnet.io/ws/v3/<YOUR-API-KEY>`        |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://arbitrum-sepolia.infura.io/v3/<YOUR-API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://arbitrum-sepolia.infura.io/ws/v3/<YOUR-API-KEY>` |

## Avalanche (C-Chain)

| Network        | Description             | URL                                                     |
|----------------|-------------------------|---------------------------------------------------------|
| Mainnet        | JSON-RPC over HTTPS     | `https://avalanche-mainnet.infura.io/v3/<YOUR-API-KEY>` |
| Mainnet        | JSON-RPC over WebSocket | `wss://avalanche-mainnet.io/ws/v3/<YOUR-API-KEY>`       |
| Testnet (Fuji) | JSON-RPC over HTTPS     | `https://avalanche-fuji.infura.io/v3/<YOUR-API-KEY>`    |
| Testnet (Fuji) | JSON-RPC over WebSocket | `wss://avalanche-fuji.infura.io/ws/v3/<YOUR-API-KEY>`   |

## Base

| Network           | Transport type          | URL                                                 |
|-------------------|-------------------------|-----------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://base-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://base-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://base-sepolia.infura.io/v3/<YOUR-API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://base-sepolia.infura.io/ws/v3/<YOUR-API-KEY>` |

## Blast

| Network           | Description         | URL                                                |
|-------------------|-------------------------|----------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://blast-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://blast-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://blast-sepolia.infura.io/v3/<YOUR-API-KEY>`  |

## Binance Smart Chain

| Network | Transport type          | URL                                                |
|---------|-------------------------|----------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS     | `https://bsc-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet | JSON-RPC over WebSocket | `wss://bsc-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet | JSON-RPC over HTTPS     | `https://bsc-testnet.infura.io/v3/<YOUR-API-KEY>`  |

## Celo

| Network             | Description             | URL                                                   |
|---------------------|-------------------------|-------------------------------------------------------|
| Mainnet             | JSON-RPC over HTTPS     | `https://celo-mainnet.infura.io/v3/<YOUR-API-KEY>`    |
| Testnet (Sepolia)   | JSON-RPC over HTTPS     | `https://celo-sepolia.infura.io/v3/<YOUR-API-KEY>`    |

## Ethereum

| Network           | Description             | URL                                            |
|-------------------|-------------------------|------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet (Hoodi)   | JSON-RPC over HTTPS     | `https://hoodi.infura.io/v3/<YOUR-API-KEY>`    |
| Testnet (Hoodi)   | JSON-RPC over WebSocket | `wss://hoodi.infura.io/ws/v3/<YOUR-API-KEY>`   |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://sepolia.infura.io/v3/<YOUR-API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://sepolia.infura.io/ws/v3/<YOUR-API-KEY>` |

## Hemi

| Network | Description         | URL                                                  |
|---------|---------------------|------------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS | `https://hemi-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Testnet | JSON-RPC over HTTPS | `https://hemi-testnet.infura.io/v3/<YOUR-API-KEY>`  |

## HyperEVM

| Network | Description         | URL                                                     |
|---------|---------------------|---------------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS | `https://hyperevm-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet | JSON-RPC over WebSocket | `wss://hyperevm-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet | JSON-RPC over HTTPS | `https://hyperevm-testnet.infura.io/v3/<YOUR-API-KEY>`  |

## IPFS

:::caution Restricted access

New IPFS key creation is disabled for all users. Only IPFS keys that were active in late 2024 continue
to have access to the IPFS network.

:::

| Network | Description | URL                           |
|---------|-------------|-------------------------------|
| Mainnet | HTTP API    | `https://ipfs.infura.io:5001` |

:::info

Include your authentication details when [making IPFS requests](../reference/ipfs/quickstart.md).

:::

## Linea

| Network           | Description             | URL                                             |
|-------------------|-------------------------|-------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://linea-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://linea-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://linea-sepolia.infura.io/v3/<YOUR-API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://linea-sepolia.infura.io/ws/v3/<YOUR-API-KEY>` |

## Mantle

| Network           | Description             | URL                                              |
|-------------------|-------------------------|--------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://mantle-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://mantle-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://mantle-sepolia.infura.io/v3/<YOUR-API-KEY>`  |

## Monad

| Network           | Description             | URL                                              |
|-------------------|-------------------------|--------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://monad-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Testnet           | JSON-RPC over HTTPS     | `https://monad-testnet.infura.io/v3/<YOUR-API-KEY>`  |

## opBNB

| Network           | Transport type          | URL                                             |
|-------------------|-------------------------|-------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://opbnb-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://opbnb-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet           | JSON-RPC over HTTPS     | `https://opbnb-testnet.infura.io/v3/<YOUR-API-KEY>`  |

## Optimism

| Network           | Transport type          | URL                                                     |
|-------------------|-------------------------|---------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://optimism-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://optimism-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://optimism-sepolia.infura.io/v3/<YOUR-API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://optimism-sepolia.infura.io/ws/v3/<YOUR-API-KEY>` |

## Palm

| Network | Description         | URL                                                |
|---------|---------------------|----------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS | `https://palm-mainnet.infura.io/v3/<YOUR-API-KEY>` |
| Testnet | JSON-RPC over HTTPS | `https://palm-testnet.infura.io/v3/<YOUR-API-KEY>` |

## Polygon PoS

| Network        | Description             | URL                                                    |
|----------------|-------------------------|--------------------------------------------------------|
| Mainnet        | JSON-RPC over HTTPS     | `https://polygon-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet        | JSON-RPC over WebSocket | `wss://polygon-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet (Amoy) | JSON-RPC over HTTPS     | `https://polygon-amoy.infura.io/v3/<YOUR-API-KEY>`     |
| Testnet (Amoy) | JSON-RPC over WebSocket | `wss://polygon-amoy.infura.io/ws/v3/<YOUR-API-KEY>`    |

## Scroll

| Network | Description             | URL                                                   |
|---------|-------------------------|-------------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS     | `https://scroll-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Sepolia | JSON-RPC over HTTPS     | `https://scroll-sepolia.infura.io/v3/<YOUR-API-KEY>`  |

## Sei

| Network | Description             | URL                                                   |
|---------|-------------------------|-------------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS     | `https://sei-mainnet.infura.io/v3/<YOUR-API-KEY>`     |
| Testnet | JSON-RPC over HTTPS     | `https://sei-testnet.infura.io/v3/<YOUR-API-KEY>`     |

## Solana

:::note limited access
Solana access is currently limited to select customers. [Contact us](https://www.infura.io/contact)
if you're interested in accessing these methods.
:::

| Network           | Description         | URL                                                    |
|-------------------|---------------------|--------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://solana-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Testnet (Devnet)  | JSON-RPC over HTTPS | `https://solana-devnet.infura.io/v3/<YOUR-API-KEY>`   |

## Starknet

| Network           | Description         | URL                                                    |
|-------------------|---------------------|--------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://starknet-mainnet.infura.io/v3/<YOUR-API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS | `https://starknet-sepolia.infura.io/v3/<YOUR-API-KEY>` |

## Swellchain

| Network | Description         | URL                                                      |
|---------|---------------------|----------------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS | `https://swellchain-mainnet.infura.io/v3/<YOUR-API-KEY>` |
| Testnet | JSON-RPC over HTTPS | `https://swellchain-testnet.infura.io/v3/<YOUR-API-KEY>` |

## Unichain

| Network | Description             | URL                                                   |
|---------|-------------------------|-------------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS     | `https://unichain-mainnet.infura.io/v3/<YOUR-API-KEY>`|
| Sepolia | JSON-RPC over HTTPS     | `https://unichain-sepolia.infura.io/v3/<YOUR-API-KEY>`|

## ZKsync Era

:::info

ZKsync Era WebSockets are supported on Mainnet only.
 
:::

| Network           | Description             | URL                                                   |
|-------------------|-------------------------|-------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://zksync-mainnet.infura.io/v3/<YOUR-API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://zksync-mainnet.infura.io/ws/v3/<YOUR-API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://zksync-sepolia.infura.io/v3/<YOUR-API-KEY>`  |

## Gas API

The [Gas REST API](../reference/gas-api/index.md) supports multiple networks.

Specify the chain ID in your request to interact with the relevant network.

<GasApiNetworks />
