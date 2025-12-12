---
description: Learn how to configure signers for MetaMask Smart Accounts.
keywords: [signers, metamask smart accounts, smart account, embedded wallets, web3auth, dynamic, privy]
---

import CardList from "@site/src/components/CardList"

# Configure a signer

When [creating a smart account](../create-smart-account.md), you must specify a signer. The signer owns the smart account and is responsible for
generating the signatures required to submit user operations. MetaMask Smart Accounts is signer agnostic, allowing you
to use any signer you prefer such as Embedded Wallets, Passkeys, EOA wallets, or a custom signer.

MetaMask Smart Accounts has native integration with [MetaMask Embedded Wallets](/embedded-wallets/), making it seamless to use smart
accounts with embedded wallets and make user onboarding easier. In addition to native native integration, you can also use
third-party wallet providers as Privy, Dynamic, or Para as the signer for your smart account.

Checkout the following guides to learn how to configure different signers:

## Recommended 

<CardList items={[
  {
    href: "/smart-accounts-kit/development/guides/smart-accounts/signers/embedded-wallets/",
    title: "MetaMask Embedded Wallets",
    description: "Learn how to use MetaMask Embedded Wallets (Web3Auth) with MetaMask Smart Accounts.",
  }
]}/>

## More

<CardList items={[
  {
    href: "/smart-accounts-kit/development/guides/smart-accounts/signers/dynamic",
    title: "Dynamic",
    description: "Learn how to use Dynamic with MetaMask Smart Accounts.",
  },
  {
    href: "/smart-accounts-kit/development/guides/smart-accounts/signers/eoa-wallets",
    title: "EOA (e.g. MetaMask)",
    description: "Learn how to use EOAs like MetaMAsk with MetaMask Smart Accounts.",
  },
  {
    href: "/smart-accounts-kit/development/guides/smart-accounts/signers/privy",
    title: "Privy",
    description: "Learn how to use Privy with MetaMask Smart Accounts.",
  }
]}/>
