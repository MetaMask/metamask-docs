---
description: Failover protection for API requests.
---

# Failover protection

:::info

Arbitrum failover support is available on Mainnet only.

:::

Failover protection is available on the Arbitrum Mainnet network for customers on the
Growth or Custom plans. This feature ensures API requests are fulfilled even if Infura experiences
a service issue or outage. This is achieved by routing requests to a select partner.

Failover protection is enabled on a per-request basis by adding the failover header to your API
request (see [Enable API request forwarding](../how-to/failover-protection-imp-arbitrum.md)). This gives you control over
which requests you'd like fulfilled by Infura's partner if failover protection should be needed.

## Partners and privacy policies

No personal information is sent as part of partner requests, only information necessary to fulfill
your API request. This means that Infura's partner service provider can service your request, but not
store the content of your request.

For any parameters required in an RPC request, these could be the type that describe the method,
addresses, gas, and session.

Liquify ([Privacy Policy](https://www.liquify.com/Liquify_RPC_PP.pdf)) is Infura's failover-protection partner and
currently offer failover support for all Infura's Arbitrum methods.