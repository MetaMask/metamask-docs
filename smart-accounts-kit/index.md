---
title: MetaMask Smart Accounts Kit introduction
sidebar_label: Introduction
description: High-level overview of MetaMask Smart Accounts Kit.
keywords: [MetaMask, smart accounts kit, smart accounts]
---

import CardList from "@site/src/components/CardList"

# MetaMask Smart Accounts Kit

MetaMask Smart Accounts Kit enables developers to create and interact with MetaMask Smart Accounts.
It allow developers to create new experiences based on programmable account behavior and granular 
permission sharing. The toolkit offers a suite of contracts, libraries, and services designed for
maximum composability, allowing developers to build and extend their dapps with ease.

## Build on MetaMask Smart Accounts

Smart Accounts Kit is a [Viem](https://viem.sh/)-based collection of tools for embedding [MetaMask Smart Accounts](concepts/smart-accounts.md) into dapps.
Smart accounts support programmable account behavior and advanced features like delegated permissions, multi-signature approvals, and gas abstraction.

[Delegation](concepts/delegation/index.md) is a core feature of MetaMask Smart Accounts, enabling secure, rule-based permission sharing.
Delegation is powered by the [Delegation Framework](https://github.com/metamask/delegation-framework), which defines how permissions are created, shared, and enforced.

<CardList items={[
  {
    href: "get-started/smart-account-quickstart",
    title: "MetaMask Smart Accounts quickstart",
    description: "Create a MetaMask smart account and send a user operation.",
  },
  {
    href: "guides/delegation/execute-on-smart-accounts-behalf",
    title: "Delegations guide",
    description: "Execute on the behalf of MetaMask Smart Accounts.",
  }
]}/>

## Request ERC-7715 Permissions

Smart Accounts Kit supports [ERC-7715 permissions](concepts/erc7715.md), which are fine-grained permissions dapps 
can request from users directly via the MetaMask browser extension. ERC-7715 permissions allows you to execute 
transactions on the behalf of MetaMask browser extension users.

<CardList items={[
  {
    href: "guides/erc7715/execute-on-metamask-users-behalf",
    title: "ERC-7715 guide",
    description: "Execute on the behalf of MetaMask users.",
  }
]}/>

## Where do I start?

Check out the following quides to get started with the MetaMask Smart Accounts Kit:

<CardList items={[
  {
    href: "get-started/install",
    title: "Install and set up",
    description: "Install and set up the MetaMask Smart Accounts Kit.",
  },
  {
    href: "get-started/use-the-cli",
    title: "Use the CLI",
    description: "Use the MetaMask Smart Accounts Kit CLI to bootstrap a project.",
  }
]}/>

## Partner integrations

The MetaMask Smart Accounts Kit is integrated with multiple ecosystem partners.
Check out the following documentation from these partners:

<CardList items={[
  {
    href: "https://scaffoldeth.io/extensions",
    title: "Scaffold-ETH 2",
    description: "Install the MetaMask Smart Accounts Kit extension for Scaffold-ETH 2.",
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
]}/>
