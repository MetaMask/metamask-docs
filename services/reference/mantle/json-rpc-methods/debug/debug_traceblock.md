---
description: debug_traceBlock API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# debug_traceBlock

Returns full trace of all invoked opcodes of all transactions included in the block.

## Parameters

- `block`: (string) RLP of the block
- Optional tracing options object with the following fields:
  - `tracer`: (string) _[optional]_ type of tracer. Supports [`callTracer`](index.md#calltracer) or
    [`prestateTracer`](index.md##prestatetracer).
  - `tracerConfig`: (object) _[optional]_ tracer configuration options:
    - `onlyTopCall`: (boolean) _[optional]_ when `true`, will only trace the primary (top-level) call and not any
      sub-calls. It eliminates the additional processing for each call frame.

## Returns

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
  -d '{"jsonrpc": "2.0", "method": "debug_traceBlock", "params": ["0xf90277f90208a05a41d0e66b4120775176c09fcf39e7c0520517a13d2b57b18d33d342df038bfca01dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d4934794e6a7a1d47ff21b6321162aea7c6cb457d5476bcaa00e0df2706b0a4fb8bd08c9246d472abbe850af446405d9eba1db41db18b4a169a04513310fcb9f6f616972a3b948dc5d547f280849a87ebb5af0191f98b87be598a0fe2bf2a941abf41d72637e5b91750332a30283efd40c424dc522b77e6f0ed8c4b9010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000860153886c1bbd82b44382520b8252088455c426598b657468706f6f6c2e6f7267a0b48c515a9dde8d346c3337ea520aa995a4738bb595495506125449c1149d6cf488ba4f8ecd18aab215f869f86780862d79883d2000825208945df9b87991262f6ba471f09758cde1c0fc1de734827a69801ca088ff6cf0fefd94db46111149ae4bfc179e9b94721fffd821d38d16464b3f71d0a045e0aff800961cfce805daef7016b9b675c137a6a41a548f7b60a3484c06a33ac0", {"tracer": "callTracer"}], "id": 1}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": [
    {
      "result": {
        "from": "0x8894e0a0c962cb723c1976a4421c95949be2d4e3",
        "gas": "0x2d48c",
        "gasUsed": "0xc7ab",
        "to": "0x55d398326f99059ff775485246999027b3197955",
        "input": "0xa9059cbb0000000000000000000000003b9f33b3a9d382fa60283c555bde8f78855957be00000000000000000000000000000000000000000000000d4e7f4f79da7c0000",
        "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
        "value": "0x0",
        "type": "CALL"
      }
    }
  ]
}
```
