---
description: Learn how to use Externally Owned Account (EOA) with MetaMask Smart Accounts.
sidebar_label: EOA (e.g. MetaMask) 
keywords: [metamask, smart account, signer, metamask smart account]
---

# Use Externally Owned Account (EOA) with MetaMask Smart Accounts

Externally Owned Accounts (EOAs) are accounts controlled by a user’s private key (paired with a public address) and are typically accessed through wallet apps like MetaMask. MetaMask Smart Accounts is signer-agnostic, so
you can use an EOA as the signer.

:::info
This guide supports React and React-based frameworks. For Vue, see [Wagmi docs](https://wagmi.sh/vue/getting-started).
:::

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager
 
## Steps

### 1. Install dependencies

Install the [Smart Accounts Kit](https://www.npmjs.com/package/@metamask/smart-accounts-kit) and other dependencies in your project:

```bash npm2yarn
npm install @metamask/smart-accounts-kit wagmi @tanstack/react-query viem
```

### 2. Create the App provider

Once you've created the `AppProvider`, wrap it at the root of your application so
that the rest of your application has access to the Wagmi's and TanStack's context. 
This will allow every component inside the provider to use the Wagmi hooks.

For the advance configuration, see [Wagmi's createConfig API reference](https://wagmi.sh/react/api/createConfig).

<Tabs>
<TabItem value = "provider.ts">

```ts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WagmiProvider } from 'wagmi'
import { config } from "./config.ts";

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

</TabItem>

<TabItem value = "config.ts">

```ts
import { createConfig, http } from "wagmi";
import { sepolia } from "viem/chains";

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
```

</TabItem>
</Tabs>

### 3. Create a smart account

Once the user has connected their wallet, use the [Wallet Client](https://viem.sh/docs/clients/wallet) from Wagmi as the signer to create a
MetaMask smart account.

```ts
import { Implementation, toMetaMaskSmartAccount } from "@metamask/smart-accounts-kit";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const { address } = useAccount();
const publicClient = usePublicClient();
const { data: walletClient } = useWalletClient();

// Additional check to make sure the EOA wallet is connected
// and values are available.
if (!address || !walletClient || !publicClient ) {
  // Handle the error case
 }

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [address, [], [], []],
  deploySalt: "0x",
  signer: { walletClient },
});
```

## Next steps

- See how to use [MetaMask Embedded Wallets as a signer](./eoa-wallets.md) to make the user onboarding journey easier.
- See how to [send a user operation](../send-user-operation.md).
- To sponsor gas for end users, see how to [send a gasless transaction](../send-gasless-transaction.md).