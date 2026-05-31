---
title: Services introduction
sidebar_label: Introduction
sidebar_position: 1
---

import SectionNetworks from "@site/src/components/Sections/SectionNetworks.jsx";

# Build and scale your dapp using services

MetaMask provides developer guidance for using hosted node services such as [Infura](https://www.infura.io/) so you can reliably access blockchains without running your own nodes. MetaMask handles wallet responsibilities (key management and signing); hosted providers like Infura run nodes and expose JSON‑RPC and REST APIs that dapps and servers use to read chain data and broadcast signed transactions.

These docs explain how to use Infura endpoints with MetaMask-enabled workflows, including when to sign locally, which calls are broadcast by a provider, and how to choose endpoints for different networks.

## Features

Infura offers a robust set of features designed to enhance the development, deployment, and management of dapps. These features
include:

- **Broad access to major networks** - Infura supports the major networks, allowing you to take advantage of Ethereum's smart
  contracts, IPFS's distributed file system, or high performing layer 2 networks.
- [**Decentralized Infrastructure Network (DIN) support**](https://www.infura.io/solutions/decentralized-infrastructure-service) -
  DIN works alongside Infura to provide the following:
  - **Failover support for APIs** - Currently available on select networks for customers on Growth or Custom plans; if an Infura API
    endpoint becomes unavailable for any reason, requests can be forwarded to a DIN partner to fulfill the request.
    This ensures that your application remains running, providing uninterrupted service to your users.
  - **Expanded network access** - Infura can extend its network offerings by leveraging DIN to access networks that it doesn't
    natively support.
  - **Expanded method support** - This includes access to debug or trace methods not natively
    supported by Infura. For these types of calls, Infura leverages DIN to provide user access.
- **Archive data querying** - [Access historical state data](concepts/archive-data.md) at any given
  block height. This is essential for performing deep analyses of past transactions, contract
  states, or balances. With this feature, developers can build applications that are not only data-rich but also comprehensive.
  Infura can leverage DIN to provide access to archive data that may not be natively supported.
- **Expansion APIs** -
  [Access Infura's multichain Gas API](reference/gas-api/api-reference/index.md). Use the Gas API used by the MetaMask wallet to analyze and optimize gas costs on EIP-1559 compatible chains.

## How it works

```mermaid
flowchart TD
  U[User / Dapp] -->|Interacts with dapp UI| MM[MetaMask (wallet)]
  MM -->|Prompts user to sign — private keys never leave the wallet| SIG[Signing (local)]
  SIG -->|Signed transaction (raw tx)| INF[Provider (Infura) — JSON-RPC / REST]
  INF -->|Broadcasts signed tx to network| NET[Blockchain network (Mainnet, L2s, Testnets)]
  INF -->|Serves read queries (eth_call, eth_getBalance, archive data)| MM
  subgraph Notes[ ]
    direction LR
    MM -. "Signs transactions locally; stores keys" .-> SIG
    INF -. "Runs nodes; provides JSON-RPC endpoints, broadcasting, and historical data" .-> NET
  end
```

MetaMask prompts users to sign transactions locally; the wallet creates a signed payload which can then be broadcast to the network through a provider endpoint such as Infura (for example, `eth_sendRawTransaction`). Infura provides read APIs (`eth_call`, `eth_getBalance`, block queries) and features like archive access and failover (DIN).

### Signing vs broadcasting

:::important
MetaMask signs transactions locally using keys stored in the user's wallet. Hosted providers (like Infura) do not hold your private keys — they accept signed transactions (for example via `eth_sendRawTransaction`) and broadcast them to the network. Never share private keys or unencrypted signing material with a provider.
:::

### Network switching

MetaMask controls the active network in the wallet UI. Dapps should detect the active `chainId` and, where server-side calls are needed, call the matching Infura endpoint for that network (see `/services/get-started/endpoints`). If your backend uses Infura to submit or monitor transactions, ensure it targets the same chain the user is interacting with in MetaMask.

<head>
<meta httpEquiv="cache-control" content="no-cache" />
<meta httpEquiv="expires" content="0" />
<meta httpEquiv="pragma" content="no-cache" />
</head>

## Browse by network

Click below to explore the supported networks.

<SectionNetworks />
