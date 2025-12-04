---
description: Learn how to create a MetaMask smart account using Smart Accounts Kit.
keywords: [create, smart account, signer, hybrid, multisig, 7702]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a smart account

You can enable users to create a [MetaMask smart account](../../concepts/smart-accounts.md) directly in your dapp.
This page provides examples of using [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount) with Viem Core SDK to create different types of smart accounts with different signature schemes.
An account's supported *signatories* can sign data on behalf of the smart account.

## Prerequisites

[Install and set up the Smart Accounts Kit](../../get-started/install.md)

## Create a Hybrid smart account

A Hybrid smart account supports both an externally owned account (EOA) owner and any number of passkey (WebAuthn) signers.
You can create a Hybrid smart account with the following types of signers.

### Create a Hybrid smart account with an account signer

Use [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount), and Viem's [`privateKeyToAccount` and `generatePrivateKey`](https://viem.sh/docs/accounts/local/privateKeyToAccount), to create a Hybrid smart account with a signer from a randomly generated private key:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts"
import { account } from "./signer.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signer: { account },
});
```

</TabItem>

<TabItem value="client.ts">

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

<TabItem value="signer.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey(); 
export const account = privateKeyToAccount(privateKey);
```

</TabItem>
</Tabs>

### Create a Hybrid smart account with a Wallet Client signer

Use [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount) and Viem's [`createWalletClient`](https://viem.sh/docs/clients/wallet) to create a Hybrid smart account with a Wallet Client signer:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts"
import { walletClient } from "./signer.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

const addresses = await walletClient.getAddresses();
const owner = addresses[0];

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, [], [], []],
  deploySalt: "0x",
  signer: { walletClient },
});
```

</TabItem>

<TabItem value="client.ts">

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

<TabItem value="signer.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { http, createWalletClient } from "viem";

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const walletClient = createWalletClient({
  account,
  chain,
  transport: http()
})
```

</TabItem>
</Tabs>

### Create a Hybrid smart account with a passkey signer

Use [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount) and Viem's [`toWebAuthnAccount`](https://viem.sh/account-abstraction/accounts/webauthn) to create a Hybrid smart account with a passkey (WebAuthn) signer:

:::info Installation required
To work with WebAuthn, install the [Ox SDK](https://oxlib.sh/).
:::

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts"
import { webAuthnAccount, credential } from "./signer.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";
import { Address, PublicKey } from "ox";
import { toHex } from "viem";

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

<TabItem value="client.ts">

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

<TabItem value="signer.ts">

```typescript
import { 
  createWebAuthnCredential, 
  toWebAuthnAccount, 
} from "viem/account-abstraction";
  
export const credential = await createWebAuthnCredential({
  name: "MetaMask smart account",
});

export const webAuthnAccount = toWebAuthnAccount({ credential });
```

</TabItem>
</Tabs>

## Create a Multisig smart account

A [Multisig smart account](../../concepts/smart-accounts.md#multisig-smart-account) supports multiple EOA signers with a configurable threshold for execution.
Use [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount) to create a Multsig smart account with a combination of account signers and Wallet Client signers:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts";
import { account, walletClient } from "./signers.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

const owners = [ account.address, walletClient.address ];
const signer = [ { account }, { walletClient } ];
const threshold = 2n

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.MultiSig,
  deployParams: [owners, threshold],
  deploySalt: "0x",
  signer,
});
```

</TabItem>

<TabItem value="client.ts">

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

<TabItem value="signers.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { http, createWalletClient } from "viem";

// This private key will be used to generate the first signer.
const privateKey = generatePrivateKey(); 
export const account = privateKeyToAccount(privateKey);

// This private key will be used to generate the second signer.
const walletClientPrivatekey = generatePrivateKey(); 
const walletClientAccount = privateKeyToAccount(walletClientPrivatekey);

export const walletClient = createWalletClient({
  account: walletClientAccount,
  chain,
  transport: http()
});
```

</TabItem>
</Tabs>

:::note
The number of signers in the signatories must be at least equal to the threshold for valid signature generation.
:::

## Create a Stateless 7702 smart account

A [Stateless 7702 smart account](../../concepts/smart-accounts.md#stateless-7702-smart-account) represents an EOA that has been upgraded to support MetaMask Smart Accounts 
functionality as defined by [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702).

:::note
This implementation does not handle the upgrade process; see the [EIP-7702 quickstart](../../get-started/smart-account-quickstart/eip7702.md) to learn how to upgrade.
:::

You can create a Stateless 7702 smart account with the following types of signatories.

### Create a Stateless 7702 smart account with an account signer

Use [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount) and Viem's [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) to create a Stateless 7702 smart account with a signer from a private key:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts";
import { account } from "./signer.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Stateless7702,
  address: account.address // Address of the upgraded EOA
  signer: { account },
});
```

</TabItem>

<TabItem value="client.ts">

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

<TabItem value="signer.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey(); 
export const account = privateKeyToAccount(privateKey);
```

</TabItem>
</Tabs>

### Create a Stateless 7702 smart account with a Wallet Client signer

Use [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount) and Viem's [`createWalletClient`](https://viem.sh/docs/clients/wallet) to create a Stateless 7702 smart account with a Wallet Client signer:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts";
import { walletClient } from "./signer.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

const addresses = await walletClient.getAddresses();
const address = addresses[0];

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Stateless7702,
  address, // Address of the upgraded EOA
  signer: { walletClient },
});
```

</TabItem>

<TabItem value="client.ts">

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

<TabItem value="signer.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { http, createWalletClient } from "viem";

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const walletClient = createWalletClient({
  account,
  chain,
  transport: http(),
})
```

</TabItem>
</Tabs>

## Next steps

With a MetaMask smart account, you can perform the following functions:

- In conjunction with [Viem Account Abstraction clients](../configure-toolkit.md), [deploy the smart account](deploy-smart-account.md)
  and [send user operations](send-user-operation.md).
- [Create delegations](../delegation/execute-on-smart-accounts-behalf.md) that can be used to grant specific rights and permissions to other accounts.
  Smart accounts that create delegations are called *delegator accounts*.
