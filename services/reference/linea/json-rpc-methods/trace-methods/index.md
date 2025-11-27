---
title: Linea trace methods
sidebar_label: Trace methods
sidebar_key: linea-trace-methods
---

# Linea trace methods

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

| Key                 |Value                                                                                                      |
|---------------------|-----------------------------------------------------------------------------------------------------------|
| `action`            | Transaction details.                                                                                      |
| `callType`          | Whether the transaction is `call` or `create`.                                                            |
| `from`              | Address of the transaction sender.                                                                        |
| `gas`               | Gas provided by sender.                                                                                   |
| `input`             | Transaction data.                                                                                         |
| `to`                | Target of the transaction.                                                                                |
| `value`             | Value transferred in the transaction.                                                                     |
| `result`            | Transaction result.                                                                                       |
| `gasUsed`           | Gas used by the transaction. Includes any refunds of unused gas.                                          |
| `output`            | Return value of the contract call. Contains only the actual value sent by a `RETURN` operation. If a `RETURN` was not executed, the output is empty bytes.  |
| `subTraces`         | Traces of contract calls made by the transaction.                                                         |
| `traceAddress`      | Tree list address of where the call occurred, address of the parents, and order of the current sub call.  |
| `transactionHash`   | Hash of the transaction.                                                                                  |
| `transactionPosition`| Transaction position.                                                                                    |
| `type`              | Whether the transaction is a `CALL` or `CREATE` series operation.                                         |
