---
description: Learn how to use the function call scope for a delegation.
---

# Use the function call scope
 
The function call scope defines the specific methods, contract addresses, and calldata that are allowed for the delegation.
For example, Alice delegates to Bob the ability to call the approve function on the USDC contract, with the approval amount set to `0`.

Internally, this scope uses the [`allowedTargets`](../../../reference/caveats.md#allowedtargets) and [`allowedMethods`](../../../reference/caveats.md#allowedmethods) caveat enforcers, and 
optionally uses the [`allowedCalldata`](../../../reference/caveats.md#allowedcalldata) or [`exactCalldata`](../../../reference/caveats.md#exactcalldata) caveat enforcers when those parameters are specified.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../../get-started/install.md)
- [Configure the Delegation Toolkit.](../../configure.md)
- [Create a delegator account.](../execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account.](../execute-on-smart-accounts-behalf.md#4-create-a-delegate-account)

## Function call scope

This scope requires `targets` and `selectors` as mandatory parameters for the configuration.
You can specify the allowed methods in `selectors` and the permitted contract addresses in `targets`. 

The following example sets the delegation scope to allow the delegate to call the `approve` function on the USDC token contract.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

// USDC address on Sepolia.
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

const delegation = createDelegation({
  scope: {
    type: "functionCall",
    targets: [USDC_ADDRESS],
    selectors: ["approve(address, uint256)"]
  },
  to: delegateAccount,
  from: delegatorAccount,
});
```

## Next steps

See [how to further refine the authority of a delegation](refine-scope.md) using caveat enforcers.
