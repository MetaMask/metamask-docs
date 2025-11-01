---
title: Create a custom caveat enforcer
image: 'img/tutorials/tutorials-banners/create-custom-caveat-enforcer.png'
description: Define custom rules for a delegation by creating, deploying, and applying a custom caveat enforcer.
tags: [smart accounts kit, delegation toolkit, caveat enforcer, smart contracts]
keywords: [delegation, smart accounts kit, create, custom, caveat enforcer, smart contracts]
date: Aug 27, 2025
author: MetaMask Developer Relations
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This tutorial walks you through creating a custom [caveat enforcer](/delegation-toolkit/concepts/delegation/caveat-enforcers) and applying it to a [delegation](/delegation-toolkit/concepts/delegation/).

The Delegation Toolkit includes [out-of-the-box caveat enforcers](/delegation-toolkit/reference/delegation/caveats) that define rules and restrictions for common use cases.
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

### 1. Install the Delegation Toolkit

Install the [Delegation Toolkit](https://www.npmjs.com/package/@metamask/smart-accounts-kit) in your project:

```bash npm2yarn
npm install @metamask/smart-accounts-kit
```

### 2. Create the caveat enforcer

At the root of your project, create a `contracts` directory.
Inside that directory, create a new contract named `AfterTimestampEnforcer.sol`.

Add the following code to `AfterTimestampEnforcer.sol`. This contract implements a caveat enforcer that 
extends the `ICaveatEnforcer.sol` interface and ensures that a delegation can only be redeemed after
a specific timestamp.

This contract overrides the `beforeHook` function, which is responsible for enforcing
conditions before a delegation's execution during the redemption process. In this example, it verifies that
the current block timestamp is later than the defined allowed timestamp.

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
    
    // Convert the encoded `terms` into a uint256 timestamp.
    // Casting to bytes32 ensures the data is exactly 32 bytes, matching
    // the size of a uint256.
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
a 0.01 ETH allowance that becomes spendable one hour after it is created:

<Tabs>
<TabItem value="delegation.ts">

```typescript
import { createDelegation, ROOT_AUTHORITY } from '@metamask/smart-accounts-kit'
import { createCaveatBuilder } from '@metamask/smart-accounts-kit/utils'
import { toHex, parseEther } from 'viem'
import { delegatorSmartAccount } from './config.ts'

const environment = delegatorSmartAccount.environment

// Replace this with the address of the deployed AfterTimestampEnforcer.sol contract.
const afterTimestampEnforcer = '0x22Ae4c4919C3aB4B5FC309713Bf707569B74876F'

const caveatBuilder = createCaveatBuilder(environment)

// Since block.timestamp is in seconds, convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000)

// Add an hour to the currentTime
const validTimestamp = currentTime + 3600

const caveats = caveatBuilder.addCaveat('nativeTokenTransferAmount', parseEther('0.01')).addCaveat({
  enforcer: afterTimestampEnforcer,
  terms: toHex(validTimestamp),
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
import { Implementation, toMetaMaskSmartAccount } from '@metamask/smart-accounts-kit'

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
