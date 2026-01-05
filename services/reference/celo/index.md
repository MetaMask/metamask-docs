---
description: Celo network documentation.
---

import CardList from '@site/src/components/CardList'

# Celo

:::note Decentralized Infrastructure Network (DIN)

Celo is supported through the [DIN](https://www.din.build/) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

:::

Celo is an Ethereum layer-2 network designed for fast, low-cost payments. It offers low fees and fast finality while letting you reuse familiar Ethereum tools and contracts with little or no change.

:::info See also

- The [official Celo documentation](https://docs.celo.org/) for more information.

:::

Select an option below to get started with the Celo network.

<CardList
  items={[
    {
      href: "/services/reference/celo/quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Celo network."
    },
    {
      href: "/services/reference/celo/json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Celo network."
    },
    {
      href: "/developer-tools/dashboard/get-started/create-api",
      title: "Create an API key",
      description: "Learn how to create and secure an API key."
    }
  ]}
/>

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill your API
request. This means that Infura's partner service provider can service your request, but not store the
content of your request.

The following partners provide access to the BSC network:
<!-- markdown-link-check-disable -->
- BlockPI ([Terms of Use](https://blockpi.io/terms-of-use), [Privacy Policy](https://blockpi.io/privacy-policy))
- 0xFury ([Privacy policy](https://0xfury.com/privacy))
<!-- markdown-link-check-enable -->