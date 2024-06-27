---
description: Learn about failover protection
sidebar_position: 1
---

# Failover protection

Failover protection is available on the following networks for customers on the Growth or Custom plans:

- [Arbitrum](../reference/arbitrum/index.md)
- [Avalanche (C-Chain)](../reference/avalanche-c-chain/index.md)
- [Optimism](../reference/optimism/index.md)
- [Polygon](../reference/polygon-pos/index.md) 

The failover protection feature ensures API requests are fulfilled even if Infura experiences a service issue or
outage. This is achieved by routing requests to a select partner.

Failover protection is enabled on a per-request basis by adding the failover header to your API
request (see [Enable API request forwarding](../how-to/enable-api-forwarding.md)). This gives
you control over which requests you'd like fulfilled by Infura's partner if failover protection should be needed.