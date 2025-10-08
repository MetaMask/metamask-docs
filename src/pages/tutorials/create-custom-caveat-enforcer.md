---
title: Create a custom caveat enforcer
image: 'img/tutorials/tutorials-banners/create-custom-caveat-enforcer.png'
description: Define custom rules for a delegation by creating, deploying, and applying a custom caveat enforcer.
tags: [delegation toolkit, caveat enforcer, smart contracts]
keywords: [delegation toolkit, create, custom, caveat enforcer, smart contracts]
date: Aug 27, 2025
author: MetaMask Developer Relations
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This tutorial walks you through creating a custom [caveat enforcer](/delegation-toolkit/concepts/delegation/caveat-enforcers) and applying it to a [delegation](/delegation-toolkit/concepts/delegation/).

The MetaMask Delegation Toolkit includes [out-of-the-box caveat enforcers](/delegation-toolkit/reference/delegation/caveats) that define rules and restrictions for common use cases.
For more specific control or other use cases, you can create custom caveat enforcers.
In this tutorial, you'll create and apply a caveat enforcer that only allows a delegation to be redeemed after a specific timestamp.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager.
- [Install Foundry and Forge](https://getfoundry.sh/introduction/installation).
- Get an [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard.
- Have a MetaMask account with some Sepolia ETH to deploy your contract.
  :::note
  You can use the [MetaMask faucet](/developer-tools/faucet) to get Sepolia ETH.
  :::

## Steps

### 1. Install the toolkit

Install the [MetaMask Delegation Toolkit](https://www.npmjs.com/package/@metamask/delegation-toolkit) in your project:

```bash npm2yarn
npm install @metamask/delegation-toolkit
```

### 2. Create the caveat enforcer

At the root of your project, create a `contracts` directory.
In that directory, create a new contract named `AfterTimestampEnforcer.sol`.

Add the following code to `AfterTimestampEnforcer.sol`, which creates a caveat enforcer that extends the
[`ICaveatEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/interfaces/ICaveatEnforcer.sol)
interface and only allows a delegation to be redeemed after a specific timestamp:

```solidity title="AfterTimestampEnforcer.sol"
// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { CaveatEnforcer } from "@delegator/src/enforcers/CaveatEnforcer.sol";
import { ModeCode } from "/delegation-toolkit/utils/Types.sol";

contract AfterTimestampEnforcer is CaveatEnforcer {
  /**
   * @notice The delegation may only be redeemed after the specified timestamp - validAfter in seconds.
   * @param _terms The validAfter, timestamp in seconds after which the delegation may be redeemed.
   * @param _delegationHash - The hash of the delegation being operated on.
   */
  function beforeHook(
    bytes calldata _terms,
    bytes calldata,
    ModeCode,
    bytes calldata,
    bytes32 _delegationHash,
    address,
    address _redeemer
  )
    public
    override
  {
    // Enforces the conditions that should hold before a transaction is performed.
    // This function MUST revert if the conditions are not met.
    // Get the current timestamp
    uint256 timestamp = block.timestamp;

    uint256 validAfter = uint256(bytes32(_terms));

    require(timestamp > validAfter, "AfterTimestampEnforcer:cannot-redeem-too-early");
  }
}
```

### 3. Deploy the caveat enforcer

Deploy your custom caveat enforcer using [Forge](https://book.getfoundry.sh/forge/deploying) to obtain its contract address.
Replace `<YOUR-API-KEY>` with your Infura API key, and `<YOUR-PRIVATE-KEY>` with the private key of your MetaMask account:

```bash
forge create src/AfterTimestampEnforcer.sol:AfterTimestampEnforcer \
  --rpc-url https://sepolia.infura.io/v3/<YOUR-API-KEY>            \
  --private-key <YOUR-PRIVATE-KEY>                                 \
  --broadcast
```

The Forge CLI will display the address of the deployed caveat enforcer.

### 4. Apply the caveat enforcer

Specify the address of the deployed `AfterTimestampEnforcer.sol` contract, add it to the [caveat builder](/delegation-toolkit/reference/delegation/#createcaveatbuilder), and create a delegation.

The following code snippet uses the custom caveat enforcer to create a delegation granting
a 1,000,000 wei allowance that becomes spendable one hour after it is created:

<Tabs>
<TabItem value="delegation.ts">

```typescript
import { createDelegation, ROOT_AUTHORITY } from '@metamask/delegation-toolkit'
import { createCaveatBuilder } from '@metamask/delegation-toolkit/utils'
import { toHex } from 'viem'
import { delegatorSmartAccount } from './config.ts'

const environment = delegatorSmartAccount.environment

// Replace this with the address of the deployed AfterTimestampEnforcer.sol contract.
const afterTimestampEnforcer = '0x22Ae4c4919C3aB4B5FC309713Bf707569B74876F'

const caveatBuilder = createCaveatBuilder(environment)

const tenAM = 10 * 60 * 60 // 10:00 AM as seconds since midnight.

const caveats = caveatBuilder.addCaveat('nativeTokenTransferAmount', 1000000n).addCaveat({
  enforcer: afterTimestampEnforcer,
  terms: toHex(tenAM),
})

const delegation: Delegation =  {
  delegate: "DELEGATE_ADDRESS",
  delegator: delegatorSmartAccount.address,
  authority: ROOT_AUTHORITY,
  caveats: caveats.build(),
  salt: '0x',
};
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from 'viem'
import { sepolia as chain } from 'viem/chains'
import { Implementation, toMetaMaskSmartAccount } from '@metamask/delegation-toolkit'

const publicClient = createPublicClient({
  chain,
  transport: http(),
})

const privateKey = generatePrivateKey()
const account = privateKeyToAccount(privateKey)

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: '0x',
  signer: { account },
})
```

</TabItem>
</Tabs>

You've successfully created, deployed, and applied a custom caveat enforcer!

For production use cases, you might need to add additional caveats to restrict the delegation further.
Learn more about [caveat enforcers](/delegation-toolkit/concepts/delegation/caveat-enforcers).
