---
description: Avalanche (C-Chain) network documentation.
---

import CardList from '@site/src/components/CardList'

# Avalanche (C-Chain)

:::note Failover protection

Avalanche (C-Chain) [failover support](../../concepts/failover-protection.md) is available for
customers on the Growth or Custom plans.
Avalanche (C-Chain) failover support is available on Mainnet only.
Calls to the network are routed to [partner infrastructure providers](#partners-and-privacy-policies).

:::

Avalanche is a Proof of Stake (PoS), layer 1 platform that features 3 built-in blockchains:
- [Contract Chain (C-Chain)](https://build.avax.network/docs/primary-network#c-chain-contract-chain)
- [Exchange Chain (X-Chain)](https://build.avax.network/docs/primary-network#x-chain-exchange-chain)
- [Platform Chain (P-Chain)](https://build.avax.network/docs/primary-network#p-chain-platform-chain)

Infura provides access to the C-Chain only.

The C-Chain supports the Ethereum Virtual Machine (EVM), allowing Ethereum developers to deploy Solidity
smart contract dapps onto the C-Chain. Dapps can run on both Avalanche and Ethereum. Avalanche
Platform's C-Chain is EVM-compatible, but it is not identical.

:::info See also

- View the [official Avalanche C-Chain documentation](https://build.avax.network/)
for more information about building on the Avalanche C-Chain.

:::

Select one of the following options to get started with the Avalanche C-Chain network:

<CardList
  items={[
    {
      href: "/services/reference/avalanche-c-chain/quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect to Avalanche C-Chain and make calls to the network."
    },
    {
      href: "/services/reference/avalanche-c-chain/json-rpc-methods",
      title: "JSON-RPC APIs",
      description: "View the APIs available for communicating with the Avalanche C-Chain network."
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

Liquify ([Privacy Policy](https://www.liquify.com/Liquify_RPC_PP.pdf)) is Infura's failover-protection partner and currently offers failover support for all Infura's Avalanche (C-Chain) methods.
