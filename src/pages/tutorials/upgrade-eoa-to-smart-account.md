---
title: Upgrade an EOA to a smart account
description: Upgrade a MetaMask EOA to a smart account using MetaMask Wallet SDK and Wagmi.
image: 'img/tutorials/tutorials-banners/upgrade-eoa-to-smart-account.png'
tags: [metamask wallet sdk, wagmi, EOA, smart account, EIP-7702, EIP-5792]
date: Aug 22, 2025
author: MetaMask Developer Relations
---

This tutorial walks you through upgrading a MetaMask externally owned account (EOA) to a [MetaMask smart account](/delegation-toolkit/concepts/smart-accounts) via [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702), and sending an [atomic batch transaction](/wallet/how-to/send-transactions/send-batch-transactions/#about-atomic-batch-transactions) via [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792).
You will use a provided template, which sets up MetaMask Wallet SDK with a [Next.js](https://nextjs.org/docs) and [Wagmi](https://wagmi.sh/) dapp.

## Prerequisites

- [Node.js](https://nodejs.org/) version 18 or later installed
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard
- [MetaMask](https://metamask.io/) installed, with an EOA that has Sepolia ETH
  :::note
  You can use the [MetaMask faucet](/developer-tools/faucet) to get Sepolia ETH.
  :::

## Steps

### 1. Set up the project

1. Clone the [`MetaMask/7702-livestream-demo`](https://github.com/MetaMask/7702-livestream-demo) repository:

   ```bash
   git clone git@github.com:MetaMask/7702-livestream-demo.git
   ```

2. Switch to the `feat/mm-sdk` branch:

   ```bash
   cd 7702-livestream-demo && git switch feat/mm-sdk
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server and navigate to [`http://localhost:3000`](http://localhost:3000/):

   ```bash
   npm run dev
   ```

   The initial template displays with non-functional buttons:

<p align="center">
  <img src={require("@site/static/img/tutorials/sdk-7702-initial.png").default} alt="SDK 7702 initial template" class="appScreen" height="300px" />
</p>

### 2. Configure the MetaMask connector

In the root directory, create a `.env.local` file.
Add a `NEXT_PUBLIC_INFURA_API_KEY` environment variable, replacing `<YOUR-API-KEY>` with your Infura API key:

```text title=".env.local"
NEXT_PUBLIC_INFURA_API_KEY=<YOUR-API-KEY>
```

In `src/providers/AppProvider.tsx`, configure the Wagmi [MetaMask Wallet SDK connector](https://wagmi.sh/react/api/connectors/metaMask) using your Infura API key:

```tsx title="AppProvider.tsx"
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";
import { sepolia } from "viem/chains";
import { ReactNode } from "react";
// add-next-line
import { metaMask } from "wagmi/connectors";

// remove-next-line
- export const connectors = []
// add-start
+ export const connectors = [
+   metaMask({
+     infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY,
+   }),
+ ];
// add-end
// ...
```

### 3. Create a connect and disconnect button

In `src/app/page.tsx`, use the `useAccount`, `useConnect`, and `useDisconnect` hooks from Wagmi, along with the MetaMask Wallet SDK connector, to create a button to connect and disconnect your MetaMask wallet, and display the connection status:

```tsx title="page.tsx"
"use client";

import Image from "next/image";
// add-start
+ import { metaMask } from "wagmi/connectors";
+ import { useAccount, useConnect, useDisconnect } from "wagmi";
// add-end

export default function Home() {
// add-start
+ const { connect } = useConnect();
+ const { disconnect } = useDisconnect();
+ const { address, isConnected } = useAccount();
// add-end

// add-start
+ const formatAddress = (addr: string) => {
+  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
+ };
// add-end

  return (
  // ...
// remove-start
-   <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
-     <li className="mb-2 tracking-[-.01em]">
-       Get started by editing{" "}
-       <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
-         src/app/page.tsx
-       </code>
-       .
-     </li>
-     <li className="tracking-[-.01em]">
-       Save and see your changes instantly.
-     </li>
-   </ol>

-   <div className="flex gap-4 items-center flex-col sm:flex-row">
// remove-end
// add-start
+   {/* Wallet connection section */}
+   <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg w-full">
+     <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
// add-end

// add-start
+     {/* Connection status */}
+     <div className="mb-6">
+       {isConnected ? (
+         <div className="flex items-center gap-2 text-green-600">
+           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
+           <span>Connected to {formatAddress(address!)}</span>
+         </div>
+       ) : (
+         <div className="flex items-center gap-2 text-red-600">
+           <div className="w-2 h-2 bg-red-500 rounded-full"></div>
+           <span>Not connected</span>
+         </div>
+       )}
+     </div>
// add-end

// remove-start
-     <button
-       className="rounded-full border border-solid px-4 py-2 cursor-pointer hover:bg-gray-100"
-       onClick={() => {
-         console.log("clicked");
-       }}
-     >
-       Connect Wallet
-     </button>
// remove-end
// add-start
+     {/* Connect/disconnect button */}
+     <button
+       className={`w-full rounded-lg border border-solid px-6 py-3 font-medium transition-colors ${
+         isConnected
+           ? "bg-red-50 hover:bg-red-100 text-red-700 border-red-300 cursor-pointer"
+           : "bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300 cursor-pointer"
+       }`}
+       onClick={() => {
+         if (isConnected) {
+           disconnect();
+         } else {
+           connect({ connector: metaMask() });
+         }
+       }}
+     >
+       {isConnected ? "Disconnect Wallet" : "Connect with MetaMask"}
+     </button>
// add-end
      // ...
```

In the development server, test that the button works to connect and disconnect from your MetaMask wallet.
When connected, the interface displays your connected wallet address:

<div class="imgRow">
  <div class="imgCol">
    <img src={require("@site/static/img/tutorials/sdk-7702-disconnected.png").default} alt="SDK disconnected" class="appScreen" height="320px" />
  </div>
  <div class="imgCol">
    <img src={require("@site/static/img/tutorials/sdk-7702-connected.png").default} alt="SDK connected" class="appScreen" height="320px" />
  </div>
</div>

### 4. Handle and send batch transactions

In `src/app/page.tsx`, use the [`useSendCalls`](https://wagmi.sh/react/api/hooks/useSendCalls) hook from Wagmi to handle and send [atomic batch transactions](/wallet/how-to/send-transactions/send-batch-transactions).
Also use React's `useState` hook to handle the transaction state.
The following example sends 0.001 and 0.0001 ETH in a batch transaction.
Replace `<YOUR-RECIPIENT-ADDRESS>` with recipient addresses of your choice:

```tsx title="page.tsx"
"use client";

import Image from "next/image";
import { metaMask } from "wagmi/connectors";
// remove-next-line
- import { useAccount, useConnect, useDisconnect } from "wagmi";
// add-start
+ import { useAccount, useConnect, useDisconnect, useSendCalls } from "wagmi";
+ import { useState } from "react";
+ import { parseEther } from "viem";
// add-end

export default function Home() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
// add-start
+ const { sendCalls, error, isPending, isSuccess, data, reset } = useSendCalls();
+ const [transactionHash, setTransactionHash] = useState<string | null>(null);
+ const [statusError, setStatusError] = useState<string | null>(null);
// add-end

// add-start
+ const handleSendTransaction = () => {
+   if (!isConnected) return;
+
+   // Reset previous states
+   setTransactionHash(null);
+   setStatusError(null);
+   reset();
+
+   sendCalls({
+     calls: [
+       {
+         to: "<YOUR-RECIPIENT-ADDRESS>",
+         value: parseEther("0.001"),
+       },
+       {
+         to: "<YOUR-RECIPIENT-ADDRESS>",
+         value: parseEther("0.0001"),
+       },
+     ],
+   });
+ };
// add-end
  // ...
```

Then, create a button to send batch transactions, and display the transaction state (pending, success, or error).
Also, update the connect/disconnect button to reset states when disconnected:

```tsx title="page.tsx"
// ...
  {/* Connect/disconnect button */}
    <button
      // ...
      onClick={() => {
        if (isConnected) {
          disconnect();
// add-start
+         // Reset previous states
+         setTransactionHash(null);
+         setStatusError(null);
+         reset();
// add-end
        // ...
    >
      {isConnected ? "Disconnect Wallet" : "Connect with MetaMask"}
    </button>
// remove-start
-   <button
-     className="rounded-full border border-solid px-4 py-2 cursor-pointer hover:bg-gray-100"
-     onClick={() => {
-       console.log("clicked");
-     }}
-   >
-     Send Batch Transaction
-   </button>
// remove-end
  </div>

// add-start
+ {/* Batch transaction section */}
+ <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg w-full">
+   <h2 className="text-xl font-semibold mb-4">Send Batch Transaction</h2>
// add-end

// add-start
+   {/* Send batch transaction button */}
+   <button
+     className={`w-full rounded-lg border border-solid px-6 py-3 font-medium transition-colors mb-4 ${
+       !isConnected || isPending
+         ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
+         : "bg-green-50 hover:bg-green-100 text-green-700 border-green-300 cursor-pointer"
+     }`}
+     onClick={handleSendTransaction}
+     disabled={!isConnected || isPending}
+   >
+     {isPending ? "Sending Transaction..." : "Send Batch Transaction"}
+   </button>
// add-end

// add-start
+   {/* Transaction state */}
+   {isPending && (
+     <div className="flex items-center gap-2 text-blue-600 mb-4">
+       <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
+       <span>Transaction pending...</span>
+     </div>
+   )}
+
+   {isSuccess && data && (
+     <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
+       <div className="flex items-center gap-2 text-green-700 mb-2">
+         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
+         <span className="font-medium">
+           Transaction submitted successfully!
+         </span>
+       </div>
+       <div className="text-sm text-gray-600">
+         <p>
+           Data ID:{" "}
+           <code className="bg-gray-100 px-1 rounded">{data.id}</code>
+         </p>
+       </div>
+     </div>
+   )}
+
+   {error && (
+     <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
+       <div className="text-red-700 font-medium">Transaction Error</div>
+       <div className="text-sm text-red-600 mt-1">{error.message}</div>
+     </div>
+   )}
+ </div>
// add-end
// ...
```

In the development server, test that the button works to send batch transactions from your wallet.
Ensure you are connected to the Sepolia network in MetaMask.
MetaMask prompts you to upgrade your EOA to a smart account in order to send a batch transaction:

<div class="imgRow">
  <div class="imgCol">
    <img src={require("@site/static/img/tutorials/sdk-7702-send-batch-txns.png").default} alt="SDK send batch transactions button" class="appScreen" height="550px" />
  </div>
  <div class="imgCol">
    <img src={require("@site/static/img/tutorials/sdk-7702-upgrade-eoa.png").default} alt="SDK upgrade EOA to smart account" class="appScreen" height="550px" />
  </div>
</div>

### 5. Get the status of batch transactions

In `src/app/page.tsx`, use the [`getCallsStatus`](https://wagmi.sh/core/api/actions/getCallsStatus) action from Wagmi to get the status of sent batch transactions:

```tsx title="page.tsx"
"use client";

import Image from "next/image";
import { metaMask } from "wagmi/connectors";
import { useAccount, useConnect, useDisconnect, useSendCalls } from "wagmi";
import { useState } from "react";
import { parseEther } from "viem";
// add-start
+ import { getCallsStatus } from "@wagmi/core";
+ import { wagmiConfig as config } from "@/providers/AppProvider";
// add-end

export default function Home() {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { sendCalls, error, isPending, isSuccess, data, reset } = useSendCalls();
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
// add-next-line
+ const [statusLoading, setStatusLoading] = useState(false);

// add-start
+ const handleGetCallsStatus = async () => {
+   if (!data?.id) return;
+
+   setStatusLoading(true);
+   setStatusError(null);
+
+   try {
+     const status = await getCallsStatus(config, { id: data.id });
+     console.log("Transaction status:", status);
+
+     if (
+       status.status === "success" &&
+       status.receipts?.[0]?.transactionHash
+     ) {
+       setTransactionHash(status.receipts[0].transactionHash);
+     } else if (status.status === "failure") {
+       setStatusError("Transaction failed");
+     }
+   } catch (err) {
+     console.error("Error getting call status:", err);
+     setStatusError(
+       err instanceof Error ? err.message : "Failed to get transaction status"
+     );
+   } finally {
+     setStatusLoading(false);
+   }
+ };
// add-end
  // ...
```

Then, create a button to check the batch transaction status:

```tsx title="page.tsx"
// ...

  {/* Transaction state */}
  // ...

// add-start
+ {/* Check transaction status button */}
+ {data && (
+   <button
+     className={`w-full rounded-lg border border-solid px-6 py-3 font-medium transition-colors ${
+       statusLoading
+         ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
+         : "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-300 cursor-pointer"
+     }`}
+     onClick={handleGetCallsStatus}
+     disabled={statusLoading || !data.id}
+   >
+     {statusLoading
+       ? "Checking Status..."
+       : "Check Transaction Status"}
+   </button>
+ )}
// add-end

// add-start
+ {/* Status error */}
+ {statusError && (
+   <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
+     <div className="text-red-700 font-medium">Status Check Error</div>
+     <div className="text-sm text-red-600 mt-1">{statusError}</div>
+   </div>
+ )}
// add-end

// add-start
+ {/* Transaction hash */}
+ {transactionHash && (
+   <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
+     <div className="text-blue-700 font-medium mb-2">
+       Transaction Confirmed!
+     </div>
+     <div className="text-sm">
+       <a
+         href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
+         target="_blank"
+         rel="noopener noreferrer"
+         className="text-blue-600 hover:text-blue-800 hover:underline break-all"
+       >
+         View on Etherscan: {transactionHash}
+       </a>
+     </div>
+   </div>
+ )}
// add-end
// ...
```

In the development server, when you send a successful batch transaction, the success state and the **Check Transaction Status** button appear.
When you select the **Check Transaction Status** button, if the transaction is confirmed, a link to Etherscan with your transaction hash appears:

<div class="imgRow">
  <div class="imgCol">
    <img src={require("@site/static/img/tutorials/sdk-7702-successful-txn.png").default} alt="SDK successful 7702 transaction" class="appScreen" height="320px" />
  </div>
  <div class="imgCol">
    <img src={require("@site/static/img/tutorials/sdk-7702-check-txn-status.png").default} alt="SDK check transaction status" class="appScreen" height="320px" />
  </div>
</div>

You have successfully used the SDK to upgrade a MetaMask EOA to a MetaMask smart account, send an atomic batch transaction, and check its status!

## Resources

- View the `feat-mm-sdk-final` branch of the [`MetaMask/7702-livestream-demo`](https://github.com/MetaMask/7702-livestream-demo/tree/feat-mm-sdk-final) repository for the completed implementation of this tutorial.
- Watch the [live coding session](https://www.youtube.com/watch?v=crMqCb8RPEE) on YouTube, in which the MetaMask DevRel team walks through setting up EIP-7702 functionality from the initial template.
- See the [Delegation Toolkit EIP-7702 quickstart](/delegation-toolkit/get-started/smart-account-quickstart/eip7702.md) to learn how to use the Delegation Toolkit to upgrade an EOA to a MetaMask smart account.
