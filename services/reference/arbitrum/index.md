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
allows it to be fully compatible with Ethereum. Building on Arbitrum is almost identical to
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
      href: "/services/reference/arbitrum/quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect to Arbitrum and make calls to the network."
    },
    {
      href: "/services/reference/arbitrum/json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Arbitrum network."
    },
    {
      href: "/developer-tools/dashboard/get-started/create-api",
      title: "Create an API key",
      description: "Learn how to create and secure an API key."
    }
  ]}
/>

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill your API request. This means that Infura's partner service provider can service your request, but not store the content of your request.

The following partners provide access to the Arbitrum network:

- BlockPI ([Terms of Use](https://blockpi.io/terms-of-use), [Privacy Policy](https://blockpi.io/privacy-policy))
- Chainstack ([Terms of Use](https://chainstack.com/tos/), [Privacy Policy](https://chainstack.com/privacy/))
- Liquify ([Privacy Policy](https://www.liquify.com/Liquify_RPC_PP.pdf))
- Nodefleet ([Privacy Policy](https://nodefleet.org/#/privacy-policy))