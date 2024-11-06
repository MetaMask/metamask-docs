---
description: Trace transactions
sidebar_position: 6
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Trace transactions

:::info

Trace API is currently an open beta feature, available to paying Infura customers.

:::

Infura provides access to a trace API that allows you to get detailed transaction processing information. Use the API to
extract information about contract interactions, transactions, and blocks on the Ethereum network. You can
also use the API to retrieve transaction details that are not recorded on the blockchain. For example, use the
[`trace_call`](../reference/ethereum/json-rpc-methods/trace-methods/trace_call.mdx) API to observe contract interactions.

![Example for using the `trace_call` API](../images/trace-call.png)

:::tip

View the [trace API tutorial](https://www.youtube.com/watch?v=RpjbiDlwPEs) for more information on how to call the API to
trace, debug, analyze, and secure smart contracts.

:::

The trace API provides endpoints that can be categorized into the following groups, [ad-hoc tracing APIs](#ad-hoc-tracing-apis)
and [transaction-trace filtering APIs](#transaction-trace-filtering-apis).

## Ad-hoc tracing APIs

These API endpoints allow you to use the [`trace`](../reference/ethereum/json-rpc-methods/trace-methods/index.md#trace) or
[`stateDiff`](../reference/ethereum/json-rpc-methods/trace-methods/index.md#statediff) diagnostic options when tracing calls or transactions, and are
helpful for debugging transactions and analyzing state changes.

:::info

The `vmTrace` diagnostic option is not supported.

:::

The ad-hoc tracing API endpoints are:

- [`trace_call`](../reference/ethereum/json-rpc-methods/trace-methods/trace_call.mdx)
- [`trace_callMany`](../reference/ethereum/json-rpc-methods/trace-methods/trace_callmany.mdx)

## Transaction-trace filtering APIs

These API endpoints allow you to filter and search by specific information such as the block, address, or transaction. The endpoints
only use the [`trace`](../reference/ethereum/json-rpc-methods/trace-methods/index.md) diagnostic option. The transaction-trace filtering API endpoints are:

- [`trace_block`](../reference/ethereum/json-rpc-methods/trace-methods/trace_block.mdx)
- [`trace_transaction`](../reference/ethereum/json-rpc-methods/trace-methods/trace_transaction.mdx)
- [`trace_filter`](../reference/ethereum/json-rpc-methods/trace-methods/trace_filter.mdx)

## Trace a transaction example

In the following example,you'll trace a transaction using a transaction hash on Ethereum mainnet. The result displays two traces, meaning two separate calls were made within the transaction, and includes the gas used for each call.

This example represents a call to the `transfer` function of an ERC-20 token contract (indicated in the `input` field), transferring tokens to the address, `0x7154980e9be95eab4eef2269650d4c7e17f156b8`.

<Tabs>
  <TabItem value="curl" label="curl" default>

```bash
curl https://mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "trace_transaction", "params": ["0x1e404c4bf580688c5527df2ce5aceb3db5de49479ab7dd321dd4615e4f5a7a5c"], "id": 1}'
```

  </TabItem>
  <TabItem value="Result" label="Result" >

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "action": {
        "callType": "call",
        "from": "0x6438b5009a81b85800511f12a3d15f61fb553f53",
        "gas": "0x12f44",
        "input": "0xa9059cbb0000000000000000000000007154980e9be95eab4eef2269650d4c7e17f156b80000000000000000000000000000000000000000000000000000000033721c51",
        "to": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "value": "0x0"
      },
      "blockHash": "0xb85642efcf81c2dc0d0db617bd83b1aacb3de2df930e43f555732875b08d4e0f",
      "blockNumber": 17317923,
      "result": {
        "gasUsed": "0xabf1",
        "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
      },
      "subtraces": 1,
      "traceAddress": [],
      "transactionHash": "0x1e404c4bf580688c5527df2ce5aceb3db5de49479ab7dd321dd4615e4f5a7a5c",
      "transactionPosition": 121,
      "type": "call"
    },
    {
      "action": {
        "callType": "delegatecall",
        "from": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "gas": "0x10eac",
        "input": "0xa9059cbb0000000000000000000000007154980e9be95eab4eef2269650d4c7e17f156b80000000000000000000000000000000000000000000000000000000033721c51",
        "to": "0xa2327a938febf5fec13bacfb16ae10ecbc4cbdcf",
        "value": "0x0"
      },
      "blockHash": "0xb85642efcf81c2dc0d0db617bd83b1aacb3de2df930e43f555732875b08d4e0f",
      "blockNumber": 17317923,
      "result": {
        "gasUsed": "0x8f78",
        "output": "0x0000000000000000000000000000000000000000000000000000000000000001"
      },
      "subtraces": 0,
      "traceAddress": [0],
      "transactionHash": "0x1e404c4bf580688c5527df2ce5aceb3db5de49479ab7dd321dd4615e4f5a7a5c",
      "transactionPosition": 121,
      "type": "call"
    }
  ]
}
```

  </TabItem>
</Tabs>

## Use cases

Use cases for the trace API include:

- **Debugging transactions** - The trace API allows you to analyze and debug Ethereum transactions. Trace the execution of a transaction to identify issues or bugs in smart contracts or dapps. Track the sequence of operations, inspect the input and output data, and pinpoint potential errors or unexpected behavior.&#x20;
- **Optimizing gas usage** - The trace API allows you to analyze the gas consumption of transactions and identify areas where gas usage can be optimized. By examining the execution trace, you can spot expensive operations, inefficient code patterns, or unnecessary computations that consume excessive gas. You can use this information to refactor smart contracts and reduce transaction costs for users.
- **Security auditing** - Conduct security audits of smart contracts and dapps by tracing the execution flow. This allows you to identify potential vulnerabilities or attack vectors in the code. You can analyze contract interactions, track data modifications, and validate that the smart contract behaves as intended. This helps uncover security loopholes and ensures that the smart contracts are robust against various types of attacks, such as reentrancy or unauthorized access.
