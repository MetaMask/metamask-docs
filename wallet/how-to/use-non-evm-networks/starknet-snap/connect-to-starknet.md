---
description: Connect your Starknet account to MetaMask
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import YoutubeEmbed from "@site/src/components/YoutubeEmbed";

# Connect your Starknet account to MetaMask

To connect a dapp to MetaMask for StarkNet, you can use `get-starknet`. 
This tool simplifies the process of integrating Starknet with MetaMask and allows you to connect your wallets and install the necessary Snap.
After set up, the Snap enables secure and efficient interaction with the Starknet ecosystem.

## Prerequisites

- [MetaMask installed](https://metamask.io/download/)
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 20.11 or later
- [Yarn](https://yarnpkg.com/)

## Create the project

Create a new Snap project using the [`get-starknet`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap)
library by running:

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


## Start the Snap

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

## Connect to the Snap

On the  dapp, click **Connect** and the MetaMask extension is displayed and prompts you to approve the Snap's permissions.

Once connected, select **Send message** to display a custom message within a confirmation
dialog in MetaMask Flask.
