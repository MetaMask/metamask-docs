---
sidebar_label: Use the Wallet Adapter
description: Set up Solana's Wallet Adapter to connect a dapp to MetaMask.
keywords: [solana, wallet adapter, wallet standard, connect, react]
---

# Use the Wallet Adapter

Solana's [Wallet Adapter](https://github.com/solana-labs/wallet-adapter) is the standard way for
Solana dapps to discover and connect to wallets. MetaMask implements the
[Wallet Standard](https://github.com/wallet-standard/wallet-standard), so it works with the Wallet
Adapter out-of-the-box.

This guide shows you how to set it up with MetaMask in a React dapp. You can also use the
[`create-solana-dapp`](https://github.com/solana-foundation/create-solana-dapp) CLI tool to generate
a new project with the Wallet Adapter built in.

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later
- A package manager such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm),
  [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/)
- A React or Next.js project

## Steps

### 1. Install dependencies

Install MetaMask Connect Solana and the Wallet Adapter packages:

```bash
npm install @metamask/connect-solana \
  @solana/web3.js                    \
  @solana/wallet-adapter-base        \
  @solana/wallet-adapter-react       \
  @solana/wallet-adapter-react-ui    \
  @solana/wallet-adapter-wallets
```

### 2. Create the Solana provider

Create a `SolanaProvider` component that initializes MetaMask Connect Solana and wraps the Wallet Adapter
providers:

```typescript title='components/SolanaProvider.tsx'
'use client';

import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { createSolanaClient } from '@metamask/connect-solana';

import '@solana/wallet-adapter-react-ui/styles.css';

interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  useEffect(() => {
    createSolanaClient({
      dapp: {
        name: 'My Solana DApp',
        url: window.location.origin,
      },
    });
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

Calling `createSolanaClient()` registers MetaMask with the [Wallet Standard](https://github.com/wallet-standard/wallet-standard) registry, so MetaMask appears as a connection option in the wallet modal — even if the user doesn't have MetaMask installed.

### 3. Add the provider to your root layout

Wrap your application with `SolanaProvider` so all components can access the wallet context:

```typescript
import './globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { SolanaProvider } from '@/components/SolanaProvider';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
```

### 4. Add a connect button

Use the Wallet Adapter's `WalletMultiButton` component to add a connect button to your dapp:

```typescript title='components/ConnectWallet.tsx'
'use client';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const ConnectWallet = () => {
  return <WalletMultiButton />;
};
```

The button automatically displays a wallet selection modal that includes MetaMask.

## Next steps

See how to send a [legacy transaction](send-legacy-transaction.md) and a [versioned transaction](send-versioned-transaction.md).
