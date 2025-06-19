---
title: Base filter methods
sidebar_label: Filter methods
description: Base filter methods
---

# Base filter methods

Infura supports the following filter methods over both HTTP and WebSocket. In both cases, the filter IDs
can be shared by any connection using the same API key.

- [`eth_getFilterChanges`](eth_getfilterchanges.mdx)
- [`eth_getFilterLogs`](eth_getfilterlogs.mdx)
- [`eth_newBlockFilter`](eth_newblockfilter.mdx)
- [`eth_newFilter`](eth_newfilter.mdx)
- [`eth_uninstallFilter`](eth_uninstallfilter.mdx)

Filters that are not polled using [`eth_getFilterChanges`](eth_getfilterchanges.mdx) automatically
expires after fifteen minutes of inactivity.
