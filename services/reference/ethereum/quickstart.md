#28165
description: Ethereum quickstart guide
sidebar_position: 2
sidebar_label: Quickstart
---

import Banner from '@site/src/components/Banner'

# Ethereum quickstart

This quickstart guide will help you set up and make calls on the Ethereum network using the Infura endpoints.

<Banner>
Don't have an Infura account? Sign up for our free plan and start using the Ethereum network!
</Banner>

## Prerequisites

Ensure you have an [API key](../../../../developer-tools/dashboard/get-started/create-api/) with the Ethereum network enabled.

## Make calls

### curl

Run the following command in your terminal, replacing `<YOUR-API-KEY>` with your actual Infura API key:

```bash
curl https://mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}'
```

:::note

In Windows Powershell, quotations in `curl` commands can behave differently than expected. We recommend using Postman on Windows systems.

:::

### Postman

Call the JSON-RPC methods using [Postman](https://learning.postman.com/docs/getting-started/introduction/).

Click **Run in Postman** to fork the collection and make requests.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/8171681-49bfbc10-85ae-466c-8cf0-91eba9298b12?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D8171681-49bfbc10-85ae-466c-8cf0-91eba9298b12%26entityType%3Dcollection%26workspaceId%3Db8156083-f4da-481f-84fa-72dcc26cb146)

:::info

Set the correct [variables](https://learning.postman.com/docs/sending-requests/variables/#understanding-variables) for your API key and network before running requests.

:::

### Node (JavaScript)

In these examples, you'll use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) as your package manager.

#### Node Fetch

1. In your project folder, install the `node-fetch` package using npm:

   ```bash
   npm i node-fetch
   ```

1. Create your JavaScript file and copy the following code:

   Replace `<YOUR-API-KEY>` with your actual Infura API key.

   ```javascript title="index.js"
   import fetch from "node-fetch"

   fetch("https://mainnet.infura.io/v3/<YOUR-API-KEY>", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       jsonrpc: "2.0",
       method: "eth_blockNumber",
       params: [],
       id: 1,
     }),
   })
     .then((response) => response.json())
     .then((data) => {
       console.log(data)
     })
     .catch((error) => {
       console.error(error)
     })
   ```

1. Run the code using the following command:

   ```bash
   node index.js
   ```

#### Axios

1. In your project folder, install the `axios` package using npm:

   ```bash
   npm i axios
   ```

1. Create your JavaScript file and copy the following code:

   Replace `<YOUR-API-KEY>` with your actual Infura API key.

   ```javascript title="index.js"
   const axios = require("axios")

   axios
     .post("https://mainnet.infura.io/v3/<YOUR-API-KEY>", {
       jsonrpc: "2.0",
       method: "eth_blockNumber",
       params: [],
       id: 1,
     })
     .then((response) => {
       console.log(response.data)
     })
     .catch((error) => {
       console.error(error)
     })
   ```

1. Run the code using the following command:

   ```bash
   node index.js
   ```

#### Ethers

1. In your project folder, install the `ethers` package using npm:

   ```bash
   npm install ethers
   ```

1. Create your JavaScript file and copy the following code:

   Replace `<YOUR-API-KEY>` with your actual Infura API key.

   ```javascript title="index.js"
   const ethers = require("ethers")

   const provider = new ethers.providers.JsonRpcProvider(
     "https://mainnet.infura.io/v3/<YOUR-API-KEY>"
   )

   provider
     .getBlockNumber()
     .then((blockNumber) => {
       console.log(blockNumber)
     })
     .catch((error) => {
       console.error(error)
     })
   ```

1. Run the code using the following command:

   ```bash
   node index.js
   ```

#### Web3.js

1. In your project folder, [install the latest version of the web3.js library](https://www.npmjs.com/package/web3?activeTab=versions)

1. Create your JavaScript file and copy the following code:

   Replace `<YOUR-API-KEY>` with your actual Infura API key.

   ```javascript title="index.js"
   var { Web3 } = require("web3")
   var provider = "https://mainnet.infura.io/v3/<YOUR-API-KEY>"
   var web3Provider = new Web3.providers.HttpProvider(provider)
   var web3 = new Web3(web3Provider)

   web3.eth.getBlockNumber().then((result) => {
     console.log("Latest Ethereum Block is ", result)
   })
   ```

1. Run the code using the following command:

   ```bash
   node index.js
   ```

### Python

1. In your project folder, install the `requests` library:

   ```bash
   pip install requests
   ```

1. Create your Python file and copy the following code:

   Replace `<YOUR-API-KEY>` with your actual Infura API key.

   ```python title="index.py"
   import requests
   import json

   url = "https://mainnet.infura.io/v3/<YOUR-API-KEY>"

   payload = {
     "jsonrpc": "2.0",
     "method": "eth_blockNumber",
     "params": [],
     "id": 1
   }

   headers = {'content-type': 'application/json'}

   response = requests.post(url, data=json.dumps(payload), headers=headers).json()

   print(response)
   ```

1. Run the code using the following command:

   ```bash
   python index.py
   ```

## Next steps

Now that you have successfully made a call to the Ethereum network, you can explore more functionalities and APIs provided
by Infura. Here are some suggestions:

- **Explore other Ethereum APIs**: Infura supports a wide range of APIs. You can find more information in the
  [JSON-RPC API method documentation](json-rpc-methods/index.md).

- **Try out different networks**: Infura supports multiple networks including Arbitrum, Linea, Polygon, Optimism, and more.

- **Monitor your usage**: Monitor your usage on the [MetaMask Developer dashboard](../../../../developer-tools/dashboard/how-to/dashboard-stats/) to ensure you're not hitting your rate limits.

Remember, the Infura community is here to help. If you have any questions or run into any issues, check out the
[Infura community](https://community.infura.io/) for help and answers to common questions.
