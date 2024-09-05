---
description: Connect your Starknet account to MetaMask
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import YoutubeEmbed from "@site/src/components/YoutubeEmbed";

# Connect your Starknet account to MetaMask

Use `get-starknet` to connect your dapp to a user's Starknetwallet.
Use the connect function. If a user connects their MetaMask wallet, you can then display their wallet address and other details in your dapp.

## Prerequisites

- [MetaMask Flask installed](install-flask.md)
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 20.11 or later
- [Yarn](https://yarnpkg.com/) or [npm]()

## Create the project

Create a new Snap project using the [`get-starknet`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap)
library by running:

```bash
yarn add get-starknet starknet@next
```

or

```bash
npm install get-starknet starknet@next
```

## Start the Snap

From the root of the newly created project, install the project dependencies using Yarn:

```shell
yarn start
```

or 

```shell
yarn start
```

## Connect to the Snap

On the front-end dapp, select the **Connect** button and the MetaMask Flask extension pops up and
requires you to approve the Snap's permissions.

Once connected, select the **Send message** button to display a custom message within a confirmation
dialog in MetaMask Flask.
