import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# eth_getRootHash

Returns the root hash of a specified block range.

:::warning

The maximum difference between the specified block range can be 32767.

:::

## Parameters

- `fromBlock (int)` - from block number specified as an integer
- `toBlock (int)` - to block number specified as an integer

## Returns

`string`: root hash of the specified block range

## Example

### Request

<Tabs>
  <TabItem value="cURL">

```bash
curl https://polygon-mainnet.infura.io/v3/YOUR-API-KEY \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc": "2.0", "method": "eth_getRootHash", "params": [1000, 1032], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS">

```bash
wscat -c wss://polygon-mainnet.infura.io/ws/v3/YOUR-API-KEY -x '{"jsonrpc": "2.0", "method": "eth_getRootHash", "params":[1000, 1032], "id": 1}'
```

  </TabItem>
</Tabs>

### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "67518d9fc6bf9ff886ba1a4e932a0d0a8a1318b3f300518773aaf2210410cf73"
}
```
