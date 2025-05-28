---
description: Returns the number of possible tracing results in the context of the given block execution.
title: Mantle debug_traceCall
sidebar_label: debug_traceCall
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `debug_traceCall`

Returns the number of possible tracing result by executing an `eth_call` within the context of the
given block execution.

## Parameters

- Transaction object with the following fields:
  - `from`: (string) address (20 bytes) the transaction is sent from.
  - `to`: (string) _[required]_ address (20 bytes) the transaction is directed to.
  - `gas`: (string) hexadecimal value of the gas provided for the transaction execution. `eth_call` consumes zero
    gas, but this parameter may be needed by some executions.
  - `gasPrice`: (string) hexadecimal value of the `gasPrice` used for each paid gas.
  - `maxPriorityFeePerGas`: (string) maximum fee, in wei, the sender is willing to pay per gas above the base fee.
    See [EIP-1559 transactions](../../../../concepts/transaction-types.md#eip-1559-transactions).
  - `maxFeePerGas`: (string) maximum total fee (base fee + priority fee), in wei, the sender is willing to pay per gas.
    See [EIP-1559 transactions](../../../../concepts/transaction-types.md#eip-1559-transactions).
  - `value`: (string) hexadecimal of the value sent with this transaction.
  - `data`: (string) hash of the method signature and encoded parameters.
    See [Ethereum contract ABI specification](https://docs.soliditylang.org/en/latest/abi-spec.html).
- `block parameter`: [_Required_] hexadecimal block number, or one of the string tags
  `latest`, `earliest`, `pending`, `safe`, or `finalized`.
  See the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block).
- Optional tracing options object with the following fields:
  - `tracer`: (string) _[optional]_ type of tracer. Supports [`callTracer`](../debug/index.md#calltracer) or
    [`prestateTracer`](../debug/index.md#prestatetracer).
  - `tracerConfig`: (object) _[optional]_ tracer configuration options:
    - `onlyTopCall`: (boolean) _[optional]_ when `true`, will only trace the primary (top-level) call and not any
      sub-calls. It eliminates the additional processing for each call frame.

## Returns

Depending on the specified tracer type, returns a [`callTracer`](../debug/index.md#calltracer) object or
[`prestateTracer`](../debug/index.md#prestatetracer) object.

## Example

Replace `<YOUR-API-KEY>` with an API key from your [MetaMask Developer dashboard](https://developer.metamask.io/).

### Request

<Tabs>
  <TabItem value="curl" label="curl" default>

```bash
curl https://mantle-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "debug_traceCall", "params": [{"to": "0x6b175474e89094c44da98b954eedeac495271d0f", "data": "0x70a082310000000000000000000000006E0d01A76C3Cf4288372a29124A26D4353EE51BE"}, "latest", {"tracer": "callTracer"}], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS" label="WSS" default>

```bash
wscat -c wss://mantle-mainnet.infura.io/ws/v3/<YOUR-API-KEY> -x '{"jsonrpc": "2.0", "method": "debug_traceCall", "params": [{"to": "0x6b175474e89094c44da98b954eedeac495271d0f", "data": "0x70a082310000000000000000000000006E0d01A76C3Cf4288372a29124A26D4353EE51BE"}, "latest", {"tracer": "callTracer"}], "id": 1}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "from": "0x0000000000000000000000000000000000000000",
    "gas": "0x28cc0",
    "gasUsed": "0x3635000",
    "to": "0x6b175474e89094c44da98b954eedeac495271d0f",
    "input": "0x70a082310000000000000000000000006e0d01a76c3cf4288372a29124a26d4353ee51be",
    "value": "0x0",
    "type": "CALL"
  }
}
```
