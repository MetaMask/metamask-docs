---
sidebar_label: Introduction
description: Connect to EVM networks using MetaMask Connect.
keywords: [evm, ethereum, connect, eip-1193, provider, ethers, viem, web3js]
---

import CardList from '@site/src/components/CardList'

# Connect to EVM networks

Connect to Ethereum and other EVM networks in MetaMask using `@metamask/connect-evm`.

## Drop-in EIP-1193 provider

The EVM client provides an **EIP-1193 compatible provider** (`window.ethereum`-shaped), so your existing EVM code works with minimal changes.
This means your existing `ethers.js`, `viem`, or `web3.js` code works as-is.

```typescript
import { createEVMClient } from '@metamask/connect-evm';

const client = await createEVMClient({
  dapp: { name: 'My DApp', url: 'https://mydapp.com' },
});

// Connect and request chains
const { accounts, chainId } = await client.connect({
  chainIds: ['0x1', '0x89'],  // Ethereum Mainnet + Polygon
});

// Get an EIP-1193 provider — works with ethers.js, viem, web3.js, etc.
const provider = client.getProvider();
const balance = await provider.request({
  method: 'eth_getBalance',
  params: [accounts[0], 'latest'],
});
```

**What you get:** Automatic platform detection, relay connections, session persistence — all behind a standard EIP-1193 interface.

## Get started

MetaMask Connect is available in a variety of ways to make integration as easy as possible.
You can access it directly via npm, through popular developer libraries like Wagmi, or as part of popular convenience libraries:

<CardList
items={[
{
href: '/sdk/evm/connect/quickstart/javascript',
title: 'JavaScript',
description: 'Set up MetaMask Connect in a JavaScript dapp.',
},
{
href: '/sdk/evm/connect/quickstart/wagmi',
title: 'Wagmi',
description: 'Set up MetaMask Connect in a Next.js and Wagmi dapp.',
},
{
href: '/sdk/evm/connect/quickstart/rainbowkit',
title: 'RainbowKit',
description: 'Set up MetaMask Connect in a JavaScript and RainbowKit dapp.',
},
{
href: '/sdk/evm/connect/quickstart/connectkit',
title: 'ConnectKit',
description: 'Set up MetaMask Connect in a JavaScript and ConnectKit dapp.',
},
{
href: '/sdk/evm/connect/quickstart/react-native',
title: 'React Native',
description: 'Set up MetaMask Connect in a React Native or Expo dapp.',
},
{
href: '/sdk/evm/connect/quickstart/dynamic',
title: 'Dynamic SDK',
description: 'Set up Dynamic SDK in a Next.js dapp. Use MetaMask Connect features with Dynamic.',
},
{
href: '/sdk/evm/connect/quickstart/web3auth',
title: 'Embedded Wallet SDK (fka Web3Auth)',
description: 'Set up Web3Auth SDK in a Next.js dapp. Use MetaMask Connect features with Web3Auth.',
},
{
href: 'https://web3onboard.thirdweb.com/',
title: 'Web3-Onboard',
description: 'Use MetaMask Connect features with Web3-Onboard.',
buttonIcon: 'external-arrow',
}
]}
/>

## Library compatibility

The EVM client works seamlessly with popular Ethereum libraries:

| Library | Compatibility |
|---------|---------------|
| [ethers.js](https://docs.ethers.org/) | Pass `client.getProvider()` to `BrowserProvider` |
| [viem](https://viem.sh/) | Use with `custom()` transport |
| [web3.js](https://web3js.org/) | Pass `client.getProvider()` to `Web3` constructor |

## Using with ethers.js and Solana together

If your dapp supports both EVM and Solana, you can use both the EVM and Solana clients.
They share the same underlying multichain session — the user only approves once.

See the [Multichain documentation](/sdk/multichain) for more details on cross-ecosystem connections.
