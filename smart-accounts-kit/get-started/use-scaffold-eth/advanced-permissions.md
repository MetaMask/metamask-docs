---
description: Get started with the Advanced Permissions (ERC-7715) using Scaffold-ETH 2.
sidebar_label: Advanced Permissions (ERC-7715)
keywords: [scaffold-eth, delegation, advanced permissions, erc7715, 7715, template]
---

# Use Advanced Permissions (ERC-7715) with Scaffold-ETH 2

Use the [Advanced Permissions (ERC-7715) extension](https://github.com/MetaMask/erc-7715-extension) for [Scaffold-ETH 2](https://docs.scaffoldeth.io/) to bootstrap a project in 
under two minutes. This extensions helps you quickly generate the boilerplate code to request fine grained permissions 
from a MetaMask user, and execute transactions on their behalf.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v20.18.3) v20.18.3 or later.
- Install [Yarn](https://yarnpkg.com/) package manager.
- Install [Git](https://git-scm.com/install/).
- [Create a Pimlico API key](https://docs.pimlico.io/guides/create-api-key#create-api-key).

### 1. Install extension

Run the following command to install the Smart Accounts Kit extension:

```bash
npx create-eth@latest -e metamask/erc-7715-extension your-project-name
```

### 2. Set up enviroment variable

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

### 4. Complete the Advanced Permissions lifecycle

Navigate to the **Advanced Permissions (ERC-7715)** page in your Scaffold-ETH
frontend at http://localhost:3000/erc-7715-permissions, and follow the steps to request an advanced
permisison, and execute transaction on the user's behalf.

You can view the completed transaction on Etherscan.

<p align="center">
    <img src={require("../../assets/scaffold-eth-7715.png").default} alt="Scaffold-ETH 2 Advanced Permissions Page" class="appScreen" />
</p>

## Next steps

Learn more about [Advanced Permissions (ERC-7715)](../../concepts/advanced-permissions.md).