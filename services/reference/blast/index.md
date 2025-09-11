---
description: Blast network documentation.
---

import CardList from '@site/src/components/CardList'

# Blast

:::note Decentralized Infrastructure Network (DIN)

Blast is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

Infura provides Open Beta access to Blast. During this period, there might be feature limitations. Performance issues are not expected, but they are possible as we optimize and stabilize the service.

:::

Blast is an Ethereum layer 2 (L2) scaling solution that uses an optimistic rollup architecture, providing a
familiar experience for Ethereum users and developers.

Blast aims to provide native yield for ETH and stablecoins. Additionally, Blast shares gas revenue with decentralized
applications (dapps), allowing developers to subsidize gas fees for users or keep the revenue for themselves.

:::info See also

See also the [official Blast documentation](https://docs.blast.io/about-blast) for more information.

:::

Select one of the following options to get started with the Blast network:

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Blast network."
    },
    {
      href: "json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Blast network."
    },
    {
      href: "../../../developer-tools/dashboard/get-started/create-api/",
      title: "Create an API key",
      description: "Learn how to create and secure an API key."
    }
  ]}
/>

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill your API request. This means that Infura's partner service provider can service your request, but not store the content of your request.

The following partners provide access to the Blast network:

- Nodies DLB ([Terms of Use](https://www.nodies.app/tos.txt), [Privacy Policy](https://www.nodies.app/privacy.txt))
- Bware Labs ([Terms of Use](https://bwarelabs.com/terms), [Privacy Policy](https://bwarelabs.com/privacy))
