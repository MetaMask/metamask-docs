---
description: Scroll network information.
---

import CardList from '@site/src/components/CardList'

# Scroll

:::note Decentralized Infrastructure Network (DIN)

Scroll is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

Infura provides Open Beta access to Scroll. During this period, there might be feature limitations. 
Performance issues are not expected, but they are possible as we optimize and stabilize the service. 

:::

Scroll is a general-purpose zero knowledge Ethereum Virtual Machine (zkEVM) rollup that uses the EVM for off-chain computations. 
This allows Scroll to scale the experience of Ethereum, ensuring cheaper and more accessible data while maintaining the robust security
inherent to Ethereum.

Infura provides access to the [Scroll JSON-RPC API](json-rpc-methods/index.md) method library that interacts with the
Scroll blockchain. Methods include functionality for reading and writing data to the network, and executing smart contracts.

:::info See also

See the [official Scroll documentation](https://docs.scroll.io/en/home/) for more information.

:::

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Scroll network."
    },
    {
      href: "json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Scroll network."
    },
    {
      href: "/developer-tools/dashboard/get-started/create-api/",
      title: "Create an API key",
      description: "Learn how to create an API key and secure and share it with your team."
    }
  ]}
/>

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill your API request. This means that Infura's partner service provider can service your request, but not store the content of your request.

The following partners provide access to the Scroll network:
<!-- markdown-link-check-disable -->
- Everstake ([Terms of Service](https://everstake.one/docs/terms-of-use.pdf), [Privacy Policy](https://everstake.one/docs/privacy-policy.pdf))
- Nodies ([Terms of Service](https://www.nodies.app/tos.txt), [Privacy Policy](https://www.nodies.app/privacy.txt))
- Chainstack ([Terms of Service](https://chainstack.com/tos/), [Privacy Policy](https://chainstack.com/privacy/))
<!-- markdown-link-check-enable -->