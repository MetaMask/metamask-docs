---
title: "Use Framework Kit - MetaMask Connect Solana"
sidebar_label: Use Framework Kit
description: Set up Framework Kit with MetaMask Connect Solana in a React dapp for simplified RPC connections, wallet management, and hook-based state.
keywords: [solana, framework kit, react, hooks, wallet, connect, react hooks, solana hooks, wallet hooks, unified API]
---

# Use Framework Kit

[Framework Kit](https://www.framework-kit.com/) is a React library that simplifies Solana dapp
development. It handles RPC connections, wallet adapters, and state management, so you can interact
with Solana using React hooks.

Framework Kit supports MetaMask out-of-the-box. This guide walks you through setting it up.

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later
- A package manager such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm),
  [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/)
- A React or Next.js project

## Steps

### 1. Install dependencies

Install Framework Kit's Solana client and React hooks:

```bash
npm install @solana/client @solana/react-hooks
```

### 2. Create the Solana provider

Create a `SolanaProviderWrapper` component that initializes the Solana client with MetaMask support:

```typescript title='components/SolanaProvider.tsx'
'use client';

import { createClient, metamask } from "@solana/client";
import { SolanaProvider } from "@solana/react-hooks";
import { FC, ReactNode } from 'react';

// Create a client pointing to Solana devnet
const client = createClient({
  endpoint: "https://solana-devnet.infura.io/v3/YOUR_INFURA_API_KEY",
  walletConnectors: [...metamask()],
});

interface SolanaProviderWrapperProps {
  children: ReactNode;
}

export const SolanaProviderWrapper: FC<SolanaProviderWrapperProps> = ({ children }) => {
  return (
    <SolanaProvider client={client}>
      {children}
    </SolanaProvider>
  );
};
```

### 3. Add the provider to your root layout

Wrap your application with `SolanaProviderWrapper` so all components can access Solana hooks:

```typescript
import './globals.css';
import { SolanaProviderWrapper } from '@/components/SolanaProvider';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <SolanaProviderWrapper>{children}</SolanaProviderWrapper>
      </body>
    </html>
  );
}
```

### 4. Connect to MetaMask

Use the [`useWalletConnection`](https://www.framework-kit.com/docs/react-hooks#usewalletconnection) hook in any component to connect to the user's wallet:

```typescript
import { useWalletConnection } from "@solana/react-hooks";

export const ConnectWallet = () => {
  const { wallet, connect, disconnect } = useWalletConnection();

  if (wallet) {
    return (
      <div>
        <p>Connected: {wallet.accounts[0].address}</p>
        <button onClick={disconnect}>Disconnect</button>
      </div>
    );
  }

  return <button onClick={() => connect("metamask")}>Connect MetaMask</button>;
};
```

## Next steps

See how to send a [legacy transaction](send-legacy-transaction.md) and a [versioned transaction](send-versioned-transaction.md).
