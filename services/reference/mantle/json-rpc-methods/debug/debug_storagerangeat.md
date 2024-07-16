---
description: debug_storageRangeAt API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# debug_storageRangeAt

Returns the contract storage for the specified range.

## Parameters

- `blockHash` : (string) _[required]_ hash of the block to trace.
- `txIndex`: (number) _[required]_ transaction index from which to start.
- `address`: (string) _[required]_ contract address.
- `startKey`: (string) _[required]_ - hash of the storage key at which to start.
- `limit`: (number) _[required]_ number of storage entries to return.

## Returns

An object with the storage hash values, and for each of them the key and value it represents:

## Example

Replace `YOUR-API-KEY` with an API key from your [Infura dashboard](https://infura.io/dashboard).

### Request

<Tabs>
  <TabItem value="cURL" label="cURL" default>

```bash
curl https://mantle-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "debug_storageRangeAt", "params": ["0x7aaff18735842066baee6a2eb53961a69e67f5e012072c81c05a0fd793069a6c", 0, "0x371c7ec6D8039ff7933a2AA28EB827Ffe1F52f07", "0x0000000000000000000000000000000000000000000000000000000000000000", 1], "id": 1}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "storage": {
      "0x0001187ffafb4707176f1c510f173cdcc2a48cb15bdc894c424897555968a831": {
        "key": "0x85929f3b98e0d49f6ba064139f82d0fa9b5cf0eaf629d07b9a7301e222a63173",
        "value": "0x00000000000000000000000000000000000000000000000000000000b478ed24"
      }
    },
    "nextKey": "0x000b5c2024e6480c554272610fdfb9437f2aee44f6f04d396469e6adbcedc03b"
  }
}
```
