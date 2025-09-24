---
description: opBNB network documentation
---

import CardList from "@site/src/components/CardList"

# opBNB

:::note Decentralized Infrastructure Network (DIN)

opBNB is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

Infura provides open beta access to the layer 2 opBNB and its layer 1 [BNB Smart Chain (BSC)](../bnb-smart-chain/index.md). During this period, there might be feature limitations.
Performance issues are not expected, but they are possible as we optimize and stabilize the service.

Archive requests are not currently supported for opBNB: only near head requests (the last 128 blocks) are supported. Be aware of this limitation when making calls
to API calls to methods such as [`eth_getStorageAt`](./json-rpc-methods/eth_getstorageat.mdx),
[`eth_getTransactionReceipt`](./json-rpc-methods/eth_gettransactionreceipt.mdx), and
[`eth_getTransactionByHash`](./json-rpc-methods/eth_gettransactionbyhash.mdx).

:::

opBNB is an EVM-compatible, layer 2, rollup scaling solution that operates on top of [BSC](../bnb-smart-chain/index.md). All transactions that occur on opBNB are posted and validated on BSC using Optimistic Rollups.

:::info See also

For more information, refer to the official [opBNB documentation](https://docs.bnbchain.org/bnb-opbnb/overview/).

:::

Select an option below to get started with the opBNB network.

<CardList
  items={[
    {
      href: "./quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the opBNB network."
    },
    {
      href: "./json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the opBNB network."
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

The following partners provide access to the opBNB network:
<!-- markdown-link-check-disable -->
- Infstones ([Privacy Policy](https://infstones.com/terms/privacy-notice))
- Validation Cloud ([Terms of Use](https://www.validationcloud.io/terms), [Privacy Policy](https://www.validationcloud.io/privacy))
<!-- markdown-link-check-enable -->
