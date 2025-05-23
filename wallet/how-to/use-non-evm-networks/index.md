---
description: Interact with users' accounts on non-EVM networks.
---

import CardList from "@site/src/components/CardList"

# Use non-EVM networks

Non-EVM networks are blockchain networks that are not compatible with the Ethereum Virtual Machine (EVM).
MetaMask provides different types of support for some non-EVM networks:

- **Native support** - MetaMask implements a standard interface for [Solana](solana.md) dapps to natively connect to MetaMask.
  Several third party libraries for Solana also detect and handle MetaMask by default.
- **Non-EVM Snaps** - MetaMask provides dedicated non-EVM [Snaps](https://metamask.io/snaps/) that dapps can use to interact with users' non-EVM accounts in MetaMask.
  For example, you can connect to [Starknet](starknet/index.md) in this way.

MetaMask supports the following non-EVM networks:

<CardList
  items={[
    {
      href: "solana",
      title: "Solana",
      description:
        "High-performance non-EVM network. MetaMask natively supports connecting to Solana.",
    },
    {
      href: "starknet",
      title: "Starknet",
      description:
        "Layer 2 network for Ethereum using ZK rollups. MetaMask supports connecting to Starknet via a Snap.",
    },
  ]}
/>

:::info
See the [full list of available non-EVM Snaps](https://snaps.metamask.io/interoperability).
:::
