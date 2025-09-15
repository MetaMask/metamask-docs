---
description: Monad network documentation.
---

import CardList from '@site/src/components/CardList'

# Monad

:::note Decentralized Infrastructure Network (DIN)

Monad network support is for the testnet only, as the Monad mainnet has not yet launched.

Monad is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

:::


Monad is a high-performance Ethereum-compatible L1 blockchain with a throughput of over 10,000
transactions per second.

Monad offers full bytecode compatibility for the Ethereum Virtual Machine (EVM), so that applications
built for Ethereum can be ported to Monad without code changes, and full Ethereum RPC compatibility, so
that infrastructure like Etherscan or The Graph can be used seamlessly.

:::info See also
The [official Monad documentation](https://docs.monad.xyz/) for more information.
:::

Select an option below to get started with the Monad network.

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Monad network."
    },
    {
      href: "json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Monad network."
    },
    {
      href: "../../../developer-tools/dashboard/get-started/create-api/",
      title: "Create an API key",
      description: "Learn how to create an API key and secure and share it with your team."
    }
  ]}
/>
