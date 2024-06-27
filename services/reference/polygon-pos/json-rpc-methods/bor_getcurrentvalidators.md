import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# bor_getCurrentValidators

Returns the current list of validators. The [Bor documentation](https://wiki.polygon.technology/docs/pos/design/bor/overview) contains more information about Polygon Bor architecture and how validators participate in the consensus process.

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

Array of validator objects with the following fields:

- `ID`: validator ID
- `accum`: the validator's proposer priority
- `power`: the validator's voting power
- `signer`: validator address

## Example

Replace `YOUR-API-KEY` with an API key from your [Infura dashboard](https://infura.io/dashboard).

### Request

<Tabs>
  <TabItem value="cURL">

  ```bash
  curl https://polygon-mainnet.infura.io/v3/YOUR-API-KEY \
-X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"bor_getCurrentValidators","params":[], "id":1}'
  ```

  </TabItem>
  <TabItem value="WSS">

  ```bash
  wscat -c wss://polygon-mainnet.infura.io/ws/v3/YOUR-API-KEY -x {"jsonrpc":"2.0","method":"bor_getCurrentValidators","params":[], "id":1}'
  ```

  </TabItem>
</Tabs>

### Response

```json
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        {
            "ID": 0,
            "accum": 14,
            "power": 1,
            "signer": "0x055bd801ca712b4ddf67db8bc23fb6c8510d52b9"
        },
        {
            "ID": 0,
            "accum": 0,
            "power": 4,
            "signer": "0x1ca971963bdb4ba2bf337c90660674acff5beb3f"
        },
        {
            "ID": 0,
            "accum": -15,
            "power": 1,
            "signer": "0x26c80cc193b27d73d2c40943acec77f4da2c5bd8"
        },
 ...
    ]
}
```
