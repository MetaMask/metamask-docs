---
description: Sei network documentation.
---

import CardList from '@site/src/components/CardList'

# Sei

:::note Decentralized Infrastructure Network (DIN)

Sei is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

:::

Sei is a Layer 1 blockchain designed for trading and exchange-focused applications. It features a
parallelized EVM architecture, native order matching, and subsystems that address latency and scalability
limitations while maintaining Ethereum compatibility.

:::info See also
Refer to the [official Sei documentation](https://www.docs.sei.io/) for more information.
:::

Select an option below to get started with the Sei network.

<CardList
  items={[
    {
      href: "./quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Sei network."
    },
    {
      href: "./json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Sei network."
    },
    {
      href: "/developer-tools/dashboard/get-started/create-api",
      title: "Create an API key",
      description: "Learn how to create and secure an API key."
    }
  ]}
/>

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill
your API request. This means that Infura's partner service provider can service your request, but not
store the content of your request.

The following partners provide access to the Sei network:
<!-- markdown-link-check-disable -->
- BlockPI ([Terms of Use](https://blockpi.io/terms-of-use), [Privacy Policy](https://blockpi.io/privacy-policy))
- Nodefleet ([Privacy Policy](https://nodefleet.org/#/privacy-policy))
- Nodies ([Terms of Service](https://www.nodies.app/tos.txt), [Privacy Policy](https://www.nodies.app/privacy.txt))
<!-- markdown-link-check-enable -->