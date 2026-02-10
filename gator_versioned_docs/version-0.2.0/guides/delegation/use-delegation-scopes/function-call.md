---
description: Learn how to use the function call scope for a delegation.
keywords: [delegation scope, function call, restrict, delegation]
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Use the function call scope
 
The function call scope defines the specific methods, contract addresses, and calldata that are allowed for the delegation.
For example, Alice delegates to Bob the ability to call the `approve` function on the USDC contract, with the approval amount set to `0`.

## Prerequisites

- [Install and set up the Smart Accounts Kit](../../../get-started/install.md)
- [Configure the Smart Accounts Kit](../../configure-toolkit.md)
- [Create a delegator account](../execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account](../execute-on-smart-accounts-behalf.md#4-create-a-delegate-account)

## Function call scope

This scope requires `targets`, which specifies the permitted contract addresses, and `selectors`, which specifies the allowed methods.

Internally, this scope uses the [`allowedTargets`](../../../reference/delegation/caveats.md#allowedtargets) and [`allowedMethods`](../../../reference/delegation/caveats.md#allowedmethods) caveat enforcers, and 
optionally uses the [`allowedCalldata`](../../../reference/delegation/caveats.md#allowedcalldata) or [`exactCalldata`](../../../reference/delegation/caveats.md#exactcalldata) caveat enforcers when those parameters are specified.
See the [function call scope reference](../../../reference/delegation/delegation-scopes.md#function-call-scope) for more details.

The following example sets the delegation scope to allow the delegate to call the `approve` function on the USDC token contract:

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";

// USDC address on Sepolia.
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

const delegation = createDelegation({
  scope: {
    type: "functionCall",
    targets: [USDC_ADDRESS],
    selectors: ["approve(address, uint256)"],
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

### Define allowed calldata

You can further restrict the scope by defining the `allowedCalldata`. For example, you can set 
`allowedCalldata` so the delegate is only permitted to call the `approve` function on the
USDC token contract with an allowance value of `0`. This effectively limits the delegate to 
revoking ERC-20 approvals.

:::important Usage
The `allowedCalldata` doesn't support multiple selectors. Each entry in the
list represents a portion of calldata corresponding to the same function signature.

You can include or exclude specific parameters to precisely define what parts of the calldata are valid.
:::

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";
import { encodeAbiParameters, erc20Abi } from "viem";

// USDC address on Sepolia.
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const delegation = createDelegation({
  scope: {
    type: "functionCall",
    targets: [USDC_ADDRESS],
    selectors: ["approve(address, uint256)"],
    allowedCalldata: [
      {
        // Limits the allowance amount to be 0.
        value: encodeAbiParameters(
          [{ name: 'amount', type: 'uint256' }],
          [0n],
        ),
        // The first 4 bytes are for selector, and next 32 bytes 
        // are for spender address.
        startIndex: 36,
      },
    ]
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

### Define exact calldata

You can define the `exactCalldata` instead of the `allowedCalldata`. For example, you can
set `exactCalldata` so the delegate is permitted to call only the `approve` function on the USDC token
contract, with a specific spender address and an allowance value of 0. This effectively limits the delegate to
revoking ERC-20 approvals for a specific spender.

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";
import { encodeFunctionData, erc20Abi } from "viem";

// USDC address on Sepolia.
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const delegation = createDelegation({
  scope: {
    type: "functionCall",
    targets: [USDC_ADDRESS],
    selectors: ["approve(address, uint256)"],
    exactCalldata: {
      calldata: encodeFunctionData({
        abi: erc20Abi,
        args: ["0x0227628f3F023bb0B980b67D528571c95c6DaC1c", 0n],
        functionName: 'approve',
      })
    }
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Next steps

See [how to further constrain the authority of a delegation](constrain-scope.md) using caveat enforcers.
