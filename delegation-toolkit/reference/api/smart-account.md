---
description: Smart account-related API methods reference.
sidebar_label: Smart account
sidebar_position: 2
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Smart account API reference

The following API methods are related to creating, managing, and signing with [smart accounts](../../concepts/smart-accounts.md).

## `aggregateSignature`

Aggregates multiple partial signatures into a single combined multisig signature.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `signatures` | `PartialSignature[]` | Yes | Collection of partial signatures provided by signers, to be merged into an aggregated signature. |

### Example

<Tabs>
<TabItem value="example.ts">

```typescript
import { 
  bundlerClient, 
  aliceSmartAccount, 
  bobSmartAccount,
  aliceAccount,
  bobAccount,
} from "./config.ts";
import { aggregateSignature } from "@metamask/delegation-toolkit";

const userOperation = await bundlerClient.prepareUserOperation({
  account: aliceSmartAccount,
  calls: [
    {
      target: zeroAddress,
      value: 0n,
      data: "0x",
    }
  ]
});

const aliceSignature = await aliceSmartAccount.signUserOperation(userOperation);
const bobSignature = await bobSmartAccount.signUserOperation(userOperation);

const aggregatedSignature = aggregateSignature({
  signatures: [{
    signer: aliceAccount.address,
    signature: aliceSignature,
    type: "ECDSA",
  }, {
    signer: bobAccount.address,
    signature: bobSignature,
    type: "ECDSA",
  }],
});
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { createBundlerClient } from "viem/account-abstraction";
import { lineaSepolia as chain } from "viem/chains";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http()
});

const alicePrivateKey = generatePrivateKey(); 
const aliceAccount = privateKeyToAccount(alicePrivateKey);

const bobPrivateKey = generatePrivateKey();
const bobAccount = privateKeyToAccount(bobPrivateKey)

const signers = [ aliceAccount.address, bobAccount.address ];
const threshold = 2n

export const aliceSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.MultiSig,
  deployParams: [signers, threshold],
  deploySalt: "0x",
  signatory: [ { account: aliceAccount } ],
});

export const bobSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.MultiSig,
  deployParams: [signers, threshold],
  deploySalt: "0x",
  signatory: [ { account: bobAccount } ],
});

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://public.pimlico.io/v2/rpc")
});
```

</TabItem>
</Tabs>

## `signDelegation`

Signs the delegation and returns the delegation signature.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `delegation` | `Omit<Delegation, "signature">` | Yes | The unsigned delegation object to sign. |
| `chainId` | `number` | No | The chain ID on which the Delegation Manager is deployed. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { createDelegation } from "@metamask/delegation-toolkit";
import { delegatorSmartAccount } from "./config.ts";

// The address to which the delegation is granted. It can be an EOA address, or 
// smart account address.
const delegate = "0x2FcB88EC2359fA635566E66415D31dD381CF5585";

const delegation = createDelegation({
  to: delegate,
  from: account.address,
  // Empty caveats array - we recommend adding appropriate restrictions.
  caveats: [],
});

