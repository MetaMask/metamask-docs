---
description: Learn about failover protection
sidebar_position: 1
---

# Failover protection

:::info

Failover support is available on Mainnet only.

:::

Failover protection is available on the Mainnet network for customers on the Growth or Custom plans.
This feature ensures API requests are fulfilled even if Infura experiences a service issue or
outage. This is achieved by routing requests to a select partner.

Failover protection is enabled on a per-request basis by adding the failover header to your API
request (see [Enable API request forwarding](../how-to/enable-api-forwarding.md)). This gives
you control over which requests you'd like fulfilled by Infura's partner if failover protection should be needed.

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill
your API request. This means that Infura's partner service provider can service your request, but not
store the content of your request.

For any parameters required in an RPC request, these could be the type that describe the method,
addresses, gas, and session.

Bware Labs ([Terms of Service](https://bwarelabs.com/terms), [Privacy Policy](https://bwarelabs.com/privacy)) is
Infura's failover-protection partner. While Bware Labs supports most Infura methods, it does not yet support
the following methods:

- `eth_accounts`
- `eth_coinbase`
- `eth_protocolVersion`
- `eth_feeHistory`
- `eth_maxPriorityFeePerGas`
- `eth_sendTransaction`
- `eth_sign`
- `eth_syncing`
- `eth_submitWork`