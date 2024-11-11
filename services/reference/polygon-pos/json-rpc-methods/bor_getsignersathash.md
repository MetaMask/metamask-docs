import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `bor_getSignersAtHash`

Returns all the signers of the block matching the specified block hash.

:::info For Growth and Custom service plans

This JSON-RPC method allows a request to be forwarded to a partner service provider if Infura should
experience a service issue or outage. See [Failover protection](../../../concepts/failover-protection.md)
and [Enable API request forwarding](../../../how-to/enable-api-forwarding.md)
for complete details.

If you would like failover protection but don't qualify under your current plan, then either
self-upgrade to the Growth plan or contact a sales representative to upgrade to a Custom plan.

:::

## Parameters

`Hash`- hash of a block

## Returns

Array of signers for the specified block hash

## Example

Replace `<YOUR-API-KEY>` with an API key from your [MetaMask Developer dashboard](https://infura.io/dashboard).

### Request

<Tabs>
  <TabItem value="curl">

```bash
curl https://polygon-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "bor_getSignersAtHash", "params": ["0x29fa73e3da83ddac98f527254fe37002e052725a88904bac14f03e919e1e2876"], "id": 1}'
```

  </TabItem>
  <TabItem value="WSS">

```bash
wscat -c wss://polygon-mainnet.infura.io/ws/v3/<YOUR-API-KEY> -x {"jsonrpc": "2.0", "method": "bor_getSignersAtHash", "params":["0x29fa73e3da83ddac98f527254fe37002e052725a88904bac14f03e919e1e2876"], "id": 1}'
```

  </TabItem>
</Tabs>

### Response

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": [
    "0x0375b2fc7140977c9c76d45421564e354ed42277",
    "0x42eefcda06ead475cde3731b8eb138e88cd0bac3",
    "0x5973918275c01f50555d44e92c9d9b353cadad54",
    "0x7fcd58c2d53d980b247f1612fdba93e9a76193e6",
    "0xb702f1c9154ac9c08da247a8e30ee6f2f3373f41",
    "0xb8bb158b93c94ed35c1970d610d1e2b34e26652c",
    "0xf84c74dea96df0ec22e11e7c33996c73fcc2d822"
  ]
}
```
