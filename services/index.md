tab ---
title: Services introduction
sidebar_label: Introduction
sidebar_position: 1
---

import SectionAPIs from "@site/src/components/Sections/SectionAPIs.jsx";
import SectionNetworks from "@site/src/components/Sections/SectionNetworks.jsx";

# Build and scale your dapp using services

MetaMask, in partnership with [Infura](https://www.infura.io/), offers a comprehensive set of
services to facilitate dapp and Snap development.
This includes JSON-RPC APIs for easy access to key networks and REST APIs aimed at automating and
optimizing essential development tasks.
These services streamline development workflows to help developers build and scale robust
dapps and Snaps.

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

<head>
<meta httpEquiv="cache-control" content="no-cache" />
<meta httpEquiv="expires" content="0" />
<meta httpEquiv="pragma" content="no-cache" />
</head>

## Browse by network

Click below to explore the supported networks.

<SectionNetworks />
