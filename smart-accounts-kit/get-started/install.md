---
sidebar_label: Install and set up
description: Learn how to install and set up the MetaMask Smart Accounts Kit.
keywords: [install, MetaMask, delegation, smart accounts kit, smart, accounts]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Install and set up the Smart Accounts Kit

This page provides instructions to install and set up the Smart Accounts Kit, enabling you to create and interact with [MetaMask Smart Accounts](../concepts/smart-accounts.md) into your dapp.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager.
- If you plan to use any smart contracts (for example, to
    [create a custom caveat enforcer](/tutorials/create-custom-caveat-enforcer)),
    install [Foundry](https://book.getfoundry.sh/getting-started/installation).

## Steps

### 1. Install the Smart Accounts Kit

Install the [Smart Accounts Kit](https://www.npmjs.com/package/@metamask/smart-accounts-kit):

```bash npm2yarn
npm install @metamask/smart-accounts-kit
```

### 2. (Optional) Install the contracts

If you plan to extend the Delegation Framework smart contracts (for example, to
[create a custom caveat enforcer](/tutorials/create-custom-caveat-enforcer)), install
the contract package using Foundry's command-line tool, Forge:

```bash
forge install metamask/delegation-framework@v1.3.0
```

Add `@metamask/delegation-framework/=lib/metamask/delegation-framework/` in your `remappings.txt` file.

### 3. Get started

You're now ready to start using the Smart Accounts Kit.
See the [MetaMask Smart Accounts quickstart](smart-account-quickstart/index.md) to walk through a simple example.
