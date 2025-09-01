---
title: Create an AI agent using MetaMask SDK
image: 'img/guides/guides-banners/mm-sdk-ai-agent.png'
description: Create a wallet AI agent using MetaMask SDK and Vercel's AI SDK.
type: guide
tags: [metamask sdk, wallet, AI, agent, Vercel, Wagmi, Next.js, OpenAI]
date: May 2, 2025
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This tutorial walks you through creating an AI agent dapp that can display your wallet balance and initiate transactions from your wallet, on the Linea Sepolia network.
You will use a provided template, which sets up MetaMask SDK and [Vercel's AI SDK](https://sdk.vercel.ai/) with a [Next.js](https://nextjs.org/docs) and [Wagmi](https://wagmi.sh/) dapp.

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or later and [pnpm](https://pnpm.io/installation) installed
- An [OpenAI](https://platform.openai.com/docs/overview) API key, with some credit balance available
- [MetaMask](https://metamask.io/) installed, with an account that has Linea Sepolia ETH
  :::note
  You can use the [MetaMask faucet](/developer-tools/faucet) to get Linea Sepolia ETH.
  :::

## Steps

### 1. Set up the project

1.  Clone the [`Consensys/wallet-agent`](https://github.com/Consensys/wallet-agent/tree/main) repository:

    ```bash
    git clone git@github.com:Consensys/wallet-agent.git
    ```

2.  Switch to the `initial-setup` branch:

    ```bash
    cd wallet-agent && git switch initial-setup
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Create a `.env.local` file:

    ```bash
    touch .env.local
    ```

5.  In `.env.local`, add an `OPENAI_API_KEY` environment variable, replacing `<YOUR-API-KEY>` with your [OpenAI](https://platform.openai.com/docs/overview) API key.
    Vercel's AI SDK will use this environment variable to authenticate your dapp with the OpenAI service.

        ```text title=".env.local"
        OPENAI_API_KEY=<YOUR-API-KEY>
        ```

### 2. Create the dapp interface

In `app/page.tsx`, use the `useAccount`, `useConnect`, and `useDisconnect` hooks from Wagmi, along with the Wagmi [MetaMask SDK connector](https://wagmi.sh/react/api/connectors/metaMask) to create a button to connect and disconnect your MetaMask wallet.

Use the `Chat` component to display the AI agent chat interface.

```tsx title="page.tsx"
// add-next-line
+ "use client";

// add-start
+ import { useAccount, useConnect, useDisconnect } from "wagmi";
+ import { metaMask } from "wagmi/connectors";
+ import { Button } from "@/components/ui/button";
+ import { Chat } from "@/components/Chat";
// add-end
import Image from "next/image";

// add-start
+ const ConnectButton = () => {
+   const { connect } = useConnect();
+   const { address, isConnected } = useAccount();
+   const { disconnect } = useDisconnect();
+
+   return (
+     <div className="mx-auto">
+       {isConnected ? (
+         <Button onClick={() => disconnect()}>Disconnect {address}</Button>
+       ) : (
+         <Button onClick={() => connect({ connector: metaMask() })}>Connect</Button>
+       )}
+     </div>
+   );
+ };
// add-end

export default function Home() {
// add-next-line
+ const { isConnected } = useAccount();
  return (
    <div className="h-screen w-full overflow-y-auto grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="gap-8 row-start-2 sm:items-start h-full w-full">
        <h1>Wallet Agent setup</h1>
// add-start
+       <ConnectButton />
+       { isConnected ? <Chat /> : null}
// add-end
      </main>
      // ...
```

To test the interface, run the development server and navigate to [`http://localhost:3000`](http://localhost:3000/):

```bash
npm run dev
```

Test that the button works to connect and disconnect from your MetaMask wallet.
When connected, the AI agent chat interface displays with your connected wallet address.
You can test the AI functionality by sending messages in the chat:

<p align="center">
  <img src={require("@site/static/img/guides/sdk-ai-agent.png").default} alt="SDK AI agent initial setup" class="appScreen" />
</p>

### 3. Create a Public Client

In `wagmi.config.ts`, initialize a [Viem Public Client](https://viem.sh/docs/clients/public.html)
with the Linea Sepolia chain.
This Public Client will enable the AI agent to access public JSON-RPC API methods such as retrieving balances:

```ts title="wagmi.config.ts"
// add-next-line
+ import { createPublicClient } from "viem";
import { createConfig, http, cookieStorage, createStorage } from "wagmi";
import { lineaSepolia, linea, mainnet } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

// add-start
+ export const publicClient = createPublicClient({
+   chain: lineaSepolia,
+   transport: http(),
+ });
// add-end

export function getConfig() {
// ...
```

### 4. Create a tool to get the balance

Use the AI SDK's [tools](https://sdk.vercel.ai/docs/foundations/tools) feature to enable the AI agent to perform specific tasks.

In `ai/tools.ts`, update or remove the example tool.
Use the [`getBalance`](https://viem.sh/docs/actions/public/getBalance) method of your configured Public Client, and Viem's [`formatEther`](https://viem.sh/docs/utilities/formatEther.html) function to create a tool that retrieves the ether balance of the connected wallet:

```ts title="tools.ts"
// add-start
+ import { publicClient } from "@/wagmi.config";
+ import { formatEther } from "viem";
// add-end
import { tool as createTool } from "ai";
import { z } from "zod";

// remove-start
- const tool = createTool({
-   description: "Example tool",
-   parameters: z.object({
-     name: z.string().describe("The name of the user"),
-   }),
-   execute: async ({ name }) => {
-     return { name };
-   },
- });
//remove-end
// add-start
+ const balanceTool = createTool({
+   description: "Get the balance of the connected wallet",
+   parameters: z.object({
+     address: z.string().describe("The address of the user"),
+   }),
+   execute: async ({ address }) => {
+     const balance = await publicClient.getBalance({
+       address: address as `0x${string}`,
+     });
+     return { balance: formatEther(balance) };
+   },
+ });
// add-end

export const tools = {
  // remove-next-line
-   example: tool,
  // add-next-line
+   displayBalance: balanceTool,
};
```

In the development server, test that this tool works to get your current Linea Sepolia ETH balance:

<p align="center">
  <img src={require("@site/static/img/guides/sdk-ai-agent-get-balance.png").default} alt="SDK AI agent get balance" class="appScreen" />
</p>

### 5. Create a tool to send transactions

In `ai/tools.ts`, create another tool to send transactions.
In this example, the tool and the `Chat.tsx` component are configured to initiate a transaction and provide a button for you to send the transaction.
You only need to make the following changes to the `tools.ts` file:

<Tabs>
<TabItem value="ai/tools.ts">

```ts
import { publicClient } from "@/wagmi.config";
import { formatEther } from "viem";
import { tool as createTool } from "ai";
import { z } from "zod";

const balanceTool = createTool({
  // ...
});

// add-start
+ const sendTransactionTool = createTool({
+   description: "Initiate a transaction to the provided wallet address",
+   parameters: z.object({
+     to: z.string().describe("The wallet address of the user"),
+     amount: z.string().describe("The amount of ether to send"),
+   }),
+   execute: async ({ to, amount }) => {
+     return { to, amount };
+   },
+ });
// add-end

export const tools = {
  displayBalance: balanceTool,
  // add-next-line
+ sendTransaction: sendTransactionTool,
};
```

</TabItem>
<TabItem value="components/Chat.tsx">

```tsx
// ...
if (toolName === 'sendTransaction') {
  const { result }: { result: { to: string; amount: string } } = toolInvocation

  if (isLoading) {
    return (
      <div key={toolCallId}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div key={toolCallId}>
      <Button
        className="bg-orange-600 text-orange-100 py-2 px-5 rounded-sm w-fit"
        onClick={() =>
          sendTransaction({
            to: result.to as `0x${string}`,
            value: parseEther(result.amount),
          })
        }>
        Send Transaction
      </Button>
      <p>{hash ? `Transaction sent: ${hash}` : 'Transaction not sent'}</p>
    </div>
  )
}
// ...
```

</TabItem>
</Tabs>

In the development server, test that this tool works to send Linea Sepolia ETH from your connected address to the address you provide.

When you request the agent to send a transaction, it will provide a button for you to send the transaction, but it will not send it for you:

<p align="center">
  <img src={require("@site/static/img/guides/sdk-ai-agent-txn-not-sent.png").default} alt="NFT confirmation" class="appScreen" />
</p>

When you select the button and confirm the transaction in MetaMask, the transaction will be sent:

<p align="center">
  <img src={require("@site/static/img/guides/sdk-ai-agent-txn-sent.png").default} alt="Multiple NFTs confirmation" class="appScreen" />
</p>

You can check the status of the transaction in the [Linea Sepolia block explorer](https://sepolia.lineascan.build/).

:::note
You can configure the AI agent to directly send the transaction using a [Viem Wallet Client](https://viem.sh/docs/clients/wallet).
:::

## Resources

- View the main branch of the [`Consensys/wallet-agent`](https://github.com/Consensys/wallet-agent) template for the completed implementation of this tutorial.
- Watch the [live coding session](https://www.youtube.com/watch?v=ZVuOaKuAhBQ) on YouTube, in which the MetaMask DevRel team walks through creating a wallet AI agent from the initial template.
