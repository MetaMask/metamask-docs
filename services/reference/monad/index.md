curl --url https://linea-mainnet.infura.io/v3/cae1536bcf8c4f268c37c253e6b9f625 \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'---
description: Monad network documentation.
---

import CardList from '@site/src/components/CardList'

# Monad

:::note Decentralized Infrastructure Network (DIN)

Monad is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service, meaning calls to the network are routed to
[partner infrastructure providers](#partners-and-privacy-policies).

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

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill your API request. This means that Infura's partner service provider can service your request, but not store the content of your request.

The following partners provide access to the Monad network:
<!-- markdown-link-check-disable -->
- 0xFury ([Privacy policy](https://0xfury.com/privacy.php))
- Alchemy ([Privacy Policy](https://legal.alchemy.com/#contract-sblyf8eub))
- Monad foundation ([Privacy policy](https://www.monad.xyz/privacy-policy))
<!-- markdown-link-check-enable -->
