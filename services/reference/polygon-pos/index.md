---
description: Polygon network information
---

import CardList from '@site/src/components/CardList'

# Polygon PoS

The Polygon PoS network is a hybrid Plasma Proof of Stake side-chain to Ethereum. It's fully compatible with the Ethereum
virtual machine (EVM) which allows developers to leverage Infura, MetaMask, and other tools they use for Ethereum when
developing and deploying smart contracts to the Polygon network.

The Polygon Bor node API is based on go-ethereum's JSON-RPC implementation, you can also use WebSockets to call JSON-RPCs
and [create subscriptions](how-to/subscribe-to-events.md).

:::info see also

The [official Polygon documentation](https://docs.polygon.technology) for more information about using the Polygon network.

:::

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Polygon network."
    },
    {
      href: "json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Polygon network."
    },
    {
      href: "../../../developer-tools/dashboard/get-started/create-api/",
      title: "Create an API key",
      description: "Learn how to create an API key and secure and share it with your team."
    }
  ]}
/>