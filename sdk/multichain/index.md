---
sidebar_label: Introduction
---

import CardList from '@site/src/components/CardList'

# Connect to multiple ecosystems

Connect to multiple blockchain networks and ecosystems in MetaMask at the same time using MetaMask Connect.

MetaMask Connect allows you to target specific chains as part of each method call, eliminating the need to detect and switch networks before executing signatures and transactions.
With MetaMask Connect Multichain, you can create unified multichain wallet connection flows, execute transactions across different networks and ecosystems more seamlessly, and clearly interpret chain-specific addresses.
Today, MetaMask Connect Multichain SDK supports all EVM networks and Solana, and will soon support more ecosystems like Bitcoin and Tron.

Get started with the following guides:

<CardList
items={[
{
href: '/sdk/multichain/connect/guides/connect-to-multichain',
title: 'Connect to EVM and Solana',
description: 'Connect to EVM networks and Solana in MetaMask.',
},
{
href: '/sdk/multichain/connect/guides/send-transactions',
title: 'Send EVM and Solana transactions',
description: 'Send transactions on EVM networks and Solana.',
},
{
href: '/sdk/multichain/connect/guides/connector-libraries',
title: 'Connector library guide',
description: 'Integrate MetaMask Connect into your existing multichain connector library.',
}
]}
/>
