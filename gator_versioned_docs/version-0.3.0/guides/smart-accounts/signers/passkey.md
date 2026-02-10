---
description: Learn how to use Passkey with MetaMask Smart Accounts.
sidebar_label: Passkey
keywords: [passkey, smart account, signer, metamask smart account]
---

# Use a passkey with MetaMask Smart Accounts

Passkeys eliminate the need for traditional seed phrases that are difficult to remember, enabling a more seamless 
and secure way for users to access their Externally Owned Accounts (EOAs). Compared to traditional EOAs which use 
secp256k1 elliptic curve to generate key pairs and signatures, a passkey-based EOA uses the 
secp256r1 (P-256) elliptic curve.

MetaMask Smart Accounts is signer agnostic and natively supports passkeys (P-256 elliptic curve signatures), so you can use a passkey as the signer.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager
 
## Steps

### 1. Install dependencies

Install the [Smart Accounts Kit](https://www.npmjs.com/package/@metamask/smart-accounts-kit) and other dependencies in your project:

```bash npm2yarn
npm install @metamask/smart-accounts-kit ox
```

### 2. Create a passkey

To create a passkey signer, use Viem's [`createWebAuthnCredential`](https://viem.sh/account-abstraction/accounts/webauthn/createWebAuthnCredential) function to securely register the passkey (WebAuthn credential).

```ts
import { createWebAuthnCredential } from 'viem/account-abstraction'

const credential = await createWebAuthnCredential({
  name: 'MetaMask Smart Account',
})
```

### 3. Create a smart account

Once the passkey is created, use the [Viem WebAuthn Account](https://viem.sh/account-abstraction/accounts/webauthn) to configure your passkey as a MetaMask smart account signer.

The `deployParams` parameter needs the X and Y coordinates of the P-256 public key. Since WebAuthn credentials store
a compressed public key, you need to deserialize it, and extract the X and Y coordinates.

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./config.ts"
import { Implementation, toMetaMaskSmartAccount } from "@metamask/smart-accounts-kit";
import { toWebAuthnAccount } from "viem/account-abstraction";
import { Address, PublicKey } from "ox";
import { toHex } from "viem";
  
const webAuthnAccount = toWebAuthnAccount({ credential });

// Deserialize compressed public key
const publicKey = PublicKey.fromHex(credential.publicKey);

// Convert public key to address
const owner = Address.fromPublicKey(publicKey);

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, [toHex(credential.id)], [publicKey.x], [publicKey.y]],
  deploySalt: "0x",
  signer: { webAuthnAccount, keyId: toHex(credential.id) },
});
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { http, createPublicClient } from "viem";
import { sepolia as chain } from "viem/chains";

const transport = http(); 
export const publicClient = createPublicClient({ 
  transport, 
  chain, 
});
```

</TabItem>
</Tabs>

## Next steps

- See how to [send a user operation](../send-user-operation.md).
- To sponsor gas for end users, see how to [send a gasless transaction](../send-gasless-transaction.md).