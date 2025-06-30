---
title: Delegation Toolkit introduction
sidebar_label: Introduction
description: High-level overview of the Delegation Toolkit, its benefits, and where to start in the documentation.
sidebar_position: 1
---

import CardList from "@site/src/components/CardList"

# Embed smart accounts using the Delegation Toolkit

The MetaMask Delegation Toolkit is a [Viem](https://viem.sh/)-based collection of tools for integrating
embedded smart contract wallets, known as [MetaMask smart accounts](concepts/smart-accounts.md),
into dapps. Developers can create and manage MetaMask smart accounts that delegate specific
permissions, such as spending limits or time-based access, to other accounts.

At the core of the toolkit is the [Delegation Framework](concepts/delegation.md#delegation-framework), a
set of open-source, audited smart contracts that manage the delegation lifecycle.

Permissions are enforced through [caveats](concepts/caveat-enforcers.md), which are rule-based
constraints that define the conditions of a delegation. The toolkit includes
[built-in caveat enforcers](reference/caveats.md) for common
use cases. It also supports [custom caveat enforcers](how-to/create-delegation/create-custom-caveat-enforcer.md)
for advanced scenarios.

## Why use the toolkit?

The toolkit enables developers to create frictionless new experiences based on granular permission
sharing and trust. The toolkit offers a suite of contracts, libraries, and services designed for
maximum composability, allowing developers to build and extend their dapps with ease.

The toolkit enables:

- **Instant user onboarding.** Provide frictionless onboarding with no browser extension, mobile
  app, or seed phrase required.

- **New web3 experiences.** Unlock new experiences such as peer-to-peer social
  coordination using incentive trees, or recurring subscription payments that don't require users
  to connect to the dapp.

- **Uninterrupted user experiences.** Keep users immersed in the dapp by embedding the wallet
  experience and reassigning gas costs to where they make sense.

## Where do I start?

Check out the following sections to get started with the MetaMask Delegation Toolkit:

<CardList
  items={[
    {
      href: "get-started",
      title: "🏁 Get started",
      description: "If you're ready to get started building, install the Toolkit and follow a quickstart.",
    },
    {
      href: "how-to",
      title: "🛠️ How-to guides",
      description: "To complete specific tasks with the Delegation Toolkit, follow the how-to guides.",
    },
    {
      href: "concepts",
      title: "💭 Concepts",
      description: "If you're new to the Delegation Toolkit, learn about some key concepts.",
    }
  ]}
/>

## Questions?

If you have questions, email hellogators@consensys.net.
