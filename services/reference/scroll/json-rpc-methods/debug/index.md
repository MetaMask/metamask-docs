---
description: Scroll debug methods.
sidebar_label: Debug methods
---

# Scroll debug methods

The debug API methods allow you to inspect and debug the network. Infura supports the following debug 
methods on the Scroll network:

- [`debug_traceBlock`](debug_traceblock.mdx)
- [`debug_traceBlockByHash`](debug_traceblockbyhash.mdx)
- [`debug_traceBlockByNumber`](debug_traceblockbynumber.mdx)
- [`debug_traceCall`](debug_tracecall.mdx)

## Debug tracing types

The debug methods support the `callTracer` and `prestateTracer` tracing types, which return different
results when specified in the supported debug methods.

### `callTracer`

The `callTracer` tracing type tracks all the call frames executed during a transaction, including the
initial call. It returns a nested list of call frames, resembling how the EVM works. They form a tree
with the top-level call at the root and sub-calls as children of the higher levels.

The `callTracer` type returns an object with the following results:

| Field          | Type   | Description                                                                                                          |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| `type`         | string | The type of call.                                                                                                    |
| `from`         | string | The address the transaction is sent from.                                                                            |
| `to`           | string | The address the transaction is directed to.                                                                          |
| `value`        | string | The amount transferred in the call (hex-encoded).                                                                    |
| `gas`          | string | The amount of gas provided for the call (hex-encoded).                                                               |
| `gasUsed`      | string | The amount of gas used by the call (hex-encoded).                                                                    |
| `input`        | string | The call data.                                                                                                       |
| `output`       | string | The return data.                                                                                                     |
| `error`        | string | If an error occurred during the call, this field will contain the error message.                                     |
| `revertReason` | string | If the contract execution was reverted, this field will contain the reason for the revert (if provided by Solidity). |
| `calls`        | array  | Sub-calls made by the contract during the execution of the transaction.                                              |

### `prestateTracer`

The `prestateTracer` tracing type records and tracks every change made to the state during the execution
of transactions. It generates an object that contains keys representing the addresses of the accounts
involved in the transactions. The corresponding values are objects that include specific fields related
to the state changes made during the transaction:

| Field     | Type   | Description                          |
| --------- | ------ | ------------------------------------ |
| `balance` | string | The account balance.                 |
| `nonce`   | uint64 | The nonce value for the transaction. |
| `code`    | string | The hex-encoded bytecode.            |
| `storage` | map    | The storage slots of the contract.   |
