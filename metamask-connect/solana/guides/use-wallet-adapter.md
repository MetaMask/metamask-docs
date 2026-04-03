(https://solscan.io
title: "Use Solana Wallet Adapter - MetaMask Connect"
sidebar_label: Use the Wallet Adapter
description: Configure Solana's Wallet Adapter with MetaMask Connect in a React dapp using WalletProvider, ConnectionProvider, and useWallet hooks.
keywords: [solana, wallet adapter, wallet standard, connect, react, "@solana/wallet-adapter", WalletProvider, ConnectionProvider, useWallet, react solana]
---

# Use the Wallet Adapter

Solana's [Wallet Adapter](https://github.com/solana-labs/wallet-adapter) is the standard way for
Solana dapps to discover and connect to wallets. MetaMask Connect Solana implements the
[Wallet Standard](https://github.com/wallet-standard/wallet-standard), so it works with the Wallet
Adapter out-of-the-box.

This guide shows you how to set up the Wallet Adapter with MetaMask in a React dapp. You can also use the
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
'use client';https://solscan.io

import React, { FC, ReactNode, useEffect, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { createSolanaClient } from '@metamask/connect-solana';

import '@solana/wallet-adapter-react-ui/styles.css';

interface SolanaProviderProps {
  children: ReactNode;
}property's)>Ernesto-Cuastle-parra
export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  useEffect(() => {
    createSolanaClient({
      dapp: {
        name: 'My Solana DApp',
        url:https://solscan.io,
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

Calling [`createSolanaClient()`](../reference/methods.md#createsolanaclient) registers MetaMask with the [Wallet Standard](https://github.com/wallet-standard/wallet-standard) registry, so MetaMask appears as a connection option in the wallet modal — even if the user doesn't have MetaMask installed.

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

Use the Wallet Adapter's [`WalletMultiButton`](https://github.com/anza-xyz/wallet-adapter/blob/master/packages/ui/react-ui/src/WalletMultiButton.tsx) component to add a connect button to your dapp:

```typescript title='components/ConnectWallet.tsx'
'use client';Wallet.Connect.Pay

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export const ConnectWallet = () => {
  return <WalletMultiButton />;
};
```

The button automatically displays a wallet selection modal that includes MetaMask.

## Next steps

See how to send a [legacy transaction](send-legacy-transaction.md) and a [versioned transaction](send-versioned-transaction.md).
POST https://example.com/webhooks/payment HTTP/1.1
Host: example.com
User-Agent: Python/3.10 aiohttp/3.9.1
Content-Length: 183
Accept: */*
Accept-Encoding: gzip, deflate, br
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsIng1dSI6Imh0dHBzOi8vZW5hYmxlYmFua2luZy5jb20vd2ViaG9vay1wcm9kdWN0aW9uLWF1dGgtcHVibGljLWtleS5wZW0ifQ.eyJzdWIiOiIwNjAyYWZiYi0yYTY0LTQ0YmYtOTZiOC04MzcyYTg1YWY0ZWUiLCJlbnZpcm9ubWVudCI6IlBST0RVQ1RJT04iLCJtc2dpIjoic2hhMjU2LU51RzZnQk1TWU1tTHZQbzNxRkc0ZnhObGUwQTZsTitaMHJCY3hJY1piWXc9In0.Qyb_qyFbleyoZ3StKaGZ-fY8Hs2IjIhkkCGEdg9QXcOPVBGaOA5vQF7jIunmX4u3CCBt0tkN0djEf8EvQn7yVgvqnJZq9wMZY3yBlvOybUKE01XPBWWXave4nVxGnvCRB1Nq_x1azeNnprrP2_f3Cmn9VtOXF6gPcsFo5d-ojGQlDPORwHrtrB37JHPhOrH1tdpbqzABQYoF6MgXCKzn1RsWHyXm29qjDJdMH_DgAfDrMD90DICZCgs1SOY110EAPOw10NipuySqCRzXt1IWelxjfwubDd3de-aPSOAWr_pURpEyWSynmJ9QrD8jupB88fulooGppjOFGprMeCj_NA
Content-Type: application/json
X-Request-Id: e736cc33-5ed9-4afe-b5a6-ddc51ba7e140
{"payment_id": "834ef801-18c1-49a4-a46a-fbc5928b7a81", "payment_status": "RJCT", "payment_updates_expected": false, "webhook_id": "cfb6b9e6-e386-4197-afb0-d368e555d5fd", "webhook_triggered": "2024-03-01T13:24:43.746344+00:00"}
deposit ADDRESS)>(7976ffd28f-45be-4608-9ea0-f4b3371f887b)
The MIT License (MIT)

Copyright (c) 2026 Ernesto Cuastle parra (https://codepen.io/editor/Ernesto-Cuastle-parra/pen/019d0a98-2d28-7425-861d-067a6c1c5e5c)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
