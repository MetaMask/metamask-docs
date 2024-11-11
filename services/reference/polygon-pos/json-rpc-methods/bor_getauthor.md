import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `bor_getAuthor`

Returns the author of the specified block.

:::info For Growth and Custom service plans

This JSON-RPC method allows a request to be forwarded to a partner service provider if Infura should
experience a service issue or outage. See [Failover protection](../../../concepts/failover-protection.md)
and [Enable API request forwarding](../../../how-to/enable-api-forwarding.md)
for complete details.

If you would like failover protection but don't qualify under your current plan, then either
self-upgrade to the Growth plan or contact a sales representative to upgrade to a Custom plan.

:::

## Parameters

`string`: Block number in hexadecimal, or the tag `latest` to get the latest block.

## Returns

`string`: Address of the author

## Example

Replace `<YOUR-API-KEY>` with an API key from your [MetaMask Developer dashboard](https://infura.io/dashboard).

### Request

<Tabs>
  <TabItem value="curl">

```bash
curl https://polygon-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "bor_getAuthor", "params": ["0x1000"], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS">

```bash
wscat -c wss://polygon-mainnet.infura.io/ws/v3/<YOUR-API-KEY> -x {"jsonrpc": "2.0", "method": "bor_getAuthor", "params": ["0x1000"], "id": 1}'
```

  </TabItem>
</Tabs>

### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x42eefcda06ead475cde3731b8eb138e88cd0bac3"
}
```
