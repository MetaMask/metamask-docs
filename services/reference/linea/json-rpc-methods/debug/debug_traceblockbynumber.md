---
description: debug_traceBlockByNumber API method
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# `debug_traceBlockByNumber`

Returns tracing results by executing all transactions in the specified block number.

## Parameters

- `blockParameter`: (string) [_required_] A hexadecimal block number, or one of the tags `latest`, `earliest`, `pending` or `finalized`. See the [default block parameter](https://ethereum.org/en/developers/docs/apis/json-rpc/#default-block).

    :::warning
    `safe` isn't supported. Use `finalized` instead.
    Learn more about [Linea's layer 2 finalization](https://docs.linea.build/developers/guides/finalized-block). 
    :::
    
- Optional tracing options object with the following fields:
    - `tracer`: (string) _[optional]_ type of tracer. Supports [`callTracer`](../debug/index.md#calltracer) or
        [`prestateTracer`](../debug/index.md#prestatetracer).
    - `tracerConfig`: (object) _[optional]_  tracer configuration options:
        - `onlyTopCall`: (boolean) _[optional]_ when `true`, will only trace the primary (top-level) call and not any
            sub-calls. It eliminates the additional processing for each call frame.

## Returns

Depending on the specified tracer type, returns a [`callTracer`](../debug/index.md#calltracer) object or
[`prestateTracer`](../debug/index.md#prestatetracer) object.

## Example

### Request

<Tabs>
  <TabItem value="curl" label="curl" default>

```bash
curl https://linea-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"method":"debug_traceBlockByNumber","params":["0x4d0c", {"tracer": "callTracer"}],"id":1,"jsonrpc":"2.0"}'
```
  </TabItem>
  <TabItem value="WSS" label="WSS" >

```bash
wscat -c wss://linea-mainnet.infura.io/ws/v3/<YOUR-API-KEY> \
-x '{"method":"debug_traceBlockByNumber","params":["0x4d0c", {"tracer": "callTracer"}],"id":1,"jsonrpc":"2.0"}'
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
        "from": "0xa5ba45f484bc67fe293cf01f7d92d5ba3514dd42",
        "gas": "0x5208",
        "gasUsed": "0x5208",
        "input": "0x",
        "to": "0x45a318273749d6eb00f5f6ca3bc7cd3de26d642a",
        "type": "CALL",
        "value": "0x2ca186f5fda8004"
      }
    },
    {
      "result": {
        "from": "0x25f2650cc9e8ad863bf5da6a7598e24271574e29",
        "gas": "0xfe0e",
        "gasUsed": "0xafee",
        "input": "0xd0e30db0",
        "to": "0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f",
        "type": "CALL",
        "value": "0x2386f26fc10000"
      }
    },
    ...
  ]
}
```
