---
description: Learn how to create a MetaMask smart account using Smart Accounts Kit.
keywords: [create, smart account, signer, hybrid, multisig, 7702]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a smart account

You can enable users to create a [MetaMask smart account](../../concepts/smart-accounts.md) directly
in your dapp. Use [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount)
to create different types of smart accounts with different signature schemes.

## Prerequisites

[Install and set up the Smart Accounts Kit.](../../get-started/install.md)

## Hybrid smart account

A [Hybrid smart account](../../concepts/smart-accounts.md#hybrid-smart-account) supports both an externally owned account (EOA) owner and any number of passkey (WebAuthn) signers.

This example uses `toMetaMaskSmartAccount` and Viem's [Wallet Client](https://viem.sh/docs/clients/wallet)
to create a Hybrid smart account. The `signer` parameter also accepts Viem's [Local Account](https://viem.sh/docs/accounts/local) and [WebAuthnAccount](https://viem.sh/account-abstraction/accounts/webauthn#webauthn-account).

See the [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount) API reference for more information.

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from './client.ts'
import { walletClient } from './signer.ts'
import { Implementation, toMetaMaskSmartAccount } from '@metamask/smart-accounts-kit'

// Some wallets like MetaMask may require you to request access to
// account addresses using walletClient.requestAddresses() first.
const [address] = await walletClient.getAddresses()

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [address, [], [], []],
  deploySalt: '0x',
  signer: { walletClient },
})
```

</TabItem>

<TabItem value="client.ts">

```typescript
import { http, createPublicClient } from 'viem'
import { sepolia as chain } from 'viem/chains'

const transport = http()
export const publicClient = createPublicClient({
  transport,
  chain,
})
```

</TabItem>

<TabItem value="signer.ts">

```typescript
import { sepolia as chain } from 'viem/chains'
import { createWalletClient, custom } from 'viem'

export const walletClient = createWalletClient({
  chain,
  transport: custom(window.ethereum!),
})
```

</TabItem>
</Tabs>

## Multisig smart account

A [Multisig smart account](../../concepts/smart-accounts.md#multisig-smart-account) supports multiple EOA signers with a configurable threshold for execution.

This example uses [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount) to create a
Multisig smart account with a combination of account signers and Wallet Client signers.

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from './client.ts'
import { account, walletClient } from './signers.ts'
import { Implementation, toMetaMaskSmartAccount } from '@metamask/smart-accounts-kit'

const owners = [account.address, walletClient.address]
const signer = [{ account }, { walletClient }]
const threshold = 2n

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.MultiSig,
  deployParams: [owners, threshold],
  deploySalt: '0x',
  signer,
})
```

</TabItem>

<TabItem value="client.ts">

```typescript
import { http, createPublicClient } from 'viem'
import { sepolia as chain } from 'viem/chains'

const transport = http()
export const publicClient = createPublicClient({
  transport,
  chain,
})
```

</TabItem>

<TabItem value="signers.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'
import { sepolia as chain } from 'viem/chains'
import { http, createWalletClient } from 'viem'

// This private key will be used to generate the first signer.
const privateKey = generatePrivateKey()
export const account = privateKeyToAccount(privateKey)

// This private key will be used to generate the second signer.
const walletClientPrivateKey = generatePrivateKey()
const walletClientAccount = privateKeyToAccount(walletClientPrivateKey)

export const walletClient = createWalletClient({
  account: walletClientAccount,
  chain,
  transport: http(),
})
```

</TabItem>
</Tabs>

:::note
The number of signers must be at least equal to the threshold to generate a valid signature.
:::

## EIP-7702 smart account

An [EIP-7702 smart account](../../concepts/smart-accounts.md#stateless-7702-smart-account) represents an EOA that has been upgraded
to support MetaMask Smart Accounts functionality as defined by [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702).

This example uses [`toMetaMaskSmartAccount`](../../reference/smart-account.md#tometamasksmartaccount)
and Viem's [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount) to
create an EIP-7702 smart account. This example doesn't handle the upgrade process; see the
[EIP-7702 quickstart](../../get-started/smart-account-quickstart/eip7702.md) to learn how to upgrade.

:::note Important
The EIP-7702 implementation only works with Viem's [Local Accounts](https://viem.sh/docs/accounts/local). It doesn't work with a [JSON-RPC Account](https://viem.sh/docs/accounts/jsonRpc) like MetaMask.

See the [Upgrade a MetaMask EOA to a smart account](https://docs.metamask.io/tutorials/upgrade-eoa-to-smart-account/) tutorial.
:::

<Tabs>
<TabItem value="example.ts">

```typescript
import { publicClient } from './client.ts'
import { account } from './signer.ts'
import { Implementation, toMetaMaskSmartAccount } from '@metamask/smart-accounts-kit'

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Stateless7702,
  address: account.address,
  signer: { account },
})
```

</TabItem>

<TabItem value="client.ts">

```typescript
import { http, createPublicClient } from 'viem'
import { sepolia as chain } from 'viem/chains'

const transport = http()
export const publicClient = createPublicClient({
  transport,
  chain,
})
```

</TabItem>

<TabItem value="signer.ts">

```typescript
import { privateKeyToAccount, generatePrivateKey } from 'viem/accounts'

const privateKey = generatePrivateKey()
export const account = privateKeyToAccount(privateKey)
```

</TabItem>
</Tabs>

## Next steps

- [Configure signers](./signers/index.md) to use a signer that fits your needs.
- [Deploy the smart account](deploy-smart-account.md) and [send user operations](send-user-operation.md) using [Viem Account Abstraction clients](../configure-toolkit.md).
- [Create delegations](../delegation/execute-on-smart-accounts-behalf.md) to grant scoped permissions to other accounts.
