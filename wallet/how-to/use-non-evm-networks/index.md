---
description: Interact with users' accounts on non-EVM networks.
---

import CardList from "@site/src/components/CardList"

# Use non-EVM networks

You can interact with users' accounts on non-EVM networks by connecting to existing
[MetaMask Snaps](https://metamask.io/snaps/).

Non-EVM networks are blockchain networks that are not compatible with the Ethereum Virtual Machine (EVM).
Non-EVM dapps and MetaMask can't directly interact with each other.
By connecting to dedicated non-EVM Snaps, you can extend the functionality of MetaMask and integrate non-EVM networks into your existing MetaMask workflow.

MetaMask provides Snaps for the following networks:

<CardList
  items={[
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
