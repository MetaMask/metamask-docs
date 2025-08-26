---
description: Learn how to use Passkey as a back up signer with MetaMask smart account
sidebar_position: 1
---

# Use a passkey as a backup signer

This tutorial walks you through using a passkey as a backup signer for your [MetaMask smart account](../concepts/smart-accounts).

## About passkeys

An externally owned account (EOA) uses the secp256k1 elliptic curve to generate key pairs and signatures.
In contrast, a passkey (WebAuthn credential) uses the secp256r1 (P-256) elliptic curve to generate key pairs and signatures.
Passkeys eliminate the need for traditional seed phrases that are difficult to remember, enabling a more seamless and secure way for users to access their web3 wallets.

MetaMask Smart Accounts offer a [Hybrid implementation](../concepts/smart-accounts.md#hybrid-smart-account), which supports signature validation for both secp256k1 and secp256r1 curves.
This allows you to add a passkey as a backup signer for your smart account.


You can add passkeys during smart account creation or after the account has been deployed.
This tutorial walks you through adding a passkey signer to an already deployed smart account.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../get-started/install)
- [Install Ox SDK.](https://oxlib.sh/#installation)
- [Configure the Delegation Toolkit.](../guides/configure)
- [Create and deploy a Hybrid smart account.](../guides/smart-accounts/create-smart-account)

## Steps

### 1. Create a Public Client

Create a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function.
You will configure a smart account and Bundler Client with the Public Client, which you can use to query the signer's account state and interact with the blockchain network.

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

### 2. Create a Bundler Client

Create a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function.
You can use the bundler service to estimate gas for user operations and submit transactions to the network.

```typescript
import { createBundlerClient } from "viem/account-abstraction";

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://your-bundler-rpc.com"),
});
```

### 3. Create a Hybrid smart account

Create a [Hybrid smart account](../guides/smart-accounts/create-smart-account.md#create-a-hybrid-smart-account) with a signatory from a private key.
The Hybrid implementation supports adding additional passkey signers.

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

### 4. Create a passkey

To add a passkey signer, use Viem's [`createWebAuthnCredential`](https://viem.sh/account-abstraction/accounts/webauthn/createWebAuthnCredential) function to securely register the passkey (WebAuthn credential).

```ts
import { 
  createWebAuthnCredential,
} from "viem/account-abstraction";
  
const credential = await createWebAuthnCredential({
  name: "MetaMask Smart Account",
});
```

### 5. Add the passkey as a backup signer

Use the `HybridDeleGator` contract namespace from the Delegation Toolkit to encode the calldata required to add the passkey signer.
The encoding function needs the X and Y coordinates of the P-256 public key.
Since WebAuthn credentials store a compressed public key, you need to use the [Ox SDK](https://oxlib.sh/#installation) to deserialize it, and extract the X and Y coordinates.

Once the calldata is prepared, send it to your smart account address to register the passkey as a backup signer.

```ts
import { PublicKey } from "ox";
import { HybridDeleGator, P256Owner } from "@metamask/delegation-toolkit/contracts";

// Deserialize the compressed public key.
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
      to: smartAccount.address,
      data,
    },
  ],
  maxFeePerGas,
  maxPriorityFeePerGas,
});
```

### 6. (Optional) Use the passkey signer

You can now use the passkey signer to access your smart account and sign transactions.
If you ever lose your primary signer (private key) used in [Step 3](#3-create-a-hybrid-smart-account), you can use the passkey as a secure backup method to retain access to your smart account.

Use the [Viem WebAuthn Account](https://viem.sh/account-abstraction/accounts/webauthn) to configure your passkey as a MetaMask smart account signer.

```ts
import { Address } from "ox";
import { toWebAuthnAccount } from "viem/account-abstraction";
import { toHex } from "viem";
import { Implementation, toMetaMaskSmartAccount } from "@metamask/delegation-toolkit";

// Use the deserialized public key from the previous step.
const owner = Address.fromPublicKey(publicKey);

// Use the credential from the previous step.
const webAuthnAccount = toWebAuthnAccount({ credential });

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, [credential.id], [publicKey.x], [publicKey.y]],
  deploySalt: "0x",
  signatory: { webAuthnAccount, keyId: toHex(credential.id) },
});
```

## Next steps

- See [Create a MetaMask smart account](../guides/smart-accounts/create-smart-account.md) to learn more about smart account implementations. 
- See [Send a gasless transaction](../guides/smart-accounts/send-gasless-transaction.md) to learn how to sponsor gas fees when adding a passkey as a backup signer.
