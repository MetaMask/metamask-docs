---
description: Supported Ethereum networks
sidebar_position: 3
---

# Supported networks

:::warning Deprecation warning

Rinkeby, Ropsten, Kovan, and Goerli testnets are deprecated from the Infura API.

We recommend users migrate to Sepolia to test deployments. You can use the
[Infura faucet](https://www.infura.io/faucet/sepolia) to load your wallet with Sepolia ETH.

:::

Use one of these endpoints as your Ethereum client provider, and ensure that you replace
`YOUR-API-KEY` with an API key from your [Infura dashboard](https://infura.io/dashboard).

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
