---
description: Interact with users' accounts on non-EVM networks.
---

import CardList from "@site/src/components/CardList"

# Use non-EVM networks

Non-EVM networks are blockchain networks that are not compatible with the Ethereum Virtual Machine (EVM).
Non-EVM dapps and MetaMask can't directly interact with each other.
By connecting to third-party libraries or dedicated non-EVM [Snaps](https://metamask.io/snaps/), you can extend the functionality of MetaMask and integrate non-EVM networks into your existing MetaMask workflow.

MetaMask supports the following non-EVM networks:

<CardList
  items={[
    {
      href: "solana",
      title: "Solana",
      description:
        "High-performance non-EVM network.",
    },
    {
      href: "starknet",
      title: "Starknet",
      description:
        "Layer 2 network for Ethereum using ZK rollups.",
    },
  ]}
/>

:::info
See the [full list of available non-EVM Snaps](https://snaps.metamask.io/interoperability).
:::
