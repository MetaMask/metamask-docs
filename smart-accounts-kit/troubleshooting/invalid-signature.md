---
description: How to resolve the InvalidEOASignature error when redeeming delegations.
sidebar_label: Invalid EOA signature
toc_max_heading_level: 2
keywords: [InvalidEOASignature, error code, delegation, troubleshooting, invalid EOA signature]
---

# Invalid EOA signature

The Delegation Manager reverts with `InvalidEOASignature()` in the following cases.

## Smart account is not deployed

The [root delegation's](../concepts/delegation/overview.md#root-delegation) delegator must be a
MetaMask smart account. The Delegation Manager checks the delegator code to determine
whether it is an externally owned account (EOA) or a smart account.

If the smart account is not deployed yet, its address has no contract code. The Delegation
Manager treats the address as an EOA and attempts ECDSA signature recovery. Because the
delegation was signed by the smart account, signature recovery returns a different address,
and the call reverts.

### Solution

Verify that the smart account used as the delegator is deployed before redeeming the delegation. The
smart account can be either an ERC-4337 smart account or an EIP-7702 upgraded EOA.

For an ERC-4337 smart account, the first user operation sent from that account deploys it
automatically. For more information, see [Deploy a smart account](../guides/smart-accounts/deploy-smart-account.md).

For an EIP-7702-upgraded EOA, verify that you submit the authorization to set the account code
before redeeming the delegation.

```ts
import { getSmartAccountsEnvironment } from "@metamask/smart-accounts-kit";
import { sepolia as chain } from "viem/chains";

// Get the EOA account code
const code = await publicClient.getCode({
  address,
});

if (code) {
  // According to EIP-7702, the code format is 0xef0100 || address.
  // Remove the first 8 characters (0xef0100) to get the delegator address.
  const delegatorAddress = `0x${code.substring(8)}`;

  const statelessDelegatorAddress = getSmartAccountsEnvironment(chain.id)
  .implementations
  .EIP7702StatelessDeleGatorImpl;

  // If the account isn't upgraded to a MetaMask smart account, you can
  // either upgrade programmatically or ask the user to switch to a smart account manually.
  const isAccountUpgraded = delegatorAddress.toLowerCase() === statelessDelegatorAddress.toLowerCase();
}
```

To upgrade an EOA to a MetaMask smart account, see the [EIP-7702 quickstart](../get-started/smart-account-quickstart/eip7702.md).

## Incorrect signer

The delegation was signed with an account that doesn't correspond to the delegator
address. When the delegator is an EOA, the Delegation Manager recovers the signer from
the EIP-712 typed data hash and compares it to the `delegator` field. If they don't
match, the transaction reverts.

This occurs when redeeming a [delegation chain](../guides/delegation/create-redelegation.md). An
intermediate or leaf delegation has an EOA as the delegator, but the delegation is signed by an
account other than the expected delegator.

### Solution

Verify that the private key used to sign the delegation corresponds to the delegator address. For
more information, see the [`signDelegation`](../reference/delegation/index.md#signdelegation) reference.

## Incorrect chain ID or Delegation Manager

The EIP-712 domain separator used for signing the delegation includes the chain ID and the Delegation Manager contract
address. If the delegation was signed on a different chain or against a different
Delegation Manager, the recovered address won't match.

### Solution

Verify that the chain ID and Delegation Manager contract address you use when signing match the
chain and contract where you redeem the delegation.
