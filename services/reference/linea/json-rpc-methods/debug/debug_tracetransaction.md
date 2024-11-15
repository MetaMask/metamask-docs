---
description: debug_traceTransaction API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `debug_traceTransaction`

Returns tracing results for the specified transaction.

## Parameters

- `transactionHash`: (string) _[required]_ hash of the block to trace.
- Optional tracing options object with the following fields:
  - `tracer`: (string) _[optional]_ type of tracer. Supports [`callTracer`](index.md#calltracer) or
    [`prestateTracer`](index.md##prestatetracer).
  - `tracerConfig`: (object) _[optional]_ tracer configuration options:
    - `onlyTopCall`: (boolean) _[optional]_ when `true`, will only trace the primary (top-level) call and not any
      sub-calls. It eliminates the additional processing for each call frame.
  - `timeout`: (string) _[optional]_ string of decimals numbers to set the timeout. The default is 5 seconds. The maximum
    timeout is 10 seconds. Valid units are `ns`, `us`, `ms`, `s`. For example, `3s30ms`.

# Returns

Depending on the specified tracer type, returns a [`callTracer`](index.md##calltracer) object or
[`prestateTracer`](index.md#prestatetracer) object.

## Example

### Request

<Tabs>
  <TabItem value="curl" label="curl" default>

```bash
curl https://linea-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "debug_traceTransaction", "params": ["0x5d3faa9b9605a8fb04d989a79bfe6d3b708bdcfc66048d2fe18ed2dda4a8297c", {"tracer": "callTracer"}], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS" label="WSS" >

```bash
wscat -c wss://linea-mainnet.infura.io/ws/v3/<YOUR-API-KEY> -x '{"jsonrpc": "2.0", "method": "debug_traceTransaction", "params": ["0x5d3faa9b9605a8fb04d989a79bfe6d3b708bdcfc66048d2fe18ed2dda4a8297c", {"tracer": "callTracer"}], "id": 1}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "from": "0xa5ba45f484bc67fe293cf01f7d92d5ba3514dd42",
    "gas": "0x5208",
    "gasUsed": "0x5208",
    "input": "0x",
    "to": "0x45a318273749d6eb00f5f6ca3bc7cd3de26d642a",
    "type": "CALL",
    "value": "0x2ca186f5fda8004"
  }
}
```
