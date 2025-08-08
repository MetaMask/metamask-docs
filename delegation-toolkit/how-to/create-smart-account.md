---
description: Learn how to create a MetaMask smart account using Viem.
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a MetaMask smart account

The MetaMask Delegation Toolkit is embedded, meaning that the end user can instantly interact with a dapp without wallet authorization, confirmations, or corporate logos.
You can enable users to create a [MetaMask smart account](../concepts/smart-accounts.md) directly in your dapp.
The toolkit supports different [smart account types](../concepts/smart-accounts.md#smart-account-implementation-types),
each with its own configuration and support for different signing mechanisms.

This page provides examples of using [`toMetaMaskSmartAccount`](../reference/api/smart-account.md#tometamasksmartaccount) with Viem Core SDK to create different types of smart accounts with different types of signatories.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../get-started/install.md)
- [Configure the Delegation Toolkit.](configure.md)

## Create a Hybrid smart account

A Hybrid smart account supports both an externally owned account (EOA) owner and any number of P256 (passkey) signers.
You can create a Hybrid smart account with the following types of signatories.

### Create a Hybrid smart account with an account signatory

Use [`toMetaMaskSmartAccount`](../reference/api/smart-account.md#tometamasksmartaccount) and Viem's [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) to create a Hybrid smart account with a signatory from a private key:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts"
import { account } from "./signatory.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
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

<TabItem value="signatory.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey(); 
export const account = privateKeyToAccount(privateKey);
```

</TabItem>
</Tabs>

### Create a Hybrid smart account with a Wallet Client signatory

Use [`toMetaMaskSmartAccount`](../reference/api/smart-account.md#tometamasksmartaccount) and Viem's [`createWalletClient`](https://viem.sh/docs/clients/wallet) to create a Hybrid smart account with a Wallet Client signatory:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts"
import { walletClient } from "./signatory.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const addresses = await walletClient.getAddresses();
const owner = addresses[0];

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, [], [], []],
  deploySalt: "0x",
  signatory: { walletClient },
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

<TabItem value="signatory.ts">

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

### Create a Hybrid smart account with a WebAuthn (passkey) signatory

Use [`toMetaMaskSmartAccount`](../reference/api/smart-account.md#tometamasksmartaccount) and Viem's [`toWebAuthnAccount`](https://viem.sh/account-abstraction/accounts/webauthn) to create a Hybrid smart account with a WebAuthn Account signatory:

:::info Installation required
To use WebAuthn, install the [Ox SDK](https://oxlib.sh/).
:::

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts"
import { webAuthnAccount, credential } from "./signatory.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";
import { Address, PublicKey } from "ox";
import { toHex } from "viem";

// Deserialize compressed public key
const publicKey = PublicKey.fromHex(credential.publicKey);

// Convert public key to address
const owner = Address.fromPublicKey(publicKey);

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, [credential.id], [publicKey.x], [publicKey.y]],
  deploySalt: "0x",
  signatory: { webAuthnAccount, keyId: toHex(credential.id) },
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

<TabItem value="signatory.ts">

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

A [Multisig smart account](../concepts/smart-accounts.md#multisig-smart-account) supports multiple EOA signers with a configurable threshold for execution.
Use [`toMetaMaskSmartAccount`](../reference/api/smart-account.md#tometamasksmartaccount) to create a Multsig smart account with a combination of account signatories and Wallet Client signatories:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts";
import { account, walletClient } from "./signers.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const signers = [ account.address, walletClient.address ];
const signatory = [ { account }, { walletClient } ];
const threshold = 2n

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.MultiSig,
  deployParams: [signers, threshold],
  deploySalt: "0x",
  signatory,
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

A [Stateless 7702 smart account](../concepts/smart-accounts.md#stateless-7702-smart-account) represents an EOA that has been upgraded to support MetaMask Smart Accounts 
functionality as defined by [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702).

:::note
This implementation does not handle the upgrade process; see the [EIP-7702 quickstart](../get-started/eip7702-quickstart.md) to learn how to upgrade.
:::

You can create a Stateless 7702 smart account with the following types of signatories.

### Create a Stateless 7702 smart account with an account signatory

Use [`toMetaMaskSmartAccount`](../reference/api/smart-account.md#tometamasksmartaccount) and Viem's [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) to create a Stateless 7702 smart account with a signatory from a private key:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts";
import { account } from "./signatory.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Stateless7702,
  address: account.address // Address of the upgraded EOA
  signatory: { account },
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

<TabItem value="signatory.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey(); 
export const account = privateKeyToAccount(privateKey);
```

</TabItem>
</Tabs>

### Create a Stateless 7702 smart account with a Wallet Client signatory

Use [`toMetaMaskSmartAccount`](../reference/api/smart-account.md#tometamasksmartaccount) and Viem's [`createWalletClient`](https://viem.sh/docs/clients/wallet) to create a Stateless 7702 smart account with a Wallet Client signatory:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts";
import { walletClient } from "./signatory.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const addresses = await walletClient.getAddresses();
const address = addresses[0];

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Stateless7702,
  address, // Address of the upgraded EOA
  signatory: { walletClient },
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

<TabItem value="signatory.ts">

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

- In conjunction with [Viem Account Abstraction clients](configure.md), deploy the smart account
  and [send user operations](send-user-operation.md).
- [Sign delegations](create-delegation/index.md) that can be used to grant specific rights and permissions to other accounts.
  Smart accounts that sign delegations are called *delegator accounts*.
