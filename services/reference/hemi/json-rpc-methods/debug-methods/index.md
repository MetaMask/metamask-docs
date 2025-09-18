---
description: Hemi Network debug methods
sidebar_position: 2
---

# Debug methods

Debug methods provide access to several non-standard RPC methods that allow developers to trace transactions and get detailed information about execution.

## Available methods

- [`debug_getBadBlocks`](debug_getbadblocks.mdx) - Returns a list of the last "bad blocks" that the
    client has seen on the network
- [`debug_storageRangeAt`](debug_storagerangeat.mdx) - Returns the storage at the given block height
    and transaction index
- [`debug_traceBlock`](debug_traceblock.mdx) - Returns the structured logs created during the
    execution of EVM between two blocks
- [`debug_traceBlockByHash`](debug_traceblockbyhash.mdx) - Returns the structured logs created during
    the execution of EVM for the block by hash
- [`debug_traceBlockByNumber`](debug_traceblockbynumber.mdx) - Returns the structured logs created
    during the execution of EVM for the block by number
- [`debug_traceCall`](debug_tracecall.mdx) - Returns the structured logs created during the execution
    of EVM for a call
- [`debug_traceTransaction`](debug_tracetransaction.mdx) - Returns the structured logs created during
    the execution of EVM