---
description: Unichain network information.
---

import CardList from '@site/src/components/CardList'

# Unichain

:::note Decentralized Infrastructure Network (DIN)

Unichain is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

Infura provides Open Beta access to Unichain. During this period, there might be feature limitations.
Performance issues aren't expected, but they're possible as we optimize and stabilize the service.

:::

Unichain is a layer-2 Optimistic Rollup for Ethereum that's designed to be fast, decentralized, and
optimized for DeFi applications.

This allows Unichain to scale the experience of Ethereum, ensuring cheaper and more accessible data while
maintaining the robust security inherent to Ethereum.

Infura provides access to the [Unichain JSON-RPC API](json-rpc-methods/index.md) method library that
interacts with the Unichain blockchain. Methods include functionality for reading and writing data to the network,
and executing smart contracts.

:::info See also

See the [official Unichain documentation](https://docs.unichain.org/docs) for more information.

:::

<CardList
  items={[
    {
      href: "/services/reference/unichain/quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Unichain network."
    },
    {
      href: "/services/reference/unichain/json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Unichain network."
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

The following partners provide access to the Unichain network:

- InfStones ([Privacy Policy](https://infstones.com/terms/privacy-notice))
- 0xFury ([Privacy policy](https://0xfury.com/privacy))
