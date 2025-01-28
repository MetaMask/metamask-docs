---
description: debug_traceBlockByHash API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `debug_traceBlockByHash`

Returns tracing results by executing all transactions in the block specified by the block hash.

## Parameters

- `blockHash`: (string) _[required]_ hash of the block to trace.
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
  -d '{"jsonrpc": "2.0", "method": "debug_traceBlockByHash", "params": ["0xec8cb29209d9170b31008738ec9e80acc22257249cfd0f4bce19590cd09834c8", {"tracer": "callTracer"}], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS" label="WSS" default>

```bash
wscat -c wss://mantle-mainnet.infura.io/ws/v3/<YOUR-API-KEY> -x'{"jsonrpc": "2.0", "method": "debug_traceBlockByHash", "params": ["0xec8cb29209d9170b31008738ec9e80acc22257249cfd0f4bce19590cd09834c8", {"tracer": "callTracer"}], "id": 1}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    {
      "result": {
        "from": "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0001",
        "gas": "0xee8c8",
        "gasUsed": "0xd7f9",
        "to": "0x4200000000000000000000000000000000000015",
        "input": "0x015d8eb900000000000000000000000000000000000000000000000000000000012c62af000000000000000000000000000000000000000000000000000000006621c18b00000000000000000000000000000000000000000000000000000001de9ff92bbca330c2c309ce531df6a0861dfbb166848c5634054dc1552c9b54e6f98a83b100000000000000000000000000000000000000000000000000000000000000000000000000000000000000002f40d796917ffb642bd2e2bdd2c762a5e40fd74900000000000000000000000000000000000000000000000000000000000000bc0000000000000000000000000000000000000000000000000000000000002710",
        "calls": [
          {
            "from": "0x4200000000000000000000000000000000000015",
            "gas": "0xe9a0d",
            "gasUsed": "0x6af8",
            "to": "0xc0d3c0d3c0d3c0d3c0d3c0d3c0d3c0d3c0d30015",
            "input": "0x015d8eb900000000000000000000000000000000000000000000000000000000012c62af000000000000000000000000000000000000000000000000000000006621c18b00000000000000000000000000000000000000000000000000000001de9ff92bbca330c2c309ce531df6a0861dfbb166848c5634054dc1552c9b54e6f98a83b100000000000000000000000000000000000000000000000000000000000000000000000000000000000000002f40d796917ffb642bd2e2bdd2c762a5e40fd74900000000000000000000000000000000000000000000000000000000000000bc0000000000000000000000000000000000000000000000000000000000002710",
            "value": "0x0",
            "type": "DELEGATECALL"
          }
        ],
        "value": "0x0",
        "type": "CALL"
      }
    }
```
