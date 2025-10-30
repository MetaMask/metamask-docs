---
description: Starknet network information.
---

import CardList from '@site/src/components/CardList'

# Starknet

:::note Decentralized Infrastructure Network (DIN)

Starknet is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to a [partner infrastructure provider](#partner-and-privacy-policy).

:::

Starknet is a decentralized, permissionless and scalable Layer-2 network protocol developed by StarkWare for the Ethereum
network. It leverages zk-STARKs technology for scalability and privacy, allowing developers to build and deploy smart contracts
that can perform more computations than on Ethereum's base layer, while maintaining a high level of security and decentralization.

:::info see also

See the [Starknet documentation](https://docs.starknet.io/documentation/) to find out more. You can also watch an
[Introduction to Starknet](https://www.youtube.com/watch?v=eL9le56gcS0).

:::

<CardList
  items={[
    {
      href: "./quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Starknet network."
    },
    {
      href: "./json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Starknet network."
    },
    {
      href: "/developer-tools/dashboard/get-started/create-api",
      title: "Create an API key",
      description: "Learn how to create and secure an API key."
    }
  ]}
/>

## Partner and privacy policy

No personal information is sent as part of partner requests, only information necessary to fulfill your API request. This means that Infura's partner service provider can service your request, but not store the content of your request.

The following partners provide access to Starknet:

<!-- markdown-link-check-disable -->
- Bware Labs ([Terms of Service](https://bwarelabs.com/terms), [Privacy Policy](https://bwarelabs.com/privacy))
- Chainstack ([Terms of Service](https://chainstack.com/tos/), [Privacy Policy](https://chainstack.com/privacy/))
<!-- markdown-link-check-enable -->