---
description: HyperEVM debug methods.
sidebar_label: Debug methods
sidebar_key: hyperevm-debug-methods
---

# HyperEVM debug methods

The debug API methods allow you to inspect and debug the network. Infura supports the following debug methods on the HyperEVM mainnet:

- [`debug_traceCall`](debug_tracecall.mdx)
- [`debug_traceBlockByHash`](debug_traceblockbyhash.mdx)
- [`debug_traceBlockByNumber`](debug_traceblockbynumber.mdx)
- [`debug_traceTransaction`](debug_tracetransaction.mdx)

::::info
HyperEVM only supports the **latest block** view. In practice, block parameters must be `latest` and block hashes must refer to the latest block.
::::


