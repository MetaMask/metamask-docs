---
description: IPFS network information.
---

import CardList from '@site/src/components/CardList'

# IPFS

The [Interplanetary File System (IPFS)](../../how-to/use-ipfs/migrate-to-infuras-ipfs-service.md) is a distributed, [peer-to-peer (p2p)](https://en.wikipedia.org/wiki/Peer-to-peer) storage network used for storing and accessing files, websites, applications, and data.

:::caution Restricted access

New IPFS key creation is disabled for all users. Only IPFS keys that were active in late 2024 continue
to have access to the IPFS network.

:::

Content is accessible from peer nodes located anywhere in the world. These nodes relay information, store it, or both.

To integrate your IPFS project with Infura, create an [Infura API key](../../get-started/infura.md#2-view-your-api-key).

:::info See also

See the [official IPFS documentation](https://docs.ipfs.io) for more information. Check out the [IPFS Quick Start docs](https://docs.ipfs.io/how-to/command-line-quick-start/#prerequisites) to get up and running with IPFS.

:::

<CardList
  items={[
    {
      href: "/services/reference/ipfs/quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the IPFS network."
    },
    {
      href: "/services/reference/ipfs/http-api-methods",
      title: "HTTP APIs",
      description: "View the APIs available for communicating with the IPFS network."
    },
    {
      href: "/developer-tools/dashboard/get-started/create-api",
      title: "Create an API key",
      description: "Learn how to create and secure an API key."
    }
  ]}
/>
