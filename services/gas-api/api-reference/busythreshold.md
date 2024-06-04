---
description: Get the busy threshold.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get the busy threshold

Returns the busy threshold for the specified blockchain network.

For example, a `busyThreshold` value of `30` Gwei indicates that 90% of the historical base fees on
the network have been below `30` Gwei.
If the current base fee exceeds this value, it suggests that the network is busier than usual,
likely due to a high volume of transactions.

**GET** `https://gas.api.infura.io/networks/${chainId}/busyThreshold`

## Parameters

**Path**:

- `chainId`: `string` - ID of the chain to query.

## Returns

`busyThreshold`: `string` - Indicates that 90% of the historical base fees on the network
have been below this threshold, serving as a marker of network congestion when current base fees exceed it.

## Example

### Request

Include your [API key](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/project-id)
and [API key secret](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/project-secret)
to authorize your account to use the APIs.

<Tabs>
<TabItem value="cURL">

```bash
curl -X "GET"                   \
  -u <API-KEY>:<API-KEY-SECRET> \
  "https://gas.api.infura.io/networks/1/busyThreshold"
```

</TabItem>
<TabItem value="JavaScript">

```javascript
const axios = require("axios");

const apiKey = "<API-KEY>"; // Replace with your API key.
const apiKeySecret = "<API-KEY-SECRET>"; // Replace with your API key secret.

const Auth = Buffer.from(
  apiKey + ":" + apiKeySecret,
).toString("base64");

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
      },
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

