---
sidebar_label: Dynamic SDK
description: Quickstart guide for using MetaMask Connect Solana and Dynamic SDK.
toc_max_heading_level: 3
keywords: [connect, MetaMask, Dynamic, SDK, dapp, Wallet SDK]
---

# Connect to Solana using Dynamic SDK

This quickstart gets you up and running with MetaMask Connect Solana inside [Dynamic SDK](https://docs.dynamic.xyz/introduction/welcome).
Dynamic handles wallet discovery and connection UI, and MetaMask Connect Solana adds reliable cross-platform support for MetaMask.
[Download the template](#set-up-using-a-template) to start quickly, or [set up manually](#set-up-manually) in an existing project.

<!-- <p align="center">
  <a href="https://metamask-dynamic-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart-dynamic.png").default} alt="Dynamic SDK Quickstart" width="600px" class="appScreen" />
  </a>
</p> -->

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- A [Dynamic Environment ID](https://app.dynamic.xyz/).

## Set up using a template

1. Download the [MetaMask Connect + Dynamic SDK template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/partners/dynamic):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/partners/dynamic metamask-dynamic
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-dynamic
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

   Alternatively, use `git clone` to download the entire repository.
   Clone the MetaMask Connect examples repository and navigate into the `partners/dynamic` directory:

   ```bash
   git clone https://github.com/MetaMask/metamask-sdk-examples
   cd metamask-sdk-examples/partners/dynamic
   ```

    </div>
    </details>

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Create a `.env.local` file:

   ```bash
   touch .env.local
   ```

5. In `.env.local`, add a `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` environment variable, replacing `<YOUR-ENVIRONMENT-ID>` with your Dynamic Environment ID:

   ```text title=".env.local"
   NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=<YOUR-ENVIRONMENT-ID>
   ```

6. Run the project:

   ```bash
   pnpm dev
   ```

You've successfully set up MetaMask Connect Solana and Dynamic SDK.
See how to [use the combined SDKs](#usage).

## Set up manually

### 1. Install dependencies

Install Dynamic SDK with the Solana extension and Solana web3.js:

```bash npm2yarn
npm install @dynamic-labs/client @dynamic-labs/solana-extension @solana/web3.js
```

### 2. Create the Dynamic client

Create a Dynamic client extended with Solana support in `lib/dynamic.ts`:

```typescript title="lib/dynamic.ts"
import { createClient } from '@dynamic-labs/client'
import { SolanaExtension } from '@dynamic-labs/solana-extension'

export const dynamicClient = createClient({
  environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
}).extend(SolanaExtension())
```

### 3. Set up environment variables

Create a `.env.local` file.
In `.env.local`, add a `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` environment variable, replacing `<YOUR-ENVIRONMENT-ID>` with your Dynamic Environment ID:

```text title=".env.local"
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=<YOUR-ENVIRONMENT-ID>
```

Test your dapp by running `pnpm run dev`.

## Usage

### Connect wallet

Use the Dynamic Widget in your components:

```typescript
"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const Navbar = () => {
  return (
    <nav>
      <DynamicWidget />
    </nav>
  );
};
```

### Check wallet status

Use the Dynamic client to check the primary wallet:

```typescript
"use client";

import { dynamicClient } from '@/lib/dynamic'

export const WalletStatus = () => {
  const wallet = dynamicClient.wallets.primary

  return (
    <div>
      {wallet ? (
        <p>Connected: {wallet.address}</p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
};
```

### Send a SOL transfer

Use the Solana extension's `getConnection` and `getSigner` methods to build and send a transaction:

```typescript
"use client";

import { dynamicClient } from '@/lib/dynamic'
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'

export const SendSol = () => {
  const send = async () => {
    const wallet = dynamicClient.wallets.primary
    if (!wallet) return

    const connection = dynamicClient.solana.getConnection({
      commitment: 'singleGossip',
    })
    const signer = dynamicClient.solana.getSigner({ wallet })

    const { blockhash } = await connection.getLatestBlockhash()
    const fromKey = new PublicKey(wallet.address)
    const toKey = new PublicKey('DESTINATION_PUBLIC_KEY')

    const instructions = [
      SystemProgram.transfer({
        fromPubkey: fromKey,
        toPubkey: toKey,
        lamports: 0.01 * LAMPORTS_PER_SOL,
      }),
    ]

    const messageV0 = new TransactionMessage({
      payerKey: fromKey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message()

    const transaction = new VersionedTransaction(messageV0)
    const { signature } = await signer.signAndSendTransaction(transaction)
    console.log('Transaction signature:', signature)
  }

  return <button onClick={send}>Send 0.01 SOL</button>
};
```

## Production readiness

Before deploying your project to production:

1. Update your `next.config.ts` with production domains.
2. Set up proper environment variables.
3. Configure your Dynamic SDK environment ID.
4. Ensure MetaMask Connect Solana is properly initialized.

## Troubleshooting

Common issues and solutions include:

- **SDK initialization error:**
  - Ensure MetaMask is installed.
  - Check environment variables.
  - Verify network connectivity.
- **TypeScript errors:**
  - Update type definitions.
  - Check SDK versions compatibility.
- **Mobile experience issues:**
  - Test on actual mobile devices.
  - Verify redirect URLs.
  - Check MetaMask mobile app installation.

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/partners/dynamic?ctl=1&embed=1&file=app%2Fproviders.tsx&hideNavigation=1"></iframe>
