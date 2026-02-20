# Use the Wallet Adapter

Solana's [Wallet Adapter](https://github.com/solana-labs/wallet-adapter) is the standard way for Solana dapps to discover and connect to wallets.
This guide shows you how to set it up with MetaMask in a React dapp.

Use the [`create-solana-dapp`](https://github.com/solana-foundation/create-solana-dapp) CLI tool to generate a new project with the Wallet Adapter built in, or follow the steps below to add it to an existing dapp.

:::info
See the [Solana documentation](https://solana.com/developers/cookbook/wallets/connect-wallet-react) for more information.
:::

## Steps

### 1. Install dependencies

Install the following dependencies:

```bash
npm install @solana/web3.js       \
  @solana/wallet-adapter-base     \
  @solana/wallet-adapter-react    \
  @solana/wallet-adapter-react-ui \
  @solana/wallet-adapter-wallets
```

### 2. Create the Solana provider

Create a `SolanaProvider` to provide the Solana context to the application:

```typescript title='components/SolanaProvider.tsx'
'use client';

import React, { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your dapp.
import '@solana/wallet-adapter-react-ui/styles.css';

interface SolanaProviderProps {
  children: ReactNode;
}

export const SolanaProvider: FC<SolanaProviderProps> = ({ children }) => {
  // The network can be set to devnet, testnet, or mainnet-beta.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```

### 3. Wrap the application in the Solana Provider

Add the `SolanaProvider` to the `RootLayout` in the `app` directory:

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

## Next steps

See how to send a [legacy transaction](send-legacy-transaction.md) and a [versioned transaction](send-versioned-transaction.md).
