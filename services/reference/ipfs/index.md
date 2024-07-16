---
description: IPFS network information.
---

import CardList from '@site/src/components/CardList'

# IPFS

The [Interplanetary File System (IPFS)](../../how-to/use-ipfs/migrate-to-infuras-ipfs-service.md) is a distributed, [peer-to-peer (p2p)](https://en.wikipedia.org/wiki/Peer-to-peer) storage network used for storing and accessing files, websites, applications, and data.

:::caution Limited access

Infura is currently limiting IPFS services to customers that already have an active IPFS key.
New IPFS key creation is disabled for new and existing customers.

:::

Content is accessible from peer nodes located anywhere in the world. These nodes relay information, store it, or both.

To integrate your IPFS project with Infura, create an [Infura API key](../../get-started/infura.md#2-create-an-api-key).

:::info See also

See the [official IPFS documentation](https://docs.ipfs.io) for more information. Check out the [IPFS Quick Start docs](https://docs.ipfs.io/how-to/command-line-quick-start/#prerequisites) to get up and running with IPFS.

:::

<CardList
  items={[
    {
      href: "quickstart",
      title: "Quickstart",
      description: "Learn how to quickly connect and make calls to the IPFS network."
    },
    {
      href: "http-api-methods",
      title: "HTTP APIs",
      description: "View the APIs available for communicating with the IPFS network."
    },
    {
      href: "../../../developer-tools/dashboard/get-started/create-api/",
      title: "Create an API key",
      description: "Learn how to create an API key and secure and share it with your team."
    }
  ]}
/>
