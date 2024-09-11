import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# bor_getCurrentProposer

Returns the the current proposer's address.

:::info For Growth and Custom service plans

This JSON-RPC method allows a request to be forwarded to a partner service provider if Infura should
experience a service issue or outage. See [Failover protection](../../../concepts/failover-protection.md)
and [Enable API request forwarding](../../../how-to/enable-api-forwarding.md)
for complete details.

If you would like failover protection but don't qualify under your current plan, then either
self-upgrade to the Growth plan or contact a sales representative to upgrade to a Custom plan.

:::

## Parameters

None

## Returns

`string`: Address of the current proposer

## Example

Replace `<YOUR-API-KEY>` with an API key from your [Infura dashboard](https://infura.io/dashboard).

### Request

<Tabs>
  <TabItem value="cURL">

```bash
curl https://polygon-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "bor_getCurrentProposer", "params": [], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS">

```bash
wscat -c wss://polygon-mainnet.infura.io/ws/v3/<YOUR-API-KEY> -x '{"jsonrpc": "2.0", "method": "bor_getCurrentProposer", "params": [], "id": 1}'
```

  </TabItem>
</Tabs>

### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0x88c5e96c1459d224383dcb1fe0cedd1fcee25ffb"
}
```
