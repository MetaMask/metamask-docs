---
description: Learn how to use Openfort signer with MetaMask Smart Accounts.
sidebar_label: Openfort
keywords: [openfort, smart account, signer, metamask smart account]
---

import GlossaryTerm from '@theme/GlossaryTerm';

# Use Openfort with MetaMask Smart Accounts

[Openfort](https://www.openfort.io/docs) provides an embedded wallet solution that enables seamless social, email, and passkey sign-in for Web3 applications, making user onboarding easier. MetaMask Smart Accounts is a signer-agnostic implementation
that allows you to use Openfort's <GlossaryTerm term="Externally owned account (EOA)">EOA</GlossaryTerm> wallet as a signer for <GlossaryTerm term="MetaMask smart account">smart accounts</GlossaryTerm>.

:::info
This guide supports React and React-based frameworks.
:::

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager.
- Create an [Openfort project](https://dashboard.openfort.io) and note your **Publishable key** and **Shield publishable key**.

## Steps

### 1. Install dependencies

Install the following dependencies:

```bash npm2yarn
npm install @openfort/react @metamask/smart-accounts-kit @tanstack/react-query wagmi viem
```

### 2. Create the Openfort provider

In this step, you'll configure the `OpenfortProvider` component to provide Openfort's context
to your application. You'll also use Openfort's `OpenfortWagmiBridge` component and `getDefaultConfig` helper to integrate Openfort with Wagmi. This
bridge enables you to use Wagmi hooks with Openfort.

Once you have created the `OpenfortAppProvider`, you must wrap it at the root of your application so
that the rest of your application has access to Openfort's context.

Set `accountType` to `AccountTypeEnum.EOA` so that the embedded wallet is created as an EOA, which
acts as the signer for the smart account.

See [Openfort's documentation](https://www.openfort.io/docs/products/embedded-wallet/react/ui/configuration) for advanced configuration of appearance, login methods, and wallet recovery.

<Tabs>
<TabItem value = "provider.ts">

```ts
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { AccountTypeEnum, OpenfortProvider } from "@openfort/react";
import { OpenfortWagmiBridge } from "@openfort/react/wagmi";
import { wagmiConfig, queryClient } from "./config.ts"

export function OpenfortAppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <OpenfortWagmiBridge>
          <OpenfortProvider
            publishableKey="<YOUR_OPENFORT_PUBLISHABLE_KEY>"
            walletConfig={{
              shieldPublishableKey: "<YOUR_SHIELD_PUBLISHABLE_KEY>",
              ethereum: {
                // Create the embedded wallet as an EOA, which acts as
                // the signer for the smart account.
                accountType: AccountTypeEnum.EOA,
              },
            }}
          >
            {children}
          </OpenfortProvider>
        </OpenfortWagmiBridge>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
```

</TabItem>

<TabItem value = "config.ts">

```ts
import { QueryClient } from '@tanstack/react-query'
import { createConfig } from 'wagmi'
import { getDefaultConfig } from '@openfort/react/wagmi'
import { sepolia } from 'viem/chains'

export const queryClient = new QueryClient()

export const wagmiConfig = createConfig(
  getDefaultConfig({
    appName: 'MetaMask Smart Accounts demo',
    chains: [sepolia],
    ssr: true,
  })
)
```

</TabItem>
</Tabs>

### 3. Create a smart account

Once the user has connected their wallet, use the [Wallet Client](https://viem.sh/docs/clients/wallet) from Wagmi as the signer to create a
<GlossaryTerm term="MetaMask smart account" />.

```ts
import { Implementation, toMetaMaskSmartAccount } from '@metamask/smart-accounts-kit'
import { useConnection, usePublicClient, useWalletClient } from 'wagmi'

const { address } = useConnection()
const publicClient = usePublicClient()
const { data: walletClient } = useWalletClient()

// Additional check to make sure Openfort is connected
// and values are available.
if (!address || !walletClient || !publicClient) {
  // Handle the error case
}

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [address, [], [], []],
  deploySalt: '0x',
  signer: { walletClient },
})
```

## Next steps

- See how to [send a user operation](../send-user-operation.md).
- To sponsor gas for end users, see how to [send a gasless transaction](../send-gasless-transaction.md).
