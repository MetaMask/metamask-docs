---
description: Get the estimated gas prices for a chain.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Get EIP-1559 gas prices

Returns the estimated [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) gas fees for the specified
blockchain network.

**GET** `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`

## Parameters

**Path**:

- `chainId`: `string` - ID of the chain to query.

## Returns

Recommended gas price details based of the level of urgency:

- `low`, `medium`, `high` - Object containing recommended values for transactions by level of urgency:
  - `suggestedMaxPriorityFeePerGas`: `string` - The maximum suggested priority fee per gas to pay
    to have transactions included in a block.
  - `suggestedMaxFeePerGas`: `string` - The maximum suggested total fee per gas to pay, including
    both the base fee and the priority fee.
  - `minWaitTimeEstimate`: `number` - The minimum estimated wait time (in milliseconds) for a
    transaction to be included in a block at the suggested gas price.
  - `maxWaitTimeEstimate`: `number` - The maximum estimated wait time (in milliseconds) for a
    transaction to be included in a block at the suggested gas price.
- `estimatedBaseFee`: `string` - The current estimated base fee per gas on the network.
- `networkCongestion`: `number` - The current congestion on the network, represented as a number
  between `0` and `1`.
  A lower network congestion score (for example `0.1`), indicates that fewer transactions are being
  submitted, so it's cheaper to validate transactions.
- `latestPriorityFeeRange`: `array` - The range of priority fees per gas for recent transactions on
  the network.
- `historicalPriorityFeeRange`: `array` - The range of priority fees per gas for transactions on the
  network over a historical period.
- `historicalBaseFeeRange`: `array` - The range of base fees per gas on the network over a
  historical period.
- `priorityFeeTrend`: `string` - The current trend in priority fees on the network, either `up` or
  `down` (whether it's getting more expensive or cheaper).
- `baseFeeTrend`: `string` - The current trend in base fees on the network, either `up` or
  `down` (whether it's getting more expensive or cheaper).

## Example

### Request

Include your [API key](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/project-id)
and optional [API key secret](https://docs.infura.io/networks/ethereum/how-to/secure-a-project/project-secret)
to authorize your account to use the APIs.

:::tip
You can call the API with only an API key, and [include it as a path parameter](./index.md#supported-api-request-formats)
instead of using the cURL authentication option (`-u`).
:::

<Tabs>
  <TabItem value="cURL" label="cURL" default >

```bash
curl -X 'GET' \
  -u <API-KEY>:<API-KEY-SECRET> \
  "https://gas.api.infura.io/networks/1/suggestedGasFees"
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
      `https://gas.api.infura.io/networks/${chainId}/suggestedGasFees`,
      {
        headers: {
          Authorization: `Basic ${Auth}`,
        },
      }
    );
    console.log("Suggested gas fees:", data);
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
  "low": {
    "suggestedMaxPriorityFeePerGas": "0.05",
    "suggestedMaxFeePerGas": "16.334026964",
    "minWaitTimeEstimate": 15000,
    "maxWaitTimeEstimate": 30000
  },
  "medium": {
    "suggestedMaxPriorityFeePerGas": "0.1",
    "suggestedMaxFeePerGas": "22.083436402",
    "minWaitTimeEstimate": 15000,
    "maxWaitTimeEstimate": 45000
  },
  "high": {
    "suggestedMaxPriorityFeePerGas": "0.3",
    "suggestedMaxFeePerGas": "27.982845839",
    "minWaitTimeEstimate": 15000,
    "maxWaitTimeEstimate": 60000
  },
  "estimatedBaseFee": "16.284026964",
  "networkCongestion": 0.5125,
  "latestPriorityFeeRange": ["0", "3"],
  "historicalPriorityFeeRange": ["0.000000001", "89"],
  "historicalBaseFeeRange": ["13.773088584", "29.912845463"],
  "priorityFeeTrend": "down",
  "baseFeeTrend": "up"
}
```