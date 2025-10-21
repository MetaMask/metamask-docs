---
sidebar_label: Use the Wallet Adapter
---

# Use the Solana Wallet Adapter

If your dApp uses the [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter), you just have to add the Solflare Wallet Adapter to the list of supported wallets.

Install the latest *wallets* package with

```sh
npm install @solana/wallet-adapter-wallets@latest
```

Then update the code to look like this:

```javascript
import {
  SolflareWalletAdapter,
  /* ... other adapters ... */
} from '@solana/wallet-adapter-wallets';

const wallets = useMemo(
  () => [
    new SolflareWalletAdapter(),
    // ... other adapters ...
  ],
  []
);

<WalletProvider autoConnect wallets={wallets}>
```

Alternatively, you can install only the Solflare adapter directly

```sh
npm install @solana/wallet-adapter-solflare@latest
```

Then update the code:

```javascript
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { /* ... other adapters ... */ } from '@solana/wallet-adapter-wallets';


const wallets = useMemo(
  () => [
    new SolflareWalletAdapter(),
    // ... other adapters ...
  ],
  []
);

<WalletProvider autoConnect wallets={wallets}>
```
