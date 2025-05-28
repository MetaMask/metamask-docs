---
title: Scroll filter methods
sidebar_label: Filter methods
description: Scroll filter methods
---

# Scroll filter methods

Infura supports the following filter methods over both HTTP and WebSocket. In both cases, the filter IDs can be shared by any connection using the same API key.

Filters that are not polled using [`eth_getFilterChanges`](eth_getfilterchanges.mdx) will be automatically expired after fifteen minutes of inactivity.
