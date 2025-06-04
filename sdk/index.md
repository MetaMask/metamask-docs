---
slug: /
description: Introduction page for MetaMask SDK documentation.
keywords: [connect, MetaMask, SDK, integrate, dapp]
---

import Button from '@site/src/components/elements/buttons/button'
import CardList from '@site/src/components/CardList'

# Seamlessly connect to MetaMask using the SDK

MetaMask SDK is a toolkit that enables a fast, reliable, and seamless connection from your dapp to the MetaMask extension and MetaMask Mobile.
With the SDK, you can easily onboard users and interact with their accounts on desktop or mobile, across all EVM L1/L2 networks.

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

## Supported platforms and libraries

You can get started with the SDK on the following dapp platforms or third-party libraries:

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
      href: 'https://docs.reown.com/appkit/overview',
      title: 'Reown AppKit',
      description: 'Use SDK features with Reown AppKit.',
      buttonIcon: 'external-arrow',
    },
    {
      href: 'https://www.rainbowkit.com',
      title: 'RainbowKit',
      description: 'Use SDK features with RainbowKit.',
      buttonIcon: 'external-arrow',
    },
    {
      href: 'https://onboard.blocknative.com',
      title: 'Web3-Onboard',
      description: 'Use SDK features with Web3-Onboard.',
      buttonIcon: 'external-arrow',
    },
    {
      href: 'https://docs.family.co/connectkit',
      title: 'ConnectKit',
      description: 'Use SDK features with ConnectKit.',
      buttonIcon: 'external-arrow',
    },
  ]}
/>

:::tip Build embedded wallet experiences that work seamlessly with MetaMask
Introducing our latest [Embedded Wallets SDK](connect/javascript-web3auth.md) (Web3Auth), you can now onboard users
instantly and design seamless onchain experiences with social logins, passkeys and more.
:::
