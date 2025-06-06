---
description: Learn how to create a delegator account using Viem.
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a delegator account

The MetaMask Delegation Toolkit is embedded, meaning that the end user can instantly interact with a dapp without wallet authorization, confirmations, or corporate logos. Enable users to create a [delegator account](../concepts/delegator-accounts.md) directly in your dapp.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../get-started/install.md)
- [Configure the Delegation Toolkit.](configure.md)

## Create a `MetaMaskSmartAccount`

The following is an example of creating a delegator account using Viem Core SDK.
Viem Core SDK provides low-level interfaces to offer flexibility and control over the delegator
account creation lifecycle.

In the example, the Viem [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey.html)
function creates an externally owned account as the owner of the delegator account.

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient, owner } from "./config.ts";
import { 
  Implementation, 
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";

const deploySalt = "0x";

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [owner.address, [], [], []],
  deploySalt,
  signatory: { account: owner },
});
```

</TabItem>

<TabItem value="config.ts">
 
```typescript
import { http, createPublicClient } from "viem";
import { privateKeyToAccount, generatePrivateKey } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";

const transport = http(); 
export const publicClient = createPublicClient({ 
  transport, 
  chain, 
});

const privateKey = generatePrivateKey(); 
export const owner = privateKeyToAccount(privateKey);
```

</TabItem>
</Tabs>


This example creates the `MetaMaskSmartAccount`, which can perform several functions:

- In conjunction with [Viem Account Abstraction clients](configure.md), deploy the smart contract account,
  and [send user operations](send-user-operation.md).
- [Sign delegations](create-delegation/index.md) that can be used to grant specific rights and permissions to other accounts.

:::note 
The example above uses the Hybrid Delegator smart contract account, which is configurable to have an EOA "owner" and any number of P256 (passkey) signers.
You can also [configure other delegator account types](configure-delegator-accounts-signers.md).
:::
