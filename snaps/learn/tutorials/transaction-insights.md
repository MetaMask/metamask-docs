---
description: Create a Snap that provides transaction insights.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Snap to calculate gas fee percentages

This tutorial walks you through creating a Snap that calculates the percentage of gas fees that
a user pays when creating a transaction.
The Snap provides transaction insights in MetaMask's transaction confirmation window.

## Prerequisites

- [MetaMask Flask installed](../../get-started/install-flask.md)
- An account on your MetaMask Flask instance with testnet ETH
  :::tip
  You can use [Infura's Sepolia faucet](https://www.infura.io/faucet) to get Sepolia ETH.
  :::
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 20.11 or later
- [Yarn](https://yarnpkg.com/)

## Steps

### 1. Set up the project

Create a new Snap project using the
[`@metamask/create-snap`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap)
starter kit by running:


```bash
yarn create @metamask/snap transaction-insights-snap
```

Next, `cd` into the `transaction-insights-snap` project directory and run:

```bash
yarn install
```

This initializes your development environment with the required dependencies. 

<details>
  <summary>Did you get a warning?</summary>
  <div>
You may get a warning such as: 

```bash
@lavamoat/allow-scripts has detected dependencies without configuration. explicit configuration required.
run "allow-scripts auto" to automatically populate the configuration.
```

You can resolve the issue by running: 

```bash
yarn run allow-scripts auto
``` 
 </div>
</details>

### 2. Enable transaction insights and the Ethereum provider

The default template Snap, such as the one in
[Create a gas estimation Snap](gas-estimation.md),
is configured to expose a JSON-RPC API with a simple hello command, which brings up a dialog box.
In contrast, the Snap you're creating in this tutorial doesn't expose any API.
Instead, it provides transaction insights directly in MetaMask's transaction confirmation window.

In particular, the Snap shows the user the percentage of gas fees they would pay for their transaction.
It gets the current gas price by calling the
[`eth_gasPrice`](/wallet/reference/eth_gasPrice) RPC
method using the global Ethereum provider made available to Snaps.

To enable your Snap to provide [transaction insights](../../features/transaction-insights.md) and
use the global Ethereum provider, request the
[`endowment:transaction-insight`](../../reference/permissions.md#endowmenttransaction-insight) and
[`endowment:ethereum-provider`](../../reference/permissions.md#endowmentethereum-provider)
permissions in `packages/snap/snap.manifest.json`:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:transaction-insight": {},
  "endowment:ethereum-provider": {}
}
```

:::tip
In this tutorial, you can replace what was previously in `initialPermissions`.
You do not need any permissions other than `endowment:transaction-insight` and `endowment:ethereum-provider`.
:::

### 3. Calculate and display the percentage of gas fees

To calculate and display the gas fees a user would pay as a percentage of their outgoing transaction,
replace the code in `packages/snap/src/index.ts` with the following:

```typescript title="index.ts"
import type { OnTransactionHandler } from "@metamask/snaps-sdk"
import { heading, panel, text } from "@metamask/snaps-sdk"

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  // Use the Ethereum provider to fetch the gas price.
  const currentGasPrice = (await ethereum.request({
    method: "eth_gasPrice",
  })) as string

  // Get fields from the transaction object.
  const transactionGas = parseInt(transaction.gas as string, 16)
  const currentGasPriceInWei = parseInt(currentGasPrice ?? "", 16)
  const maxFeePerGasInWei = parseInt(transaction.maxFeePerGas as string, 16)
  const maxPriorityFeePerGasInWei = parseInt(
    transaction.maxPriorityFeePerGas as string,
    16
  )

  // Calculate gas fees the user would pay.
  const gasFees = Math.min(
    maxFeePerGasInWei * transactionGas,
    (currentGasPriceInWei + maxPriorityFeePerGasInWei) * transactionGas
  )

  // Calculate gas fees as percentage of transaction.
  const transactionValueInWei = parseInt(transaction.value as string, 16)
  const gasFeesPercentage = (gasFees / (gasFees + transactionValueInWei)) * 100

  // Display percentage of gas fees in the transaction insights UI.
  return {
    content: panel([
      heading("Transaction insights Snap"),
      text(
        `As set up, you are paying **${gasFeesPercentage.toFixed(2)}%**
        in gas fees for this transaction.`
      ),
    ]),
  }
}
```

:::tip
If you have previously developed a dapp, you're likely familiar with accessing the Ethereum provider using `window.ethereum`.
In a Snap, the `window` object is not available.
Instead, when you request the `endowment:ethereum-provider` permission, your Snap is granted access to the [`ethereum` global object](../about-snaps/apis.md#snap-requests).
:::

### 4. Build and test the Snap

To build and test your Snap:

1. From the command line, run `yarn start` in the root of your project.
   This starts two development servers: one for watching and compiling the Snap, and another for the
   React site.
   The Snap bundle is served from `localhost:8080`, and the site is served from `localhost:8000`.
   You should get a message that includes:

   ```bash
   You can now view site in the browser.

     http://localhost:8000/
   ```

2. Open [`localhost:8000`](http://localhost:8000) in your browser (with MetaMask Flask installed).

3. Select **Connect** and accept the permission request.

4. After connecting, you're prompted to install the Snap with the **Fetch and display transaction
   insights** and **Access the Ethereum provider** permissions.
   Select **Approve** > **Install**.

5. From MetaMask Flask, create a new testnet ETH transfer.
   You can set up multiple accounts to transfer between your accounts.

6. In the transaction confirmation window, switch to the tab named **TYPESCRIPT EXAMPLE SNAP**.
   Switching to the tab activates the [`onTransaction`](../../reference/entry-points.md#ontransaction)
   entry point of your Snap and displays the percentage of gas fees in the transaction insights UI:

<p align="center">
<img src={require('../../assets/transaction-insights.png').default} alt="Transaction insights UI" width="400px" style={{border: '1px solid #DCDCDC'}} />
</p>

### 5. Display a different UI for contract interactions

The Snap should display a gas fee percentage for ETH transfers initiated by the user.
For contract interactions, add the following code to the beginning of the `onTransaction` entry point:

```typescript title="index.ts"
if (typeof transaction.data === "string" && transaction.data !== "0x") {
  return {
    content: panel([
      heading("Percent Snap"),
      text(
        "This Snap only provides transaction insights for simple ETH transfers."
      ),
    ]),
  }
}
```

### 6. Next steps

The initial project has generic names in multiple places.
You can update the fields in `snap.manifest.json` to match your custom Snap:

- `proposedName` - The name of your Snap.
  This replaces **TYPESCRIPT EXAMPLE SNAP** in the transaction insights UI.
- `description` - The description of your Snap.
- `source` - The `shasum` is set automatically when you build from the command line.
  If you decided to publish your Snap to npm, update the `location` to its published location.

Similarly, you should update the `name`, `version`, `description`, and `repository` fields of
`packages/snap/package.json` even if you don't plan to publish your Snap to npm.

:::caution important
The `version` and `repository` fields in `snap.manifest.json` inherit the values from
`package.json` and overwrite them in `snap.manifest.json`.
We recommend updating `version` and `repository` in `package.json` first, then building the Snap project.
:::

You should also add an icon by following the steps outlined in the
[gas estimation Snap tutorial](../tutorials/gas-estimation.md#2-add-a-custom-icon).

Lastly, you can update the content of `packages/site/src/pages/index.tsx`, such as removing the
template **Send Hello** button.

After you've made all necessary changes, you can
[publish your Snap to npm](../../how-to/publish-a-snap.md).
