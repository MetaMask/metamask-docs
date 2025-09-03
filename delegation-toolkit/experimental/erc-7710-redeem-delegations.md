---
description: Learn how to redeem ERC-7710 delegations with a smart contract account or an externally owned account (EOA).
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# ERC-7710: Redeem delegations

:::caution Experimental
This is an experimental feature and may change in future releases.
:::

[ERC-7710](https://eip.tools/eip/7710) introduces a standard way for MetaMask Smart Accounts to delegate capabilities to other
smart accounts or externally owned accounts (EOAs).

The MetaMask Delegation Toolkit provides two experimental functions, `erc7710BundlerActions()` and `erc7710WalletActions()`, that let
a caller redeem delegations granted by MetaMask's permissions system.

## Extract relevant data

Refer to [ERC-7715: Request permissions](erc-7715-request-permissions.md) for information on how to request user permissions.
Once the permission has been granted, extract the relevant data from the response.
For example:

```typescript
// Response received from the ERC-7715 wallet_grantPermissions request.
const permissionsResponse = [{
  chainId: "0xe715",
  account: "0xD6f56C2B10b1e02D841E4a97c60Afe914E884DBd",
  expiry: 1234567890,
  permission: {
    type: "native-token-stream",
    data: {
      amountPerSecond: "0x1",
      maxAmount: "0x2",
      initialAmount: undefined,
      startTime: 2,
    },
  },
  context: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d"
  signer: {
    type: "account",
    data: {
      account: "0x07bfc7230D5BD2544059816D88A895BB000Abe00"
    }
  },
  signerMeta: {
    delegationManager: "0xDC7e12b41E5e61BfCc7F56AAFB7B93288F61e841"
  },
  accountMetadata: [{
    factory: "0x65E726b404149fE37F4b291c81Dc6eddd44763A7",
    factoryData: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b"
  }]
}];

const permissionsContext = permissionsResponse[0].context;
const delegationManager = permissionsResponse[0].signerMeta.delegationManager;
// accountMeta is only present when the smart account is not deployed.
const accountMetadata = permissionsResponse[0].accountMeta;
```

This data encodes the authority that lets the delegate redeem the permission.

### Security considerations for `accountMeta`

When a user grants a permission, they can provide `accountMeta` which is an array of `factory` and `factoryData` values.
These calls must be executed before redeeming the permission (this is handled for you in [`sendUserOperationWithDelegation`](../reference/api/experimental-actions/bundler-client.md#senduseroperationwithdelegation)).

Because each `accountMeta` is an arbitrary call specified by the granter, it is important that these are executed carefully.
We recommend taking the following precautions:

- **Only grant permissions to session accounts** - When requesting permissions, use an account that is only used for that single purpose, and does not contain tokens.
This way, any `accountMeta` executed can't perform any damaging actions.

- **Only execute `accountMeta` against trusted factory addresses** - Ensure that only `accountMeta` targeting a known factory address is executed.
The bundler action `sendUserOperationWithDelegation` only executes `accountMeta` that targets the `SimpleFactory` address for the current Delegation Framework.
If you redeem delegations in any other way, it is your responsibility to validate trusted factory addresses.

## Redeem the permission

Redeem a delegation with a [MetaMask smart account](#redeem-with-a-metamask-smart-account) or an [externally owned account (EOA)](#redeem-with-an-eoa).

### Redeem with a MetaMask smart account

To redeem a delegation with a MetaMask smart account, [create a smart account](../guides/smart-accounts/create-smart-account.md)
and a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler).

After setting up your Bundler Client, you can extend its functionality with `erc7710BundlerActions` actions to support ERC-7710. Once extended, use [`sendUserOperationWithDelegation`](../reference/api/experimental-actions/bundler-client.md#senduseroperationwithdelegation) to redeem the permission.

<Tabs>
<TabItem value="example.ts">

```typescript
import { sessionAccount, bundlerClient, publicClient } from "./config.ts";

// These properties must be extracted from the permission response.
const permissionsContext = permissionsResponse[0].context;
const delegationManager = permissionsResponse[0].signerMeta.delegationManager;
const accountMetadata = permissionsResponse[0].accountMeta;

// Calls without permissionsContext and delegationManager will be executed 
// as a normal user operation.
const userOperationHash = await bundlerClient.sendUserOperationWithDelegation({
  publicClient,
  account: sessionAccount,
  calls: [
    {
      to: sessionAccount.address,
      data: "0x",
      value: 1n,
      permissionsContext,
      delegationManager,
    },
  ],
  // Appropriate values must be used for fee-per-gas. 
  maxFeePerGas: 1n,
  maxPriorityFeePerGas: 1n
  accountMetadata,
});
```
</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http, createBundlerClient } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { createBundlerClient } from "viem/account-abstraction";
import { erc7710BundlerActions } from "@metamask/delegation-toolkit/experimental";
import { toMetaMaskSmartAccount, Implementation } from "@metamask/delegation-toolkit";

export const publicClient = createPublicClient({
  chain: chain,
  transport: http(),
});

// Your session account for requesting and redeeming should be same.
const privateKey = "0x...";
const account = privateKeyToAccount(privateKey);


export const sessionAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});

export const bundlerClient = createBundlerClient({
  transport: http(
    `https://your-bundler-url`
  ),
  // Allows you to use the same Bundler Client as paymaster.
  paymaster: true
}).extend(erc7710BundlerActions());
```
</TabItem>
</Tabs>

:::note
`sendUserOperationWithDelegation` is similar to the `sendUserOperation` function, but does not accept `callData` directly.
:::

### Redeem with an EOA

To redeem a delegation with an EOA, create a [Viem Wallet Client](https://viem.sh/docs/clients/wallet).

After creating your Wallet Client, you can extend its functionality with `erc7710WalletActions` actions to support ERC-7710. Once extended, use [`sendTransactionWithDelegation`](../reference/api/experimental-actions/wallet-client.md#sendtransactionwithdelegation) to redeem the permission.

<Tabs>
<TabItem value="example.ts">

```typescript
import { walletClient, publicClient } from "./config.ts";

// These properties must be extracted from the permission response.
const permissionsContext = permissionsResponse[0].context;
const delegationManager = permissionsResponse[0].signerMeta.delegationManager;
const accountMetadata = permissionsResponse[0].accountMeta;

if (accountMetadata?.length !== 0) {
  // If the granted permission contains accountMetadata, this must be executed before attempting to 
  // redeem the delegation.

  // This transaction will deploy the delegator account.
  const hash = walletClient.sendTransaction({
    to: accountMetadata[0].factory,
    data: accountMetadata[0].factoryData,
  });
  
  // You should wait for transaction to be successfully executed.
  // You can use the TransactionReceipt.status to verify the state.
  await publicClient.waitForTransactionReceipt( { hash });
}

const hash = walletClient.sendTransactionWithDelegation({
  chain,
  to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  value: 1n,
  permissionsContext,
  delegationManager
});
```
</TabItem>

<TabItem value="config.ts">

```typescript
import { http, createPublicClient, createWalletClient } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { erc7710WalletActions } from "@metamask/delegation-toolkit/experimental";

export const publicClient = createPublicClient({
  chain,
  transport: http()
});

// Your session account for requesting and redeeming should be same.
const privateKey = "0x...";
const account = privateKeyToAccount(privateKey);

const walletClient = createWalletClient({
  account,
  transport: http(),
  chain,
}).extend(erc7710WalletActions());
```
</TabItem>
</Tabs>
