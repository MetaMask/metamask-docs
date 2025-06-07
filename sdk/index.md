---
slug: /
title: SDK introduction
description: Introduction page for MetaMask SDK documentation.
keywords: [connect, MetaMask, SDK, integrate, dapp]
---

import Button from '@site/src/components/elements/buttons/button'
import CardList from '@site/src/components/CardList'

# Seamlessly connect to MetaMask using the SDK

MetaMask SDK enables a fast, reliable, and seamless connection from your dapp to the MetaMask extension and MetaMask Mobile.
With the SDK, you can easily onboard users and interact with their accounts on desktop or mobile, across all EVM networks.

<p align="center">
  <Button
    as="a"
    href="connect/javascript-wagmi"
    label="Get started with the SDK"
    icon="arrow-right"
    style={{
            '--button-color-hover': 'var(--general-black)',
            '--button-text-color-hover': 'var(--general-white)',
          }}
  />
</p>

## Why use the SDK?

MetaMask SDK gives your dapp a powerful upgrade:

- **Cross-platform, cross-browser support** - One integration covers both desktop and mobile, all major browsers, and the MetaMask Mobile app—streamlining your user onboarding and eliminating edge cases.
- **Mobile connection that just works** - Say goodbye to clunky "open in in-app browser" flows.
  The SDK enables a native connection from any mobile browser (Safari, Chrome, etc.) directly to MetaMask Mobile, using secure deeplinking and session management.
- **Production-ready, battle-tested** - MetaMask SDK is used in high-volume dapps across DeFi, NFTs, gaming, and more—ensuring stability, speed, and a smooth developer experience.
- **Multichain-ready by design** - Today, the SDK supports all EVM networks.
  Coming soon: Seamless connection to non-EVM chains like Solana and Bitcoin.
  Futureproof your dapp with a single integration.

## Supported platforms and libraries

MetaMask SDK is available in a variety of ways to make integration as easy as possible.
You can access it directly via npm, through popular developer libraries like Wagmi, or as part of popular convenience libraries.

<CardList
  items={[
    {
      href: 'connect/javascript-wagmi',
      title: 'JavaScript + Wagmi (recommended)',
      description: 'Use the CLI or template to set up the SDK in a Next.js and Wagmi dapp.',
    },
    {
      href: 'connect/javascript',
      title: 'JavaScript',
      description: 'Set up the SDK in a JavaScript dapp.',
    },
    {
      href: 'connect/javascript-dynamic',
      title: 'Dynamic SDK',
      description: 'Use the CLI or template to set up Dynamic SDK in a Next.js dapp. Use MetaMask SDK features with Dynamic.',
    },
    {
      href: 'connect/javascript-web3auth',
      title: 'Web3Auth SDK',
      description: 'Use the CLI or template to set up Web3Auth SDK in a Next.js dapp. Use MetaMask SDK features with Web3Auth.',
    },
    {
      href: 'connect/react-native',
      title: 'React Native',
      description: 'Set up the SDK in a React Native or Expo dapp.',
    },
    {
      href: 'https://onboard.blocknative.com',
      title: 'Web3-Onboard',
      description: 'Use SDK features with Web3-Onboard.',
      buttonIcon: 'external-arrow',
    }
  ]}
/>

:::tip Build embedded wallet experiences that work seamlessly with MetaMask
Introducing our latest [Embedded Wallets SDK](connect/javascript-web3auth.md) (Web3Auth), you can now onboard users
instantly and design seamless onchain experiences with social logins, passkeys and more.
:::
