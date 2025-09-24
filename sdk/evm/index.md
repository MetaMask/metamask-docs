---
sidebar_label: Introduction
---

import CardList from '@site/src/components/CardList'

# Connect to EVM networks

## Supported platforms and libraries

MetaMask SDK is available in a variety of ways to make integration as easy as possible.
You can access it directly via npm, through popular developer libraries like Wagmi, or as part of popular convenience libraries.

<CardList
items={[
{
href: '/sdk/connect/javascript-wagmi',
title: 'JavaScript + Wagmi (recommended)',
description: 'Use the CLI or template to set up the SDK in a Next.js and Wagmi dapp.',
},
{
href: '/sdk/connect/javascript',
title: 'JavaScript',
description: 'Set up the SDK in a JavaScript dapp.',
},
{
href: '/sdk/connect/react-native',
title: 'React Native',
description: 'Set up the SDK in a React Native or Expo dapp.',
},
{
href: '/sdk/connect/javascript-dynamic',
title: 'Dynamic SDK',
description: 'Use the CLI or template to set up Dynamic SDK in a Next.js dapp. Use MetaMask SDK features with Dynamic.',
},
{
href: '/sdk/connect/javascript-web3auth',
title: 'Web3Auth SDK',
description: 'Use the CLI or template to set up Web3Auth SDK in a Next.js dapp. Use MetaMask SDK features with Web3Auth.',
},
{
href: 'https://onboard.blocknative.com',
title: 'Web3-Onboard',
description: 'Use SDK features with Web3-Onboard.',
buttonIcon: 'external-arrow',
}
]}
/>
