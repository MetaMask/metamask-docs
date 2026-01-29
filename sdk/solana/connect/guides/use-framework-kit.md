# Use Framework Kit

To connect to Solana in MetaMask from your dapp, use Framework Kit.

Framework-kit supports MetaMask out-of-the-box for Solana dapps, handling RPC connections, wallet adapters, and state management for you:

- **One provider, many hooks** — Wrap your app once with `SolanaProvider`, then use hooks anywhere.
- **Wallet connection built-in** — `useWalletConnection` handles discovery, connection, and disconnection.
- **Automatic data refresh** — Balances and account data stay in sync without manual refetching.
- **Common operations simplified** — `useSolTransfer`, `useSplToken`, and `useTransactionPool` for transfers and custom transactions.
- **TypeScript-first** — Full type inference out of the box.

## Steps

### 1. Install dependencies

Install the following dependencies:

```bash
npm install @solana/client @solana/react-hooks
```

### 2. Create the Solana provider

Create a `SolanaProvider` that will be used to provide the Solana context to the application:

```typescript title='components/SolanaProvider.tsx'
'use client';

import { createClient, metamask } from "@solana/client";
import { SolanaProvider } from "@solana/react-hooks";
import { FC, ReactNode } from 'react';

// Create a client pointing to Solana devnet
const client = createClient({
  endpoint: "https://api.devnet.solana.com",
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

### 3. Wrap the application in the Solana Provider

Add the `SolanaProviderWrapper` to the `RootLayout` in the `app` directory:

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

## Next steps

See how to send a [legacy transaction](send-legacy-transaction.md) and a [versioned transaction](send-versioned-transaction.md).
