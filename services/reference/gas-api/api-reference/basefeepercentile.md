---
description: Get the base fee percentile for a chain.
---

import CreditCost from '@site/src/components/CreditCost/CreditCostPrice.js';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Get the base fee percentile

Returns the base fee percentile (50th percentile) of the specified blockchain network. <CreditCost network="gasApi" method="baseFeePercentile" />

For example, if the API returns a value of `20` Gwei, it means that 50% of the historical base fees
are less than or equal to `20` Gwei.

This can be useful for users or applications to estimate the optimal gas price for transactions
based on historical data.

**GET** `https://gas.api.infura.io/networks/${chainId}/baseFeePercentile`

## Parameters

**Path**:

- `chainId`: `string` - ID of the chain to query.
  See the [list of supported chain IDs](../../../get-started/endpoints.md#gas-api).

## Returns

`baseFeePercentile`: `string` - The base fee in Gwei at the 50th percentile, meaning that 50% of the base fees are
less than or equal to the provided amount.

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
  "https://gas.api.infura.io/networks/1/baseFeeHistory"
```

  </TabItem>
  <TabItem value="JavaScript">

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
      `https://gas.api.infura.io/networks/${chainId}/baseFeePercentile`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      }
    );
    console.log("Base fee history:", data);
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
  "baseFeePercentile": "23.227829059"
}
```
