---
description: BNB Smart Chain network documentation
---

import CardList from "@site/src/components/CardList"

# BNB Smart Chain

:::note Decentralized Infrastructure Network (DIN)

BNB Smart Chain (BSC) is supported through the [DIN](https://www.infura.io/solutions/decentralized-infrastructure-service) service,
meaning calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

Infura provides Open Beta access to BSC. During this period, there might be feature limitations. 
Performance issues are not expected, but they are possible as we optimize and stabilize the service.

Currently, only near head requests (the last 128 blocks) are supported in the
BSC service. Archive requests are not currently supported. Be aware of this limitation when making calls
to API calls to methods such as [`eth_getStorageAt`](./json-rpc-methods/eth_getstorageat.mdx),
[`eth_getTransactionReceipt`](./json-rpc-methods/eth_gettransactionreceipt.mdx), and
[`eth_getTransactionByHash`](./json-rpc-methods/eth_gettransactionbyhash.mdx).

:::

BBNB Smart Chain is a self-sovereign blockchain with elected validators running a Proof of Staked
Authority (PoSA) consensus protocol. It is EVM-compatible and supports existing Ethereum tooling.

:::info See also

For more information, refer to the official [BSC documentation](https://docs.bnbchain.org/bnb-smart-chain/).

:::

Select an option below to get started with the BSC network. 

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the BNB Smart Chain network."
    },
    {
      href: "json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the BNB Smart Chain network."
    },
    {
      href: "../../../developer-tools/dashboard/get-started/create-api/",
      title: "Create an API key",
      description: "Learn how to create an API key and secure and share it with your team."
    }
  ]}
/>

## Partners and privacy policies

The following partners provide access to the BSC network:
<!-- markdown-link-check-disable -->
- Chainstack ([Terms of Service](https://chainstack.com/tos/), [Privacy Policy](https://chainstack.com/privacy/))
- Infstones ([Privacy Policy](https://infstones.com/terms/privacy-notice))
- Liquify ([Privacy Policy](https://www.liquify.com/Liquify_RPC_PP.pdf))
<!-- markdown-link-check-enable -->