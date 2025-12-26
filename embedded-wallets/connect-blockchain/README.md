---
title: Connecting Blockchains with Embedded Wallets
sidebar_label: Overview

description: 'Connect to any Blockchain via MetaMask Embedded Wallets | Embedded Wallets'
image: 'img/metamaskog.jpg'
---

import EVMChains from './\_evm-chains.mdx'
import OtherChains from './\_other-chains.mdx'

Embedded Wallets is the frontend authentication system for your dApp. Once the user is authenticated, the SDK returns a way to interact with the blockchain. A provider is how libraries like web3.js & ethers.js talk to the blockchain by sending JSON-RPC requests and receiving responses.

With Embedded Wallets, you can connect in two ways:

- Web (Embedded Wallets Web SDK): You get a MetaMask-style EIP-1193 provider (compatible with ethers.js and web3.js) to submit JSON-RPC requests and interact with the blockchain.
- Mobile (Embedded Wallets Mobile SDK): The user's private key is available in the SDK state, enabling direct signing and lower-level JSON-RPC calls from your app.

::::note

The SDKs are now branded as MetaMask Embedded Wallet SDKs (formerly Web3Auth Plug and Play SDKs). Package names and APIs remain Web3Auth (for example, Web3Auth React SDK), and code snippets may reference `web3auth` identifiers.

::::

## Dashboard configuration

The Embedded Wallets Web SDK (`@web3auth/modal`) from v10 onwards does not need any additional setup on the code side for blockchain connections. All of it is handled on the dashboard. We can use any chain from the extensive list of predefined chains and add more if we need.

![Chains on Dashboard](https://i.ibb.co/4nCD2GTJ/chains.gif)

## Reference guides for blockchain connections

You can check out the following guides we've written for certain blockchains. We have covered a wide variety of EVM and EVM Chains, supported by multiple Embedded Wallets providers.

### Non-EVM chain guides

<OtherChains />

### EVM Chain Guides

<EVMChains />