const signature = delegatorSmartAccount.signDelegation({ delegation });
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const delegatorAccount = privateKeyToAccount("0x...");

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegatorAccount.address, [], [], []],
  deploySalt: "0x",
  signatory: { account: delegatorAccount },
});
```

</TabItem>
</Tabs>

## `signMessage`

Generates the [EIP-191](https://eips.ethereum.org/EIPS/eip-191) signature
using the `MetaMaskSmartAccount` signatory. The Delegation Toolkit
uses Viem under the hood to provide this functionality.

### Parameters

See the [Viem `signMessage` parameters](https://viem.sh/account-abstraction/accounts/smart/signMessage).

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { smartAccount } from "./config.ts";

const signature = smartAccount.signMessage({
  message: 'hello world', 
})
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const account = privateKeyToAccount("0x...");

export const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

</TabItem>
</Tabs>

## `signTypedData`

Generates the [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature
using the `MetaMaskSmartAccount` signatory. The Delegation Toolkit
uses Viem under the hood to provide this functionality.

### Parameters

See the [Viem `signTypedData` parameters](https://viem.sh/account-abstraction/accounts/smart/signTypedData).

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { smartAccount } from "./config.ts";

const signature = smartAccount.signTypedData({ 
  domain, 
  types, 
  primaryType: "Mail",
  message: { 
    from: { 
      name: "Cow",
      wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    }, 
    to: { 
      name: "Bob",
      wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
    }, 
    contents: "Hello, Bob!",
  }, 
}) 
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const account = privateKeyToAccount("0x...");

export const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

</TabItem>
</Tabs>

## `signUserOperation`

Signs a user operation with the `MetaMaskSmartAccount` signatory. The Delegation
Toolkit uses Viem under the hood to provide this functionality.

### Parameters

See the [Viem `signUserOperation` parameters](https://viem.sh/account-abstraction/accounts/smart/signUserOperation#parameters).

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { smartAccount } from "./config.ts";

const userOpSignature = smartAccount.signUserOperation({ 
  callData: "0xdeadbeef",
  callGasLimit: 141653n,
  maxFeePerGas: 15000000000n,
  maxPriorityFeePerGas: 2000000000n,
  nonce: 0n,
  preVerificationGas: 53438n,
  sender: "0xE911628bF8428C23f179a07b081325cAe376DE1f",
  verificationGasLimit: 259350n,
  signature: "0x",
 });
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const account = privateKeyToAccount("0x...");

export const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

</TabItem>
</Tabs>

## `toMetaMaskSmartAccount`

Creates a `MetaMaskSmartAccount` instance.

### Parameters

| Name | Type                                                | Required                                                     | Description                                                                                                                                                                       |
| ---- |-----------------------------------------------------|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `client` | `Client`                                            | Yes                                                          | Viem Client to retrieve smart account data.                                                                                                                                       |
| `implementation` | `TImplementation`                                   | Yes                                                          | Implementation type for the smart account. Can be Hybrid or Multisig.                                                                                                             |
| `signatory` | `SignatoryConfigByImplementation <TImplementation>` | Yes                                                          | Signers for the smart account. Can be a Viem Account, Viem Wallet Client, or a WebAuthnAccount. Web3AuthnAccounts are only supported for Hybrid implementations.                  |
| `environment` | `DeleGatorEnvironment`                              | No                                                           | Environment to resolve the smart contracts.                                                                                                                                       |
| `deployParams` | `DeployParams<TImplementation>`                     | Required if `address` is not provided                        | The parameters that will be used to deploy the smart account and generate its deterministic address.                                                                              |
| `deploySalt` | `Hex`                                               | Required if `address` is not provided                        | The salt that will be used to deploy the smart account.                                                                                                                           |
| `address` | `Address`                                           | Required if `deployParams` and `deploySalt` are not provided | The address of the smart account. If an address is provided, the smart account will not be deployed. This should be used if you intend to interact with an existing smart account. |

### Hybrid implementation example

<Tabs>
<TabItem value ="example.ts">

```ts
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";
import { publicClient, account } from "./config.ts";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account: account },
});
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
 
export const account = privateKeyToAccount("0x...");
export const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

</TabItem>
</Tabs>

### Multisig implementation example

<Tabs>
<TabItem value="example.ts">

```ts
import { 
  publicClient, 
  aliceAccount, 
  bobAccount 
} from "./config.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const signers = [ aliceAccount.address, bobAccount.address ];
const threshold = 2n

const aliceSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.MultiSig,
  deployParams: [signers, threshold],
  deploySalt: "0x",
  signatory: [ { account: aliceAccount } ],
});
```

</TabItem>
<TabItem value="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";

export const publicClient = createPublicClient({
  chain,
  transport: http()
});

const alicePrivateKey = generatePrivateKey(); 
export const aliceAccount = privateKeyToAccount(alicePrivateKey);

const bobPrivateKey = generatePrivateKey();
export const bobAccount = privateKeyToAccount(bobPrivateKey);
```

</TabItem>
</Tabs>
