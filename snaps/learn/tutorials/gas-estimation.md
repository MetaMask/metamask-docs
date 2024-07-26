---
description: Create a Snap that estimates gas fees.
sidebar_position: 1
---

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

Next, `cd` into the `gas-estimation-snap` project directory and run:

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
You can resolve this error by running:
    
```bash
yarn run allow-scripts auto
```
 </div>
</details>


### 2. (Optional) Customize your Snap

This Snap is generated from a boilerplate typescript example Snap. While the following steps in the 
drop-down are optional for testing, they significantly improve the UX by aligning the Snap with its function.

<details>
  <summary>Customize the Snap's UX</summary>
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

#### 2.2. Update your Snap's wallet prompt

    It's important that user's understand what they're agreeing to when responding to wallet prompts. The 
    prompt uses the `proposedName` of the Snap, currently "Typescript Example" in our boilerplate.

    Open `packages/snap/snap.manifest.json` in a text editor.
    Edit the `"proposedName"` property within the metadata to provide a functional name such as 
    "Gas Estimate Snap":

    ```json title="snap.manifest.json"
    {
      "version": "0.1.0",
      "description": "An example Snap written in TypeScript.",
      "proposedName": "Gas Estimate Snap",
      "repository": {
        "type": "git",
        "url": "https://github.com/MetaMask/template-snap-monorepo.git"
    },
    ```

#### 2.3. Update your Snap's button

    Open `packages/site/src/components/Buttons.tsx` in a text editor.
    Edit the `Button` property to provide a functional name such as "Estimate Gas":

    ```typescript title="Buttons.tsx"
    export const SendHelloButton = (props: ComponentProps<typeof Button>) => {
      return <Button {...props}>Estimate Gas</Button>;
    };
    ````

    These three updates are the minimum required to ensure that each user interaction with the Snap is well 
    informed, however, your Snap will function without these tweaks.
   </div>
</details>


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

Since `getFees()` returns a promise, you must use `then()` to resolve it in your `hello` method.
Update the `hello` method with the following code:

```typescript title="index.ts"
case "hello":
  return getFees().then(fees => {
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
  });
```

### 5. Build and test the Snap

Complete the following steps to build and test your Snap:

5.1 (Optional for testing) open `package.json` in the root directory of the project, and increment 
  the `"version"` (if the `"version"` is `0.1.0`, increase it to `0.2.0`).

#### 5.2. Build your Snap

From the command line, run `yarn start`.
   In the terminal, at the bottom of the message log, you see the browser URL:

   ```bash
   You can now view site in the browser.

     http://localhost:8000/
   ```

Open [`localhost:8000`](http://localhost:8000/) in your browser (with MetaMask Flask installed).
   A page like the following displays:

   <img src={require('../../assets/template-snap.png').default} alt="Test dapp with template Snap" style={{border: '1px solid #DCDCDC'}} />

   This is a boilerplate test dapp for installing and testing your Snap.

5.4 Select **Connect** to connect Flask to the dapp.
   After connecting, you're prompted to install the Snap with the following permissions:

   - **Allow websites to communicate directly with this Snap.**
   - **Access the internet.**
   - **Display dialog windows in MetaMask.**

5.5 Select **Confirm** > **OK**.

5.6 After installing, the **Send message** button (or **Estimate gas** button, if you followed Step 2) 
  is enabled. Select this button. A dialog prompt displays with the response from the gas fee API:

<p align="center">
<img src={require('../../assets/gas-estimation.png').default} alt="Gas estimation dialog" width="400px" style={{border: '1px solid #DCDCDC'}} />
</p>

Congratulations, you have integrated a public API into MetaMask and displayed real-time gas fee estimates.

### Next steps

Consider:

- Improving the Snap's UX:
  - Complete [Step 2](#2-optional-customize-your-snap).
  - Update `description`: the description of your Snap.
  - Parse the JSON response from the remote API.
  - Format the fees for better readability.
- Updating the `location` in `snap.manifest.json` to its published location before publishing your Snap to `npm`, 
- Updating the `name`, `version`, and `repository` fields of
`/packages/snap/package.json` even if you do not plan to publish your Snap to npm.
- Updating the content of `/packages/site/src/pages/index.tsx` by changing the
name of the method for showing gas fee estimates. If you change the method name in 
`/packages/site/src/pages/index.tsx`, ensure you change the method name in 
`/packages/snap/src/index.ts` to match.

:::note
When editing `source`, the `shasum` is set automatically when you build from the command line.
:::

:::caution important
The `version` and `repository` fields in `snap.manifest.json` inherit the values from
`package.json` and overwrite them in `snap.manifest.json`.
We recommend updating `version` and `repository` in `package.json` first, then building the Snap project.
:::

After you have made all necessary changes, you can 
[publish your Snap to npm](../../how-to/publish-a-snap.md).
