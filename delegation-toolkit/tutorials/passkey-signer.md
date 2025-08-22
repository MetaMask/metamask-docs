---
description: Learn how to use Passkey as a back up signer with MetaMask smart account
sidebar_position: 1
---

# Use Passkey as a back up signer

In this tutorial, we’ll explore how to use a Passkey (WebAuthn Account) as a backup signer for your [MetaMask smart account](../concepts/smart-accounts). Passkeys offer a seamless and secure way to access your Web3 wallet, eliminating the need for traditional seed phrases that are often difficult to remember. This approach helps create a user friendly and secure onboarding experience for end users.

## Technical overview

An Externally Owned Account(EOA) uses the secP-256k1 elliptic curve to generate key pairs and signatures. In contrast, a Web3Authn account(Passkey) uses a different elliptic curve, secP-256r1(P-256) for key pair generation and signing. MetaMask Smart Accounts support three implementation types. Among them, the Hybrid implementation supports signature validation for both secP-256k1 and secP-256r1 curves. This allows you to add Passkeys as a backup signer for your smart account. 

## Prerequisites

- [Install and set up the Delegation Toolkit.](../get-started/install)
- [Install Ox SDK.](https://oxlib.sh/#installation)
- [Configure the Delegation Toolkit.](../guides/configure)
- [Create a smart account](../guides/smart-accounts/create-smart-account)

## Steps

Passkeys can be added as a backup signer either during smart account creation or after the account has been deployed. In this tutorial, we’ll focus on how to add a Passkey signer to an already deployed smart account. 

:::info

Please note, this tutorial assumes that you have already deployed a MetaMask smart account with the Hybrid implementation.

:::

### 1. Set up a Public Client

Set up a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function. This client will let the smart account query the signer's account state and interact with blockchain network.

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

### 2. Set up a Bundler Client

Set up a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function. This lets you use the bundler service to estimate gas for user operations and submit transactions to the network.

```typescript
import { createBundlerClient } from "viem/account-abstraction";

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://your-bundler-rpc.com"),
});
```

### 3. Create a MetaMask smart account

Create a MetaMask smart account to add back up signer. This tutorial configures a Hybrid smart account, which is a flexible smart account implementation that supports adding P-256 (Passkey) signers:

```typescript
import { Implementation, toMetaMaskSmartAccount } from "@metamask/delegation-toolkit";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount("0x...");

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

### 4. Create WebAuthn credential

To add a Passkey signer, you first need to use Viem’s `createWebAuthnCredential` to securely register the WebAuthn(P-256) credential.

```ts
import { 
  createWebAuthnCredential,
} from "viem/account-abstraction";
  
const credential = await createWebAuthnCredential({
  name: "MetaMask Smart Account",
});
```

### 5. Add Passkey as a back up signer

Next, use the `HybridDeleGator` contract namespace from the Delegation Toolkit to encode the calldata required to add the Passkey signer. The encoding function needs the X and Y coordinates of the P-256 public key. Since WebAuthn credentials store a compressed public key, you need to use the [Ox](https://oxlib.sh/#installation) SDK to deserialize it, and extract the X and Y coordinates.

Once the calldata is prepared, send it to your smart account address to register the Passkey as a backup signer.

```ts
import { PublicKey } from "ox";
import { HybridDeleGator, P256Owner } from "@metamask/delegation-toolkit/contracts";

// Deserialize compressed public key
const publicKey = PublicKey.fromHex(credential.publicKey);

const p256Owner: P256Owner = {
  keyId: credential.id,
  x: publicKey.x,
  y: publicKey.y,
}

const data = HybridDeleGator.encode.addKey({
  p256Owner,
});

// Appropriate fee per gas must be determined for the specific bundler being used.
const maxFeePerGas = 1n;
const maxPriorityFeePerGas = 1n;

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    {
      to: smartAccount.addres,
      data,
    },
  ],
  maxFeePerGas,
  maxPriorityFeePerGas,
});
```

### 6. Use Passkey signer (Optional)

You can now use the Passkey signer to access your Smart Account and sign transactions. If you ever lose your primary signer(private key) used in [third step](#3-create-a-metamask-smart-account), the Passkey can be used a secure backup method to retain access to your smart account.

Use the [Viem WebAuthn Account](https://viem.sh/account-abstraction/accounts/webauthn) to configure your Passkey as a MetaMask smart account signer.

```ts
import { Address } from "ox";
import { toWebAuthnAccount } from "viem/account-abstraction";
import { toHex } from "viem";
import { Implementation, toMetaMaskSmartAccount } from "@metamask/delegation-toolkit";

// Use the deserialize from previous step
const owner = Address.fromPublicKey(publicKey);

// Use the credential from previous step
const webAuthnAccount = toWebAuthnAccount({ credential });

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, [credential.id], [publicKey.x], [publicKey.y]],
  deploySalt: "0x",
  signatory: { webAuthnAccount, keyId: toHex(credential.id) },
});
```

### Resources

- See [create a MetaMask smart account](../guides/smart-accounts/create-smart-account) to learn more about smart account implementations. 
- See [send a gasless transaction](../guides/smart-accounts/send-gasless-transaction) to learn how to sponsor gas fees when adding a Passkey as a backup signer.