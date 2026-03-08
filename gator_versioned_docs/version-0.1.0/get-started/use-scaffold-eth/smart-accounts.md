---
description: Get started with the MetaMask Smart Accounts using Scaffold-ETH 2.
sidebar_label: MetaMask Smart Accounts
keywords: [scaffold-eth, delegation, smart accounts, template]
---

# Use MetaMask Smart Accounts with Scaffold-ETH 2

Use the [MetaMask Smart Accounts extension](https://github.com/metamask/gator-extension) for [Scaffold-ETH 2](https://docs.scaffoldeth.io/) to bootstrap a project in 
under two minutes. This extension helps you quickly generate the boilerplate code to create an embedded smart account, and complete
the delegation lifecycle (create, sign, and redeem a delegation).

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v20.18.3) v20.18.3 or later.
- Install [Yarn](https://yarnpkg.com/) package manager.
- Install [Git](https://git-scm.com/install/).
- [Create a Pimlico API key](https://docs.pimlico.io/guides/create-api-key#create-api-key).

## Steps

### 1. Install the extension

Run the following command to install the Smart Accounts Kit extension:

```bash
npx create-eth@latest -e metamask/gator-extension your-project-name
```

### 2. Set up enviroment variables

Navigate into the project's `nextjs` package, and create a `.env.local` file. Once created, update the
`NEXT_PUBLIC_PIMLICO_API_KEY` environment variable with your Pimlico API Key.

```bash
cd your-project-name/packages/nextjs
cp .env.example .env.local
```

### 3. Start the frontend

In the project's root directory start the development server.

```bash
yarn start
```

### 4. Complete the delegation lifecycle

Navigate to the **MetaMask Smart Accounts & Delegation** page in your Scaffold-ETH
frontend at http://localhost:3000/delegations, and follow the steps to deploy a delegator
account, create a delegate wallet, create a delegation, and redeem a delegation. 

You can view the completed transaction on Etherscan.

<p align="center">
    <img src={require("../../assets/scaffold-eth-smart-accounts.png").default} alt="Scaffold-ETH 2 Smart Accounts & Delegation Page" />
</p>

## Next steps

Learn more about [MetaMask Smart Accounts](../../concepts/smart-accounts.md) and [delegation](../../concepts/delegation/index.md).