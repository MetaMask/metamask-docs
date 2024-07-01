---
description: Optimism network documentation. 
---

import CardList from '@site/src/components/CardList'

# Optimism

:::note Failover protection

Optimism [failover support](../../concepts/failover-protection.md) is available for customers on the Growth or Custom plans. 
Optimism failover support is available on Mainnet only.
Calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

:::

Optimism is an EVM-compatible, layer 2, rollup scaling solution that operates on top of Ethereum. All transactions that
occur on Optimism are posted and validated on Ethereum mainnet using Optimistic Rollups.

:::info see also

- For more information on the Optimism network, please see the
    [official Optimism developer documentation](https://community.optimism.io/docs/developers/).
- Developers should be aware of some
    [important differences between the behavior of Ethereum and Optimism](https://community.optimism.io/docs/developers/build/differences/).

:::

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the Optimism network."
    },
    {
      href: "json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Optimism network."
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

For any parameters required in an RPC request, these could be the type that describe the method, addresses, gas, and session.

Bware Labs ([Terms of Service](https://bwarelabs.com/terms), [Privacy Policy](https://bwarelabs.com/privacy)) is Infura's failover-protection partner. While Bware Labs supports most Infura methods, it does not yet support the following methods:

- `eth_accounts`
- `eth_coinbase`
- `eth_protocolVersion`
- `eth_feeHistory`
- `eth_maxPriorityFeePerGas`
- `eth_sendTransaction`
- `eth_sign`
- `eth_syncing`
- `eth_submitWork` 