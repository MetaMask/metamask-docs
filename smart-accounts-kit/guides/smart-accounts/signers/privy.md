---
description: Learn how to use Privy signer with MetaMask Smart Accounts.
sidebar_label: Privy
keywords: [privy, smart account, signer, metamask smart account]
---

# Use Privy with MetaMask Smart Accounts

[Privy](https://docs.privy.io/welcome) provides an embedded wallet solution that enables seamless social login for Web3 applications making user onboarding easier. MetaMask Smart Accounts is a signer agnostic implementation
that allows you to use Privy's EOA wallet as a signer for MetaMask Smart Accounts.

:::info
This guide is targeted towards React and React-based frameworks.
:::

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager
- A [Privy App ID](https://docs.privy.io/basics/get-started/dashboard/create-new-app#get-api-credentials)

## Steps

### 1. Install dependencies

Install the following dependencies:

```bash npm2yarn
npm install @privy-io/react-auth @privy-io/wagmi @metamask/smart-accounts-kit @tanstack/react-query wagmi viem
```

### 2. Create the Privy provider

In this step, you'll configure the `PrivyProvider` component to provide the Privy's context
to your application. You'll also use the Privy's `WagmiProvider` component to integrate Privy with Wagmi. This 
provider enables you to use Wagmi hooks with Privy. 

Once you have created the `PrivyAppProvider`, you must wrap it at the root of your application so
that the rest of your application has access to the Privy's context. 

For the advance configuration, see Privy's [configuring appearance](https://docs.privy.io/basics/get-started/dashboard/configuring-appearance) and [configuring login methods](https://docs.privy.io/basics/get-started/dashboard/configure-login-methods) guide.

<Tabs>
<TabItem value = "provider.ts">

```ts
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { PrivyProvider } from '@privy-io/react-auth';
// Make sure to import `WagmiProvider` from `@privy-io/wagmi`, not `wagmi`
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClientProvider } from '@tanstack/react-query';
import { wagmiConfig, queryClient } from "./config.ts"

export function PrivyAppProvider({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider appId="<YOUR_PRIVY_APP_ID>">
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}
```

</TabItem>

<TabItem value = "config.ts">

```ts
import { QueryClient } from "@tanstack/react-query";
import { createConfig, http } from "wagmi";
import { sepolia } from "viem/chains";

export const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [sepolia],
  ssr: true,
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

// Additional check to make sure the Privy is connected
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

- See how to [send a user operation](../send-user-operation.md).
- To sponsor gas for end users, see how to [send a gasless transaction](../send-gasless-transaction.md).