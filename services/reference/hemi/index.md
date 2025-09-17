---
description: Hemi network documentation.
---

import CardList from '@site/src/components/CardList'

# Hemi

:::note Decentralized Infrastructure Network (DIN)

Hemi is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

:::

Hemi network brings together the security of Bitcoin and the programmability of Ethereum. Built using Bitcoin as a security layer, Hemi enables developers to build decentralized applications that benefit from Bitcoin's security while leveraging Ethereum's rich ecosystem and tooling.

Smart contracts can directly access Bitcoin state and verify Bitcoin transactions, all while using standard Ethereum development frameworks.

:::info See also

- The [official Hemi documentation](https://docs.hemi.xyz/) for more information.
- Build Bitcoin-aware dapps on the EVM using the
    [Hemi Bitcoin Kit (hBK)](https://docs.hemi.xyz/building-bitcoin-apps/hemi-bitcoin-kit-hbk).

:::

Select an option below to get started with the Hemi network.

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Hemi network."
    },
    {
      href: "json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Hemi network."
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

The following partners provide access to the Hemi network:
<!-- markdown-link-check-disable -->
- Infstones ([Privacy Policy](https://infstones.com/terms/privacy-notice))
- Simply Staking ([Privacy Policy](https://simplystaking.com/privacy-policy))
<!-- markdown-link-check-enable -->