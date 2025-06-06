---
sidebar_label: Configure accounts and signers
description: Learn how to configure different types of delegator accounts and signers using Viem.
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Configure delegator accounts and signers

The MetaMask Delegation Toolkit supports different [delegator account types](../concepts/delegator-accounts.md#delegator-account-types),
each with its own configuration and support for different signing mechanisms.
You can create flexible and secure delegator accounts tailored to your specific needs.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../get-started/install.md)
- [Configure the Delegation Toolkit.](configure.md)
- [Create a delegator account.](create-delegator-account.md)

## Configure a Hybrid Delegator

The [Hybrid Delegator](../concepts/delegator-accounts.md#hybrid-delegator) supports both an EOA "owner" and any number of P256 (passkey) signers.

To configure a Hybrid Delegator, provide the following parameters:

- `owner`: The owner's account address as a hex string.
  The owner can be the zero address, indicating that there is no owner configured.
- `p256KeyIds`: An array of key identifiers for P256 signers as hex strings.
- `p256XValues`: An array of public key x-values for P256 signers as `bigint`s.
- `p256YValues`: An array of public key y-values for P256 signers as `bigint`s.
- `signatory`: A signer that will sign on behalf of the delegator account.

:::note
You can set all `p256` parameters to empty arrays to configure no WebAuthn signer.
However, we recommend configuring at least one signer for account recoverability.
:::

For a Hybrid Delegator, you can configure the following types of signatories:

### Configure an account signatory

This example creates a signatory from a private key using Viem's [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) function.

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts"
import { signatory } from "./signatory.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, p256KeyIds, p256XValues, p256YValues],
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

<TabItem value="signatory.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const signatory = { account };
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
import { signatory } from "./signatory.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, p256KeyIds, p256XValues, p256YValues],
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

<TabItem value="signatory.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
import { http, createWalletClient } from "viem";

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

const walletClient = createWalletClient({
  account,
  chain,
  transport: http()
})

export const signatory = { walletClient };
```

</TabItem>
</Tabs>

### Configure a WebAuthn (passkey) signatory

This example creates a [Viem WebAuthn Account](https://viem.sh/account-abstraction/accounts/webauthn) as the signatory,
using Viem's `toWebAuthnAccount` function.

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from "./client.ts"
import { signatory } from "./signatory.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner, p256KeyIds, p256XValues, p256YValues],
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

<TabItem value="signatory.ts">

```typescript
import { createCredential, parsePublicKey } from "webauthn-p256";
import { toWebAuthnAccount } from "viem/account-abstraction";
import { toHex } from "viem";
  
const credential = await createCredential({ name: "Your Delegator Passkey" });
const webAuthnAccount = toWebAuthnAccount({ credential });
const keyId = toHex("my-key-id");
  
const signatory = { webAuthnAccount, keyId };
```

</TabItem>
</Tabs>


## Configure a Multisig Delegator

The [Multisig Delegator](../concepts/delegator-accounts.md#multisig-delegator) supports multiple EOA signers with a configurable threshold for execution.

To configure a Multisig Delegator, provide the following parameters:

- `signers`: An array of EOA signer addresses as hex strings.
- `threshold`: The number of signers required to execute a transaction, as a `bigint`.
- `signatory`: An array of signatories that will sign on behalf of the delegator account.

### Configure signatories

For a Multisig Delegator, you can use a combination of account signatories and Wallet Client signatories.
For example:

<Tabs>
<TabItem value="example.ts">

```typescript
import { publiClient } from "./client.ts";
import { account, walletClient } from "./signers.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const signers = [ account.address, walletClient.address ];
const signatory = { account, walletClient };
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
const walletClientPivatekey = generatePrivateKey(); 
const walletClientAccount = privateKeyToAccount(walletClientPivatekey);

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
