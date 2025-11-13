---
title: BNB Smart Chain filter methods
sidebar_label: Filter methods
sidebar_key: bnb-smart-chain-filter-methods
description: BNB Smart Chain filter methods
---

# BNB Smart Chain filter methods

Infura supports the following filter methods over both HTTP and WebSocket. In both cases, the filter IDs can be shared by any connection using the same API key.

Filters that are not polled using [`eth_getFilterChanges`](./eth_getfilterchanges.mdx) will be automatically expired after fifteen minutes of inactivity.
