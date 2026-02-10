---
description: Learn how to request ERC-7715 permissions.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# ERC-7715: Request permissions

:::caution Experimental
This is an experimental feature.
It requires MetaMask Flask 13.5.0 or later, and may change in future releases.
:::

[ERC-7715](https://eip.tools/eip/7715) introduces a standard way for dapps to request permissions from a wallet to execute
transactions on a user's behalf.

The MetaMask Delegation Toolkit provides the experimental actions for ERC-7715 that lets a caller request permissions from MetaMask's permissions system.

## Request permissions

To request permissions, extend your [Viem Wallet Client](https://viem.sh/docs/clients/wallet) with `erc7715ProviderActions` actions.
You'll need a session account to request the permission, which can be either a smart account or an externally owned account (EOA).
This example uses a MetaMask smart account:

<Tabs>
<TabItem value="example.ts">

```typescript
import { sepolia as chain } from "viem/chains";
import { sessionAccount, walletClient } from "./config.ts";

const expiry = Math.floor(Date.now() / 1000 + 604_800); // 1 week from now.
const currentTime = Math.floor(Date.now() / 1000); // now

const grantedPermissions = await walletClient.grantPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      address: sessionAccount.address,
    },
  },
  permission: {
    type: "native-token-stream",
    data: {
      initialAmount: 1n, // 1 wei
      amountPerSecond: 1n, // 1 wei per second
      maxAmount: 10n, // 10 wei
      startTime: currentTime,
      justification: "Payment for a week long subscription",
    },
  },
}]);
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createWalletClient, custom, createPublicClient, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { erc7715ProviderActions } from "@metamask/delegation-toolkit/experimental";
import { toMetaMaskSmartAccount, Implementation } from "@metamask/delegation-toolkit";

const publicClient = createPublicClient({
  chain: chain,
  transport: http(),
});

// The private key of the session owner.
const privateKey = "0x...";
const account = privateKeyToAccount(privateKey);

export const sessionAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signer: { account },
});

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```
</TabItem>
</Tabs>

<details>
  <summary>ERC-7715 request permission sample</summary>
  <div>
  Here's what your ERC-7715 native token streaming allowance request looks like:

  ```ts
  [{
    chainId: "0xaa36a7",
    expiry: 1745041429,
    permission: {
      type: "native-token-stream",
      data: {
        amountPerSecond: "0x1",
        maxAmount: "0x1",
        initialAmount: "0xa",
        startTime: 1744955029,
        justification: "Payment for a week long subscription",
      },
    },
    signer: {
      type: "account",
      data: {
        address: "0x1234...",
      },
    },
  }]
  ```

  Learn more about the [ERC-7715 permission schema](https://eip.tools/eip/7715).
  </div>
</details>


Additionally, you can allow users to modify the requested permission by setting the `isAdjustmentAllowed` parameter to `true` in the request.

```typescript
import { sepolia as chain } from "viem/chains";
// The config.ts is the same as in the previous example.
import { sessionAccount, walletClient } from "./config.ts";

const expiry = Math.floor(Date.now() / 1000 + 604_800); // 1 week from now.
const currentTime = Math.floor(Date.now() / 1000); // now

const grantedPermissions = await walletClient.grantPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      address: sessionAccount.address,
    },
  },
  permission: {
    type: "native-token-stream",
    // add-next-line
+   isAdjustmentAllowed: true,
    data: {
      initialAmount: 1n, // 1 wei
      amountPerSecond: 1n, // 1 wei per second
      maxAmount: 10n, // 10 wei
      startTime: currentTime,
      justification: "Payment for a week long subscription",
    },
  },
}]);
```

:::note
Users have full control over the permissions they grant—depending on the permission you request, they may choose to grant more limited permissions than requested.
You should always verify the granted permissions and adjust your dapp's behavior accordingly.
:::

## Security considerations for `accountMeta`

When a user grants a permission, they can provide [`accountMeta`](erc-7710-redeem-delegations.md#extract-relevant-data) which is an array of `factory` and `factoryData` values.
These calls must be executed before redeeming the permission (this is handled for you in [`sendUserOperationWithDelegation`](../reference/erc7715/bundler-client.md#senduseroperationwithdelegation)).

Because each `accountMeta` is an arbitrary call specified by the granter, it is important that these are executed carefully.
We recommend taking the following precautions:

- **Only grant permissions to session accounts** - When requesting permissions, use an account that is only used for that single purpose, and does not contain tokens.
  This way, any `accountMeta` executed can't perform any damaging actions.

- **Only execute `accountMeta` against trusted factory addresses** - Ensure that only `accountMeta` targeting a known factory address is executed.
  The bundler action `sendUserOperationWithDelegation` only executes `accountMeta` that targets the `SimpleFactory` address for the current Delegation Framework.
  If you redeem delegations in any other way, it is your responsibility to validate trusted factory addresses.

## Next steps

You can redeem the granted permission using the experimental [ERC-7710 `erc7710WalletActions()`](erc-7710-redeem-delegations.md).
