---
title: Ethereum bundler methods
sidebar_label: Bundler methods
description: Ethereum bundler methods
---

Infura provides seamless integration with the Pimlico account abstraction bundler infrastructure, enabling
developers to access ERC‑4337 smart account features.
Infura transparently routes supported smart account methods to the Pimlico backend, allowing
teams to construct, validate, simulate, and submit user operations without needing to directly call
Pimlico endpoints or manage bundler infrastructure.

:::info
Refer to the [official Pimlico documentation](https://docs.pimlico.io/references/bundler)
for more about the bundler methods and
[EntryPoint errors](https://docs.pimlico.io/references/bundler/entrypoint-errors#entrypoint-errors).
:::

The following bundler methods are supported on Ethereum Mainnet and Sepolia:

- [`eth_sendUserOperation`](./eth_senduseroperation): Submits a user operation to be included onchain.
- [`eth_estimateUserOperationGas`](./eth_estimateuseroperationgas): Simulates the user operation and estimates the appropriate gas limits.
- [`eth_getUserOperationReceipt`](./eth_getuseroperationreceipt): Fetches the receipt of a user operation.
- [`eth_getUserOperationByHash`](./eth_getuseroperationbyhash): Fetches the user operation by hash.
- [`eth_supportedEntryPoints`](./eth_supportedentrypoints): Fetches the EntryPoint addresses supported by the bundler.
- [`pimlico_getUserOperationGasPrice`](./pimlico_getuseroperationgasprice): Returns the gas prices that must be used for the user operation.
- [`pimlico_getUserOperationStatus`](./pimlico_getuseroperationstatus): Returns the user operation status.
- [`pimlico_simulateAssetChanges`](./pimlico_simulateassetchanges): Simulates a user operation to predict the asset changes it will cause.
- [`pimlico_getTokenQuotes`](./pimlico_gettokenquotes): Returns the tentative token exchange rates used by the ERC-20 Paymaster.
- [`pm_sponsorUserOperation`](./pm_sponsoruseroperation): Sponsors a user operation by providing paymaster-related fields and updated gas parameters.
- [`pm_getPaymasterData`](./pm_getpaymasterdata): Returns values to be used in paymaster-related fields of a signed user operation.
- [`pm_getPaymasterStubData`](./pm_getpaymasterstubdata): Returns stub values to be used in paymaster-related fields of an unsigned user operation for gas estimation.
- [`pm_validateSponsorshipPolicies`](./pm_validatesponsorshippolicies): Validates a user operation against sponsorship policies to determine which are willing to sponsor it.

## Method EntryPoints

The bundler supports calling multiple EntryPoint versions (v0.6 and v0.7/v0.8) through the same set of
RPC methods (for example, `eth_sendUserOperation` and `eth_estimateUserOperationGas`, etc.), allowing
it to handle both older and modern smart account schemes.

When you submit a user operation via standard methods, the bundler reads the payload and identifies the appropriate EntryPoint version based on which fields are present.