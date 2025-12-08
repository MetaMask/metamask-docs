---
description: Learn how to use Dynamic signer with MetaMask Smart Accounts.
sidebar_label: Dynamic
keywords: [dynamic, smart account, signer, metamask samrt account]
---

# Use Dynamic with MetaMask Smart Accounts

[Dynamic](https://www.dynamic.xyz/) is an embedded wallet solution that enables seamless social login and passkey based
wallets, making user onboarding easier. MetaMask Smart Accounts is a signer agnostic implementation
that allows you to use Dynamic's EOA wallet as a signer for MetaMask Smart Accounts.

View the complete code for this guide at [gator-examples repository](https://github.com/MetaMask/gator-examples/tree/main/examples/smart-accounts/signers/dynamic).

## Prerequisites

- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager
- A [Dynamic Environment ID](https://www.dynamic.xyz/docs/developer-dashboard/tokens-api-keys#environment-id)

## Steps

### 1. Install dependencies

Install the following dependencies:

```bash npm2yarn
npm install @dynamic-labs/ethereum @dynamic-labs/sdk-react-core @dynamic-labs/wagmi-connector @metamask/smart-accounts-kit @tanstack/react-query wagmi viem
```

### 2. Create the Dynamic provider

In this step, you'll configure the [`DynamicContextProvider`](https://www.dynamic.xyz/docs/react-sdk/providers/providers-introduction#dynamic-context-provider) component to provide the Dynamic context
to your application. You'll also use the [`DynamicWagmiConnector`](https://www.dynamic.xyz/docs/react-sdk/providers/providers-introduction#dynamic-wagmi-connector) to integrate Dynamic with Wagmi. This 
connector enables you to use Wagmi hooks with Dynamic. 

Once you have created the `DynamicProvider`, you must wrap it at the root of your application so
that the rest of your application has access to the Dynamic context. 

For the advance configuration, see how to [configure Dynamic & Wagmi](https://www.dynamic.xyz/docs/react-sdk/using-wagmi).

<Tabs>
<TabItem value = "provider.ts">

```ts
import { QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { ReactNode } from "react";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { wagmiConfig, queryClient } from "./config.ts"

export function DynamicProvider({ children }: { children: ReactNode }) {
  return (
    <DynamicContextProvider
      settings={{
        // Get your environment id at https://app.dynamic.xyz/dashboard/developer
        environmentId: "<YOUR_DYNAMIC_ENVIRONMENT_ID>",
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <DynamicWagmiConnector>
            {children}
          </DynamicWagmiConnector>
        </WagmiProvider>
      </QueryClientProvider>
    </DynamicContextProvider >
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

Once the user has connected their wallet, you can use the [Wallet Client](https://viem.sh/docs/clients/wallet) from Wagmi as the signer to create a
MetaMask smart account.

```ts
import { Implementation, toMetaMaskSmartAccount } from "@metamask/smart-accounts-kit";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const { address } = useAccount();
const publicClient = usePublicClient();
const { data: walletClient } = useWalletClient();

// Additional check to make sure the Dyanmic wallet is connected
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