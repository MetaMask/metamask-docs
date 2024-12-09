import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `bor_getRootHash`

Returns the root hash of a specified block range.

:::info For Growth and Custom service plans

This JSON-RPC method allows a request to be forwarded to a partner service provider if Infura should
experience a service issue or outage. See [Failover protection](../../../concepts/failover-protection.md)
and [Enable API request forwarding](../../../how-to/enable-api-forwarding.md)
for complete details.

If you would like failover protection but don't qualify under your current plan, then either
self-upgrade to the Growth plan or contact a sales representative to upgrade to a Custom plan.

:::

:::warning

The maximum difference between the specified block range can be 32767.

:::

## Parameters

- `fromBlock (int)` - from block number specified as an integer
- `toBlock (int)` - to block number specified as an integer

## Returns

`string`: root hash of the specified block range

## Example

Replace `<YOUR-API-KEY>` with an API key from your [MetaMask Developer dashboard](https://developer.metamask.io/).

### Request

<Tabs>
  <TabItem value="curl">

```bash
curl https://polygon-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "bor_getRootHash", "params": [1000, 1032], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS">

```bash
wscat -c wss://polygon-mainnet.infura.io/ws/v3/<YOUR-API-KEY> -x {"jsonrpc": "2.0", "method": "bor_getRootHash", "params": [1000, 1032], "id": 1}'
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
