---
description: Infura API endpoints
sidebar_position: 2
toc_max_heading_level: 3
---

# All endpoints

The following lists all the network endpoints supported by Infura.

Ensure that you replace `<API-KEY>` with an API key from your [Infura dashboard](../../../developer-tools/dashboard/).

## Arbitrum

| Network           | Description             | URL                                                | Resources                                                                            |
| ----------------- | ----------------------- | -------------------------------------------------- |--------------------------------------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://arbitrum-mainnet.infura.io/v3/<API-KEY>`  |                                                                                      |
| Mainnet           | JSON-RPC over Websocket | `wss://arbitrum-mainnet.io/ws/v3/<API-KEY>`        |                                                                                      |
| Testnet           | JSON-RPC over HTTPS     | `https://arbitrum-sepolia.infura.io/v3/<API-KEY>`  |[Get testnet ETH from Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)|
| Testnet           | JSON-RPC over WebSocket | `wss://arbitrum-sepolia.infura.io/ws/v3/<API-KEY>` |[Get testnet ETH from Arbitrum Sepolia](https://faucet.quicknode.com/arbitrum/sepolia)|       

## Avalanche (C-Chain)

| Network        | Description             | URL                                                | Resources                                                                 |
| -------------- | ----------------------- | -------------------------------------------------- |---------------------------------------------------------------------------|
| Mainnet        | JSON-RPC over HTTPS     | `https://avalanche-mainnet.infura.io/v3/<API-KEY>` |                                                                           |
| Mainnet        | JSON-RPC over Websocket | `wss://avalanche-mainnet.io/ws/v3/<API-KEY>`       |                                                                           |           
| Testnet        | JSON-RPC over HTTPS     | `https://avalanche-fuji.infura.io/v3/<API-KEY>`    |[Get testnet AVAX from the Fuji network](https://faucet.avax-test.network/)|
| Testnet        | JSON-RPC over WebSocket | `wss://avalanche-fuji.infura.io/ws/v3/<API-KEY>`   |[Get testnet AVAX from the Fuji network](https://faucet.avax-test.network/)|


## Base

:::caution Limited access
Base is currently only available to a limited number of customers. If you would like access, please submit a
request to `support@infura.io` and we will assess if your request can be accommodated at this time.
:::

| Network           | Description         | URL                                           | Resources                                                                            |
| ----------------- | ------------------- | --------------------------------------------- |--------------------------------------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://base-mainnet.infura.io/v3/<API-KEY>` |                                                                                      |
| Testnet           | JSON-RPC over HTTPS | `https://base-sepolia.infura.io/v3/<API-KEY>` |[Get testnet ETH from Base Sepolia](https://docs.base.org/docs/using-base/#metamask-1)|

## Blast

| Network           | Description         | URL                                            | Resources                                                                                           |          
| ----------------- | ------------------- | ---------------------------------------------- |-----------------------------------------------------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://blast-mainnet.infura.io/v3/<API-KEY>` |                                                                                                     |
| Testnet           | JSON-RPC over HTTPS | `https://blast-sepolia.infura.io/v3/<API-KEY>` |[Get testnet ETH from Blast Sepolia](https://docs.blast.io/using-blast#metamask-quick-instructions-2)|

:::info

You can get Sepolia ETH for the Blast network from the [Quicknode Blast faucet](https://faucet.quicknode.com/blast/sepolia).

Alternatively, obtain Sepolia ETH from [the Infura faucet](https://www.infura.io/faucet/sepolia) and
[bridge](https://docs.blast.io/building/bridges/testnet) your funds to the Blast network.

:::

## Binance Smart Chain

| Network           | Transport type          | URL                                           |Resources                                                                        |
|-------------------|-------------------------|-----------------------------------------------|---------------------------------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://bsc-mainnet.infura.io/v3/<API-KEY>`  |                                                                                 |
| Mainnet           | JSON-RPC over WebSocket | `wss://bsc-mainnet.infura.io/ws/v3/<API-KEY>` |                                                                                 |
| Testnet           | JSON-RPC over HTTPS     | `https://bsc-testnet.infura.io/v3/<API-KEY>`  |[Get testnet ETH from BSC Sepolia](https://www.binance.com/en/square/post/227018)|                                           |

## Celo

| Network             | Description             | URL                                              | Resources                                                                       |
|---------------------|-------------------------|--------------------------------------------------|---------------------------------------------------------------------------------|
| Mainnet             | JSON-RPC over HTTPS     | `https://celo-mainnet.infura.io/v3/<API-KEY>`    |                                                                                 |
| Mainnet             | JSON-RPC over WebSocket | `wss://celo-mainnet.infura.io/ws/v3/<API-KEY>`   |                                                                                 |
| Testnet             | JSON-RPC over HTTPS     | `https://celo-alfajores.infura.io/v3/<API-KEY>`  |[Get testnet CELO from the Alfajores network](https://celo.org/developers/faucet)|
| Testnet             | JSON-RPC over WebSocket | `wss://celo-alfajores.infura.io/ws/v3/<API-KEY>` |[Get testnet CELO from the Alfajores network](https://celo.org/developers/faucet)|

## Ethereum

:::note
The Holesky testnet is supported through the
[Decentralized Infrastructure Network (DIN)](https://www.infura.io/solutions/decentralized-infrastructure-service)
service and does not currently support WebSockets.
:::

| Network           | Description             | URL                                       |
| ----------------- | ----------------------- | ----------------------------------------- |
| Mainnet           | JSON-RPC over HTTPS     | `https://mainnet.infura.io/v3/<API-KEY>`  |
| Mainnet           | JSON-RPC over WebSocket | `wss://mainnet.infura.io/ws/v3/<API-KEY>` |
| Testnet (Holesky) | JSON-RPC over HTTPS     | `https://holesky.infura.io/v3/<API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://sepolia.infura.io/v3/<API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://sepolia.infura.io/ws/v3/<API-KEY>` |

## IPFS

:::caution Limited access

Infura restricts its IPFS service to a select set of qualified customers. [Contact the Infura support team](https://support.infura.io/ipfs) for next steps. New IPFS key creation is disabled for all users, but existing IPFS customers can continue to use the IPFS service with their existing keys.

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
| Testnet (Goerli)  | JSON-RPC over WebSocket | `wss://linea-goerli.infura.io/ws/v3//<API-KEY>` |
| Testnet (Sepolia) | JSON-RPC over HTTPS     | `https://linea-sepolia.infura.io/v3/<API-KEY>`  |
| Testnet (Sepolia) | JSON-RPC over WebSocket | `wss://linea-sepolia.infura.io/ws/v3/<API-KEY>` |

:::info

You can use one of the following faucets to obtain Linea Sepolia ETH:

 - [Infura faucet](https://www.infura.io/faucet/linea)
 - [Covalent faucet](https://www.covalenthq.com/faucet/)

Alternatively, you can obtain [Sepolia ETH](https://www.infura.io/faucet/sepolia) and [bridge your funds](https://bridge.linea.build/) to the Linea Sepolia testnet.

See the [official Linea documentation](https://docs.linea.build/use-mainnet/bridges-of-linea/how-to-bridge-eth) for
information about additional faucets and bridging funds.

:::

## Mantle

:::info

You need Sepolia ETH and Sepolia MNT to transact on the Sepolia Mantle testnet.

:::

| Network           | Description         | URL                                             |Resources                                                                |
| ----------------- | ------------------- | ----------------------------------------------- |-------------------------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://mantle-mainnet.infura.io/v3/<API-KEY>` |                                                                         |
| Testnet           | JSON-RPC over HTTPS | `https://mantle-sepolia.infura.io/v3/<API-KEY>` |[Get testnet ETH from Mantle Sepolia](https://faucet.testnet.mantle.xyz/)|

## Optimism

| Network           | Transport type          | URL                                                |Resources                             |
| ----------------- | ----------------------- | -------------------------------------------------- |--------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://optimism-mainnet.infura.io/v3/<API-KEY>`  |                                      |
| Mainnet           | JSON-RPC over WebSocket | `wss://optimism-mainnet.infura.io/ws/v3/<API-KEY>` |                                      |
| Testnet           | JSON-RPC over HTTPS     | `https://optimism-sepolia.infura.io/v3/<API-KEY>`  |[Get testnet ETH from Optimism Sepolia](https://docs.optimism.io/builders/tools/build/faucets)|
| Testnet           | JSON-RPC over WebSocket | `wss://optimism-mainnet.infura.io/ws/v3/<API-KEY>` |[Get testnet ETH from Optimism Sepolia](https://docs.optimism.io/builders/tools/build/faucets)|

:::info

If you already have Sepolia ETH, you can deposit it by sending it to the Optimism Portal on L1 Sepolia. 

See the [Optimism Docs](https://community.optimism.io/docs/useful-tools/networks/#op-sepolia) for more information.

:::

## Palm

| Network | Description         | URL                                           |Resources                                                         |
| ------- | ------------------- | --------------------------------------------- |------------------------------------------------------------------|
| Mainnet | JSON-RPC over HTTPS | `https://palm-mainnet.infura.io/v3/<API-KEY>` |                                                                  |
| Testnet | JSON-RPC over HTTPS | `https://palm-testnet.infura.io/v3/<API-KEY>` |[Get testnet PALM tokens](https://docs.palm.io/get-started/tokens)|

## Polygon PoS

| Network        | Description             | URL                                               |Resources                                                     |
| -------------- | ----------------------- | ------------------------------------------------- |--------------------------------------------------------------|
| Mainnet        | JSON-RPC over HTTPS     | `https://polygon-mainnet.infura.io/v3/<API-KEY>`  |                                                              |
| Mainnet        | JSON-RPC over WebSocket | `wss://polygon-mainnet.infura.io/ws/v3/<API-KEY>` |                                                              |
| Testnet        | JSON-RPC over HTTPS     | `https://polygon-amoy.infura.io/v3/<API-KEY>`     |[Get testnet MATIC from Polygon Amoy](https://faucet.polygon.technology/)|
| Testnet        | JSON-RPC over WebSocket | `wss://polygon-amoy.infura.io/ws/v3/<API-KEY>`    |[Get testnet MATIC from Polygon Amoy](https://faucet.polygon.technology/)|

:::info

You must be a member of the Polygon Discord community to obtain tokens.

:::

## Starknet

| Network           | Description         | URL                                               |Resources                                                                                           |
| ----------------- | ------------------- | ------------------------------------------------- |----------------------------------------------------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS | `https://starknet-mainnet.infura.io/v3/<API-KEY>` |                                                                                                    |
| Testnet           | JSON-RPC over HTTPS | `https://starknet-sepolia.infura.io/v3/<API-KEY>` |[Get testnet ETH from Starknet Sepolia](https://book.starknet.io/ch02-05-01-start-with-sepolia.html)|

:::info

Use the [Starknet bridge (StarkGate)](https://starkgate.starknet.io/) to bridge ETH or DAI between
Ethereum mainnet and StarkNet mainnet. StarkGate requires a MetaMask wallet extension and a
StarkNet-compatible wallet (for example, ArgentX) installed in the user's browser.

:::

## ZKsync Era

:::info

ZKsync Era WebSockets are supported on Mainnet only.
 
:::

| Network           | Description             | URL                                              |Resources                                                                         |
|-------------------|-------------------------|--------------------------------------------------|----------------------------------------------------------------------------------|
| Mainnet           | JSON-RPC over HTTPS     | `https://zksync-mainnet.infura.io/v3/<API-KEY>`  |                                                                                  |
| Mainnet           | JSON-RPC over WebSocket | `wss://zksync-mainnet.infura.io/ws/v3/<API-KEY>` |                                                                                  |
| Testnet           | JSON-RPC over HTTPS     | `https://zksync-sepolia.infura.io/v3/<API-KEY>`  |[Get testnet ETH from ZKsync Sepolia](https://faucet.quicknode.com/zksync/sepolia)|

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
| Sepolia | 59141    |

#### Optimism

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 10       |

#### Polygon

| Network | Network ID |
| ------- | ---------- |
| Mainnet | 137        |
| Amoy    | 80002      |

#### ZKsync Era

| Network | Chain ID |
| ------- | -------- |
| Mainnet | 324      |
