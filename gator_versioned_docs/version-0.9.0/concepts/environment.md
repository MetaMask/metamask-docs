---
description: Learn about the delegator environment object and how to use it.
sidebar_position: 3
---

# Delegator environment

The delegator environment object, `DeleGatorEnvironment`, is a component of the MetaMask Delegation Toolkit that defines the contract addresses
necessary for interacting with the [Delegation Framework](delegation.md#delegation-framework) on a specific network.

The delegator environment serves several key purposes:

- It provides a centralized configuration for all the contract addresses required by the Delegation Framework.
- It enables easy switching between different networks (for example, Mainnet and testnet) or custom deployments.
- It ensures consistency across different parts of the application that interact with the Delegation Framework.

## Resolving the environment for a `DeleGatorClient`

When you create a `DeleGatorClient`, the Delegation Toolkit automatically resolves the environment based on the version it requires, and the `chainId` configured in the `DeleGatorClient`. If no environment is found, an error is thrown.

## Deploying and using a custom delegator environment

You can deploy the contracts using any method, but the toolkit provides a `deployDeleGatorEnvironment` function for convenience.
This function requires a Viem [Public Client](https://viem.sh/docs/clients/public.html), [Wallet Client](https://viem.sh/docs/clients/wallet.html), and [Chain](https://viem.sh/docs/glossary/types#chain),
and resolves to the `DeleGatorEnvironment` object:

```typescript
const environment = await deployDeleGatorEnvironment(walletClient, publicClient, chain);
```

You can also override any contracts when calling `deployDeleGatorEnvironment` (for example, if you have already deployed the `EntryPoint` contract to your local Anvil node):

```typescript
const environment = await deployDeleGatorEnvironment(walletClient, publicClient, chain, {
  EntryPoint: "0x0000000071727De22E5E9d8BAf0edAc6f37da032"
});
```

You can now use this `environment` object when creating a `DeleGatorClient`:

```typescript
const client = createDeleGatorClient({
  transport,
  chain,
  account,
  environment
});
```

## Overriding a configured environment

To simplify code when interacting with a `DeleGatorClient`, and to enable using the same code for production and development environments,
you can override the `DeleGatorEnvironment` that is resolved internally for a given chain ID and contract version:

```typescript
const environment = await deployDeleGatorEnvironment(walletClient, publicClient, chain);

overrideDeployedEnvironment(
  chainId,
  "1.1.0",
  environment,
);
```

With this code, your environment object is used when you create a `DeleGatorClient` with the specified `chainId`.

:::note
Make sure to specify the Framework version required by the toolkit.
See the [changelog](../changelog/0.9.0.md) of the toolkit version you are using for its required Framework version.
:::
