---
description: Swellchain documentation.
---

import CardList from '@site/src/components/CardList'

# Swellchain

:::note Decentralized Infrastructure Network (DIN)

Swellchain is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

:::

Swellchain is a Layer 2 (L2) network built on the [OP Stack](https://docs.optimism.io/stack/getting-started#the-op-stack-today).
The network extends Ethereum's security using EigenLayer's restaking mechanism, and uses Optimism's reliable
infrastructure for efficient transaction processing and scalability.

:::info See also

- The [official Swellchain documentation](https://build.swellnetwork.io/) for more information.
- The official
[Optimism Ethereum JSON-RPC API documentation](https://docs.optimism.io/builders/node-operators/json-rpc)
(Bedrock release) for custom Swellchain methods.

:::

Select an option below to get started with the Swellchain network.

<CardList
  items={[
    {
      href: "./quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to Swellchain."
    },
    {
      href: "./json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with Swellchain."
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

The following partners provide access to Swellchain:
- Infstones ([Privacy Policy](https://infstones.com/terms/privacy-notice))
- [NorthWest Nodes](https://northwestnodes.com/)