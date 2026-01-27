---
description: HyperEVM quickstart guide
sidebar_position: 2
sidebar_label: Quickstart
---

import Banner from '@site/src/components/Banner'

# HyperEVM quickstart

This quickstart guide will help you set up and make calls on HyperEVM **mainnet** using the Infura endpoint.

<Banner>
Don't have an Infura account? Sign up for our free plan and start using HyperEVM!
</Banner>

## Prerequisites

Ensure you have an [API key](/developer-tools/dashboard/get-started/create-api/) with the HyperEVM network enabled.

## Make calls

### curl

Run the following command in your terminal, replacing `<YOUR-API-KEY>` with your actual Infura API key:

```bash
curl https://hyperevm-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}'
```

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

   fetch("https://hyperevm-mainnet.infura.io/v3/<YOUR-API-KEY>", {
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
     .post("https://hyperevm-mainnet.infura.io/v3/<YOUR-API-KEY>", {
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

   url = "https://hyperevm-mainnet.infura.io/v3/<YOUR-API-KEY>"

   payload = {
     "jsonrpc": "2.0",
     "method": "eth_blockNumber",
     "params": [],
     "id": 1
   }

   headers = {"content-type": "application/json"}

   response = requests.post(url, data=json.dumps(payload), headers=headers).json()

   print(response)
   ```

1. Run the code using the following command:

   ```bash
   python index.py
   ```

## Next steps

Now that you have successfully made a call to HyperEVM mainnet, you can explore more JSON-RPC methods in the
[HyperEVM JSON-RPC API documentation](json-rpc-methods/index.md).
