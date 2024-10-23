---
description: Get up to speed with MetaMask SDK using Wagmi to connect to MetaMask Extension and MetaMask Mobile.
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a React dapp with MetaMask SDK and Wagmi

This tutorial walks you through creating a simple JavaScript dapp and integrating it with our MetaMask SDK.

This tutorial focuses on the happy path of utilizing the MetaMask SDK which is the most widely way that developers are adopting use of the MetaMask SDK. So why [Wagmi](https://wagmi.sh/cli/why)?

Wagmi provides simple React hooks for Ethereum developers, making it easier to manage wallet connections, transactions, and network interactions. By using Wagmi in conjunction with the MetaMask SDK, developers can enjoy a streamlined setup without needing to manage additional dependencies, since our SDK is already integrated. This setup accelerates your ability to start building web3 applications with React, letting you focus on writing code quickly and efficiently with minimal friction.

## Scaffolding out a ViteJS plus React Application

You can start with either [Create Wagmi](https://wagmi.sh/cli/create-wagmi) (the path we will take in this tutorial) or use our [Consensys Create Web3](https://github.com/Consensys/create-web3-template?tab=readme-ov-file#create-web3-template-cli) CLI to scaffold out a basic ViteJS with React application, both of which will ensure that Viem and Wagmi are configured properly allowing you to start previewing your web application immediately.

Create Wagmi is just going to configure a frontend app for you, which is great for us because then we can practice setting up the MetaMask SDK and starting to work out how it fits into the picture.

:::note
Using the Consensys Create Web3 CLI is an option that I would suggest for future web3 greenfield development as it not only generates a nearly identical frontend as Create Wagmi, but it creates a mono repo (single repository containing both a blockchain and a React web client) with the MetaMask SDK already wired up with a custom connect button.
:::

## Prerequisites

- [Node.js](https://nodejs.org/en/) version 20+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 9+
- A text editor of your choice, such as [VS Code](https://code.visualstudio.com/).
- [MetaMask](https://metamask.io/) installed in the browser of your choice on your development machine.
- React Experience is suggested as we will be working with React with ViteJS.

## Steps

### 1. Set up the project

<Tabs>
  <TabItem value="pnpm" label="pnpm" default>

```bash
pnpm create wagmi --template vite-react
```

  </TabItem>
  <TabItem value="npm" label="npm" >

```bash
npm create wagmi@latest  --template vite-react
```

  </TabItem>
</Tabs>

This command will prompt you for a project name, we can use something simple to describe our demo: `mmsdk-wagmi-tutorial`.

Once we run this command we will need to give our project a name and change directories into that project and install dependencies.

install the node module dependencies:

<Tabs>
  <TabItem value="pnpm" label="pnpm" default>

```bash
cd mmsdk-wagmi-tutorial && pnpm install
```

  </TabItem>
  <TabItem value="npm" label="npm" >

```bash
cd mmsdk-wagmi-tutorial && npm install
```

  </TabItem>
</Tabs>

Launch the development server:

```bash
npm run dev
```

This displays a localhost URL in your terminal, where you can view the dapp in your browser.
