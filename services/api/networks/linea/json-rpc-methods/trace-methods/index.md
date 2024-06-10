---
title: "Trace methods"
---

# Trace methods

Infura provides access to the following trace API methods to allow users to gain insights into the execution of smart contracts and transactions:

- [`trace_block`](trace_block.mdx)
- [`trace_transaction`](trace_transaction.mdx)

:::info

- Trace API is currently an open beta feature, available to paying Infura customers.
- `trace_block` and `trace_transaction` returns [`trace`](#trace) diagnostic information.

:::

## `trace`

Provides an ordered trace of the instructions executed by the Ethereum Virtual Machine (EVM) during the execution of a
smart contract transaction. Excludes precompiled contracts.

```json title="Trace example"
"trace":[
  {
    "action":{
      "callType":"call",
      "from":"0xfe3b557e8fb62b89f4916b721be55ceb828dbd73",
      "gas":"0xffadea",
      "input":"0x",
      "to":"0x0100000000000000000000000000000000000000",
      "value":"0x0"
    },
    "result":{
      "gasUsed":"0x1e",
      "output":"0x"
    },
    "subtraces":0,
    "traceAddress":[
    ],
    "type":"call"
  }
]
```

<table><thead><tr><th width="242">Key</th><th>Value</th></tr></thead><tbody><tr><td><code>action</code> </td><td>Transaction details.</td></tr><tr><td><code>callType</code></td><td> Whether the transaction is <code>call</code> or <code>create</code>.</td></tr><tr><td><code>from</code></td><td>Address of the transaction sender.</td></tr><tr><td><code>gas</code></td><td>Gas provided by sender.</td></tr><tr><td><code>input</code></td><td>Transaction data.</td></tr><tr><td><code>to</code></td><td>Target of the transaction.</td></tr><tr><td><code>value</code></td><td>Value transferred in the transaction.</td></tr><tr><td><code>result</code></td><td>Transaction result.</td></tr><tr><td><code>gasUsed</code></td><td>Gas used by the transaction. Includes any refunds of unused gas.</td></tr><tr><td><code>output</code></td><td>Return value of the contract call. Contains only the actual value sent by a <code>RETURN</code> operation. If a <code>RETURN</code> was not executed, the output is empty bytes.</td></tr><tr><td><code>subTraces</code></td><td>Traces of contract calls made by the transaction.</td></tr><tr><td><code>traceAddress</code></td><td>Tree list address of where the call occurred, address of the parents, and order of the current sub call.</td></tr><tr><td><code>transactionHash</code></td><td>Hash of the transaction.</td></tr><tr><td><code>transactionPosition</code></td><td>Transaction position.</td></tr><tr><td><code>type</code></td><td>Whether the transaction is a <code>CALL</code> or <code>CREATE</code> series operation.</td></tr></tbody></table>