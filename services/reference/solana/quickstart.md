---
description: Solana quickstart guide
sidebar_position: 2
---

import Banner from '@site/src/components/Banner'

# Quickstart

This quickstart guide will help you set up and make calls on the Solana network using the Infura endpoints.

<Banner>
Don't have an Infura account? Sign up for a paid plan to start using the Solana network!
</Banner>

## Prerequisites

Ensure you have an [API key](../../../../developer-tools/dashboard/get-started/create-api/) with the Solana network enabled.

## Make calls

### curl

Run the following command in your terminal, replacing `<YOUR-API-KEY>` with your actual Infura API key:

```bash
curl https://solana-mainnet.infura.io/v3/<YOUR-API-KEY> \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "method": "getSlot", "params": [], "id": 1}'
```

### JavaScript

1. Create a project directory, and inside the directory initialize the project:

    ```bash
    npm init -y
    ```

1. In your project directory, [install the latest version of the JavaScript SDK](https://www.npmjs.com/package/@solana/kit).

1. Create your JavaScript file (`index.js` in this example) and copy the following code:

    Replace `<YOUR-API-KEY>` with your actual Infura API key.

    ```javascript title="index.js"
    import { createSolanaRpc } from '@solana/kit';

    const rpc = createSolanaRpc('https://solana-mainnet.infura.io/v3/<YOUR-API-KEY>');

    async function fetchCurrentSlot() {
      try {
        const slot = await rpc.getSlot().send();
        console.log('Current slot:', slot);
      } catch (error) {
        console.error('Error fetching slot:', error);
      }
    }

    fetchCurrentSlot();
    ```

1. Run the code using the following command:

    ```bash
    node index.js
    ```

### Rust

1. Create a project directory, and inside the directory initialize the project:

    ```bash
    cargo init
    ```

1. In your project directory, [install the Rust dependencies](https://www.npmjs.com/package/@solana/kit).

    ```bash
    cargo add solana-sdk solana-client
    ```

1. Create your Rust file (`index.rs` in this example) and copy the following code:

    Replace `<YOUR-API-KEY>` with your actual Infura API key.

    ```javascript title="index.rs"
    import { createSolanaRpc } from '@solana/kit';

    const rpc = createSolanaRpc('https://solana-mainnet.infura.io/v3/<YOUR-API-KEY>');

    async function fetchCurrentSlot() {
      try {
        const slot = await rpc.getSlot().send();
        console.log('Current slot:', slot);
      } catch (error) {
        console.error('Error fetching slot:', error);
      }
    }

    fetchCurrentSlot();
    ```

1. Run the code using the following command:

    ```bash
    cargo run
    ```

## Next steps

Now that you have successfully made a call to the Solana network, you can explore more functionalities and APIs provided
by Infura. Here are some suggestions:

- **Explore other Solana APIs**: Infura supports a wide range of APIs. You can find more information in the
  [JSON-RPC API method documentation](json-rpc-methods/index.md).

- **Try out different networks**: Infura supports multiple networks including Ethereum, Linea, Polygon, Optimism, and more.

- **Monitor your usage**: Monitor your usage on the [MetaMask Developer dashboard](../../../../developer-tools/dashboard/how-to/dashboard-stats/) to ensure you're not hitting your rate limits.

Remember, the Infura community is here to help. If you have any questions or run into any issues, check out the
[Infura community](https://community.infura.io/) for help and answers to common questions.
