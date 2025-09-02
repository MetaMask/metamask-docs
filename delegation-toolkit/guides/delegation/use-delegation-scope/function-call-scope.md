---
description: Learn how to use the function call scope for a delegation
sidebar_position: 2
sidebar_label: Function call scope
---

# Function call scope
 
Function call scope define the specific methods, contract addresses, and optional calldata that are allowed 
for the delegation. For example, Alice can delegate to Bob the ability to call the approve function
on the USDC contract, with the approval amount set to `0`.

The scope internally uses the combination of [`allowedTargets`](../../../reference/caveats#allowedtargets) and [`allowedMethods`](../../../reference/caveats#allowedmethods) caveat enforcers, and 
can optionally include [`allowedCalldata`](../../../reference/caveats#allowedcalldata) or [`exactCalldata`](../../../reference/caveats#exactcalldata) caveat enforcers when those parameters are specified.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install)
- [Configure the Delegation Toolkit](../../configure).
- [Create a MetaMask smart account](../execute-on-smart-accounts-behalf#3-create-a-delegator-account) to create delegations.
- [Create a delegate account](../execute-on-smart-accounts-behalf#4-create-a-delegate-account)

## Use function call scope

The scope requires `targets` and `selectors` as mandatory parameters for the configuration. You can specify 
the allowed methods in `selectors` and the permitted contract addresses in `targets`. 

In the example, we are setting the delegation scope to allow the delegate to call the `approve` function
on the USDC token contract.

```typescript
import { createDelegation } from "@metamask/delegatino-toolkit";

// USDC address on Sepolia.
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

const delegation = createDelegation({
  scope: {
    type: "functionCall",
    targets: [USDC_ADDRESS],
    selectors: ["approve(address, uint256)"]
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## Next steps

- See [Restrict a delegation](../restrict-delegation) to learn how to further limit the authority of a delegation.