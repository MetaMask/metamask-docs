---
description: Arbitrum network documentation.
---

import CardList from '@site/src/components/CardList'

# Arbitrum

:::note Failover protection

Arbitrum [failover support](../../concepts/failover-protection.md) is available for customers on the Growth or Custom plans. 
Arbitrum failover support is available on Mainnet only.
Calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

:::

Arbitrum is an Ethereum scaling solution that provides high throughput and low-cost smart contract execution. Arbitrum's design
allows it to be fully compatible with Ethereum. Developers will find that building with Arbitrum is nearly identical to
building on Ethereum.

Arbitrum is compatible with Ethereum's JSON-RPC API implementation, which allows using tools such as Infura, Hardhat, and
MetaMask.

:::info See also

- View the [official Arbitrum docs](https://docs.arbitrum.io/) for more information about building on the Arbitrum blockchain.
- View the [differences between developing on Ethereum versus Arbitrum](https://docs.arbitrum.io/for-devs/concepts/differences-between-arbitrum-ethereum/overview). 

:::

Select one of the following options to get started with the Arbitrum network: 

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect to Arbitrum and make calls to the network."
    },
    {
      href: "json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Arbitrum network."
    },
    {
      href: "../../../developer-tools/dashboard/get-started/create-api/",
      title: "Create an API key",
      description: "Learn how to create an API key and secure and share it with your team."
    }
  ]}
/>

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill your API request. This means that Infura's partner service provider can service your request, but not store the content of your request.

For any parameters required in an RPC request, these could be the type that describe the method, addresses, gas, and session.

Liquify (Privacy Policy) is Infura's failover-protection partner and currently offer failover support for all Infura's Arbitrum methods.