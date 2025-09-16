---
description: Learn how to send a gasless transaction
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Send a gasless transaction

MetaMask Smart Accounts support gas sponsorship, which simplifies onboarding by abstracting gas fees away from end users.
You can use any paymaster service provider, such as [Pimlico](https://docs.pimlico.io/references/paymaster) or [ZeroDev](https://docs.zerodev.app/meta-infra/rpcs), or plug in your own custom paymaster.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install.md)
- [Create a MetaMask smart account.](create-smart-account.md)

## Send a gasless transaction

The following example demonstrates how to use Viem's [Paymaster Client](https://viem.sh/account-abstraction/clients/paymaster) to send gasless transactions.
You can provide the paymaster client using the paymaster property in the [`sendUserOperation`](https://viem.sh/account-abstraction/actions/bundler/sendUserOperation#paymaster-optional) method, or in the [Bundler Client](https://viem.sh/account-abstraction/clients/bundler#paymaster-optional).

In this example, the paymaster client is passed to the `sendUserOperation` method.

<Tabs>
<TabItem value="example.ts">

```typescript
import { bundlerClient, smartAccount, paymasterClient } from "./config.ts";
import { parseEther } from "viem";

// Appropriate fee per gas must be determined for the specific bundler being used.
const maxFeePerGas = 1n;
const maxPriorityFeePerGas = 1n;

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    {
      to: "0x1234567890123456789012345678901234567890",
      value: parseEther("1")
    }
  ],
  maxFeePerGas,
  maxPriorityFeePerGas,
  paymaster: paymasterClient,
});
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, createPaymasterClient, http } from "viem";
import { createBundlerClient } from "viem/account-abstraction";
import { sepolia as chain } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";


const publicClient = createPublicClient({
  chain,
  transport: http()
});

const privateKey = generatePrivateKey(); 
const account = privateKeyToAccount(privateKey);

export const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signer: { account },
});

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://api.pimlico.io/v2/11155111/rpc")
});

export const paymasterClient = createPaymasterClient({
  // You can use the paymaster of your choice
  transport: http("https://api.pimlico.io/v2/11155111/rpc")
});
```

</TabItem>
</Tabs>
