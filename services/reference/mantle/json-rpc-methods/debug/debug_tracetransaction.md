---
description: debug_traceTransaction API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# debug_traceTransaction

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

Replace `YOUR-API-KEY` with an API key from your [Infura dashboard](https://infura.io/dashboard).

### Request

<Tabs>
  <TabItem value="cURL" label="cURL" default>

```bash
curl https://mantle-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"method":"debug_traceTransaction","params":["0xdcecf3f9fc68c92276d6c4b40c17b185f8a3fcb9d1a959a495d38d480782404b", {"tracer": "callTracer"}],"id":1,"jsonrpc":"2.0"}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "from": "0x3e9bde7e023b4f9de05975b566cd41c771f3fb49",
    "gas": "0x3fdd6",
    "gasUsed": "0xd418142",
    "to": "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9",
    "input": "0x095ea7b30000000000000000000000002f6f07cdcf3588944bf4c42ac74ff24bf56e7590ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
    "calls": [
      {
        "from": "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9",
        "gas": "0x3d278",
        "gasUsed": "0x79be",
        "to": "0x9aff718f2a4ed4c310d6d2da0d2fb30a5f6a9ddc",
        "input": "0x095ea7b30000000000000000000000002f6f07cdcf3588944bf4c42ac74ff24bf56e7590ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
        "value": "0x0",
        "type": "DELEGATECALL"
      }
    ],
    "value": "0x0",
    "type": "CALL"
  }
}
```
