---
description: Learn how to send an ERC-4337 user operation using Viem.
keywords: [ERC-4337, send, user operation, smart account]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Send a user operation

User operations are the [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) counterpart to traditional blockchain transactions.
They incorporate significant enhancements that improve user experience and provide greater
flexibility in account management and transaction execution.

Viem's Account Abstraction API allows a developer to specify an array of `Calls` that will be executed as a user operation via Viem's [`sendUserOperation`](https://viem.sh/account-abstraction/actions/bundler/sendUserOperation) method.
The MetaMask Delegation Toolkit encodes and executes the provided calls.

User operations are not directly sent to the network.
Instead, they are sent to a bundler, which validates, optimizes, and aggregates them before network submission.
See [Viem's Bundler Client](https://viem.sh/account-abstraction/clients/bundler) for details on how to interact with the bundler.

:::note
If a user operation is sent from a MetaMask smart account that has not been deployed, the toolkit configures the user operation to automatically deploy the account.
:::

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install.md)
- [Create a MetaMask smart account.](create-smart-account.md)

## Send a user operation

The following is a simplified example of sending a user operation using Viem Core SDK. Viem Core SDK offers more granular control for developers who require it.

In the example, a user operation is created with the necessary gas limits.

This user operation is passed to a bundler instance, and the `EntryPoint` address is retrieved from the client.

<Tabs>
<TabItem value="example.ts">

```typescript
import { bundlerClient, smartAccount } from "./config.ts";
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
  maxPriorityFeePerGas
});
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from "viem";
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
  transport: http("https://public.pimlico.io/v2/11155111/rpc")
});
```

</TabItem>
</Tabs>

### Estimate fee per gas

Different bundlers have different ways to estimate `maxFeePerGas` and `maxPriorityFeePerGas`, and can reject requests with insufficient values.
The following example updates the previous example to estimate the fees.

This example uses constant values, but the [Hello Gator example](https://github.com/MetaMask/hello-gator) uses Pimlico's Alto bundler,
which fetches user operation gas price using the RPC method [`pimlico_getUserOperationPrice`](https://docs.pimlico.io/infra/bundler/endpoints/pimlico_getUserOperationGasPrice).

:::info Installation required

To estimate the gas fee for Pimlico's bundler, install the [permissionless.js SDK](https://docs.pimlico.io/references/permissionless/).

:::

```typescript title="example.ts"
// add-next-line
+ import { createPimlicoClient } from "permissionless/clients/pimlico";
import { parseEther } from "viem";
import { bundlerClient, smartAccount } from "./config.ts" // The config.ts is the same as in the previous example.

// remove-start
- const maxFeePerGas = 1n;
- const maxPriorityFeePerGas = 1n;
// remove-end

// add-start
+ const pimlicoClient = createPimlicoClient({
+   transport: http("https://api.pimlico.io/v2/11155111/rpc"), // You can get the API Key from the Pimlico dashboard.
+ });
+
+ const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();
// add-end

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    {
      to: "0x1234567890123456789012345678901234567890",
      value: parseEther("1")
    }
  ],
  // remove-start
-  maxFeePerGas,
-  maxPriorityFeePerGas
  // remove-end
  // add-next-line
+  ...fee
});
```

### Wait for the transaction receipt

After submitting the user operation, it's crucial to wait for the receipt to ensure that it has been successfully included in the blockchain. Use the `waitForUserOperationReceipt` method provided by the bundler client.

```typescript title="example.ts"
import { createPimlicoClient } from "permissionless/clients/pimlico";
import { bundlerClient, smartAccount } from "./config.ts" // The config.ts is the same as in the previous example.

const pimlicoClient = createPimlicoClient({
  transport: http("https://api.pimlico.io/v2/11155111/rpc"), // You can get the API Key from the Pimlico dashboard.
});

const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    {
      to: "0x1234567890123456789012345678901234567890",
      value: parseEther("1")
    }
  ],
  ...fee
});

// add-start
+ const { receipt } = await bundlerClient.waitForUserOperationReceipt({
+   hash: userOperationHash
+ });
+
+ console.log(receipt.transactionHash);
// add-end
```

## Next steps

To sponsor gas for end users, see how to [send a gasless transaction](send-gasless-transaction.md).
