---
description: Create a Snap that estimates gas fees.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a Snap to estimate gas fees

This tutorial walks you through creating a Snap that estimates gas fees.
The Snap uses the `fetch` API to request information from the internet, and displays custom
information in an alert dialog.

## Prerequisites

- [MetaMask Flask installed](../../get-started/install-flask.md)
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 20.11 or later
- [Yarn](https://yarnpkg.com/)

## Steps

### 1. Set up the project

Create a new Snap project using the
[`@metamask/create-snap`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap)
starter kit by running:

```bash
yarn create @metamask/snap gas-estimation-snap
```

or

```bash
npx @metamask/create-snap gas-estimation-snap
```

or

```bash
npm create @metamask/snap gas-estimation-snap
```

Next, `cd` into the `gas-estimation-snap` project directory and run:

```bash
yarn install
```

This initializes your development environment with the required dependencies.
You may get a warning similar to the following:

```bash
@lavamoat/allow-scripts has detected dependencies without configuration. explicit configuration required.
run "allow-scripts auto" to automatically populate the configuration.
```

You can resolve this error by running the following command:

```bash
yarn run allow-scripts auto
```

### 2. Add a custom icon

Your Snap must [display an icon](../best-practices/design-guidelines.md#optimize-your-metadata) in MetaMask.
To add an icon, create a new folder `images` in the Snap package `packages/snap/`:

```bash
mkdir packages/snap/images
```

Download
[this `gas.svg` icon file](https://raw.githubusercontent.com/Montoya/gas-fee-snap/main/packages/snap/images/gas.svg)
into the `ìmages` folder you just created.  
This is a free icon, "Gas" by Mello from
[Noun Project](https://thenounproject.com/browse/icons/term/gas/).

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

Open `packages/snap/snap.manifest.json` in a text editor.
This file contains the main configuration details for your Snap.
Edit the `npm` object, within the `location` object,
and add `iconPath` with the value `"images/gas.svg"` to point to your new icon:

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

Open `packages/snap/package.json` in a text editor.
Edit the `files` array and add the `images/` folder:

```json title="package.json"
"files": [
  "dist/",
  "images/",
  "snap.manifest.json"
],
```

### 3. Enable network access

To enable your Snap to [access the internet using the `fetch` API](../../features/network-access.md),
request the [`endowment:network-access`](../../reference/permissions.md#endowmentnetwork-access)
permission in `packages/snap/snap.manifest.json`:

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_dialog": {},
  "endowment:rpc": {
    "dapps": true,
    "snaps": false
  },
  "endowment:network-access": {}
},
"manifestVersion": "0.1"
```

### 4. Fetch gas fee estimates

Open `packages/snap/src/index.ts`.
This is the main code file for your Snap.
To get a gas fee estimate, use the public API endpoint provided by
[Open Source Ethereum Explorer](https://beaconcha.in/).
Add the following `getFees()` function to the beginning of the `/packages/snap/src/index.ts` file:

```typescript title="index.ts"
import type { OnRpcRequestHandler } from "@metamask/snaps-sdk"
import { panel, text } from "@metamask/snaps-sdk"

async function getFees() {
  const response = await fetch("https://beaconcha.in/api/v1/execution/gasnow")
  return response.text()
}
```

Next, add the `copyable` component to the second import of the file:

```typescript title="index.ts"
import type { OnRpcRequestHandler } from "@metamask/snaps-sdk"
import { panel, text, copyable } from "@metamask/snaps-sdk"
```

Modify the Snap RPC message handler that displays the dialog.
This handler uses a switch statement to handle various request methods, but in this instance there is
only one method, `hello`.
For the `hello` method, the handler returns a call to MetaMask with the parameters to display a
dialog, and passes some static strings.

Update the `hello` method with the following code:

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
case "hello":
  const fees = await getFees();
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: "alert",
      content: (
        <Box>
          <Text>Hello, <Bold>{origin}</Bold>!</Text>
          <Text>Current gas fee estimates:</Text>
          <Copyable>{fees}</Copyable>
        </Box>
      ),
    }
  });
```

</TabItem>
<TabItem value="Functions" deprecated>

```typescript title="index.ts"
case "hello":
  const fees = await getFees();
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: "alert",
      content: panel([
        text(`Hello, **${origin}**!`),
        text("Current gas fee estimates:"),
        copyable(fees),
      ]),
    }
  });
```

</TabItem>
</Tabs>

### 5. Build and test the Snap

To build and test your Snap:

1. Open `package.json` in the root directory of the project, and increment the `"version"` (if the `"version"` is
   `0.1.0`, increase it to `0.2.0`).

2. From the command line, run `yarn start`.
   In the terminal, at the bottom of the message log, you see the browser URL:

   ```bash
   You can now view site in the browser.

     http://localhost:8000/
   ```

3. Open [`localhost:8000`](http://localhost:8000/) in your browser (with MetaMask Flask installed).
   A page like the following displays:

   <img src={require('../../assets/template-snap.png').default} alt="Test dapp with template Snap" style={{border: '1px solid #DCDCDC'}} />

   This is a boilerplate test dapp for installing and testing your Snap.

4. Select **Connect** to connect Flask to the dapp.
   After connecting, you're prompted to install the Snap with the following permissions:

   - **Allow dapps to communicate directly with this Snap.**
   - **Access the internet.**
   - **Display dialog windows in MetaMask.**

5. Select **Approve** > **Install**.

6. After installing, the **Send message** button on the page is enabled. Select this button. A dialog prompt displays with the response from the gas fee API:

<p align="center">
<img src={require('../../assets/gas-estimation.png').default} alt="Gas estimation dialog" width="400px" style={{border: '1px solid #DCDCDC'}} />
</p>

You have integrated a public API into MetaMask and displayed real-time gas fee estimates.

### 6. Next steps

Next, you can try:

- Parsing the JSON response from the remote API.
- Displaying the fees in a nicely formatted way.

You can also update the fields in `snap.manifest.json` to match your custom Snap:

- `proposedName` - The name of your Snap.
- `description` - The description of your Snap.
- `source` - The `shasum` is set automatically when you build from the command line.
  If you decided to publish your Snap to `npm`, update the `location` to its published location.

Similarly, you should update the `name`, `version`, `description`, and `repository` fields of
`/packages/snap/package.json` even if you do not plan to publish your Snap to npm.

:::caution important
The `version` and `repository` fields in `snap.manifest.json` inherit the values from
`package.json` and overwrite them in `snap.manifest.json`.
We recommend updating `version` and `repository` in `package.json` first, then building the Snap project.
:::

You can update the content of `/packages/site/src/pages/index.tsx` by changing the
name of the method for showing gas fee estimates.
If you change the method name in `/packages/site/src/pages/index.tsx`, ensure you change the method name in `/packages/snap/src/index.ts` to match.

After you have made all necessary changes, you can
[publish your Snap to npm](../../how-to/publish-a-snap.md).
