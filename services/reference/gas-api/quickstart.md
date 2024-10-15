---
description: Get started with the Gas APIs.
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Quickstart

This quickstart shows you how to call the Gas API using JavaScript.
You can also use a tool such as [curl](https://curl.se/) or [Postman](https://www.postman.com/) to
call the REST APIs.

:::tip
View the [API reference content](api-reference/index.md) to view the `curl` command for each API.
:::

## Prerequisites

- A valid [Web3 API key](../../../../developer-tools/dashboard/get-started/create-api)
  and optional [API key secret](../../../../developer-tools/dashboard/how-to/secure-an-api/api-key-secret/).
- [Node.js and npm installed](https://nodejs.org/en/download).

## Initialize a new project directory

```bash
mkdir new_project
cd new_project
npm init -y
```

## Install required packages

Install the `axios` package:

```bash
npm install axios
```

Install the [`dotenv`](../../how-to/javascript-dotenv.md) package:

```bash
npm install dotenv
```

## Create your `.env` file

Create a `.env` file at the project root and add the following data:

:::caution warning
Do not commit the `.env` file to your repository if it contains sensitive data.
You can [create a `.gitignore`
file](https://docs.infura.io/tutorials/developer-tools/javascript-dotenv#create-a-.gitignore-file)
to prevent accidentally committing the file.
:::

```bash title=".env"
INFURA_API_KEY=<YOUR-API-KEY>
INFURA_API_KEY_SECRET=<YOUR-API-KEY-SECRET>
```

Replace the Infura project credential placeholders with your own.

:::note
The `INFURA_API_KEY_SECRET` is optional and only necessary if you are using an
[API key secret](https://docs.infura.io/dashboard/secure-an-api/api-key-secret) to authenticate requests.
:::

## Create your script

The Gas API supports [multiple request formats](./api-reference/index.md#supported-api-request-formats), and
you can call the methods with or without specifying an API key secret.

Create a file (in this example `index.js`):

```bash
touch index.js
```

Copy the following code into your script:

:::info note
If using a network other than Ethereum Mainnet, update the `chainId` value (`1`) in the code to an
alternate [supported network](../../get-started/endpoints.md#gas-api).
:::

<Tabs>
  <TabItem value="Use API key" label="Use an API key only" default>

```javascript title="index.js"
const axios = require("axios");
require("dotenv").config();

// The chain ID of the supported network
const chainId = 1;

(async () => {
  try {
    const { data } = await axios.get(
      `https://gas.api.infura.io/v3/${process.env.INFURA_API_KEY}/networks/${chainId}/suggestedGasFees`
    );
    console.log("Suggested gas fees:", data);
  } catch (error) {
    console.log("Server responded with:", error);
  }
})();
```

  </TabItem>
  <TabItem value="With basic authentication" label="Use an API key and API key secret" default>

```javascript title="index.js"
const axios = require("axios");
require("dotenv").config();

const Auth = Buffer.from(
  process.env.INFURA_API_KEY + ":" + process.env.INFURA_API_KEY_SECRET
).toString("base64");

// The chain ID of the supported network
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

## Run the script

```bash
node index.js
```

The result should look similar to:

```json
Suggested gas fees: {
  low: {
    suggestedMaxPriorityFeePerGas: "0.05", // The gas price in gwei
    suggestedMaxFeePerGas: "24.086058416", // The gas price in gwei
    minWaitTimeEstimate: 15000,
    maxWaitTimeEstimate: 30000
  },
  medium: {
    suggestedMaxPriorityFeePerGas: "0.1", // The gas price in gwei
    suggestedMaxFeePerGas: "32.548678862", // The gas price in gwei
    minWaitTimeEstimate: 15000,
    maxWaitTimeEstimate: 45000
  },
  high: {
    suggestedMaxPriorityFeePerGas: "0.3", // The gas price in gwei
    suggestedMaxFeePerGas: "41.161299308", // The gas price in gwei
    minWaitTimeEstimate: 15000,
    maxWaitTimeEstimate: 60000
  },
  estimatedBaseFee: "24.036058416",
  networkCongestion: 0.7143,
  latestPriorityFeeRange: [ "0.1", "20" ],
  historicalPriorityFeeRange: [ "0.007150439", "113" ],
  historicalBaseFeeRange: [ "19.531410688", "36.299069766" ],
  priorityFeeTrend: "down",
  baseFeeTrend: "down"
}
```
