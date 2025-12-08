---
description: Learn how to use MetaMask Embedded Wallets (Web3Auth) with MetaMask Smart Accounts.
sidebar_label: Embedded Wallets
keywords: [web3auth, smart account, signer, metamask samrt account]
---

# Use MetaMask Embdeded Wallets (Web3Auth) with MetaMask Smart Accounts

[MetaMask Embedded Wallets (Web3Auth)](/embedded-wallets/) provides a pluggable embedded wallet 
infrastructure to simplify Web3 wallet integration and user onboarding. It supports social logins allowing 
users to access Web3 applications through familiar authentication methods in under a minute. 

MetaMask Smart Accounts is a signer agnostic implementation that allows you to use Embedded Wallets (Web3Auth) as a signer for MetaMask Smart Accounts.

## Prerequisites

- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager
- Get a [Client ID](/embedded-wallets/dashboard) from the Embedded Wallets (Web3Auth) dashboard.
 
## Steps

### 1. Install dependencies

Install the [Smart Accounts Kit](https://www.npmjs.com/package/@metamask/smart-accounts-kit) and other dependencies in your project:

```bash npm2yarn
npm install @metamask/smart-accounts-kit @web3auth/modal wagmi @tanstack/react-query viem
```

### 2. Create the Web3Auth provider

In this step, you'll configure the `Web3AuthProvider` component to provide the Embedded Wallets (Web3Auth) 
context to your application. You'll also use the `WagmiProvider` to integrate Embedded Wallets (Web3Auth) with Wagmi. 
This connector enables you to use Wagmi hooks with Embedded Wallets (Web3Auth). 

Once you have created the `Web3AuthAppProvider`, you must wrap it at the root of your application so
that the rest of your application has access to the Embedded Wallets (Web3Auth) context. 

For the advance configuration, see [Embedded Wallets guide](https://docs.metamask.io/embedded-wallets/sdk/react/advanced/).

<Tabs>
<TabItem value = "provider.ts">

```ts
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { web3authConfig } from "./config.ts";

const queryClient = new QueryClient();

export function Web3AuthAppProvider({ children }: { children: ReactNode }) {
  return (
    <Web3AuthProvider config={web3authConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>{children}</WagmiProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  );
}
```

</TabItem>

<TabItem value = "config.ts">

```ts
import { WEB3AUTH_NETWORK_TYPE, Web3AuthOptions } from "@web3auth/modal";

const web3AuthOptions: Web3AuthOptions = {
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID as string,
  web3AuthNetwork: process.env
    .NEXT_PUBLIC_WEB3AUTH_NETWORK as WEB3AUTH_NETWORK_TYPE,
};

export const web3authConfig = {
  web3AuthOptions,
};
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
- See how to [send a user operations](../send-user-operation.md).
- To sponsor gas for end users, see how to [send a gasless transaction](../send-gasless-transaction.md).