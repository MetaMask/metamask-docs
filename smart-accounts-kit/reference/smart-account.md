---
description: MetaMask Smart Accounts-related API methods reference.
sidebar_label: MetaMask Smart Accounts
toc_max_heading_level: 2
keywords: [smart accounts, API, methods, reference]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# MetaMask Smart Accounts API reference

The following API methods are related to creating, managing, and signing with [MetaMask Smart Accounts](../concepts/smart-accounts.md).

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
import { aggregateSignature } from "@metamask/smart-accounts-kit";

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
import { sepolia as chain } from "viem/chains";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

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
  signer: [ { account: aliceAccount } ],
});

export const bobSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.MultiSig,
  deployParams: [signers, threshold],
  deploySalt: "0x",
  signer: [ { account: bobAccount } ],
});

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://public.pimlico.io/v2/rpc")
});
```

</TabItem>
</Tabs>

## `encodeCalls`

Encodes calls for execution by a MetaMask smart account. If there's a single call directly to the smart account, it returns the call data directly. For multiple calls or calls to other addresses, it creates executions and encodes them for the smart account's `execute` function.

The execution mode is set to `SingleDefault` for a single call to other address, or `BatchDefault` for multiple calls.

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `calls` | `Call[]` | Yes | List of calls to be encoded. |

### Example 

<Tabs>
<TabItem value ="example.ts">

```ts
import { smartAccount } from "./config.ts";

const calls = [{
  to: zeroAddress,
  data: "0x",
  value: 0n
}];

const executeCallData = await smartAccount.encodeCalls(calls);
```

</TabItem>

<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const delegatorAccount = privateKeyToAccount("0x...");

export const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegatorAccount.address, [], [], []],
  deploySalt: "0x",
  signer: { account: delegatorAccount },
});
```

</TabItem>
</Tabs>

## `getFactoryArgs`

Returns the factory address and factory data that can be used to deploy a smart account.

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { smartAccount } from "./config.ts";

const { factory, factoryData } = await smartAccount.getFactoryArgs();
```

</TabItem>

<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const delegatorAccount = privateKeyToAccount("0x...");

export const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegatorAccount.address, [], [], []],
  deploySalt: "0x",
  signer: { account: delegatorAccount },
});
```

</TabItem>
</Tabs>


## `getNonce`

Returns the nonce for a smart account.

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { smartAccount } from "./config.ts";

const nonce = await smartAccount.getNonce();
```

</TabItem>

<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});

const delegatorAccount = privateKeyToAccount("0x...");

export const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegatorAccount.address, [], [], []],
  deploySalt: "0x",
  signer: { account: delegatorAccount },
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
import { createDelegation, getDelegatorEnvironment } from "@metamask/smart-accounts-kit";
import { delegatorSmartAccount } from "./config.ts";

// The address to which the delegation is granted. It can be an EOA address, or 
// smart account address.
const delegate = "0x2FcB88EC2359fA635566E66415D31dD381CF5585";

const delegation = createDelegation({
  to: delegate,
  from: account.address,
  environment: delegatorSmartAccount.environment,
  scope: {
    type: "nativeTokenTransferAmount",
    // 0.001 ETH in wei format.
    maxAmount: 1000000000000000n,
  },
});

const signature = delegatorSmartAccount.signDelegation({ delegation });
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

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
  signer: { account: delegatorAccount },
});
```

</TabItem>
</Tabs>

## `signMessage`

Generates the [EIP-191](https://eips.ethereum.org/EIPS/eip-191) signature
using the `MetaMaskSmartAccount` signer. The Smart Accounts Kit
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
import { sepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

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
  signer: { account },
});
```

</TabItem>
</Tabs>

## `signTypedData`

Generates the [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature
using the `MetaMaskSmartAccount` signer. The Smart Accounts Kit
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
import { sepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

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
  signer: { account },
});
```

</TabItem>
</Tabs>

## `signUserOperation`

Signs a user operation with the `MetaMaskSmartAccount` signer. The Delegation
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
import { sepolia as chain } from "viem/chains";
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";

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
  signer: { account },
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
| `implementation` | `TImplementation`                                   | Yes                                                          | Implementation type for the smart account. Can be Hybrid, Multisig, or Stateless7702.                                                                                                             |
| `signer` | `SignerConfigByImplementation <TImplementation>` | Yes                                                          | Signers for the smart account. Can be a Viem Account, Viem Wallet Client, or a WebAuthnAccount. Web3AuthnAccounts are only supported for Hybrid implementations.                  |
| `environment` | `DeleGatorEnvironment`                              | No                                                           | Environment to resolve the smart contracts.                                                                                                                                       |
| `deployParams` | `DeployParams<TImplementation>`                     | Required if `address` is not provided                        | The parameters that will be used to deploy the smart account and generate its deterministic address.                                                                              |
| `deploySalt` | `Hex`                                               | Required if `address` is not provided                        | The salt that will be used to deploy the smart account.                                                                                                                           |
| `address` | `Address`                                           | Required if `deployParams` and `deploySalt` are not provided, or if the implementation is `Stateless7702`. | The address of the smart account. If an address is provided, the smart account will not be deployed. This should be used if you intend to interact with an existing smart account. |

### Hybrid implementation

#### `deployParams`

All Hybrid deploy parameters are required:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `owner` | `Hex` | The owner's account address. The owner can be the zero address, indicating that there is no owner configured. |
| `p256KeyIds` | `Hex[]` | An array of key identifiers for passkey signers. |
| `p256XValues` | `bigint[]` | An array of public key x-values for passkey signers. |
| `p256YValues` | `bigint[]` | An array of public key y-values for passkey signers. |

#### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";
import { publicClient, account } from "./config.ts";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signer: { account: account },
});
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
 
export const account = privateKeyToAccount("0x...");
export const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

</TabItem>
</Tabs>

### Multisig implementation

#### `deployParams`

All Multisig deploy parameters are required:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `signers` | `Hex[]` | An array of EOA signer addresses. |
| `threshold` | `bigint` | The number of signers required to execute a transaction. |

#### Example

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
} from "@metamask/smart-accounts-kit";

const signers = [ aliceAccount.address, bobAccount.address ];
const threshold = 2n

const aliceSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.MultiSig,
  deployParams: [signers, threshold],
  deploySalt: "0x",
  signer: [ { account: aliceAccount } ],
});
```

</TabItem>
<TabItem value="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";

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

### Stateless7702 implementation example

<Tabs>
<TabItem value ="example.ts">

```ts
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/smart-accounts-kit";
import { publicClient, account } from "./config.ts";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Stateless7702,
  address: account.address,
  signer: { account },
});
```

</TabItem>
<TabItem value ="config.ts">

```ts
import { createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
 
export const account = privateKeyToAccount("0x...");
export const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

</TabItem>
</Tabs>