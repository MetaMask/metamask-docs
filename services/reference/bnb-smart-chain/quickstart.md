---
description: BNB Smart Chain quickstart guide
sidebar_label: Quickstart
sidebar_position: 2
---

import Banner from "@site/src/components/Banner"

# BNB Smart Chain quickstart

This quickstart guide will help you set up and make calls on the BNB Smart Chain network using the Infura endpoints.

<Banner>
Don't have an Infura account? Sign up for our free plan and start using the BNB Smart Chain network!
</Banner>

## Prerequisites

- Ensure you have an [API key](/developer-tools/dashboard/get-started/create-api/) with the BNB Smart Chain network enabled.

## Make calls

### curl

Run the following command in your terminal. Replace `<YOUR-API-KEY>` with your actual Infura API key.

```bash
curl https://bsc-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id": 1}'
```

### Node (JavaScript)

In these examples, you'll use [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) as your package manager.

#### Node Fetch

1. In your project folder, install the Node Fetch package using npm:

    ```bash
    npm i node-fetch
    ``````

1. Create your JavaScript file and copy the following code:

    Replace `<YOUR-API-KEY>` with your actual Infura API key.

    ```javascript title="index.js"
    import fetch from "node-fetch";

    fetch("https://bsc-mainnet.infura.io/v3/<YOUR-API-KEY>", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 1
      })
    })
    .then(response =>
      response.json()
    )
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
    ```

1. Run the code using the following command:

    ```bash
    node index.js
    ```

#### Axios

1. In your project folder, install the Axios package using npm:

    ```bash
    npm i axios
    ``````

1. Create your JavaScript file and copy the following code:

    Replace `<YOUR-API-KEY>` with your actual Infura API key.

    ```javascript title="index.js"
    const axios = require("axios");
    
    axios.post("https://bsc-mainnet.infura.io/v3/<YOUR-API-KEY>", {
      jsonrpc: "2.0",
      method: "eth_blockNumber",
      params: [],
      id: 1
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    ```

1. Run the code using the following command:

    ```bash
    node index.js
    ```

#### Ethers

1. In your project folder, install the ethers package using npm:

    ```bash
    npm install ethers
    ``````

1. Create your JavaScript file and copy the following code:

    Replace `<YOUR-API-KEY>` with your actual Infura API key.

    ```javascript title="index.js"
    const ethers = require("ethers");

    const provider = new ethers.providers.JsonRpcProvider("https://bsc-mainnet.infura.io/v3/<YOUR-API-KEY>");

    provider.getBlockNumber()
    .then(blockNumber => {
      console.log(blockNumber);
    })
    .catch(error => {
      console.error(error);
    });
    ```

1. Run the code using the following command:

    ```bash
    node index.js
    ```

### Python

1. In your project folder, install the `requests` library:

    ```bash
    pip install requests
    ``````

1. Create your Python file and copy the following code:

    Replace `<YOUR-API-KEY>` with your actual Infura API key.

    ```python title="index.py"
    import requests
    import json

    url = "https://bsc-mainnet.infura.io/v3/<YOUR-API-KEY>"

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

Now that you have successfully made a call to the BNB Smart Chain network, you can explore more functionalities and APIs. Here are some suggestions:

- **Explore other BNB Smart Chain APIs**: Infura supports a wide range of APIs. You can find more information in the
[JSON-RPC API method documentation](json-rpc-methods/index.md).

- **Try out different networks**: Infura supports multiple networks including Ethereum, Linea, Polygon, Optimism, and more.

- **Monitor your usage**: Monitor your usage on the [MetaMask Developer dashboard](/developer-tools/dashboard/how-to/dashboard-stats) to ensure you're not hitting your rate limits.

Remember, the MetaMask community is here to help. If you have any questions or run into any issues, check out the
[MetaMask community](https://community.metamask.io/) for help and answers to common questions.
