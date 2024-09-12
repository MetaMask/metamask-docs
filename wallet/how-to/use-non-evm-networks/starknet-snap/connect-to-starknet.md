---
description: Connect your Starknet account to MetaMask
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect your Starknet account to MetaMask

To connect your dapp to the Starknet network in MetaMask, you can use the `get-starknet` library.
This library simplifies the process of connecting to the Starknet Snap, allowing you to interact with users' Starknet accounts in MetaMask.
`get-starknet` also enables dapps to interact with other wallets in the Starknet ecosystem.

## Prerequisites

 - [MetaMask installed](https://metamask.io/download/)
 - A text editor (for example, [VS Code](https://code.visualstudio.com/))
 - [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 20.11 or later
 - [Yarn](https://yarnpkg.com/)
 - A JavaScript or TypeScript project set up 

 ## Add `get-starknet` to your project

 Add both the [`get-starknet`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap) library and the latest version of the `starknet.js`  library to your project's dependencies:

 - [MetaMask installed](https://metamask.io/download/)
 - A text editor (for example, [VS Code](https://code.visualstudio.com/))
 - [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 20.11 or later
 - [Yarn](https://yarnpkg.com/)
 - A JavaScript or TypeScript project set up 


## Connect using `get-starknet`

### 1. Add `get-starknet` to your project

Add the [`get-starknet`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap) library and the latest version of the `starknet.js`  library to your project's dependencies:

<Tabs>
   <TabItem value="yarn" label="Yarn" default>

   ```bash
   yarn add get-starknet starknet@next
   ```

   </TabItem>

   <TabItem value="npm" label="npm">

   ```bash
   npm install get-starknet starknet@next
   ```

   </TabItem> 

 </Tabs>

### 2. Start the Snap

From the root of the created project, install the project dependencies:

<Tabs>
   <TabItem value="yarn" label="Yarn" default>

   ```bash
   yarn start
   ```

   </TabItem>

   <TabItem value="npm" label="npm">

   ```bash
   npm start
   ```

   </TabItem> 

 </Tabs>

 ### 3. Connect to the Snap

On the dapp, select **Connect**. The MetaMask extension displays and prompts you to approve the Snap's permissions.

After it is connected, select **Send message** to display a custom message within a confirmation
dialog in MetaMask.