---
description: Learn how to create, deploy, and apply a custom caveat enforcer
sidebar_position: 2
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Create a custom caveat enforcer

When [restricting a delegation](restrict-delegation.md), the MetaMask Delegation Toolkit provides some [out-of-the-box caveat enforcers](../../reference/caveats.md)
that cover common use cases.
For more granular or custom control, you can follow the instructions on this page to create custom caveat enforcers from scratch.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install-delegation-toolkit.md)
- [Configure the Delegation Toolkit.](../configure-delegation-toolkit.md)

## Steps

### 1. Create the caveat enforcer

Create a contract that extends the
[`ICaveatEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/interfaces/ICaveatEnforcer.sol)
interface.

For example, the following is a simple caveat enforcer that only allows a delegation to be redeemed after a specific timestamp.

```solidity title="AfterTimestampEnforcer.sol"
// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import { CaveatEnforcer } from "@delegator/src/enforcers/CaveatEnforcer.sol";
import { ModeCode } from "../utils/Types.sol";

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

### 2. Deploy the caveat enforcer

Deploy your custom caveat enforcer to obtain its contract address.
For example, you can [deploy your smart contract using Forge](https://book.getfoundry.sh/forge/deploying).

### 3. Apply the caveat enforcer

When creating a delegation, add the `Caveat` for the custom caveat to the `CaveatBuilder`.
Learn more about [applying caveats to a delegation](restrict-delegation.md).

The following example uses the custom `AfterTimestampEnforcer.sol` caveat enforcer to create a delegation granting
an allowance of 1,000,000 wei that can only be spent after one hour from when the delegation is created.

:::warning Important
Depending on the use case, it may be necessary to add additional caveats to restrict the delegation further.
:::

<Tabs>
<TabItem value="example.ts">

```typescript
import {
  createCaveatBuilder,
  createDelegation,
} from "@metamask/delegation-toolkit";
import { toHex } from "viem";
import { delegatorSmartAccount } from "./config.ts";

const environment = delegatorSmartAccount.enviroment;

// Replace this with the address where the AfterTimestampEnforcer.sol contract is deployed.
const afterTimestampEnforcer = "0x22Ae4c4919C3aB4B5FC309713Bf707569B74876F";

const caveatBuilder = createCaveatBuilder(environment);

const tenAM = 10 * 60 * 60; // 10:00 AM as seconds since midnight.

const caveats = caveatBuilder
  .addCaveat("nativeTokenTransferAmount", 1_000_000)
  .addCaveat({
    enforcer: afterTimestampEnforcer,
    terms: toHex(tenAm)
  });

const delegation = createDelegation({
  to: delegate,
  from: delegatorSmartAccount.address,
  caveats
});
```


</TabItem>

<TabItem value="config.ts">

```typescript
import { createPublicClient, http } from "viem";
import { lineaSepolia as chain } from "viem/chains";
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

export const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

</TabItem>
</Tabs>
