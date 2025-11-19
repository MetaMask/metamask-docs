---
description: Mantle network documentation.
---

import CardList from '@site/src/components/CardList'

# Mantle

:::note Decentralized Infrastructure Network (DIN)

Mantle is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

Infura provides Open Beta access to Mantle. During this period, there might be feature limitations. Performance issues are not expected, but they are possible as we optimize and stabilize the service.

:::

Mantle is an Ethereum layer 2 (L2) scaling solution that leverages an optimistic rollup architecture
to offer a seamless experience for both users and developers within the Ethereum ecosystem.
By integrating a modular design, the Mantle network enhances this architecture with innovative data
availability solutions.

This approach not only ensures cheaper and more accessible data but also maintains the robust security
inherent to Ethereum, making it an efficient and secure choice for scaling Ethereum applications.

:::info See also

See also the [official Mantle documentation](https://docs-v2.mantle.xyz/) for more information.

:::

Select one of the following options to get started with the Mantle network:

<CardList
  items={[
    {
      href: "/services/reference/mantle/quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Mantle network."
    },
    {
      href: "/services/reference/mantle/json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Mantle network."
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

The following partner provides access to the Mantle network:

- 0xFury ([Privacy policy](https://0xfury.com/privacy.php))
- Bware Labs ([Terms of Use](https://bwarelabs.com/terms), [Privacy Policy](https://bwarelabs.com/privacy))
