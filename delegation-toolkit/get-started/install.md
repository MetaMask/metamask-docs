---
sidebar_label: Install and set up
description: Learn how to install and set up the MetaMask Delegation Toolkit.
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Install and set up the Delegation Toolkit

This page provides instructions to install and set up the MetaMask Delegation Toolkit, enabling you to integrate [MetaMask Smart Accounts](../concepts/smart-accounts.md) into your dapp.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager.
- If you plan to use any smart contracts (for example, to
    [create a custom caveat enforcer](../how-to/create-delegation/create-custom-caveat-enforcer.md)),
    install [Foundry](https://book.getfoundry.sh/getting-started/installation).

## Steps

### 1. Install the toolkit

Install the [MetaMask Delegation Toolkit](https://github.com/MetaMask/delegation-toolkit) dependencies:

```bash npm2yarn
npm install @metamask/delegation-toolkit
```

### 2. (Optional) Install the contracts

If you plan to extend the Delegation Framework smart contracts (for example, to
[create a custom caveat enforcer](../how-to/create-delegation/create-custom-caveat-enforcer.md)), install
the contract package using Foundry's command-line tool, Forge:

```bash
forge install metamask/delegation-framework@v1.3.0
```

Add `@metamask/delegation-framework/=lib/metamask/delegation-framework/` in your `remappings.txt` file.

### 3. Get started

You're now ready to start using MetaMask Smart Accounts.
Check out the [quickstart](quickstart.md) to walk through a simple example.
