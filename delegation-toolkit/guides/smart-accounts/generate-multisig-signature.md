---
description: Learn how to generate a Multisig signature.
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Generate a multisig signature

The MetaMask Delegation Toolkit supports [Multisig smart accounts](../../concepts/smart-accounts.md#multisig-smart-account),
allowing you to add multiple externally owned accounts (EOA) 
signers with a configurable execution threshold. When the threshold 
is greater than 1, you can collect signatures from the required signers 
and use the [`aggregateSignature`](../../reference/api/smart-account.md#aggregatesignature) function to combine them 
into a single aggregated signature.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install.md)
- [Configure the Delegation Toolkit.](../configure.md)
- [Create a Multisig smart account.](create-smart-account.md#create-a-multisig-smart-account)

## Generate a multisig signature

The following example configures a Multisig smart account with two different signers: Alice 
and Bob. The account has a threshold of 2, meaning that signatures from 
both parties are required for any execution.

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
import { sepolia as chain } from "viem/chains";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain,
  transport: http()
});

const alicePrivateKey = generatePrivateKey(); 
export const aliceAccount = privateKeyToAccount(alicePrivateKey);

const bobPrivateKey = generatePrivateKey();
export const bobAccount = privateKeyToAccount(bobPrivateKey)

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


