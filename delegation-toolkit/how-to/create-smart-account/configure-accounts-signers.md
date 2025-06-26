---
sidebar_label: Configure accounts and signers
description: Learn how to configure different types of delegator accounts and signers using Viem.
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Configure smart accounts and signers

The MetaMask Delegation Toolkit supports different [smart account types](../../concepts/smart-accounts.md#smart-account-implementation-types),
each with its own configuration and support for different signing mechanisms.
You can create flexible and secure delegator accounts tailored to your specific needs.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install.md)
- [Configure the Delegation Toolkit.](../configure.md)
- [Create a smart account.](index.md)

## Configure a Hybrid smart account

The [Hybrid smart account](../../concepts/smart-accounts.md#hybrid-smart-account) supports both an EOA "owner" and any number of P256 (passkey) signers.

To configure a Hybrid smart account, provide the following parameters:

- `owner`: The owner's account address as a hex string.
  The owner can be the zero address, indicating that there is no owner configured.
- `p256KeyIds`: An array of key identifiers for P256 signers as hex strings.
- `p256XValues`: An array of public key x-values for P256 signers as `bigint`s.
- `p256YValues`: An array of public key y-values for P256 signers as `bigint`s.
- `signatory`: A signer that will sign on behalf of the smart account.

:::note
You can set all `p256` parameters to empty arrays to configure no WebAuthn signer.
However, we recommend configuring at least one signer for account recoverability.
:::

For a Hybrid smart account, you can configure the following types of signatories:

### Configure an account signatory

This example creates a signatory from a private key using Viem's [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) function.

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
import { lineaSepolia as chain } from "viem/chains";

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

### Configure a Wallet Client signatory

This example creates a [Viem Wallet Client](https://viem.sh/docs/clients/wallet) as the signatory,
using Viem's `createWalletClient` function.

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
import { lineaSepolia as chain } from "viem/chains";

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
import { lineaSepolia as chain } from "viem/chains";
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

### Configure a WebAuthn (passkey) signatory

This example creates a [Viem WebAuthn Account](https://viem.sh/account-abstraction/accounts/webauthn) as the signatory,
using Viem's `toWebAuthnAccount` function.

:::info Installation required

To work with WebAuthn, install the [Ox SDK](https://oxlib.sh/).

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
import { lineaSepolia as chain } from "viem/chains";

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
  name: "MetaMask Smart Account",
});

export const webAuthnAccount = toWebAuthnAccount({ credential });
```

</TabItem>
</Tabs>


## Configure a Multisig smart account

The [Multisig smart account](../../concepts/smart-accounts.md#multisig-smart-account) supports multiple EOA signers with a configurable threshold for execution.

To configure a Multisig smart account, provide the following parameters:

- `signers`: An array of EOA signer addresses as hex strings.
- `threshold`: The number of signers required to execute a transaction, as a `bigint`.
- `signatory`: A signer that will sign on behalf of the smart account.

### Configure signatories

For a Multisig smart account, you can use a combination of account signatories and Wallet Client signatories.
For example:

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
import { lineaSepolia as chain } from "viem/chains";

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
import { lineaSepolia as chain } from "viem/chains";
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

## Configure a Stateless 7702 smart account

The [Stateless 7702 smart account](../../concepts/smart-accounts.md#stateless-7702-smart-account) represents an EOA that has been upgraded to support smart account 
functionality as defined by [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702). This implementation does not handle the upgrade process; see the [EIP-7702 quickstart](./../../get-started/7702-quickstart.md) to learn how to upgrade.

To configure a Stateless 7702 smart account, provide the following parameters:

- `address`: The address of the EOA that has been upgraded to a smart account.
- `signatory`: A signer that will sign on behalf of the smart account.

For a Stateless 7702 smart account, you can configure the following types of signatories:

### Configure an account signatory

This example creates a signatory from a private key using Viem's [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) function.

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
  implementation: Implementation.Stateless7702,
  address: account.address
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

### Configure a Wallet Client signatory

This example creates a [Viem Wallet Client](https://viem.sh/docs/clients/wallet) as the signatory,
using Viem's `createWalletClient` function.

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
const address = addresses[0];

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Stateless7702,
  address, 
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