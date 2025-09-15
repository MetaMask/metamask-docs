---
description: Learn how to deploy a MetaMask smart account.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Deploy a smart account

You can deploy MetaMask Smart Accounts in two different ways. You can either deploy a smart account automatically when sending 
the first user operation, or manually deploy the account.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install.md)
- [Configure the Delegation Toolkit.](../configure.md)
- [Create a MetaMask smart account.](create-smart-account.md) 

## Deploy with the first user operation

When you send the first user operation from a smart account, the Delegation Toolkit checks whether the account is already deployed. If the account 
is not deployed, the toolkit adds the `initCode` to the user operation to deploy the account within the 
same operation. Internally, the `initCode` is encoded using the `factory` and `factoryData`. 

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

## Deploy manually

To deploy a smart account manually, call the [`getFactoryArgs`](../../reference/smart-account.md#getfactoryargs)
method from the smart account to retrieve the `factory` and `factoryData`. This allows you to use a relay account to sponsor the deployment without needing a paymaster. 

The `factory` represents the contract address responsible for deploying the smart account, while `factoryData` contains the 
calldata that will be executed by the `factory` to deploy the smart account. 

The relay account can be either an externally owned account (EOA) or another smart account. This example uses an EOA.

<Tabs>
<TabItem value="example.ts">

```typescript
import { walletClient, smartAccount } from "./config.ts";

const { factory, factoryData } = await smartAccount.getFactoryArgs();

// Deploy smart account using relay account.
const hash = await walletClient.sendTransaction({
  to: factory,
  data: factoryData,
})
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, createWalletClient, http } from "viem";
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

const relayAccountPrivateKey = "0x121..";
const relayAccount = privateKeyToAccount(relayAccountPrivateKey)

export const walletClient = createWalletClient({
  account: relayAccount,
  chain,
  transport: http()
})
```

</TabItem>
</Tabs>

## Next steps

- Learn more about [sending user operations](send-user-operation.md).
- To sponsor gas for end users, see how to [send a gasless transaction](send-gasless-transaction.md).