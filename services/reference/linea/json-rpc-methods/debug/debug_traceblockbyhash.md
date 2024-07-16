---
description: debug_traceBlockByHash API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# debug_traceBlockByHash

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

Depending on the specified tracer type, returns a [`callTracer`](../debug/index.md##calltracer) object or
[`prestateTracer`](../debug/index.md#prestatetracer) object.

## Example

### Request

<Tabs>
  <TabItem value="cURL" label="cURL" default>

```bash
curl https://linea-goerli.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "debug_traceBlockByHash", "params": ["0xcc4e47e5f5e82c12ccd511e97f6994b4c4f95808778323ed5cf0a56640b0a815", {"tracer": "callTracer"}], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS" label="WSS">

```bash
wscat -c wss://linea-goerli.infura.io/ws/v3/<YOUR-API-KEY> -x '{"jsonrpc": "2.0", "method": "debug_traceBlockByHash","params": ["0xcc4e47e5f5e82c12ccd511e97f6994b4c4f95808778323ed5cf0a56640b0a815", {"tracer": "callTracer"}], "id": 1}'
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
                "calls": [
                    {
                        "from": "0xa0013f511c70f01c077a8f809e36b905a0d16c95",
                        "gas": "0x1feac",
                        "gasUsed": "0x9d5",
                        "input": "0x0902f1ac",
                        "output": "0x0000000000000000000000000000000000000000000000025aa314728293841e00000000000000000000000000000000000000000000000000000007a5cc7a260000000000000000000000000000000000000000000000000000000064b8c380",
                        "to": "0x75a97d88ff19e07da99023ef0e35e35f51869de0",
                        "type": "STATICCALL"
                    },
                    {
                        "calls": [
                            {
                                "from": "0xf56dc6695cf1f5c364edebc7dc7077ac9b586068",
                                "gas": "0x1bc78",
                                "gasUsed": "0x6c8f",
                                "input": "0x23b872dd000000000000000000000000c2aa3359b78bd4223f3434bcf6b0f3b5f5d71c8f00000000000000000000000075a97d88ff19e07da99023ef0e35e35f51869de00000000000000000000000000000000000000000000000000000000002faf080",
                                "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
                                "to": "0x1c92ff898f7c34fc6ed884aec3859fd6c655c1f0",
                                "type": "DELEGATECALL",
                                "value": "0x0"
                            }
                        ],
                        "from": "0xa0013f511c70f01c077a8f809e36b905a0d16c95",
                        "gas": "0x1dfd5",
                        "gasUsed": "0x8907",
                        "input": "0x23b872dd000000000000000000000000c2aa3359b78bd4223f3434bcf6b0f3b5f5d71c8f00000000000000000000000075a97d88ff19e07da99023ef0e35e35f51869de00000000000000000000000000000000000000000000000000000000002faf080",
                        "output": "0x0000000000000000000000000000000000000000000000000000000000000001",
                        "to": "0xf56dc6695cf1f5c364edebc7dc7077ac9b586068",
                        "type": "CALL",
                        "value": "0x0"
                    },
                    ...
                ],
                "from": "0xc2aa3359b78bd4223f3434bcf6b0f3b5f5d71c8f",
                "gas": "0x273bd",
                "gasUsed": "0x22499",
                "input": "0x38ed17390000000000000000000000000000000000000000000000000000000002faf08000000000000000000000000000000000000000000000000000e8291f2bdfeff000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000c2aa3359b78bd4223f3434bcf6b0f3b5f5d71c8f0000000000000000000000000000000000000000000000000000000064b8cdb80000000000000000000000000000000000000000000000000000000000000002000000000000000000000000f56dc6695cf1f5c364edebc7dc7077ac9b586068000000000000000000000000ed4ccdd10b8b97ba9555a6767613bfb98aaf72c4",
                "output": "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000002faf08000000000000000000000000000000000000000000000000000e9c8a628b94ade",
                "to": "0xa0013f511c70f01c077a8f809e36b905a0d16c95",
                "type": "CALL",
                "value": "0x0"
            }
        },
        ...
    ]
}
```
