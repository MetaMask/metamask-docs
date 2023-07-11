---
sidebar_position: 1
description: See the high-level web3 architecture.
---

# Architecture

The following diagram outlines the high-level architecture of the MetaMask web3 stack.

![Architecture diagram](../assets/web3-architecture.png)

Using [MetaMask SDK](sdk.md), dapps built on multiple platforms can connect to their users' Ethereum
accounts through the MetaMask browser extension and MetaMask Mobile.
Dapps send [JSON-RPC API](../reference/rpc-api.md) calls through the users' MetaMask wallet clients,
which use [Infura](https://www.infura.io/) (or another node provider) to access information from the
blockchain network.