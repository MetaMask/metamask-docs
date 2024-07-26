---
description: Create a Snap that provides transaction insights.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Snap to calculate gas fee percentages

This tutorial walks you through creating a Snap that calculates the percentage of gas fees they would 
pay for their transaction.

It gets the current gas price by calling the [`eth_gasPrice`](/wallet/reference/eth_gasPrice) RPC
method using the global Ethereum provider made available to Snaps, and displays this as a percentage 
of gas fees in a tab in MetaMask's transaction confirmation window.

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

### 2. (Optional) customize your Snap

This Snap is generated from a template typescript example Snap. While the following steps in the drop-down are optional for testing, they significantly improve the UX by aligning the Snap with its function.

<details>
  <summary>Customize your Snap's UX</summary>
  <div>
    2.1 Update your Snap to [display an icon](../best-practices/design-guidelines.md#optimize-your-metadata) in MetaMask.

    Create a new folder `images` in the Snap package `packages/snap/`:

    ```bash
    mkdir packages/snap/images
    ```

    Download
    [this `gas.svg` icon file](https://raw.githubusercontent.com/Montoya/gas-fee-snap/main/packages/snap/images/gas.svg)
    into that `ìmages` folder.  

    <details>
      <summary>Icon attribution</summary>
      <div>
    This is a free icon, "Gas" by Mello from the [Noun Project](https://thenounproject.com/browse/icons/term/gas/).
     </div>
    </details>


    Your file structure should look like this:

    ```text
    gas-estimation-snap/
    ├─ packages/
    │  ├─ site/
    |  |  |- src/
    |  |  |  |- App.tsx
    |  |  ├─ package.json
    |  |  |- ...(react app content)
    |  |
    │  ├─ snap/
    |  |  ├─ images/
    |  |  |  |- gas.svg
    |  |  ├─ src/
    |  |  |  |- index.test.ts
    |  |  |  |- index.ts
    |  |  ├─ snap.manifest.json
    |  |  ├─ package.json
    |  |  |- ... (Snap content)
    ├─ package.json
    ├─ ... (other stuff)
    ```

    Open `packages/snap/snap.manifest.json` in a text editor. This file contains the main configuration 
    details for your Snap. Edit the `npm` object, within the `location` object, and add `iconPath` with 
    the value `"images/gas.svg"` to point to your new icon:

    ```json title="snap.manifest.json"
    "location": {
      "npm": {
        "filePath": "dist/bundle.js",
        "iconPath": "images/gas.svg",
        "packageName": "snap",
        "registry": "https://registry.npmjs.org/"
      }
    }
    ```

    Open `packages/snap/package.json` in a text editor. Edit the `files` array and reference the 
    `images/` folder:

    ```json title="package.json"
    "files": [
      "dist/",
      "images/",
      "snap.manifest.json"
    ],
    ```

    2.2 Update your Snap's wallet prompt

    It's important that user's understand what they're agreeing to when responding to wallet prompts. The 
    prompt uses the `proposedName` of the Snap, currently "Typescript Example" in our template.

    Open `packages/snap/snap.manifest.json` in a text editor.
    Edit the `"proposedName"` property within the metadata to provide a functional name such as "Get Fee %":

    ```json title="snap.manifest.json"
    {
      "version": "0.1.0",
      "description": "An example Snap written in TypeScript.",
      "proposedName": "Get Fee %",
      "repository": {
        "type": "git",
        "url": "https://github.com/MetaMask/template-snap-monorepo.git"
      },
      ```

    2.3 Update your Snap's button

    Open `packages/site/src/components/Buttons.tsx` in a text editor.
    Edit the Button property to provide a functional name such as "Estimate Gas ":

    ```typescript title="Buttons.tsx"
    export const SendHelloButton = (props: ComponentProps<typeof Button>) => {
      return <Button {...props}>Inoperable</Button>;
    };
    ````

    These three updates are the minimum required to ensure that each user interaction with your Snap is well 
    informed, however, your Snap will function without these tweaks.

   </div>
</details>


### 3. Enable transaction insights and the Ethereum provider

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

### 4. Calculate and display the percentage of gas fees

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
If you have previously developed a dapp, you're likely familiar with accessing the Ethereum provider 
using `window.ethereum`. In a Snap, the `window` object is not available. Instead, when you request 
the `endowment:ethereum-provider` permission, your Snap is granted access to the 
[`ethereum` global object](../about-snaps/apis.md#snap-requests).
:::

### 5. Build and test your Snap

Complete the following steps to build and test your Snap:

#### 5.1 Increment version

This is optional for testing purposes, open `package.json` in the root directory of the project, and increment 
  the `"version"` (if the `"version"` is `0.1.0`, increase it to `0.2.0`).

#### 5.2. Build your Snap

From the command line, run `yarn start` in the root of your project. This starts two development 
  servers: one for watching and compiling the Snap, and another for the React site.
  The Snap bundle is served from `localhost:8080`, and the site is served from `localhost:8000`.

  You should get a message that includes:

   ```bash
   You can now view site in the browser.

     http://localhost:8000/
   ```

Open [`localhost:8000`](http://localhost:8000) in your browser (with MetaMask Flask installed).

### 5.3. Test your Snap

Select **Connect** and accept the permission request.

After connecting, you're prompted to install the Snap with the following permissions:
- **Access the Ethereum provider** 
- **Fetch and display transaction insights**

Next, select **Confirm** > **OK**.

From MetaMask Flask, create a new testnet ETH transfer. 

  :::tip

   You can set up [multiple accounts](https://support.metamask.io/managing-my-wallet/accounts-and-addresses/how-to-add-accounts-in-your-wallet/) to transfer between your accounts.

   :::

Next, from the transaction confirmation window in MetaMask, switch to the tab named **TYPESCRIPT EXAMPLE SNAP**.
Switching to the tab activates the [`onTransaction`](../../reference/entry-points.md#ontransaction)
entry point of your Snap and displays the percentage of gas fees in the transaction insights UI:

<p align="center">
<img src={require('../../assets/transaction-insights.png').default} alt="Transaction insights UI" width="400px" style={{border: '1px solid #DCDCDC'}} />
</p>

:::warning

The activated "Send Message" button is inoperable as we didn't assign it the permissions required in the 
`snap.manifest.json`. The default template Snap used in [Create a gas estimation Snap](gas-estimation.md),
is configured to expose a JSON-RPC API with a simple hello command, which brings up a dialog box.
In contrast, the Snap you're creating in this tutorial doesn't expose an API.
Instead, it provides transaction insights directly in a tab in MetaMask's transaction confirmation window.

:::


### Next steps

Consider improving your Snap's functionality further.

#### Display a different UI for contract interactions

Your Snap displays a gas fee percentage for ETH transfers initiated by the user.
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

#### Customize your Snap

You can improve your Snap's UX by completing [Step 2](#2-optional-customize-your-snap). Consider 
updating `packages/site/src/pages/index.tsx` to remove, rather than updating the text of the 
non-functional template **Send message** button.

Before publishing a Snap, it's also important to customize the metadata and properties of your app, 
for example:
- Update the `location` to its published location before publishing your Snap to `npm`, 
- Update the `name`, `version`, `description`, and `repository` fields of
`/packages/snap/package.json`, even if you do not plan to publish your Snap to npm.

:::note
When editing `source`, the `shasum` is set automatically when you build from the command line.
:::

:::caution important
The `version` and `repository` fields in `snap.manifest.json` inherit the values from
`package.json` and overwrite them in `snap.manifest.json`.
We recommend updating `version` and `repository` in `package.json` first, then building the Snap project.
:::

After you've made all necessary changes, you can 
[publish your Snap to npm](../../how-to/publish-a-snap.md).

