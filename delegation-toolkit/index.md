---
title: Delegation Toolkit introduction
sidebar_label: Introduction
description: High-level overview of MetaMask Smart Accounts and the Delegation Toolkit.
sidebar_position: 1
---

import CardList from "@site/src/components/CardList"

# Embed Smart Accounts using the Delegation Toolkit

The MetaMask Delegation Toolkit is a [Viem](https://viem.sh/)-based collection of tools for embedding [MetaMask Smart Accounts](concepts/smart-accounts.md) into dapps.
Smart Accounts support programmable account behavior and advanced features like delegated permissions, multi-signature approvals, and gas abstraction.

The toolkit's [Delegation Framework](concepts/delegation.md#delegation-framework) extends MetaMask Smart Accounts with secure, rule-based permission sharing.
Use [caveat enforcers](concepts/caveat-enforcers.md) to define exactly how, when, and by whom a Smart Account can be used, enabling use cases like spending limits and time-based access.

## Why use the toolkit?

The toolkit enables developers to create frictionless new experiences based on programmable account behavior and granular permission
sharing. The toolkit offers a suite of contracts, libraries, and services designed for
maximum composability, allowing developers to build and extend their dapps with ease.

The toolkit enables:

- **Instant user onboarding.** Instantly onboard users with embedded Smart Accounts — no browser extension, mobile
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
      href: "get-started/quickstart",
      title: "Quickstart",
      description: "Create a MetaMask Smart Account and send a user operation.",
    }
  ]}
/>

## Questions?

If you have questions, email hellogators@consensys.net.
