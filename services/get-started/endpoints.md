---
description: Infura API endpoints
sidebar_position: 2
toc_max_heading_level: 3
---

# All endpoints

The following lists all the network endpoints supported by Infura.

Ensure that you replace `<API-KEY>` with an API key from your [Infura dashboard](../../../developer-tools/dashboard/).

## Arbitrum

| Network           | Description             | URL                                                |
|-------------------|-------------------------|----------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://arbitrum-mainnet.infura.io/v3/<API-KEY>`  |
| Mainnet           | JSON-RPC over Websocket | `wss://arbitrum-mainnet.io/ws/v3/<API-KEY>`        |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://arbitrum-sepolia.infura.io/v3/<API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://arbitrum-sepolia.infura.io/ws/v3/<API-KEY>` |

## Avalanche (C-Chain)

| Network        | Description             | URL                                                |
|----------------|-------------------------|----------------------------------------------------|
| Mainnet        | JSON-RPC over HTTPS     | `https://avalanche-mainnet.infura.io/v3/<API-KEY>` |
| Mainnet        | JSON-RPC over Websocket | `wss://avalanche-mainnet.io/ws/v3/<API-KEY>`       |
| Testnet (Fuji) | JSON-RPC over HTTPS     | `https://avalanche-fuji.infura.io/v3/<API-KEY>`    |
| Testnet (Fuji) | JSON-RPC over WebSocket | `wss://avalanche-fuji.infura.io/ws/v3/<API-KEY>`   |

## Base

:::caution Limited access
Base is currently only available to a limited number of customers. If you would like access, please submit a
request to `support@infura.io` and we will assess if your request can be accommodated at this time.
:::

| Network           | Description         | URL                                           |
|-------------------|---------------------|-----------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://base-mainnet.infura.io/v3/<API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS | `https://base-sepolia.infura.io/v3/<API-KEY>` |

## Blast

| Network           | Description         | URL                                           |
|-------------------|---------------------|-----------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://blast-mainnet.infura.io/v3/<API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS | `https://blast-sepolia.infura.io/v3/<API-KEY>` |

## Celo

| Network             | Description         | URL                                             |
| ------------------- | ------------------- | ----------------------------------------------- |
| Mainnet             | JSON-RPC over HTTPS | `https://celo-mainnet.infura.io/v3/<API-KEY>`   |
| Testnet (Alfajores) | JSON-RPC over HTTPS | `https://celo-alfajores.infura.io/v3/<API-KEY>` |

## Ethereum

