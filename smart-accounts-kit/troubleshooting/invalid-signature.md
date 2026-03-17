---
description: How to resolve the InvalidEOASignature error when redeeming delegations.
sidebar_label: Invalid EOA signature
keywords: [InvalidEOASignature, error code, delegation, troubleshooting, invalid EOA signature]
---

# Invalid EOA signature

The Delegation Manager reverts with `InvalidEOASignature()` in the following cases.

## Smart account is not deployed

The root delegation's delegator must be a MetaMask smart account. The Delegation Manager
checks delegator code length to determine whether the delegator is an EOA or a smart
account. 

If the smart account has not been deployed yet, it has no code at its address,
so the Delegation Manager treats it as an EOA and attempts ECDSA signature recovery.
Since the delegation was signed by the smart account, recovery produces a different address and reverts.

### Solution

Verify the delegator's smart account is deployed before the delegation is redeemed. The
smart account can be either an ERC-4337 smart account or an EIP-7702 upgraded EOA. 

For an ERC-4337 smart account, the first user operation sent from the account automatically
deploys it. See [deploy a smart account guide](../guides/smart-accounts/deploy-smart-account.md) to learn more

For an EIP-7702 upgraded EOA, verify that the authorization to set the
account code has been submitted before the delegation is redeemed.

```ts
import { getSmartAccountsEnvironment } from "@metamask/smart-accounts-kit";
import { sepolia as chain } from "viem/chains";

// Get the EOA account code
const code = await publicClient.getCode({
  address,
});

if (code) {
  // The address to which EOA has delegated. According to EIP-7702, 0xef0100 || address
  // represents the delegation. 
  // 
  // You need to remove the first 8 characters (0xef0100) to get the delegator address.
  const delegatorAddress = `0x${code.substring(8)}`;

  const statelessDelegatorAddress = getSmartAccountsEnvironment(chain.id)
  .implementations
  .EIP7702StatelessDeleGatorImpl;

  // If account is not upgraded to MetaMask smart account, you can
  // either upgrade programmatically or ask the user to switch to a smart account manually.
  const isAccountUpgraded = delegatorAddress.toLowerCase() === statelessDelegatorAddress.toLowerCase();
}
```

If the EOA is not upgraded to MetaMask smart account, [learn how to upgrade an EOA to MetaMask smart account](../get-started/smart-account-quickstart/eip7702.md). 

## Incorrect signer

The delegation was signed with an account that does not correspond to the delegator
address. When the delegator is an EOA, the Delegation Manager recovers the signer from
the EIP-712 typed data hash and compares it to the `delegator` field. If they do not
match, the transaction reverts.

This case occurs when redeeming a [delegation chain](../guides/delegation/create-redelegation.md), where an intermediate or leaf delegation has an EOA as the delegator and the delegation is signed with the wrong account.

### Solution

Verify that the private key used to sign the delegation belongs to the delegator address. See [`signDelegation`](../reference/delegation/index.md#signdelegation) reference docs to learn more.

## Incorrect chain ID or Delegation Manager

The EIP-712 domain separator used for signing the delegation includes the chain ID and the Delegation Manager contract
address. If the delegation was signed on a different chain or against a different
Delegation Manager, the recovered address will not match.

### Solution

Verify that the chain ID and Delegation Manager contract address used during signing
match the exact chain and contract where the delegation is being redeemed.
