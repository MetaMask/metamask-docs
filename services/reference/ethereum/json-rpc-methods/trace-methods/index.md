---
title: "Trace methods"
---

# Trace methods

Infura provides access to the following trace API methods to allow users to gain insights into the execution of smart contracts and transactions:

- [`trace_block`](trace_block.mdx)
- [`trace_call`](trace_call.mdx)
- [`trace_callMany`](trace_callmany.mdx)
- [`trace_transaction`](trace_transaction.mdx)
- [`trace_filter`](trace_filter.mdx)

:::info

Trace API is currently an open beta feature, available to paying Infura customers.

:::

When tracing transactions, the trace diagnostic options are [`trace`](#trace) and [`stateDiff`](#statediff).

:::info

`trace_block, trace_filter`, and `trace_transaction` returns `trace` information, whereas `trace_call` and `trace_callMany`
allow you to use the `trace` or `stateDiff` diagnostic options when tracing calls or transactions.

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

## `stateDiff`

Displays state changes in the requested block for each transaction, represented as a map of accounts to an object. Lists
the balance, code, nonce, and storage changes from immediately before the transaction to after the transaction. For the `key:value` pairs:

- `+` indicates the field didn’t exist before and now has the specified value.
- `-` indicates a deleted value.
- `*` has a `from` and a `to` value.

An absent value is distinct from zero when creating accounts or clearing storage. For example, when clearing storage, an absent value means that a particular storage slot has not yet been assigned a value, while a zero value means that the storage slot has been assigned and set to zero.

```json title="stateDiff example"
"stateDiff":{
  "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73":{
    "balance":{
      "*":{
        "from":"0xffffffffffffffffffffffffffffffffc3e12a20b",
        "to":"0xffffffffffffffffffffffffffffffffc3dc5f091"
      }
    },
    "code":"=",
    "nonce":{
      "*":{
        "from":"0x14",
        "to":"0x15"
      }
    },
    "storage":{
    }
  }
}
```

<table><thead><tr><th width="242">Key</th><th>Value</th></tr></thead><tbody><tr><td><code>balance</code></td><td>Change of balance event</td></tr><tr><td><code>balance</code>.<code>from</code></td><td>Balance before the transaction</td></tr><tr><td><code>balance</code>.<code>to</code></td><td>Balance after the transaction</td></tr><tr><td><code>code</code></td><td>Changes to code. None in this example</td></tr><tr><td><code>nonce</code></td><td>Change of nonce.</td></tr><tr><td><code>nonce</code>.<code>from</code></td><td>Nonce before the transaction.</td></tr><tr><td><code>nonce</code>.<code>to</code></td><td>Nonce after the transaction.</td></tr><tr><td><code>storage</code></td><td>Changes to storage. None in this example.</td></tr></tbody></table>
