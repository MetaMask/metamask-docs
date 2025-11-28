---
title: Ethereum trace methods
sidebar_label: Trace methods
sidebar_key: ethereum-trace-methods
description: Ethereum trace methods
---

# Ethereum trace methods

:::info

Trace API is an open beta feature, available to paying Infura customers. 
:::

Infura provides access to the following trace API methods that provide insights into the execution of smart contracts and transactions. 

- [`trace_block`](trace_block.mdx)
- [`trace_call`](trace_call.mdx)
- [`trace_callMany`](trace_callmany.mdx)
- [`trace_transaction`](trace_transaction.mdx)
- [`trace_filter`](trace_filter.mdx)

`trace_block`, `trace_filter`, and `trace_transaction` return [`trace`](#trace) information, while
`trace_call` and `trace_callMany`
allow you to use the [`trace`](#trace) or [`stateDiff`](#statediff) diagnostic options when tracing calls or transactions.

:::caution
Trace responses are handled generically to enable support of additional fields beyond 
those documented here. This requires graceful handling.
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

| Key                   | Value                                                                                                           |
|-----------------------|-----------------------------------------------------------------------------------------------------------------|
| `action`              | Transaction details.                                                                                            |
| &nbsp;&nbsp;- `creationMethod` | Opcode used during contract creation: `create` or `create2`. Returned for `create` operations. |
| &nbsp;&nbsp;- `callType` | Whether the transaction is `call`, `staticcall`, or `delegatecall`. Returned for `call` operations. |
| &nbsp;&nbsp;- `from`    | Address of the transaction sender.                                                                              |
| &nbsp;&nbsp;- `gas`     | Gas provided by sender.                                                                                         |
| &nbsp;&nbsp;- `input`   | Transaction data. Returned for `call` operations.                                                             |
| &nbsp;&nbsp;- `init`    | Contract initialization code. Returned for `create` operations.                                               |
| &nbsp;&nbsp;- `to`      | Target of the transaction. Returned for `call` operations.                                                   |
| &nbsp;&nbsp;- `value`   | Value transferred in the transaction.                                                                           |
| `blockHash`           | Hash of the block containing this trace.                                                                        |
| `blockNumber`         | Block number containing this trace.                                                                              |
| `result`              | Transaction result.                                                                                             |
| &nbsp;&nbsp;- `address` | Address of the newly created contract. Returned for `create` operations.                                       |
| &nbsp;&nbsp;- `code`    | Bytecode of the newly created contract. Returned for `create` operations.                                    |
| &nbsp;&nbsp;- `gasUsed` | Gas used by the transaction. Includes any refunds of unused gas.                                                |
| &nbsp;&nbsp;- `output`  | Return value of the contract call. Contains only the actual value sent by a `RETURN` operation. If a `RETURN` was not executed, the output is empty bytes. Returned for `call` operations. |
| `subtraces`           | Number of sub-traces (nested contract calls) made by the transaction.                                          |
| `traceAddress`        | Tree list address of where the call occurred, address of the parents, and order of the current sub call.        |
| `transactionHash`     | Hash of the transaction.                                                                                         |
| `transactionPosition` | Transaction position within the block.                                                                          |
| `type`                | Whether the transaction is a `call` or `create` operation.                                               |

## `stateDiff`

Displays state changes in the requested block for each transaction, represented as a map of accounts to an object. Lists
the balance, code, nonce, and storage changes from immediately before the transaction to after the transaction. For the `key:value` pairs:

- `+` indicates the field didn't exist before and now has the specified value.
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

| Key                     | Value                                    |
|-------------------------|------------------------------------------|
| `balance`               | Change of balance event.                 |
| `balance.from`          | Balance before the transaction.          |
| `balance.to`            | Balance after the transaction.           |
| `code`                  | Changes to code. None in this example.   |
| `nonce`                 | Change of nonce.                         |
| `nonce.from`            | Nonce before the transaction.            |
| `nonce.to`              | Nonce after the transaction.             |
| `storage`               | Changes to storage. None in this example.|
