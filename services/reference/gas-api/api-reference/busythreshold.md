---
description: Get the busy threshold.
---

import CreditCost from '@site/src/components/CreditCost/CreditCostPrice.js';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Get the busy threshold

Returns the busy threshold for the specified blockchain network. <CreditCost network="gasApi" method="busyThreshold" />

For example, a `busyThreshold` value of `30` Gwei indicates that 90% of the historical base fees on
the network have been below `30` Gwei.
If the current base fee exceeds this value, it suggests that the network is busier than usual,
likely due to a high volume of transactions.

**GET** `https://gas.api.infura.io/networks/${chainId}/busyThreshold`

## Parameters

**Path**:

- `chainId`: `string` - ID of the chain to query.
  See the [list of supported chain IDs](../../../get-started/endpoints.md#gas-api).

## Returns

`busyThreshold`: `string` - Indicates that 90% of the historical base fees on the network
have been below this threshold, serving as a marker of network congestion when current base fees exceed it.

## Example

### Request

Include your [API key](/developer-tools/dashboard/get-started/create-api)
and optional [API key secret](/developer-tools/dashboard/how-to/secure-an-api/api-key-secret)
to authorize your account to use the APIs.

:::tip
You can call the API with only an API key, and [include it as a path parameter](../api-reference/index.md#supported-api-request-formats)
instead of using the curl authentication option (`-u`).
:::

<Tabs>
  <TabItem value="curl" label="curl" default >

```bash
curl -X "GET" \
  -u <YOUR-API-KEY>:<YOUR-API-KEY-SECRET> \
  "https://gas.api.infura.io/networks/1/busyThreshold"
```

  </TabItem>
  <TabItem value="JavaScript" label="JavaScript">

```javascript
const axios = require("axios");

const apiKey = "<YOUR-API-KEY>"; // Replace with your API key.
const apiKeySecret = "<YOUR-API-KEY-SECRET>"; // Replace with your API key secret.

const Auth = Buffer.from(apiKey + ":" + apiKeySecret).toString("base64");

// The chain ID of the supported network.
const chainId = 1;

(async () => {
  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/networks/${chainId}/busyThreshold`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      }
    );
    console.log("Busy threshold:", data);
  } catch (error) {
    console.log("Server responded with:", error);
  }
})();
```

  </TabItem>
</Tabs>

### Response

```json
{
  "busyThreshold": "37.378956101"
}
```
