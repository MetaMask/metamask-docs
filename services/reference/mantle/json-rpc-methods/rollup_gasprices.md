---
description: rollup_gasPrices API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# rollup_gasPrices

Returns the current layer 1 (L1) and layer 2 (L2) gas prices.

## Parameters

None

## Returns

Gas price object:

- `l1GasPrice`: L1 gas price fee in wei.
- `l2GasPrice`: L2 gas price fee in wei.

## Example

Replace `<YOUR-API-KEY>` with an API key from your [Infura dashboard](https://infura.io/dashboard).

### Request

<Tabs>
  <TabItem value="cURL" label="cURL" default>

```bash
curl https://mantle-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "rollup_gasPrices", "params": [], "id": 1}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "l1GasPrice": "0x254aa66732",
    "l2GasPrice": "0xf3792"
  }
}
```
