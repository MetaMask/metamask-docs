---
description: Get the base fee history.
---
import CreditCost from '@site/src/components/CreditCost/CreditCostPrice.js';
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Get the base fee history

Returns the base fee history of the specified blockchain network for the previous 500 blocks. <CreditCost network="gasApi" method="baseFeeHistory" />

The base fee is a part of the EIP-1559 upgrade to the Ethereum network, and it represents the
minimum price a user must pay for their transaction to be included in a block.

This method can be useful for applications that need to display or analyze the historical base fee
data for a specific blockchain network.

**GET** `https://gas.api.infura.io/networks/${chainId}/baseFeeHistory`

## Parameters

**Path**:

- `chainId`: `string` - ID of the chain to query

## Returns

Array of historical base fees.

## Example

### Request

Include your [API key](../../../../../developer-tools/dashboard/get-started/create-api)
and optional [API key secret](../../../../../developer-tools/dashboard/how-to/secure-an-api/api-key-secret/)
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
  <TabItem value="JavaScript" label="JavaScript">

```javascript
const axios = require("axios")

const apiKey = "<YOUR-API-KEY>" // Replace with your API key.
const apiKeySecret = "<YOUR-API-KEY-SECRET>" // Replace with your API key secret.

const Auth = Buffer.from(apiKey + ":" + apiKeySecret).toString("base64")

// The chain ID of the supported network.
const chainId = 1;

(async () => {
  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/networks/${chainId}/baseFeeHistory`,
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
[
  "14.585610312",
  "16.407222984",
  "16.687763116",
  "16.357094117",
  "15.82929799",
  "15.21546789",
  "17.113938208",
  "16.92324819",
  ...
]
```
