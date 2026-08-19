---
description: How to resolve the AA21 didn't pay prefund error when submitting user operations.
sidebar_label: AA21 didn't pay prefund
keywords: [AA21, pay prefund, user operation, troubleshooting]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import GlossaryTerm from '@theme/GlossaryTerm';

# AA21 didn't pay prefund

The `EntryPoint` contract reverts with `AA21 didn't pay prefund` when a <GlossaryTerm term="MetaMask smart account">smart account</GlossaryTerm> doesn't
have enough native token balance to cover the gas cost of the <GlossaryTerm term="User operation">user operation</GlossaryTerm>.

Before executing a user operation, the `EntryPoint` requires the sender account to prefund the
expected gas cost. If the account's balance is lower than the required prefund, the `EntryPoint`
reverts the operation.

## Solution

### Fund the smart account

Fund the smart account with enough native tokens to cover the required prefund.
Use Viem's [`estimateUserOperationGas`](https://viem.sh/account-abstraction/actions/bundler/estimateUserOperationGas)
to get the gas estimates from your <GlossaryTerm term="Bundler">bundler</GlossaryTerm>, then calculate the required prefund based on the
`EntryPoint` version.

<Tabs>
<TabItem value="v0.7" label="EntryPoint v0.7">

```typescript
import { formatEther } from 'viem'

const gasEstimate = await bundlerClient.estimateUserOperationGas({
  account: smartAccount,
  calls: [{ to: '0x...', value: 0n }],
})

const { maxFeePerGas } = await publicClient.estimateFeesPerGas()

const requiredGas =
  gasEstimate.verificationGasLimit +
  gasEstimate.callGasLimit +
  (gasEstimate.paymasterVerificationGasLimit ?? 0n) +
  (gasEstimate.paymasterPostOpGasLimit ?? 0n) +
  gasEstimate.preVerificationGas

const requiredPrefund = requiredGas * maxFeePerGas

const balance = await publicClient.getBalance({
  address: smartAccount.address,
})

if (balance < requiredPrefund) {
  console.log(
    `Insufficient balance: account has ${formatEther(balance)} ETH, ` +
      `but needs ${formatEther(requiredPrefund)} ETH`
  )
}
```

</TabItem>
<TabItem value="v0.6" label="EntryPoint v0.6">

```typescript
import { formatEther } from 'viem'

const gasEstimate = await bundlerClient.estimateUserOperationGas({
  account: smartAccount,
  calls: [{ to: '0x...', value: 0n }],
})

const { maxFeePerGas } = await publicClient.estimateFeesPerGas()

const requiredGas =
  gasEstimate.callGasLimit + gasEstimate.verificationGasLimit + gasEstimate.preVerificationGas

const requiredPrefund = requiredGas * maxFeePerGas

const balance = await publicClient.getBalance({
  address: smartAccount.address,
})

if (balance < requiredPrefund) {
  console.log(
    `Insufficient balance: account has ${formatEther(balance)} ETH, ` +
      `but needs ${formatEther(requiredPrefund)} ETH`
  )
}
```

</TabItem>
</Tabs>

### Use a paymaster

You can use a <GlossaryTerm term="Paymaster">paymaster</GlossaryTerm> to sponsor the gas fees for the smart account, so the account doesn't
need to hold native tokens. For more information about configuring a paymaster, see [Send a gasless transaction](../guides/smart-accounts/send-gasless-transaction.md).
