---
description: debug_accountRange API method
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# `debug_accountRange`

Returns the accounts for a specified block.

## Parameters

- `blockHashOrNumber` : (string) _[required]_ block hash or number at which to retrieve account information.
- `txIndex`: (number) _[required]_ transaction index at which to retrieve account information.
- `address`: (string) _[required]_ contract address.
- `startKey`: (string) _[required]_ - address hash from which to start.
- `limit`: (number) _[required]_ maximum number of account entries to return.

## Returns

`result`: _object_ - account details object with the following fields:

- `addressMap`: _map of strings to strings_ - map of address hashes and account addresses.

- `nextKey`: _string_ - hash of the next address if any addresses remain in the state, otherwise zero.

## Example

Replace `<YOUR-API-KEY>` with an API key from your [MetaMask Developer dashboard](https://developer.metamask.io/).

### Request

<Tabs>
  <TabItem value="curl" label="curl" default>

```bash
curl https://swellchain-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"debug_accountRange","params":["12345", 0, "0", 5],"id":1}'
```

  </TabItem>
</Tabs>

### Result

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "addressMap": {
      "0x005e5...86960": "0x0000000000000000000000000000000000000000",
      "0x021fe...6ffe3": "0x0000000000000000000000000000000000000000",
      "0x028e6...ab776": "0x0000000000000000000000000000000000000000",
      "0x02cb5...bc4d8": "0x0000000000000000000000000000000000000000",
      "0x03089...23fd5": "0x0000000000000000000000000000000000000000"
    },
    "nextKey": "0x04242954a5cb9748d3f66bcd4583fd3830287aa585bebd9dd06fa6625976be49"
  }
}
```
