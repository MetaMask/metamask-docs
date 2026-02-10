---
title: Use a passkey as a backup signer
image: 'img/tutorials/tutorials-banners/use-passkey-as-backup-signer.png'
description: Use a passkey as a backup signer for a MetaMask smart account.
tags: [delegation toolkit, smart accounts kit, passkey, backup signer, smart account]
keywords: [delegation, smart accounts kit, passkey, webauthn, P-256, backup signer, smart account]
date: Aug 27, 2025
author: MetaMask Developer Relations
discourseTopicId: 2612
---

This tutorial walks you through using a passkey as a backup signer for your [MetaMask smart account](/smart-accounts-kit/concepts/smart-accounts).

## About passkeys

An externally owned account (EOA) uses the secp256k1 elliptic curve to generate key pairs and signatures.
In contrast, a passkey (WebAuthn credential) uses the secp256r1 (P-256) elliptic curve to generate key pairs and signatures.
Passkeys eliminate the need for traditional seed phrases that are difficult to remember, enabling a more seamless and secure way for users to access their web3 wallets.

MetaMask Smart Accounts offer a [Hybrid implementation](/smart-accounts-kit/concepts/smart-accounts/#hybrid-smart-account), which supports signature validation for both secp256k1 and secp256r1 curves.
This allows you to add a passkey as a backup signer for your smart account.

You can add passkeys during smart account creation or after the account has been deployed.
This tutorial walks you through adding a passkey signer to an already deployed smart account.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager.

## Steps

### 1. Install dependencies

Install the [Smart Accounts Kit](https://www.npmjs.com/package/@metamask/smart-accounts-kit) and [Ox SDK](https://oxlib.sh/#installation) in your project:

```bash npm2yarn
npm install @metamask/smart-accounts-kit ox
```

### 2. Create a Public Client

Create a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function.
You will configure a smart account and Bundler Client with the Public Client, which you can use to query the signer's account state and interact with the blockchain network.

```typescript
import { createPublicClient, http } from 'viem'
import { sepolia as chain } from 'viem/chains'

const publicClient = createPublicClient({
  chain,
  transport: http(),
})
```

### 3. Create a Bundler Client

Create a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function.
You can use the bundler service to estimate gas for user operations and submit transactions to the network.

```typescript
import { createBundlerClient } from 'viem/account-abstraction'

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http('https://your-bundler-rpc.com'),
})
```

### 4. Create and deploy a smart account

Create and deploy a [Hybrid smart account](/smart-accounts-kit/guides/smart-accounts/create-smart-account), with a private key signer.
The Hybrid implementation supports adding additional passkey signers.

```typescript
import { Implementation, toMetaMaskSmartAccount } from '@metamask/smart-accounts-kit'
import { privateKeyToAccount } from 'viem/accounts'
import { zeroAddress } from 'viem'

const account = privateKeyToAccount('0x...')

// Create the smart account.
const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: '0x',
  signer: { account },
})

// Deploy the smart account by sending a user operation.
// Appropriate fee per gas must be determined for the bundler being used.
const maxFeePerGas = 1n
const maxPriorityFeePerGas = 1n

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [{ to: zeroAddress }],
  maxFeePerGas,
  maxPriorityFeePerGas,
})
```

### 5. Create a passkey

To add a passkey signer, use Viem's [`createWebAuthnCredential`](https://viem.sh/account-abstraction/accounts/webauthn/createWebAuthnCredential) function to securely register the passkey (WebAuthn credential).

```ts
import { createWebAuthnCredential } from 'viem/account-abstraction'

const credential = await createWebAuthnCredential({
  name: 'MetaMask Smart Account',
})
```

### 6. Add the passkey as a backup signer

Use the `HybridDeleGator` contract namespace from the Smart Accounts Kit to encode the calldata required to add the passkey signer.
The encoding function needs the X and Y coordinates of the P-256 public key.
Since WebAuthn credentials store a compressed public key, you need to use the [Ox SDK](https://oxlib.sh/#installation) to deserialize it, and extract the X and Y coordinates.

Once the calldata is prepared, send it to your smart account address to register the passkey as a backup signer.

```ts
import { PublicKey } from 'ox'
import { toHex } from 'viem'
import { HybridDeleGator, P256Owner } from '@metamask/smart-accounts-kit/contracts'

// Deserialize the compressed public key.
const publicKey = PublicKey.fromHex(credential.publicKey)

const p256Owner: P256Owner = {
  keyId: toHex(credential.id),
  x: publicKey.x,
  y: publicKey.y,
}

const data = HybridDeleGator.encode.addKey({
  p256Owner,
})

// Appropriate fee per gas must be determined for the bundler being used.
const maxFeePerGas = 1n
const maxPriorityFeePerGas = 1n

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    {
      to: smartAccount.address,
      data,
    },
  ],
  maxFeePerGas,
  maxPriorityFeePerGas,
})
```

### 7. (Optional) Use the passkey signer

You can now use the passkey signer to access your smart account and sign transactions.
If you ever lose your primary signer (private key) used in [Step 4](#4-create-and-deploy-a-smart-account), you can use the passkey as a secure backup method to retain access to your smart account.

Use the [Viem WebAuthn Account](https://viem.sh/account-abstraction/accounts/webauthn) to configure your passkey as a MetaMask smart account signer.

```ts
import { Address } from 'ox'
import { toWebAuthnAccount } from 'viem/account-abstraction'
import { toHex } from 'viem'
import { Implementation, toMetaMaskSmartAccount } from '@metamask/smart-accounts-kit'

// Use the deserialized public key from the previous step.
const owner = Address.fromPublicKey(publicKey)

// Use the credential from the previous step.
const webAuthnAccount = toWebAuthnAccount({ credential })

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, [toHex(credential.id)], [publicKey.x], [publicKey.y]],
  deploySalt: '0x',
  signer: { webAuthnAccount, keyId: toHex(credential.id) },
})
```

## Next steps

- Learn more about [smart account implementations](/smart-accounts-kit/guides/smart-accounts/create-smart-account).
- To sponsor gas fees when adding a passkey as a backup signer, see how to [send a gasless transaction](/smart-accounts-kit/guides/smart-accounts/send-gasless-transaction).