:::note
The Holesky testnet is supported through the
[Decentralized Infrastructure Network (DIN)](https://www.infura.io/solutions/decentralized-infrastructure-service)
service and does not currently support WebSockets.
:::

| Network | Description             | URL                                       |
|---------|-------------------------|-------------------------------------------|
| Mainnet | JSON-RPC over HTTPS     | `https://mainnet.infura.io/v3/<API-KEY>`  |
| Mainnet | JSON-RPC over WebSocket | `wss://mainnet.infura.io/ws/v3/<API-KEY>` |
| Holesky | JSON-RPC over HTTPS     | `https://holesky.infura.io/v3/<API-KEY>`  |
| Sepolia | JSON-RPC over HTTPS     | `https://sepolia.infura.io/v3/<API-KEY>`  |
| Sepolia | JSON-RPC over WebSocket | `wss://sepolia.infura.io/ws/v3/<API-KEY>` |

## IPFS

:::caution Limited access
Infura is currently limiting IPFS services to customers that already have an active IPFS key.
New IPFS key creation is disabled for new and existing customers.
:::

| Network | Description | URL                           |
| ------- | ----------- | ----------------------------- |
| Mainnet | HTTP API    | `https://ipfs.infura.io:5001` |

:::info

Include your authentication details when [making IPFS requests](/reference/ipfs/quickstart.md).

:::

## Linea

:::caution deprecation notice

Linea Goerli is being deprecated. We discourage new development with this testnet and recommend using
Sepolia instead.

:::
| Network           | Description             | URL                                             |
|-------------------|-------------------------|-------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://linea-mainnet.infura.io/v3/<API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://linea-mainnet.infura.io/ws/v3/<API-KEY>` |
| Testnet (Goerli)  | JSON-RPC over HTTPS     | `https://linea-goerli.infura.io/v3/<API-KEY>`   |
| Testnet (Goerli)  | JSON-RPC over WebSocket | `wss://linea-goerli.infura.io/ws/v3//<API-KEY>`     |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://linea-sepolia.infura.io/v3/<API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://linea-sepolia.infura.io/ws/v3/<API-KEY>`     |

## Mantle

| Network           | Description             | URL                                              |
|-------------------|-------------------------|--------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://mantle-mainnet.infura.io/v3/<API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://mantle-sepolia.infura.io/v3/<API-KEY>`  |

## Optimism

| Network           | Transport type          | URL                                               |
|-------------------|-------------------------|---------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://optimism-mainnet.infura.io/v3/<API-KEY>` |
| Mainnet           | JSON-RPC over WebSocket | `wss://optimism-mainnet.infura.io/ws/v3/<API-KEY>`   |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://optimism-sepolia.infura.io/v3/<API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://optimism-mainnet.infura.io/ws/v3/<API-KEY>`   |

## Palm

| Network | Description         | URL                                           |
| ------- | ------------------- | --------------------------------------------- |
| Mainnet | JSON-RPC over HTTPS | `https://palm-mainnet.infura.io/v3/<API-KEY>` |
| Testnet | JSON-RPC over HTTPS | `https://palm-testnet.infura.io/v3/<API-KEY>` |

## Polygon PoS

| Network          | Description             | URL                                               |
|------------------|-------------------------|---------------------------------------------------|
| Mainnet          | JSON-RPC over HTTPS     | `https://polygon-mainnet.infura.io/v3/<API-KEY>`  |
| Mainnet          | JSON-RPC over WebSocket | `wss://polygon-mainnet.infura.io/ws/v3/<API-KEY>` |
| Testnet (Amoy)   | JSON-RPC over HTTPS     | `https://polygon-amoy.infura.io/v3/<API-KEY>`     |
| Testnet (Amoy)   | JSON-RPC over WebSocket | `wss://polygon-amoy.infura.io/ws/v3/<API-KEY>`    |

## StarkNet

| Network           | Description         | URL                                               |
|-------------------|---------------------|---------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://starknet-mainnet.infura.io/v3/<API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS | `https://starknet-sepolia.infura.io/v3/<API-KEY>` |

## ZKsync Era

| Network           | Description         | URL                                             |
|-------------------|---------------------|-------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://zksync-mainnet.infura.io/v3/<API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS | `https://zksync-sepolia.infura.io/v3/<API-KEY>` |

## Gas API

The Gas REST API supports multiple networks.

Specify the chain ID in your request to interact with the relevant network.

#### Arbitrum

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 42161    |
| Nova    | 42170    |

#### Avalanche (C-Chain)

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 43114    |


#### Base

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 8453     |

#### BNB Chain

| Network         | Chain ID |
| --------------- | -------- |
| Mainnet         | 56       |
| opBNB (layer 2) | 204      |

#### Cronos

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 25       |

#### Ethereum

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 1        |
| Goerli  | 5        |
| Sepolia | 11155111 |

#### Fantom

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 250      |

#### Filecoin

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 314      |

#### Linea

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 59144    |
| Testnet | 59140    |

#### Optimism

| Network | Chain ID    |
| ------- | ----------- |
| Mainnet | 10          |

#### Polygon

| Network | Network ID |
| ------- | ---------- |
| Mainnet | 137        |
| Amoy    | 80002      |

#### ZKsync Era

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 324      |
