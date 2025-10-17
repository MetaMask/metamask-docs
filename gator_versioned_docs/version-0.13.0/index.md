---
title: Delegation Toolkit introduction
sidebar_label: Introduction
description: High-level overview of Smart Accounts and the Delegation Toolkit.
keywords: [MetaMask, delegation toolkit, smart accounts]
---

import CardList from "@site/src/components/CardList"

# Create MetaMask Smart Accounts using the Delegation Toolkit

The MetaMask Delegation Toolkit is a [Viem](https://viem.sh/)-based collection of tools for embedding [MetaMask Smart Accounts](concepts/smart-accounts.md) into dapps.
Smart accounts support programmable account behavior and advanced features like delegated permissions, multi-signature approvals, and gas abstraction.

[Delegation](concepts/delegation/index.md) is a core feature of MetaMask Smart Accounts, enabling secure, rule-based permission sharing.
Delegation is powered by the toolkit's Delegation Framework, which defines how
permissions are created, shared, and enforced.

MetaMask Smart Accounts also support [ERC-7715 permissions](concepts/erc7715.md), which are fine-grained permissions dapps can request from users directly via the MetaMask browser extension.

## Why use the toolkit?

The toolkit enables developers to create frictionless new experiences based on programmable account behavior and granular permission
sharing. The toolkit offers a suite of contracts, libraries, and services designed for
maximum composability, allowing developers to build and extend their dapps with ease.

The toolkit enables:

- **Instant user onboarding.** Instantly onboard users with embedded MetaMask Smart Accounts — no browser extension, mobile
  app, or seed phrase required.

- **New web3 experiences.** Unlock new experiences such as peer-to-peer social
  coordination using incentive trees, or recurring subscription payments that don't require users
  to connect to the dapp.

- **Uninterrupted user experiences.** Keep users immersed in the dapp by embedding the wallet
  experience and reassigning gas costs to where they make sense.

## Where do I start?

Check out the following guides to get started with the MetaMask Delegation Toolkit:

<CardList
items={[
{
href: "get-started/install",
title: "Install and set up",
description: "Install and set up the MetaMask Delegation Toolkit.",
},
{
href: "get-started/smart-account-quickstart",
title: "MetaMask Smart Accounts quickstart",
description: "Create a MetaMask smart account and send a user operation.",
},
{
href: "get-started/smart-account-quickstart/eip7702",
title: "EIP-7702 quickstart",
description: "Upgrade an externally owned account to a smart account.",
},
{
href: "get-started/use-the-cli",
title: "Use the CLI",
description: "Use the Delegation Toolkit CLI to bootstrap a project.",
}
]}
/>

## Partner integrations

The MetaMask Delegation Toolkit is integrated with multiple ecosystem partners.
Check out the following documentation from these partners:

<CardList
items={[
{
href: "https://scaffoldeth.io/extensions",
title: "Scaffold-ETH 2",
description: "Install the MetaMask Delegation Toolkit extension for Scaffold-ETH 2.",
buttonIcon: 'external-arrow',
},
{
href: "https://viem.sh/account-abstraction/accounts/smart/toMetaMaskSmartAccount",
title: "Viem",
description: "Use MetaMask Smart Accounts with Viem.",
buttonIcon: 'external-arrow',
},
{
href: "https://docs.arbitrum.io/for-devs/third-party-docs/MetaMask/",
title: "Arbitrum",
description: "Use MetaMask Smart Accounts with Arbitrum.",
buttonIcon: 'external-arrow',
},
{
href: "https://docs.pimlico.io/guides/how-to/accounts/use-metamask-account",
title: "permissionless.js",
description: "Use MetaMask Smart Accounts with permissionless.js.",
buttonIcon: 'external-arrow',
},
{
href: "https://docs.monad.xyz/tooling-and-infra/account-abstraction/wallet-providers#metamask-delegation-toolkit",
title: "Monad",
description: "Use MetaMask Smart Accounts with Monad Testnet.",
buttonIcon: 'external-arrow',
}
]}
/>
